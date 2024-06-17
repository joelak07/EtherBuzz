import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import Style from './Post.module.css';
import { EtherBuzzContext } from '../../Context/EtherBuzzContext';
import { ethers } from 'ethers';

const Post = ({ post }) => {
  const [dates, setDates] = useState(null);
  const { fetchUserName } = useContext(EtherBuzzContext);
  const [userName, setUserName] = useState("");
  const [showUserName, setShowUserName] = useState(true);

  useEffect(() => {
    const timestampInSeconds = ethers.BigNumber.from(post.timestamp).toNumber();
    const date = new Date(timestampInSeconds * 1000);
    setDates(date);
  }, [post]);

  useEffect(() => {
    const fetchUserNameAsync = async () => {
      try {
        const fetchedUserName = await fetchUserName(post.poster);
        setUserName(fetchedUserName || '');
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUserNameAsync();
  }, [fetchUserName, post]);

  const toggleUserName = () => {
    setShowUserName((prev) => !prev);
  };

  return (
    <div className={Style.postmain}>
      <div className={Style.posttitle}>
        <div className={Style.dattit}>
          <h2 className={Style.pt1}>{post.title}</h2>
          <p>{dates && dates.toLocaleString('en-US', { timeZone: 'IST', hour12: true })}</p>
        </div>

        <h3 className={Style.pt2} onClick={toggleUserName}>
          {showUserName ? userName || 'Anonymous' : post.poster}
        </h3>
      </div>
      <div className={Style.PostContent}>
        <p>{post.content}</p>
      </div>
      <div className={Style.votes}>
        <p className={Style.count}>{post.votes || 0}</p>
        <button className={Style.upvote}>
          <FontAwesomeIcon icon={faThumbsUp} /> Upvote
        </button>
        <button className={Style.downvote}>
          <FontAwesomeIcon icon={faThumbsDown} /> Downvote
        </button>
      </div>
    </div>
  );
};

export default Post;
