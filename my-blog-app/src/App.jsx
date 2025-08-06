import React from 'react';
import './index.css';

import BlogGrid from './components/BlogGrid';
import CreatePost from './components/CreatePost';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import FeatureSection from './components/FeatureSection';
import { FiFeather, FiSmartphone, FiZap } from 'react-icons/fi';

export default function App() {
  return (
    <div className="bg-gradient-to-br from-white to-slate-100 dark:from-slate-900 dark:to-slate-800 min-h-screen">
      {/* Navbar */}
      <Header />

      {/* Hero Section */}
      {/* <Hero /> */}

    
      <FeatureSection
  features={[
    {
      title: 'Custom Speed',
      description: 'Super optimized load times',
      icon: <FiZap size={28} className="text-pink-500" />,
    },
    {
      title: 'Mobile First',
      description: 'Crafted for touch devices first',
      icon: <FiSmartphone size={28} className="text-green-500" />,
    },
    {
      title: 'Smooth UI',
      description: 'Modern design and UX',
      icon: <FiFeather size={28} className="text-blue-500" />,
    },
  ]}
/>


      {/* Blog Grid (Fetches from API) */}
      {/* <BlogGrid /> */}

       <div className="min-h-screen bg-gray-100">
      
      <BlogGrid />
    </div>

      {/* Create Post Form */}
      <div id="create">
        {/* <CreatePost /> */}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
