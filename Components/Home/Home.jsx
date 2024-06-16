import React from 'react'
import Style from './Home.module.css'
import Post from '../Post/Post'
import { useContext } from 'react'
import { EtherBuzzContext } from '../../Context/EtherBuzzContext'

const Home = () => {
  
  const { CheckIfWalletConnected } = useContext(EtherBuzzContext)

  return (
    <div className={Style.homemain}>
      <h2 className={Style.hometitle}>Whats buzzin🐝...</h2>
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
          <p className={Style.newsart}>Here you will find the latest news about the crypto world</p>
        </div>
      </div>
    </div>
  )
}

export default Home