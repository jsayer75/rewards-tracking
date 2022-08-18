const currentDate = (date) => {
  let formatted = new Date(date);

  return formatted;
};

const lastThreeMonths = () => {
  let limitDate = todayDate();
  limitDate = limitDate.setMonth(limitDate.getMonth() - 3);
  return new Date(limitDate);
};

const todayDate = () => {
  let date = new Date();
  return date;
};

export const checkDateLimit = (date) => {
  const today = todayDate();
  const transactionDate = currentDate(date);
  const threeMonthAgo = lastThreeMonths(date);

  if (today > transactionDate && transactionDate > threeMonthAgo) {
    return true;
  } else {
    return false;
  }
};

const totalPoints = (amount) => {
  if (amount >= 50 && amount < 100) {
    return amount - 50;
  } else if (amount > 100) {
    return 2 * (amount - 100) + 50;
  }
  return 0;
};

const getMonthsBackPoints = (data, month) => {
  const today = todayDate();
  let limitDate = todayDate();
  limitDate = limitDate.setMonth(limitDate.getMonth() - month);
  limitDate = new Date(limitDate);
  const thisMonth = [];
  let total = 0;

  data.filter(
    (item) =>
      today > currentDate(item?.date) &&
      currentDate(item?.date) > limitDate &&
      thisMonth.push(item)
  );

  thisMonth.map((item) => (total = total + totalPoints(item.amount)));

  return total;
};

export const calculatePoints = (data) => {
  let total = 0;
  let oneMonthBackPoints = getMonthsBackPoints(data, 1);
  let twoMonthBackPoints = getMonthsBackPoints(data, 2) - oneMonthBackPoints;
  let threeMonthBackPoints =
    getMonthsBackPoints(data, 3) - twoMonthBackPoints - oneMonthBackPoints;

  data.forEach((trans) => {
    const currentTransPoints = totalPoints(trans.amount);
    total = total + currentTransPoints;
  });

  const points = {
    total,
    oneMonthBackPoints,
    twoMonthBackPoints,
    threeMonthBackPoints,
  };

  return points;
};
