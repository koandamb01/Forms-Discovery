import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoryDetailPage } from './pages/CategoryDetailPage';
import { SearchPage } from './pages/SearchPage';
import { FormDetailPage } from './pages/FormDetailPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PremiumPage } from './pages/PremiumPage';
import { AdminPage } from './pages/AdminPage';
import { ProfilePage } from './pages/ProfilePage';
import { AIAssistant } from './components/features/AIAssistant';
import { ToastContainer } from './components/ui/Toast';
import { useToast } from './hooks/useToast';

function App() {
  const { toasts, removeToast } = useToast();

  const handleFormRecommendation = (formId: string) => {
    // Navigate to form detail page
    window.location.href = `/forms/${formId}`;
  };

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/categories/:categoryId" element={<CategoryDetailPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/forms/:formId" element={<FormDetailPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/premium" element={<PremiumPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </main>
          <Footer />
          
          {/* Global Components */}
          <AIAssistant onFormRecommendation={handleFormRecommendation} />
          <ToastContainer toasts={toasts} onClose={removeToast} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;