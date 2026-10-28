import React, { useState } from 'react';
import postsData from './posts.json';
import './App.css';

export default function BlogApp() {
  const [posts] = useState(postsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(posts.map((post) => post.category))];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="blog-container">
      <header className="blog-header">
        <h1>Developer Insights Blog</h1>
        <p>Curated articles on modern frontend and backend development</p>
      </header>

      <div className="filter-controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search articles by title or keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <main className="posts-grid">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <article key={post.id} className="post-card">
              <span className="post-category">{post.category}</span>
              <h2 className="post-title">{post.title}</h2>
              <time className="post-date">{post.date}</time>
              <p className="post-excerpt">{post.excerpt}</p>
              <button
                type="button"
                className="read-more-btn"
                onClick={() => alert(`Opening: ${post.title}`)}
              >
                Read Article &rarr;
              </button>
            </article>
          ))
        ) : (
          <div className="no-results">
            <p>No blog posts found matching your search.</p>
          </div>
        )}
      </main>
    </div>
  );
}
