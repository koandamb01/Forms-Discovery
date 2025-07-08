import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { CategoryCard } from '../ui/CategoryCard';
import { Button } from '../ui/Button';
import { mockCategories } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';

interface CategoriesSectionProps {
  onCategoryClick: (categoryId: string) => void;
}

export function CategoriesSection({ onCategoryClick }: CategoriesSectionProps) {
  const featuredCategories = mockCategories.filter(cat => cat.isFeatured).slice(0, 6);
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Browse by Category
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Find forms organized by topic. From immigration and taxes to business and education, 
            we have the documents you need.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {featuredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <CategoryCard
                category={category}
                onClick={() => onCategoryClick(category.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button variant="outline" size="lg" onClick={() => navigate('/categories')}>
            View All Categories
            <ArrowRight size={20} className="ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}