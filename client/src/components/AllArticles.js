import React, { useState, useEffect } from 'react';

const AllArticles = () => {
  const [hashes, setHashes] = useState([]);
  const [articles, setArticles] = useState([]);

  async function fetchHashes() {
    try {
      const response = await fetch('http://localhost:5000');
      if (!response.ok) {
        throw new Error(`Error fetching articles: ${response}`);
      }
      const data = await response.json();
      setHashes(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  }

  async function fetchArticleContent(hash) {
    try {
      const response = await fetch(`https://gateway.pinata.cloud/ipfs/${hash}`);
      if (!response.ok) {
        throw new Error(`Error fetching article content: ${response}`);
      }
      const content = await response.json();
      console.log(content)
      const fullContent = content.content;

      setArticles((prevArticles) => [
        ...prevArticles,
        { title: content.title, content: fullContent },
      ]);
    } catch (error) {
      console.error(`Error fetching article content for hash ${hash}:`, error);
    }
  }

  useEffect(() => {
    fetchHashes();
  }, []);

  useEffect(() => {
    // Fetch content for each hash
    hashes.forEach((hash) => fetchArticleContent(hash));
  }, [hashes]);

  return (
    <div>
    <div className="articles-heading-container">
      <h2 className='articles-heading'>News Articles</h2>
    </div>
      {articles.map((content) => (
        <div className='short-article-holder'>
          <h3>{content.title}</h3>
          <p>{content.content}</p>
        </div>
      ))}
    </div>
  );
};

export default AllArticles;
