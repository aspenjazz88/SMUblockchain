import React from 'react';
import { Card, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import web3 from '../eth/web3';

const Summary = ({ children, summary }) => {
  const balance = web3.utils.fromWei(summary.balance);
  const goal = web3.utils.fromWei(summary.goal);

  return summary ? (
    <Container>
      {children}
      <Row>
        <Col>
          <Card style={{ height: '100px' }}>
            <Card.Body>
              <Card.Title>{summary.daysLeft}</Card.Title>
              <Card.Text>Days Left</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ height: '100px' }}>
            <Card.Body>
              <Card.Title>{`${goal} ether`}</Card.Title>
              <Card.Text>
                {Math.round((balance / goal) * 100) || '0'}% of Goal
              </Card.Text>
            </Card.Body>
            <ProgressBar animated now={(balance / goal) * 100} />
          </Card>
        </Col>
        <Col>
          <Card style={{ height: '100px' }}>
            <Card.Body>
              <Card.Title>
                {web3.utils.fromWei(summary.balance, 'ether')} ether
              </Card.Title>
              <Card.Text>Amount Raised</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ height: '100px' }}>
            <Card.Body>
              <Card.Title>{summary.pledgersCount}</Card.Title>
              <Card.Text>Pledgers</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : (
    <Container>Loading...</Container>
  );
};

export default Summary;
