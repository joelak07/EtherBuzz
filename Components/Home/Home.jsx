import React from 'react'
import Style from './Home.module.css'
import Post from '../Post/Post'
import { useContext, useState, useEffect } from 'react'
import { EtherBuzzContext } from '../../Context/EtherBuzzContext'

const Home = () => {

  const { CheckIfWalletConnected } = useContext(EtherBuzzContext)
  const [news, setNews] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    console.log('API Key:', apiKey);  // Debug log
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    const req = new Request(url);



    fetch(req)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setNews(data);
        console.log(data.articles);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []); 
  
  const random = Math.floor(Math.random() * 20);
  const firstArticle = news && news.articles[random];
  console.log('News:', firstArticle);  // Debug log

  return (
    <div className={Style.homemain}>
      <h2 className={Style.hometitle}>Whats buzzing🐝...</h2>
      <div className={Style.homebox}>
        <div className={Style.posts}>
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
        <div className={Style.News}>
          <h2 className={Style.newsbut}>Butterflies🦋</h2>
          <div className={Style.newslist}>
          {firstArticle && (
            <div className={Style.newsItem}>
              <h3 className={Style.newsTitle}>{firstArticle.title}</h3>
              <p className={Style.newsDescription}>{firstArticle.description}</p>
              <img src={firstArticle.urlToImage} alt={firstArticle.title} className={Style.newsImage} />
              <a href={firstArticle.url} target="_blank" rel="noopener noreferrer" className={Style.newsLink}>
                Read more
              </a>
            </div>
          )}
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Home