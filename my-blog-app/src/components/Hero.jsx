import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const blurryCircles = [
  { size: 180, top: '10%', left: '15%', color: 'bg-pink-400/40' },
  { size: 150, top: '40%', left: '70%', color: 'bg-indigo-400/40' },
  { size: 220, top: '70%', left: '20%', color: 'bg-purple-500/30' },
  { size: 130, top: '20%', left: '85%', color: 'bg-white/20' },
  { size: 160, top: '55%', left: '50%', color: 'bg-yellow-300/30' },
  { size: 100, top: '35%', left: '35%', color: 'bg-blue-300/30' },
];

const floatingIcons = [
  { top: '25%', left: '10%', delay: 1 },
  { top: '60%', left: '80%', delay: 2 },
  { top: '75%', left: '45%', delay: 3 },
];

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      {/* 🌈 Background Gradient */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
      />

      {/* 🧊 Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md z-0" />

      {/* 🫧 Blurry Circles */}
      {blurryCircles.map((circle, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full ${circle.color} blur-3xl`}
          style={{
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            top: circle.top,
            left: circle.left,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 20, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 7 + Math.random() * 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 1,
          }}
        />
      ))}

      {floatingIcons.map((icon, index) => (
        <motion.div
          key={index}
          className="absolute text-yellow-300 text-xl z-10 opacity-70"
          style={{
            top: icon.top,
            left: icon.left,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: icon.delay,
          }}
        >
          <FaStar />
        </motion.div>
      ))}

      {/* 🔮 Glowing Core Behind Text */}
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-pink-500 opacity-25 blur-[150px] z-0"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* 💬 Hero Content */}
      <motion.div
        className="relative text-center text-white px-6 z-20 max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg tracking-tight leading-tight">
          Welcome to{' '}
          <span className="text-pink-300 animate-pulse glow">
            BlogSpace
          </span>
        </h1>
        <p className="text-lg md:text-2xl font-light mb-8 text-gray-100">
          Share your voice, explore ideas, and dive into a world of creativity.
        </p>

        <motion.a
          href="#posts"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-white text-indigo-700 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-indigo-100 transition duration-300"
        >
          🚀 Explore Blogs
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
