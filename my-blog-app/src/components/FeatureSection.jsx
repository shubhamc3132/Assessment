
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiZap, FiSmartphone, FiFeather } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultFeatures = [
  {
    title: 'Lightning Fast',
    description: 'Built for speed using the latest web technologies.',
    icon: <FiZap size={28} className="text-indigo-600" />,
  },
  {
    title: 'Responsive Layout',
    description: 'Adapts seamlessly across all screen sizes.',
    icon: <FiSmartphone size={28} className="text-indigo-600" />,
  },
  {
    title: 'Elegant Animations',
    description: 'Smooth transitions and interactions with Framer Motion.',
    icon: <FiFeather size={28} className="text-indigo-600" />,
  },
];

const FeatureSection = ({ features = defaultFeatures }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    content: '',
    img: '',
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, img: reader.result }));
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error('❌ Only image files are supported');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const query = `
      mutation AddPost($title: String!, $subtitle: String, $content: String!, $img: String) {
        addPost(title: $title, subtitle: $subtitle, content: $content, img: $img) {
          id
        }
      }
    `;

    const variables = { ...form };

    try {
      const res = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
      });

      const json = await res.json();

      if (json.data?.addPost?.id) {
        toast.success('✅ Post published successfully!');
        setForm({ title: '', subtitle: '', content: '', img: '' });
        setPreview(null);
        setIsModalOpen(false);
      } else {
        toast.error('❌ Failed to publish post.');
        console.error(json.errors || json);
      }
    } catch (err) {
      toast.error('❌ Server error occurred!');
      console.error(err);
    }
  };

  return (
    <>
      <section className="py-20 px-4 bg-gradient-to-r from-blue-100 via-white to-purple-100">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold mb-10 text-gray-800"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Why You’ll Love This Blog
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-indigo-600">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full text-lg shadow-md transition duration-300"
              onClick={() => setIsModalOpen(true)}
            >
              Get Started
            </button>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-xl p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Create New Blog Post</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
              <input
                type="text"
                name="subtitle"
                value={form.subtitle}
                onChange={handleChange}
                placeholder="Subtitle"
                className="w-full border border-gray-300 p-2 rounded"
              />
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="Content"
                className="w-full border border-gray-300 p-2 rounded h-32"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded border"
                />
              )}
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
              >
                Publish
              </button>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default FeatureSection;
