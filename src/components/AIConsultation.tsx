'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface AnalysisResult {
  skinScore: number
  primaryConcerns: string[]
  skinType: string
  recommendedTreatments: Array<{
    name: string
    purpose: string
    frequency: string
    expectedResults: string
  }>
  timeline: {
    immediate: string[]
    enhancement: string[]
    maintenance: string[]
  }
  skincare: {
    morning: string[]
    evening: string[]
    weekly: string[]
  }
  investment: {
    initial: string
    firstYear: string
  }
}

export function AIConsultation() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showCamera, setShowCamera] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [videoReady, setVideoReady] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
      setAnalysis(null)
      setError(null)
    }
  }

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      })
      setStream(mediaStream)
      setShowCamera(true)
      setVideoReady(false)
      
      // Wait for next tick to ensure video element is rendered
      setTimeout(() => {
        if (videoRef.current && mediaStream) {
          videoRef.current.srcObject = mediaStream
          
          // Wait for video to be ready
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play()
          }
          
          videoRef.current.onplaying = () => {
            setVideoReady(true)
          }
        }
      }, 100)
    } catch (err) {
      setError('Unable to access camera. Please check your permissions.')
      console.error('Camera error:', err)
    }
  }

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
    setShowCamera(false)
    setVideoReady(false)
  }, [stream])

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current && videoReady) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      
      if (context && video.videoWidth > 0 && video.videoHeight > 0) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        
        // Clear canvas first
        context.clearRect(0, 0, canvas.width, canvas.height)
        
        // Draw the current video frame
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        
        // Convert to blob with a small delay to ensure the image is drawn
        setTimeout(() => {
          canvas.toBlob((blob) => {
            if (blob) {
              const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' })
              setImageFile(file)
              const dataUrl = canvas.toDataURL('image/jpeg', 0.9)
              setSelectedImage(dataUrl)
              stopCamera()
              setAnalysis(null)
              setError(null)
            }
          }, 'image/jpeg', 0.9)
        }, 100)
      }
    }
  }

  const analyzeImage = async () => {
    if (!imageFile) return

    setIsAnalyzing(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('image', imageFile)

      const response = await fetch('/api/analyze-skin', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Analysis failed')
      }

      // Handle server-sent events streaming
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        throw new Error('No response body')
      }

      let buffer = ''
      
      while (true) {
        const { done, value } = await reader.read()
        
        if (done) break
        
        buffer += decoder.decode(value, { stream: true })
        
        // Process complete messages
        const messages = buffer.split('\n\n')
        buffer = messages.pop() || ''
        
        for (const message of messages) {
          if (message.startsWith('data: ')) {
            try {
              const data = JSON.parse(message.slice(6))
              
              // Check if we have the final analysis
              if (data.analysis && data.done) {
                setAnalysis(data.analysis)
              } else if (data.error) {
                throw new Error(data.error)
              }
              // We could also handle streaming content here if needed
            } catch (e) {
              console.error('Error parsing SSE message:', e)
            }
          }
        }
      }
    } catch (err) {
      setError('An error occurred during analysis. Please try again.')
      console.error(err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [stream])

  return (
    <section className="py-24 bg-gradient-to-b from-[#F8F6F4] to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-playfair text-[#2C2C2C] mb-4"
          >
            Experience Your AI Skin Analysis
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-[#898B8D] max-w-2xl mx-auto"
          >
            Get personalized treatment recommendations powered by advanced AI technology
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-playfair text-[#2C2C2C] mb-6">
                Upload Your Photo
              </h3>
              
              {!selectedImage && !showCamera ? (
                <div className="space-y-4">
                  <label className="block cursor-pointer">
                    <div className="border-2 border-dashed border-[#B87333] rounded-xl p-8 text-center hover:border-[#898B8D] transition-colors">
                      <svg className="w-12 h-12 mx-auto mb-3 text-[#B87333]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-[#2C2C2C] font-medium mb-1">Upload from device</p>
                      <p className="text-sm text-[#898B8D]">Choose a photo from your files</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">or</span>
                    </div>
                  </div>

                  <button
                    onClick={startCamera}
                    className="w-full border-2 border-[#B87333] text-[#B87333] rounded-xl p-8 hover:bg-[#B87333] hover:text-white transition-colors"
                  >
                    <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-[#2C2C2C] font-medium mb-1">Take a photo</p>
                    <p className="text-sm text-[#898B8D]">Use your device camera</p>
                  </button>

                  <div className="mt-4 flex items-center justify-center gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-purple-100 to-indigo-100 text-indigo-800">
                      Powered by OpenAI o3
                    </span>
                  </div>
                </div>
              ) : showCamera ? (
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden bg-black">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-64 object-cover"
                    />
                    <canvas ref={canvasRef} className="hidden" />
                    <button
                      onClick={stopCamera}
                      className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-[#F8F6F4] transition-colors"
                    >
                      <svg className="w-5 h-5 text-[#2C2C2C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <button
                    onClick={capturePhoto}
                    disabled={!videoReady}
                    className="w-full py-4 bg-[#B87333] text-white rounded-full hover:bg-[#2C2C2C] transition-colors duration-300 font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {!videoReady ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Initializing Camera...
                      </span>
                    ) : (
                      <>
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Capture Photo
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src={selectedImage || ''}
                      alt="Uploaded photo"
                      className="w-full h-64 object-cover"
                    />
                    <button
                      onClick={() => {
                        setSelectedImage(null)
                        setImageFile(null)
                        setAnalysis(null)
                        stopCamera()
                      }}
                      className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-[#F8F6F4] transition-colors"
                    >
                      <svg className="w-5 h-5 text-[#2C2C2C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <button
                    onClick={analyzeImage}
                    disabled={isAnalyzing}
                    className="w-full py-4 bg-[#B87333] text-white rounded-full hover:bg-[#2C2C2C] transition-colors duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAnalyzing ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing...
                      </span>
                    ) : 'Analyze My Skin'}
                  </button>
                </div>
              )}

              {error && (
                <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
                  {error}
                </div>
              )}
            </div>

            {/* Info Box */}
            <div className="bg-[#F8F6F4] rounded-2xl p-6">
              <h4 className="font-medium text-[#2C2C2C] mb-3">How It Works</h4>
              <ul className="space-y-2 text-sm text-[#898B8D]">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-[#B87333] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Upload a clear, front-facing photo
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-[#B87333] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Our AI analyzes your skin concerns
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-[#B87333] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Receive personalized treatment recommendations
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {!analysis ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl shadow-xl p-8 h-full flex items-center justify-center min-h-[600px]"
                >
                  <div className="text-center">
                    <svg className="w-24 h-24 mx-auto mb-6 text-[#B87333] opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <p className="text-[#898B8D] text-lg">Your personalized analysis will appear here</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-2xl shadow-xl p-8 space-y-6 max-h-[800px] overflow-y-auto"
                >
                  {/* Skin Score */}
                  <div className="text-center pb-6 border-b border-gray-100">
                    <h3 className="text-2xl font-playfair text-[#2C2C2C] mb-3">Your Skin Analysis</h3>
                    <div className="flex items-center justify-center space-x-4">
                      <div>
                        <p className="text-sm text-[#898B8D] mb-1">Skin Health Score</p>
                        <p className="text-4xl font-bold text-[#B87333]">{analysis.skinScore}/10</p>
                      </div>
                      <div className="h-16 w-px bg-gray-200"></div>
                      <div>
                        <p className="text-sm text-[#898B8D] mb-1">Skin Type</p>
                        <p className="text-lg font-medium text-[#2C2C2C]">{analysis.skinType}</p>
                      </div>
                    </div>
                  </div>

                  {/* Primary Concerns */}
                  <div>
                    <h4 className="font-medium text-[#2C2C2C] mb-3">Primary Concerns</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.primaryConcerns.map((concern, idx) => (
                        <span key={idx} className="px-3 py-1 bg-[#F8F6F4] text-[#2C2C2C] rounded-full text-sm">
                          {concern}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Treatments */}
                  <div>
                    <h4 className="font-medium text-[#2C2C2C] mb-3">Recommended Treatments</h4>
                    <div className="space-y-3">
                      {analysis.recommendedTreatments.map((treatment, idx) => (
                        <div key={idx} className="bg-[#F8F6F4] rounded-lg p-4">
                          <h5 className="font-medium text-[#B87333] mb-1">{treatment.name}</h5>
                          <p className="text-sm text-[#2C2C2C] mb-2">{treatment.purpose}</p>
                          <div className="flex justify-between text-xs text-[#898B8D]">
                            <span>{treatment.frequency}</span>
                            <span>{treatment.expectedResults}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Treatment Timeline */}
                  <div>
                    <h4 className="font-medium text-[#2C2C2C] mb-3">Treatment Timeline</h4>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="text-sm font-medium text-[#B87333] min-w-[120px]">0-3 months:</span>
                        <span className="text-sm text-[#2C2C2C]">{analysis.timeline.immediate.join(', ')}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-sm font-medium text-[#B87333] min-w-[120px]">3-6 months:</span>
                        <span className="text-sm text-[#2C2C2C]">{analysis.timeline.enhancement.join(', ')}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-sm font-medium text-[#B87333] min-w-[120px]">6+ months:</span>
                        <span className="text-sm text-[#2C2C2C]">{analysis.timeline.maintenance.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Investment Range */}
                  <div className="bg-[#2C2C2C] text-white rounded-lg p-4">
                    <h4 className="font-medium mb-2">Investment Range</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-[#B87333]">Initial Phase</p>
                        <p className="font-medium">{analysis.investment.initial}</p>
                      </div>
                      <div>
                        <p className="text-[#B87333]">First Year Total</p>
                        <p className="font-medium">{analysis.investment.firstYear}</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <button className="w-full py-4 bg-[#B87333] text-white rounded-full hover:bg-[#2C2C2C] transition-colors duration-300 font-medium">
                    Book Your Consultation
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}