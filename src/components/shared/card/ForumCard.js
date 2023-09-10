import React from 'react'
import { Card, Stack, Button } from '@manulife/mux';
import * as CDS from '@manulife/mux-cds-icons';

const ForumCard = ({currentuser, post}) =>{
  const { current_user_id } = currentuser
  const { id, user_id, message } = post;
  const cardStyle = { width: '100%', margin: '1em' };

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
            <Button  
              variant={Button.VARIANT.TERTIARY_BACK}
              icon={<CDS.Edit />}>
                Edit
            </Button>
            <Button variant={Button.VARIANT.TERTIARY_BACK}
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