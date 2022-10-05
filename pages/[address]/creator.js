import React, { useEffect, useState } from 'react';
import Summary from '../../components/summary';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { getSummary } from '../../utils/getSummary';
import { getAccounts } from '../../utils/getAccounts';
import Kickstart from '../../eth/kickstart';
import { useRouter } from 'next/router';

const Creator = (summary) => {
  const router = useRouter();
  const [kickstart, setKickstart] = useState('');
  const [state, setState] = useState({
    account: '',
    days: '',
    loading: false,
  });

  const handleReset = async () => {
    console.log('resetting account...');
    window.localStorage.removeItem('ADDRESS');
    await kickstart.methods.reset().send({
      from: state.account,
    });
    await router.replace('/');
  };

  const handleAlterDeadline = async () => {
    const days =
      state.days.substring(0, 1) === '-'
        ? [state.days.substring(1), false]
        : [state.days, true];
    await kickstart.methods.alterDeadline(...days).send({
      from: state.account,
    });
    await router.reload();
  };

  const handleClaim = async () => {
    await kickstart.methods.claimFunds().send({
      from: state.account,
    });
    await router.reload();
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
        <h1 className={'mt-4'}>Creator</h1>
      </Summary>
      <Container>
        <Row className={'mt-4'}>
          <Col>
            <Button
              className={'w-100'}
              variant="primary"
              disabled={summary.daysLeft > 0}
              onClick={handleClaim}
            >
              Claim
            </Button>
            <InputGroup className="mt-4">
              <Form.Control
                type="number"
                placeholder="Days"
                onChange={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    days: e.target.value,
                  }))
                }
              />
              <InputGroup.Text>days</InputGroup.Text>
            </InputGroup>
            <Button
              className={'w-100'}
              variant="primary"
              onClick={handleAlterDeadline}
            >
              Alter Deadline (for testing only)
            </Button>
          </Col>
          <Col>
            <Button className={'w-100'} variant="danger" onClick={handleReset}>
              Reset
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

Creator.getInitialProps = getSummary;

export default Creator;
