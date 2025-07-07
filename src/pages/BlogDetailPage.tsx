import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Eye, ArrowLeft, Share2, Tag } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { mockBlogPosts } from '../data/mockData';

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const post = mockBlogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Blog post not found</h1>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/blog')}>
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const relatedPosts = mockBlogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </button>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {post.readTime} min read
            </div>
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              {post.viewCount.toLocaleString()} views
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
            
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </motion.header>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
          />
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-12"
        >
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 leading-relaxed mb-8 font-medium">
              {post.excerpt}
            </p>
            
            <div className="text-gray-700 leading-relaxed space-y-6">
              {/* Since we don't have full content, we'll create a structured article */}
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Introduction</h2>
              <p>
                This comprehensive guide will walk you through everything you need to know about {post.title.toLowerCase()}. 
                Whether you're a beginner or looking to deepen your understanding, this article covers all the essential 
                information you need to succeed.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Key Points to Remember</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Always ensure you have the most current version of any forms</li>
                <li>Read all instructions carefully before beginning the process</li>
                <li>Keep copies of all submitted documents for your records</li>
                <li>Don't hesitate to seek professional help when needed</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step-by-Step Process</h2>
              <ol className="list-decimal pl-6 space-y-3">
                <li><strong>Preparation:</strong> Gather all necessary documents and information before starting</li>
                <li><strong>Review:</strong> Carefully read through all requirements and instructions</li>
                <li><strong>Complete:</strong> Fill out all required fields accurately and completely</li>
                <li><strong>Verify:</strong> Double-check all information for accuracy</li>
                <li><strong>Submit:</strong> Follow the proper submission procedures</li>
              </ol>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Common Mistakes to Avoid</h2>
              <p>
                Many people make simple mistakes that can delay their applications or cause rejections. 
                Here are the most common issues to watch out for:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Incomplete or missing information</li>
                <li>Using outdated forms</li>
                <li>Incorrect fee payments</li>
                <li>Missing required supporting documents</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Conclusion</h2>
              <p>
                Following the proper procedures and having the right information can make the process much smoother. 
                Remember to take your time, be thorough, and don't hesitate to ask for help when you need it. 
                With the right preparation and attention to detail, you can successfully navigate this process.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <motion.article
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
                  onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={relatedPost.featuredImage}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 mb-3">
                      {relatedPost.category}
                    </span>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {relatedPost.excerpt}
                    </p>

                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(relatedPost.publishedAt).toLocaleDateString()}
                      <span className="mx-2">•</span>
                      <Clock className="w-3 h-3 mr-1" />
                      {relatedPost.readTime} min
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-primary-50 border border-primary-200 rounded-xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Need Help Finding Forms?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our platform makes it easy to discover and download the forms you need. 
            Search our comprehensive database or browse by category.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" onClick={() => navigate('/')}>
              Search Forms
            </Button>
            <Button variant="outline" onClick={() => navigate('/categories')}>
              Browse Categories
            </Button>
          </div>
        </motion.div>
      </article>
    </div>
  );
}