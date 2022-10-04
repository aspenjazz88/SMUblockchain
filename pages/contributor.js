import React from 'react';
import Summary from '../components/summary';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';

export default () => {
  return (
    <>
      <h1 className={'mt-4'}>Contributor</h1>
      <Summary />
      <Container>
        <Row className={'mt-4'}>
          <Col>
            <InputGroup className="mb-3">
              <Form.Control placeholder="Amount of wei to pledge" />
              <InputGroup.Text id="basic-addon2">wei</InputGroup.Text>
            </InputGroup>
          </Col>
          <Col>
            <Button className={'w-100'} variant="primary">
              Refund
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
