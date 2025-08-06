import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

 const Footer = ()=> {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-gray-900 text-white py-10 px-4"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Logo / Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-2">YourBlog</h2>
          <p className="text-gray-400">Stay curious. Share stories. Read better.</p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <a href="/" className="text-gray-400 hover:text-white transition">Home</a>
          <a href="/blog" className="text-gray-400 hover:text-white transition">Blog</a>
          <a href="/create" className="text-gray-400 hover:text-white transition">Create Post</a>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-semibold mb-2">Connect</h3>
          <div className="flex gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition">
              <FaGithub size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition">
              <FaLinkedin size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition">
              <FaTwitter size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-gray-500 text-sm">
        © {new Date().getFullYear()} YourBlog. All rights reserved.
      </div>
    </motion.footer>
  );
}

export default Footer; 
 