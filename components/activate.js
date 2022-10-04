import { Button, Form } from 'react-bootstrap';
import React from 'react';

const Activate = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="deadline">
        <Form.Label>Deadline</Form.Label>
        <Form.Control type="text" placeholder="Deadline" />
        <Form.Text className="text-muted">
          Set the deadline of the campaign in days from today.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="goal">
        <Form.Label>Goal</Form.Label>
        <Form.Control type="text" placeholder="Goal" />
      </Form.Group>
      <Button className={'w-100'} variant="primary" type="submit">
        Activate
      </Button>
    </Form>
  );
};

export default Activate;
