import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  window.ethereum.request({ method: 'eth_requestAccounts' });
  web3 = new Web3(window.ethereum);
} else {
  const provider = new Web3(
    process.env.NEXT_PUBLIC_NODE || 'http://localhost:8545'
  );
  web3 = new Web3(provider);
}

export default web3;
