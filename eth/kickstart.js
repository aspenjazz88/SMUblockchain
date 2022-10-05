import web3 from '../eth/web3';
import abi from '../eth/abi.json';

const kickstart = (address) => {
  return new web3.eth.Contract(abi, address);
};

export default kickstart;
