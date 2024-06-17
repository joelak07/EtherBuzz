import React, { useState, useContext } from 'react';
import Style from './PostPage.module.css';
import { EtherBuzzContext } from '../../Context/EtherBuzzContext';

const PostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { fetchPosts, submitPost, account, CheckIfWalletConnected, name } = useContext(EtherBuzzContext);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handlePostClick = () => {
    if (title && content){
      submitPost(title, content);
      setTitle("");
      setContent("");
      //fetchPosts();
    }
    else{
      alert("Please fill in all fields to post"); 
    }
  };



  return (
    <div className={Style.mainpostpage}>
      <h3 className={Style.titpost}>
        Buzz right here, and no one can stop you because blockchain is immutable💪😎...
      </h3>
      <div className={Style.boxpostpage}>
        <input
          type="text"
          placeholder="Enter a title for your post.."
          className={Style.title}
          value={title}
          onChange={handleTitleChange}
        />
        <h3 className={Style.author}>{name ? name : "Connecting..."}</h3> {/* Conditional rendering */}
        <textarea
          name=""
          id=""
          className={Style.content}
          placeholder="Buzz...."
          rows={10}
          value={content}
          onChange={handleContentChange}
        />
        <button className={Style.postbutton} onClick={handlePostClick}>
          Post
        </button>
      </div>
    </div>
  );
};

export default PostPage;
