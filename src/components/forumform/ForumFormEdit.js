import { gql, useMutation } from '@apollo/client';
import { TextArea, Tooltip, Button, Label, Checkbox } from '@manulife/mux';
import * as CDS from '@manulife/mux-cds-icons';
import { useState, useEffect } from "react";

const ForumFormEdit = () => {
  
  const [stateMessage, setStateMessage] = useState({});
  const [stateAnonPost, setStateAnonPost] = useState(true);
  const [statePostCategory, setStatePostCategory] = useState("Personal");

  const CREATE_POST = gql`
  mutation Mutation($input: CreatePostRequest!) {
    createPost(input: $input) {
      user_post {
        id
        user_id
        message
        category
        media
        isAnon
      }
    }
  }
  `;

  const [onSubmitPostHandler, { data, loading, error }] = useMutation(CREATE_POST)

  if (loading) return (<p>Loading...</p>);
  if (error) return (<p>Error: {error.message}</p>);
  
  const onChangeHandler_message = (event) => {
    console.log(event);
    
    setStateMessage(event)
  }
  const onChangeHandler_isAnon = (event) => {
    console.log(event);
    
    setStateAnonPost(!stateAnonPost);
  }

  const onClickHandler_post = () => {
    const input =  { 
      message: stateMessage,
      isAnon: stateAnonPost,
      user_id: 1,
      category: statePostCategory,
      media: "sample",
     } 
    onSubmitPostHandler({variables: {input}})
  
    
    console.log(input);
  }

  return (
    <>
      <TextArea
        label="Post Message"
        maxLength={100}
        onChange={onChangeHandler_message}
        tooltip={<Tooltip content="Enter your message..." />}
      />
      <Label>
        <Checkbox onChange={onChangeHandler_isAnon} defaultChecked />
        Post anonymously
      </Label>
      <button onClick={onClickHandler_post}>POST</button>
    </>
  )
}

export default ForumFormEdit;