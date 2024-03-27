import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
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
      <h2>News Articles</h2>
      {articles.map((content) => (
        <div>
          <Link to=''>{content.title}</Link>
          {/* <p>{content.content}</p> */}
        </div>
      ))}
    </div>
  );
};

export default AllArticles;
