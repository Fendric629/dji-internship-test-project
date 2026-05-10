import { RootFilters } from './components/RootFilters'
import { Navbar } from './sections/Navbar'
import { Hero } from './sections/Hero'
import { MenuBarStrip } from './sections/MenuBarStrip'
import { InboxMockup } from './sections/InboxMockup'
import { FeatureTriage } from './sections/FeatureTriage'
import { LogoCloud } from './sections/LogoCloud'
import { Testimonials } from './sections/Testimonials'
import { DjiInternship } from './sections/DjiInternship'
import { InternPositions } from './sections/InternPositions'
import { FinalCTA } from './sections/FinalCTA'
import { ClosingSlogan } from './sections/ClosingSlogan'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0c0c0c] text-white">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4"
        />
      </div>

      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 -translate-x-[calc(50%+36rem)] w-px bg-white/10 z-[5]" />
      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 translate-x-[calc(-50%+36rem)] w-px bg-white/10 z-[5]" />

      <RootFilters />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <MenuBarStrip />
        <InboxMockup />
        <FeatureTriage />
        <LogoCloud />
        <Testimonials />
        <DjiInternship />
        <InternPositions />
        <FinalCTA />
        <ClosingSlogan />
      </div>
    </div>
  )
}
