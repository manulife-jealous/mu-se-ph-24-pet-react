import ForumCard from "../shared/card/ForumCard";
import { gql, useQuery } from '@apollo/client';

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

const ForumFeed = () => {
  //gql
  const { loading, error, data } = useQuery(GET_POSTS);
  const currentuser= {current_user_id: 1}; //get this from login

  if(loading) return (<p>Loading...</p>);
  if(error) return (<p>Error: {error.message}</p>);
  return (
    <>
    { !loading && data &&
      data.posts.map(post => {
        return (<ForumCard key={post.id} post={post} currentuser={currentuser}></ForumCard>)
      })
    }
    
    </>
  )
}

export default ForumFeed;