import { motion } from 'framer-motion';
import { Search, Download, CheckCircle } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      icon: Search,
      title: 'Search & Discover',
      description: 'Use our intelligent search or browse categories to find the exact form you need. Our AI understands natural language queries.',
      color: 'blue'
    },
    {
      icon: CheckCircle,
      title: 'Verify & Review',
      description: 'Review form details, requirements, and our AI-generated guidance to ensure it meets your specific needs.',
      color: 'green'
    },
    {
      icon: Download,
      title: 'Download & Complete',
      description: 'Download the official form directly from the source. Save forms for later or share with others who might need them.',
      color: 'purple'
    }
  ];

  const colorClasses = {
    blue: {
      bg: 'bg-blue-100',
      icon: 'text-blue-600',
      border: 'border-blue-200'
    },
    green: {
      bg: 'bg-green-100',
      icon: 'text-green-600',
      border: 'border-green-200'
    },
    purple: {
      bg: 'bg-purple-100',
      icon: 'text-purple-600',
      border: 'border-purple-200'
    }
  };

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
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Finding and downloading forms has never been easier. Our streamlined process 
            gets you the documents you need in just three simple steps.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-16 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
            <div className="flex justify-between items-center px-16">
              <div className="w-1/3 h-0.5 bg-gray-200" />
              <div className="w-1/3 h-0.5 bg-gray-200" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const colors = colorClasses[step.color as keyof typeof colorClasses];
              
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative text-center"
                >
                  {/* Step Number */}
                  <div className="absolute -top-9 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center text-sm font-bold text-gray-700 shadow-sm z-10">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 ${colors.bg} ${colors.border} border rounded-xl flex items-center justify-center mx-auto mb-6 mt-4 relative z-20`}>
                    <Icon className={`w-8 h-8 ${colors.icon}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}