import { useState } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreatePost = () => {
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

    const variables = {
      title: form.title,
      subtitle: form.subtitle,
      content: form.content,
      img: form.img,
    };

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
    <motion.section
      id="create"
      className="bg-gradient-to-r from-blue-100 via-white to-purple-100 py-12 px-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <ToastContainer position="top-center" autoClose={3000} />

      <motion.div
        className="max-w-2xl mx-auto text-center mb-10"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Create a New Post</h2>
        <p className="text-gray-500">Share your thoughts and visuals with the community</p>
      </motion.div>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto grid gap-6 bg-white p-6 rounded-2xl shadow-xl"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="text"
          name="subtitle"
          placeholder="Subtitle"
          value={form.subtitle}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <textarea
          name="content"
          placeholder="Write your post content here..."
          rows="5"
          value={form.content}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <div className="flex flex-col gap-2">
          <label className="text-gray-600 font-medium">Upload Image (optional):</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="rounded-xl h-40 object-cover mt-2 border border-gray-300"
            />
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
          type="submit"
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow hover:bg-indigo-700 transition"
        >
          🚀 Publish Post
        </motion.button>
      </form>
    </motion.section>
  );
};

export default CreatePost;
