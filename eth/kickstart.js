import web3 from './web3';
import abi from './abi.json';

const kickstart = () => {
  try {
    return new web3.eth.Contract(abi, process.env.ADDRESS);
  } catch (err) {
    throw new Error(`Provide the deployed contract address first. ${err}`);
  }
};

export default kickstart;
