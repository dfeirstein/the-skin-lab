import { NextRequest } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const SKIN_ANALYSIS_PROMPT = `You are an advanced AI aesthetic advisor for The Skin Lab, a luxury medical spa combining Silicon Valley precision with aesthetic excellence. Analyze this facial image and provide personalized treatment recommendations.

Analysis Framework:
**1. SKIN ASSESSMENT**
* Evaluate skin texture, tone, and overall condition
* Identify fine lines, wrinkles, or volume changes
* Note any pigmentation or pore concerns
* Assess facial harmony and proportions

**2. TREATMENT RECOMMENDATIONS** Provide specific recommendations from these categories:
* **Injectables**: Botox, dermal fillers (specify areas)
* **Laser Treatments**: IPL, resurfacing, skin tightening
* **Facial Treatments**: HydraFacial, microneedling, chemical peels
* **Body Contouring**: CoolSculpting, body treatments if applicable

**3. PERSONALIZED PROTOCOL** Create a 3-phase treatment plan:
* **Phase 1 (0-3 months)**: Primary concerns
* **Phase 2 (3-6 months)**: Enhancement treatments
* **Phase 3 (6+ months)**: Maintenance protocol

**4. SKINCARE REGIMEN** Recommend professional-grade products for morning and evening routines.

Return the analysis in JSON format with this structure:
{
  "skinScore": (1-10),
  "primaryConcerns": ["concern1", "concern2", ...],
  "skinType": "skin type description",
  "recommendedTreatments": [
    {
      "name": "treatment name",
      "purpose": "what it addresses",
      "frequency": "how often",
      "expectedResults": "timeline and outcomes"
    }
  ],
  "timeline": {
    "immediate": ["treatment1", "treatment2"],
    "enhancement": ["treatment3", "treatment4"],
    "maintenance": ["ongoing treatments"]
  },
  "skincare": {
    "morning": ["product1", "product2"],
    "evening": ["product1", "product2"],
    "weekly": ["treatment1"]
  },
  "investment": {
    "initial": "$X,XXX - $X,XXX",
    "firstYear": "$XX,XXX - $XX,XXX"
  }
}

Maintain The Skin Lab's luxury positioning while providing scientific, evidence-based recommendations. Be specific about treatment areas and realistic about timelines.`

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const imageFile = formData.get('image') as File
    
    if (!imageFile) {
      return new Response(
        JSON.stringify({ error: 'No image provided' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // Convert image to base64
    const bytes = await imageFile.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = buffer.toString('base64')
    const imageUrl = `data:${imageFile.type};base64,${base64Image}`

    // Create a streaming response
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Use o3 model with vision support and streaming
          const response = await openai.chat.completions.create({
            model: 'o3',
            messages: [
              {
                role: 'user',
                content: [
                  {
                    type: 'text',
                    text: SKIN_ANALYSIS_PROMPT,
                  },
                  {
                    type: 'image_url',
                    image_url: {
                      url: imageUrl,
                    },
                  },
                ],
              },
            ],
            max_completion_tokens: 4000, // o3 supports up to 100k
            stream: true,
          })

          let fullResponse = ''
          
          // Stream the response
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content || ''
            fullResponse += content
            
            // Send the chunk to the client
            if (content) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}

`))
            }
          }

          // After streaming is complete, extract and validate JSON
          const jsonMatch = fullResponse.match(/\{[\s\S]*\}/)
          if (jsonMatch) {
            try {
              const analysis = JSON.parse(jsonMatch[0])
              // Send the final parsed analysis
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ analysis, done: true })}

`))
            } catch (parseError) {
              console.error('Failed to parse JSON:', parseError)
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'Failed to parse analysis' })}

`))
            }
          } else {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'No valid JSON found in response' })}

`))
          }
          
          controller.close()
        } catch (error) {
          console.error('Error analyzing image:', error)
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'Failed to analyze image' })}

`))
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Error processing request:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to process request' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}