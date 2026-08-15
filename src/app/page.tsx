import HeroSection from '@/components/HeroSection';
import CategoriesSection from '@/components/CategoriesSection';
import NewArrivalsSection from '@/components/NewArrivalsSection';
import BrandHighlights from '@/components/BrandHighlights';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <HeroSection />
      <CategoriesSection />
      <NewArrivalsSection />
      <BrandHighlights />
      <Footer />
    </div>
  );
}