import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [organizationData, setOrganizationData] = useState({
    partner: 0,
    provider: 0,
  });
  const [salesData, setSalesData] = useState(0);
  const [ordersData, setOrdersData] = useState(0);

  useEffect(() => {
    let organizations = JSON.parse(localStorage.getItem("orgsList"));
    let sales = JSON.parse(localStorage.getItem("salesList"));
    let orders = JSON.parse(localStorage.getItem("ordersList"));

    let statOrgs = organizations.reduce((prevValue, currValue) => {
      if (currValue.status.value === "partner")
        return {
          partner: Number(prevValue.partner) + 1,
          provider: Number(prevValue.provider),
        };
      return {
        partner: Number(prevValue.partner),
        provider: Number(prevValue.provider) + 1,
      };
    }, organizationData);
    let statsSales = sales.reduce(
      (prevValue, currValue) => prevValue + Number(currValue.amount),
      salesData
    );
    let statsOrders = orders.reduce(
      (prevValue, currValue) => prevValue + Number(currValue.amount),
      ordersData
    );
    setOrganizationData(statOrgs);
    setSalesData(statsSales);
    setOrdersData(statsOrders);
  }, []);

  return (
    <section>
      <h2>CRM Dashboard</h2>
      <div className="dashboard__container">
        <div className="dashboard__basic--info">
          <table>
            <thead>
              <tr style={{ background: "#222", color: "#fff" }}>
                <th># of partners</th>
                <th># of providers</th>
                <th>Sales</th>
                <th>Orders</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{organizationData.partner}</td>
                <td>{organizationData.provider}</td>
                <td>
                  {salesData?.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </td>
                <td>
                  {ordersData?.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="dashboard__sales"></div>
        <div className="dashboard__orders"></div>
      </div>
    </section>
  );
};

export default Dashboard;
