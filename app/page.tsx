import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import Hero from "@/components/sections/Hero";
import WhyGreentech from "@/components/sections/WhyGreentech";
import ProductRanges from "@/components/sections/ProductRanges";
import CrossSectionExplorer from "@/components/sections/CrossSectionExplorer";
import Performance from "@/components/sections/Performance";
import FinishPicker from "@/components/sections/FinishPicker";
import Sectors from "@/components/sections/Sectors";
import Sustainability from "@/components/sections/Sustainability";
import Certifications from "@/components/sections/Certifications";
import ForFabricators from "@/components/sections/ForFabricators";
import About from "@/components/sections/About";
import Resources from "@/components/sections/Resources";
import Enquiry from "@/components/sections/Enquiry";
import Contact from "@/components/sections/Contact";
import { localBusinessJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <SmoothScroll>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
      />
      <Header />
      <main>
        <Hero />
        <WhyGreentech />
        <ProductRanges />
        <CrossSectionExplorer />
        <Performance />
        <FinishPicker />
        <Sectors />
        <Sustainability />
        <Certifications />
        <ForFabricators />
        <About />
        <Resources />
        <Enquiry />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </SmoothScroll>
  );
}
