import { useNavigate } from 'react-router-dom';
import { HeroSection } from '../components/sections/HeroSection';
import { CategoriesSection } from '../components/sections/CategoriesSection';
import { PopularFormsSection } from '../components/sections/PopularFormsSection';
import { HowItWorksSection } from '../components/sections/HowItWorksSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';

export function HomePage() {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/categories/${categoryId}`);
  };

  const handleFormClick = (formId: string) => {
    navigate(`/forms/${formId}`);
  };

  return (
    <div className="min-h-screen">
      <HeroSection onSearch={handleSearch} />
      <CategoriesSection onCategoryClick={handleCategoryClick} />
      <PopularFormsSection onFormClick={handleFormClick} />
      <HowItWorksSection />
      <TestimonialsSection />
    </div>
  );
}