import HDWalletProvider from '@truffle/hdwallet-provider';
import Web3 from 'web3';
import abi from '../eth/abi.json';
import bytecode from '../eth/bytecode.json';

export const deploy = async (deadline, goal) => {
  const provider = new HDWalletProvider(
    process.env.NEXT_PUBLIC_SECRET,
    process.env.NEXT_PUBLIC_NODE
  );
  const web3 = new Web3(provider);
  try {
    const accounts = await web3.eth.getAccounts();
    console.log('attempting to deploy from account:', accounts[0]);

    const result = await new web3.eth.Contract(abi)
      .deploy({ data: bytecode.object, arguments: [deadline, goal] })
      .send({ from: accounts[0], gas: '6721975' });
    return result.options.address;
  } catch (e) {
    console.log('error occurred', e);
  }
  provider.engine.stop();
};
