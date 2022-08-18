import { useState, useEffect } from "react";

import fetchUsersData from "./fetchUserData";
import { checkDateLimit, calculatePoints } from "./helpers";

import "./App.css";

function App() {
  const [state, setState] = useState([]);

  const setPoints = (arr) => {
    const filteredData = [];

    arr.forEach((user) => {
      const { id, name, transactions } = user;
      let filteredTransactions = [];

      const newTransactions = transactions.filter(
        (item) => checkDateLimit(item?.date) && filteredTransactions.push(item)
      );

      const pointEarned = calculatePoints(newTransactions);

      let newData = {
        id,
        name,
        transactions: newTransactions,
        pointEarned,
      };

      filteredData.push(newData);
    });

    return filteredData;
  };

  const getInitialData = async () => {
    try {
      let userData = await fetchUsersData();

      if (userData) {
        const updatedData = setPoints(userData);

        setState(() => updatedData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getInitialData();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <h1 className="main-heading">Reward Points Table</h1>
      <section className="table-layout">
        <h3>Id</h3>
        <h3>Name</h3>
        <h3>3 Months Back</h3>
        <h3>2 Months Back</h3>
        <h3>1 Month Back</h3>
        <h3>3 Months Total</h3>
      </section>

      {state?.map((user) => {
        const { id, name, pointEarned } = user;

        return (
          <section key={`$column-${id}`} className="table-layout">
            <p>{id}</p>
            <p>{name}</p>
            <p>{pointEarned?.oneMonthBackPoints}</p>
            <p>{pointEarned?.twoMonthBackPoints}</p>
            <p>{pointEarned?.threeMonthBackPoints}</p>
            <p>{pointEarned?.total}</p>
          </section>
        );
      })}
    </div>
  );
}

export default App;
