'use client'

import { useState } from 'react'
import { LuxuryMedicalSpaHero } from '@/components/Hero'

const variants = ['typography', 'split', 'results'] as const

export default function HeroDemo() {
  const [currentVariant, setCurrentVariant] = useState<typeof variants[number]>('typography')

  return (
    <div>
      <div className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4">
        <h3 className="text-sm font-semibold mb-2">Hero Variants</h3>
        <div className="flex flex-col gap-2">
          {variants.map((variant) => (
            <button
              key={variant}
              onClick={() => setCurrentVariant(variant)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                currentVariant === variant
                  ? 'bg-copper-rose text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <LuxuryMedicalSpaHero variant={currentVariant} />
    </div>
  )
}