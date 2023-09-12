import ForumCard from "../shared/card/ForumCard";
import { gql, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      message
      user_id
      comments {
        id
        message
        post_id
      }
      votes {
        id
        downvotes
        upvotes
      }
    }
  }
`;

const ForumFeed = ({post}) => {
  //gql
  const { loading, error, data } = useQuery(GET_POSTS);
  const currentuser= {current_user_id: 1}; //get this from login

  const [currentPost, setPost] = useState(post);

  if(loading) return (<p>Loading...</p>);
  if(error) return (<p>Error: {error.message}</p>);

  const handleOnDelete = (post) => {
    let a = post !== undefined ? data.posts.filter(posty => posty.id != post.id) : undefined;    
    console.log(post !== undefined ? post.id : 0);
    setPost(a);
  
  }

  console.log(currentPost !== undefined ? currentPost : 0);

  return (
    <>
    { !loading && data &&
      currentPost === undefined ? data.posts.map(post => {
        return (<ForumCard onDelete={handleOnDelete} key={post.id} post={post} currentuser={currentuser}></ForumCard>);
      }) :
      currentPost.map(post => {
        return (<ForumCard onDelete={handleOnDelete} key={post.id} post={post} currentuser={currentuser}></ForumCard>);
      })
    }
    
    </>
  )
}

export default ForumFeed;