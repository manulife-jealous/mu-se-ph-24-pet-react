import React from 'react'
import { Card, Stack, Button } from '@manulife/mux';
import * as CDS from '@manulife/mux-cds-icons';
import {useState} from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_POST = gql`
  query Post($postId: ID) {
  post(id: $postId) {
    comments {
      id
      message
      post_id
    }
    id
    message
    user_id
    votes {
      downvotes
      id
      post_id
      upvotes
    }
  }
}
`;

const ForumCard = ({currentuser, post, onDelete, onEdit}) =>{
  const { loading, error, data } = useQuery(GET_POST,
    {variables: {postId: 1}, });
  const { current_user_id } = currentuser
  const { id, user_id, message } = post;
  const cardStyle = { width: '100%', margin: '1em' };

  const API_URL = 'http://localhost:3001';

  const [deletePost, setDeletePost] = useState();
  const [editPost, setEditPost] = useState();
  const handleOnDelete = () => {      
      setDeletePost(post);
      onDelete(deletePost);      
  }

  const handleOnEdit = () => {      
    setEditPost(post);
    onEdit(editPost);
  }
  
  return (
    <Stack direction="row" justify="center">
      <Card customStyle={{ cardStyle }}>
        <Card.Image src="http://placekitten.com/360/200" alt="Cute Cat" />

        <Card.Header fontSize={Card.FONT_SIZE.SMALL}>Post {id}</Card.Header>

        <Card.Content>
          {message}
        </Card.Content>
        
        <Card.Action>
          <Button  
            variant={Button.VARIANT.TERTIARY_BACK}
            icon={<CDS.Eye1 />}>
              View
          </Button>
          
          { current_user_id == user_id && 
          (
          <>
            <Button onClick={() => handleOnEdit()}   
              variant={Button.VARIANT.TERTIARY_BACK}
              icon={<CDS.Edit />}>
                Edit
            </Button>
            <Button onClick={() => handleOnDelete()} variant={Button.VARIANT.TERTIARY_BACK}
              icon={<CDS.Delete />}>
                Delete
            </Button>
          </>)}
        </Card.Action> 

      </Card>
    </Stack>
  );
}

export default ForumCard