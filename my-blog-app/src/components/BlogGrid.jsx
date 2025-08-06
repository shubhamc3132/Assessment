
import { useEffect, useState } from 'react';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? new Date().toLocaleDateString() : date.toLocaleDateString();
};

function BlogGrid() {
  const [posts, setPosts] = useState([]);
  const [previewPost, setPreviewPost] = useState(null);
  const [editPost, setEditPost] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', subtitle: '', content: '', img: '' });

  const fetchPosts = () => {
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query {
            posts {
              id
              title
              subtitle
              content
              img
              datePosted
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((data) => setPosts(data.data.posts || []))
      .catch((error) => console.error('Error fetching posts:', error));
  };

  const handleDelete = (postId) => {
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation {
            deletePost(id: "${postId}") {
              id
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then(() => fetchPosts())
      .catch((error) => console.error('Error deleting post:', error));
  };

  const handlePreview = (post) => {
    setPreviewPost(post);
  };

  const handleEdit = (post) => {
    setEditPost(post);
    setEditForm({
      title: post.title,
      subtitle: post.subtitle,
      content: post.content,
      img: post.img,
    });
  };

  const submitEdit = () => {
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation {
            editPost(
              id: "${editPost.id}",
              title: "${editForm.title}",
              subtitle: "${editForm.subtitle}",
              content: "${editForm.content}",
              img: "${editForm.img}"
            ) {
              id
              title
              subtitle
              content
              img
              datePosted
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        fetchPosts();
        setEditPost(null);
      })
      .catch((error) => console.error('Error editing post:', error));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Blog Posts</h1>

      {/* Blog Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Subtitle</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t hover:bg-gray-50">
                <td className="py-2 px-4">{post.title}</td>
                <td className="py-2 px-4">{post.subtitle}</td>
                <td className="py-2 px-4">{formatDate(post.datePosted)}</td>
                <td className="py-2 px-4 text-center space-x-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => handlePreview(post)}
                  >
                    Preview
                  </button>
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    onClick={() => handleEdit(post)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">
                  No posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Preview Modal */}
      {previewPost && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
            <button onClick={() => setPreviewPost(null)} className="absolute top-2 right-2">✖</button>
            <h2 className="text-xl font-semibold mb-2">{previewPost.title}</h2>
            <h3 className="text-md text-gray-600 mb-2">{previewPost.subtitle}</h3>
            {previewPost.img && (
              <img src={previewPost.img} alt={previewPost.title} className="mb-4 rounded" />
            )}
            <p className="mb-4">{previewPost.content}</p>
            <p className="text-sm text-gray-500">Posted on: {formatDate(previewPost.datePosted)}</p>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editPost && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
            <button onClick={() => setEditPost(null)} className="absolute top-2 right-2">✖</button>
            <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
            <div className="space-y-4">
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                placeholder="Title"
              />
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={editForm.subtitle}
                onChange={(e) => setEditForm({ ...editForm, subtitle: e.target.value })}
                placeholder="Subtitle"
              />
              <textarea
                className="w-full border p-2 rounded"
                value={editForm.content}
                onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                placeholder="Content"
              />
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={editForm.img}
                onChange={(e) => setEditForm({ ...editForm, img: e.target.value })}
                placeholder="Image URL"
              />
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                onClick={submitEdit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogGrid;
