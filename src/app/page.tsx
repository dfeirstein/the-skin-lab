import { LuxuryMedicalSpaHero } from '@/components/Hero'
import { FloatingLogo } from '@/components/FloatingLogo'
import { ServicesOverview } from '@/components/ServicesOverview'
import { WhyChooseUs } from '@/components/WhyChooseUs'
import { AppShowcase } from '@/components/AppShowcase'
import { AIConsultation } from '@/components/AIConsultation'
import { TestimonialsResults } from '@/components/TestimonialsResults'

export default function Home() {
  return (
    <>
      <LuxuryMedicalSpaHero variant="split" />
      <AIConsultation />
      <TestimonialsResults />
      <WhyChooseUs />
      <ServicesOverview />
      <AppShowcase />
      <FloatingLogo />
      {/* Add more sections here */}
    </>
  )
}