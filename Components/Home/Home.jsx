import React, { useContext, useState, useEffect } from 'react';
import Style from './Home.module.css';
import Post from '../Post/Post';
import { EtherBuzzContext } from '../../Context/EtherBuzzContext';

const Home = () => {
  const { fetchPosts, CheckIfWalletConnected } = useContext(EtherBuzzContext);
  const [news, setNews] = useState(null);
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostsAsync = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        const postsWithDates = fetchedPosts.map(post => ({
          ...post,
          date: new Date(post.timestamp.toNumber() * 1000)
        }));
        const sortedPosts = postsWithDates.sort((a, b) => b.date - a.date);
        setPosts(sortedPosts || []);
        console.log(sortedPosts);
      } catch (error) {
        console.error('Error fetching and sorting posts:', error);
      }
    };
    

    fetchPostsAsync();
  }, [fetchPosts]);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    console.log('API Key:', apiKey); // Debug log
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setNews(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const random = Math.floor(Math.random() * 20);
  const firstArticle = news && news.articles[random];

  return (
    <div className={Style.homemain}>
      <h2 className={Style.hometitle}>What's buzzing🐝...</h2>
      <div className={Style.homebox}>
        <div className={Style.posts}>
          {posts?.length > 0 ? (
            posts.map((post) => (
              <Post key={post.postid} post={post} />
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
        <div className={Style.News}>
          <h2 className={Style.newsbut}>Butterflies🦋</h2>
          <div className={Style.newslist}>
            {firstArticle ? (
              <div className={Style.newsItem}>
                <h3 className={Style.newsTitle}>{firstArticle.title}</h3>
                <p className={Style.newsDescription}>{firstArticle.description}</p>
                <img src={firstArticle.urlToImage} alt={firstArticle.title} className={Style.newsImage} />
                <a href={firstArticle.url} target="_blank" rel="noopener noreferrer" className={Style.newsLink}>
                  Read more
                </a>
              </div>
            ) : (
              <p>No news available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
