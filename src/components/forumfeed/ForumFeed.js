import ForumCard from "../shared/card/ForumCard";
import { gql, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { Card, Stack, Button } from '@manulife/mux';
import * as CDS from '@manulife/mux-cds-icons';
import {useNavigate, redirect} from 'react-router-dom'

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
    let a = post !== undefined ? data.posts.filter(posty => posty.id !== post.id) : undefined;    
    console.log(post !== undefined ? post.id : 0);
    setPost(a);
  
  }

  const handleOnEdit = (post) => {
    //const navigate = useNavigate();
    window.location.href="/editPost";
    //redirect("/addPost");
  
  }

  console.log(currentPost !== undefined ? currentPost : 0);
  // const navigate = useNavigate();

  return (
    <>
    <Button variant={Button.VARIANT.TERTIARY_BACK}
      icon={<CDS.ButtonPlusOutlined />}
      onClick={()=>window.location.href="/addPost"}
      >
        Add Post
    </Button>

    { !loading && data &&
      currentPost === undefined ? data.posts.map(post => {
        return (<ForumCard onDelete={handleOnDelete} onEdit={handleOnEdit} key={post.id} post={post} currentuser={currentuser}></ForumCard>);
      }) :
      currentPost.map(post => {
        return (<ForumCard onDelete={handleOnDelete} onEdit={handleOnEdit} key={post.id} post={post} currentuser={currentuser}></ForumCard>);
      })
    }
    
    </>
  )
}

export default ForumFeed;