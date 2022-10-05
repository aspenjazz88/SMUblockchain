import React, { useEffect, useState } from 'react';
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const router = useRouter();

  const [contractAddress, setContractAddress] = useState('');
  const [page, setPage] = useState('');

  useEffect(() => {
    const path = router.pathname.split('/')[2];
    setPage(path);
    const address = window.localStorage.getItem('ADDRESS');
    if (address) {
      setContractAddress(address);
    } else {
      setContractAddress('');
    }
  }, [router.pathname]);

  return (
    <>
      <Navbar
        bg="secondary"
        variant="dark"
        className={'justify-content-center'}
      >
        <Nav
          activeKey={page}
          variant="pills"
          defaultActiveKey="/"
          onSelect={(selectedKey) =>
            router.push(`/${contractAddress}/${selectedKey}`)
          }
        >
          <Nav.Item>
            <Nav.Link href="/">New Campaign</Nav.Link>
          </Nav.Item>
          {contractAddress && (
            <>
              <Nav.Item>
                <Nav.Link eventKey="creator">Creator</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="contributor">Contributor</Nav.Link>
              </Nav.Item>
            </>
          )}
        </Nav>
      </Navbar>
      <Container className={'pt-8'}>
        <Row>
          <Col>{children}</Col>
        </Row>
      </Container>
    </>
  );
};

export default Layout;
