import React from 'react';
import Summary from '../components/summary';
import { Button, Col, Container, Row } from 'react-bootstrap';

export default () => {
  return (
    <>
      <h1 className={'mt-4'}>Creator</h1>
      <Summary />
      <Container>
        <Row className={'mt-4'}>
          <Col>
            <Button className={'w-100'} variant="primary">
              Claim
            </Button>
          </Col>
          <Col>
            <Button className={'w-100'} variant="danger">
              Reset
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
