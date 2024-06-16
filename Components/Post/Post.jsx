import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import Style from './Post.module.css';

const Post = () => {
  return (
    <div className={Style.postmain}>
      <div className={Style.posttitle}>
        <h2 className={Style.pt1}>Post Title</h2>
        <h3 className={Style.pt2}>Joel Abraham Koshy</h3>
      </div>
      <div className={Style.PostContent}>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium natus quod distinctio error dolor, illo provident vel ea repellat magnam tempore ratione molestiae nostrum totam facere earum. Optio deserunt illum odit vitae ratione eos nobis excepturi perspiciatis expedita laborum omnis quasi rem voluptate ipsa asperiores, repellendus, in fugiat earum aut distinctio quisquam. Labore eum officiis amet ipsam temporibus, expedita soluta sit optio reiciendis omnis mollitia voluptas quod eveniet iure animi aut perferendis voluptatibus quidem id error neque vel obcaecati! Minus saepe aperiam rerum error ut ea sint, quidem sequi beatae iusto esse reiciendis! Eos, quo nostrum pariatur velit commodi suscipit!</p>
      </div><div className={Style.votes}>
        <p className={Style.count}>140</p>
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
