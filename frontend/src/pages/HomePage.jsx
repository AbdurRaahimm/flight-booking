import HeroSection from '../components/HeroSection'
import Flights from '../components/Flights';
import Features from '../components/Features'
import CTA from '../components/CTA'
import TestimonialSlider from '../components/testimonials/TestimonialSlider';

export default function HomePage() {

  return (
    <>
      <HeroSection />

      <Features />
      <Flights show={3} />

    <TestimonialSlider/>
      <CTA/>
    </>
  )
}


