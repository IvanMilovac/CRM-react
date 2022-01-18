import React, { useState, useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";
const Dashboard = () => {
  const [organizationData, setOrganizationData] = useState({
    partner: 0,
    provider: 0,
  });
  const [salesData, setSalesData] = useState(0);
  const [ordersData, setOrdersData] = useState(0);

  const orgsReducer = (prevValue, currValue) => {
    if (currValue.status.value === "partner")
      return {
        partner: Number(prevValue.partner) + 1,
        provider: Number(prevValue.provider),
      };
    return {
      partner: Number(prevValue.partner),
      provider: Number(prevValue.provider) + 1,
    };
  };

  const salesReducer = (prevValue, currValue) =>
    prevValue + Number(currValue.amount);

  const ordersReducer = (prevValue, currValue) =>
    prevValue + Number(currValue.amount);

  useEffect(() => {
    let organizations = JSON.parse(localStorage.getItem("orgsList"));
    let sales = JSON.parse(localStorage.getItem("salesList"));
    let orders = JSON.parse(localStorage.getItem("ordersList"));

    let statOrgs = organizations.reduce(orgsReducer, organizationData);
    let statsSales = sales.reduce(salesReducer, salesData);
    let statsOrders = orders.reduce(ordersReducer, ordersData);

    setOrganizationData(statOrgs);
    setSalesData(statsSales);
    setOrdersData(statsOrders);
  }, []);

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplaterows: "1fr 1fr",
    gridTemplateAreas: '"basic basic" "sales orders"',
    gap: "10%",
    width: "100%",
    height: "100%",
  };

  return (
    <section style={{ maxHeight: "100vh", overflowY: "hidden" }}>
      <h2>CRM Dashboard</h2>
      <div className="dashboard__container" style={gridStyle}>
        <div className="dashboard__basic--info" style={{ gridArea: "basic" }}>
          <table>
            <thead style={{ width: "100%" }}>
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
        <div
          className="dashboard__sales"
          style={{
            display: "flex",
            gap: "1rem",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gridArea: "sales",
          }}
        >
          <h3 style={{ width: "max-content" }}>Sales results:</h3>
          <PieChart
            style={{ height: "max-content" }}
            data={[
              { title: "One", value: 10, color: "#E38627" },
              { title: "Two", value: 15, color: "#C13C37" },
              { title: "Three", value: 20, color: "#6A2135" },
            ]}
          />
        </div>
        <div
          className="dashboard__orders"
          style={{
            display: "flex",
            gap: "1rem",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gridArea: "orders",
          }}
        >
          <h3 style={{ width: "max-content" }}>Orders results:</h3>
          <PieChart
            style={{ height: "max-content" }}
            data={[
              { title: "One", value: 10, color: "#E38627" },
              { title: "Two", value: 15, color: "#C13C37" },
              { title: "Three", value: 20, color: "#6A2135" },
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
