import React from 'react'
import LandingHeader from '../components/Landing/LandingHeader'
import HeroSection from '../components/Landing/HeroSection'
import FeaturesSection from '../components/Landing/FeaturesSection'
import TestimonialsSection from '../components/Landing/TestimonialsSection'
import PricingSection from '../components/Landing/PricingSection'
import StepsSection from '../components/Landing/StepsSection'
import FAQ from '../components/Landing/FAQ'
import CTA from '../components/Landing/CTA'
import ContactSection from '../components/Landing/ContactSection'
import LandingFooter from '../components/Landing/LandingFooter'

const Landing = () => {
  return (
    <div>
      <LandingHeader />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <StepsSection />
      <FAQ />
      <CTA />
      <ContactSection />
      <div className='h-[1px] bg-slate-600 w-full'/>
      <LandingFooter />
    </div>
  )
}

export default Landing