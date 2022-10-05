import React, { useEffect } from 'react';
import Activate from '../components/activate';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const redirectIfRequired = async () => {
      const address = window.localStorage.getItem('ADDRESS');
      if (address) {
        await router.push(`/${address}/contributor`);
      }
    };
    redirectIfRequired();
  }, []);

  return (
    <>
      <h1 className={'mt-4'}>Activate Campaign</h1>
      <Activate />
    </>
  );
};

export default Home;
