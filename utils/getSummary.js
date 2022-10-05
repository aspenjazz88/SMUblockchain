import Kickstart from '../eth/kickstart';

const getDifferenceInDays = (date1, date2) => {
  const diffInMs = Math.abs(date2 - date1);
  return Math.round(diffInMs / (1000 * 60 * 60 * 24));
};

export const getSummary = async (context) => {
  const kickstart = Kickstart(context.query.address);
  const {
    0: goal,
    1: balance,
    2: pledgersCount,
    3: deadline,
  } = await kickstart.methods.getSummary().call();
  const now = new Date();
  const deadlineDate = new Date(deadline * 1000);
  const daysLeft = getDifferenceInDays(now, deadlineDate);

  return {
    goal,
    balance,
    pledgersCount,
    daysLeft,
    address: context.query.address,
  };
};
