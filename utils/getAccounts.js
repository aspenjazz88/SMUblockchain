import web3 from '../eth/web3';

export const getAccounts = async () => {
  return await web3.eth.getAccounts();
};
