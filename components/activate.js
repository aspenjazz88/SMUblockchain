import { Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { deploy } from '../eth/deploy';
import { useRouter } from 'next/router';
import web3 from '../eth/web3';

const Activate = () => {
  const router = useRouter();
  const [state, setState] = useState({
    deadline: '',
    goal: '',
    loading: false,
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    setState((prevState) => ({ ...prevState, loading: true }));

    const address = await deploy(
      state.deadline.toString(),
      state.goal.toString()
    );
    if (!address) {
      console.log('address is undefined');
      router.reload();
      return;
    }
    window.localStorage.setItem('ADDRESS', address);
    setState((prevState) => ({ ...prevState, loading: false }));
    await router.push(`/${address}/contributor`);
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <Form.Group className="mb-3" controlId="deadline">
        <Form.Label>Deadline</Form.Label>
        <Form.Control
          type="number"
          placeholder="Deadline"
          onChange={(e) =>
            setState((prevState) => ({
              ...prevState,
              deadline: Math.abs(e.target.value),
            }))
          }
        />
        <Form.Text className="text-muted">
          Set the deadline of the campaign in days from today.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="goal">
        <Form.Label>Goal</Form.Label>
        <Form.Control
          type="number"
          placeholder="Amount to raise (ether)"
          onChange={(e) =>
            setState((prevState) => ({
              ...prevState,
              goal: Math.abs(web3.utils.toWei(e.target.value)),
            }))
          }
        />
      </Form.Group>
      <Button
        className={'w-100'}
        variant="primary"
        type="submit"
        disabled={!state.goal || !state.deadline || state.loading}
      >
        Activate
      </Button>
    </Form>
  );
};

export default Activate;
