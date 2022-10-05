import React, { useEffect, useState } from 'react';
import Summary from '../../components/summary';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { getSummary } from '../../utils/getSummary';
import Kickstart from '../../eth/kickstart';
import { useRouter } from 'next/router';
import { getAccounts } from '../../utils/getAccounts';
import web3 from '../../eth/web3';

const Contributor = (summary) => {
  const router = useRouter();
  const [kickstart, setKickstart] = useState('');
  const [state, setState] = useState({
    account: '',
    pledge: '',
    loading: false,
  });

  const handlePledge = async () => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      await kickstart.methods
        .pledge(web3.utils.toWei(state.pledge, 'ether'))
        .send({
          from: state.account,
          value: web3.utils.toWei(state.pledge, 'ether'),
        });
      await router.reload();
    } catch (e) {
      console.log('e', e);
    }
    setState((prevState) => ({ ...prevState, loading: false }));
  };

  const handleRefund = async () => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    try {
      await kickstart.methods.getRefund().send({
        from: state.account,
      });
      await router.reload();
    } catch (e) {
      console.log('e', e);
    }
    setState((prevState) => ({ ...prevState, loading: false }));
  };

  useEffect(() => {
    setKickstart(Kickstart(window.localStorage.getItem('ADDRESS')));
    (async () => {
      const [account] = await getAccounts();
      setState((prevState) => ({ ...prevState, account }));
    })();
  }, []);

  return (
    <>
      <Summary summary={summary}>
        <h1 className={'mt-4'}>Contributor</h1>
      </Summary>
      <Container>
        <Row className={'mt-4'}>
          <Col>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Amount of ether to pledge"
                disabled={summary.daysLeft < 0}
                onChange={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    pledge: e.target.value,
                  }))
                }
              />
              <InputGroup.Text>ether</InputGroup.Text>
            </InputGroup>
          </Col>
          <Col>
            <Button
              className={'w-100'}
              variant="primary"
              disabled={!state.pledge || summary.daysLeft < 0}
              onClick={handlePledge}
            >
              Pledge
            </Button>
          </Col>
          <Col>
            <Button
              className={'w-100'}
              variant="info"
              disabled={summary.daysLeft > 0}
              onClick={handleRefund}
            >
              Refund
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

Contributor.getInitialProps = getSummary;

export default Contributor;
