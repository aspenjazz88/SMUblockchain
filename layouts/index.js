import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Layout = ({ children }) => {
  return (
    <Container>
      <Row>
        <Col>{children}</Col>
      </Row>
    </Container>
  );
};

export default Layout;
