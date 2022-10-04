import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

const Summary = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>7</Card.Title>
              <Card.Text>Days Left</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>80</Card.Title>
              <Card.Text>% Goal Reached</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>10 wei</Card.Title>
              <Card.Text>Amount Raised</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Summary;
