import { Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import React from 'react'

const ReviewForm = ({ handleSubmit, revText, lableText, defaultValue }) => {
  return (
    <Form>
      <FormGroup className='mb-3' controlId='exampleForm.ControlTextarea1'>
        <FormLabel>
          {lableText}
        </FormLabel>
        <FormControl ref={revText} as="textarea" rows={3} defaultValue={defaultValue}></FormControl>
      </FormGroup>
      <Button variant='outline-info' onClick={handleSubmit}>Submit</Button>
    </Form>
  )
}

export default ReviewForm