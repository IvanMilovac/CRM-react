import React, { useState, useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";

import "./Dashboard.scss";

const Dashboard = () => {
  const [organizationData, setOrganizationData] = useState({
    partner: 0,
    provider: 0,
  });
  const [salesData, setSalesData] = useState({
    delivery: 0,
    completed: 0,
    total: 0,
  });
  const [ordersData, setOrdersData] = useState({
    infoquote: 0,
    nagotiation: 0,
    bid: 0,
    total: 0,
  });

  const [noData, setNoData] = useState(false);

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

  const salesReducer = (prevValue, currValue) => {
    if (currValue?.status?.value === "delivery")
      return {
        delivery: prevValue?.delivery + Number(currValue?.amount),
        completed: prevValue?.completed,
        total: prevValue?.total + Number(currValue?.amount),
      };

    return {
      delivery: prevValue?.delivery,
      completed: prevValue?.completed + Number(currValue?.amount),
      total: prevValue?.total + Number(currValue?.amount),
    };
  };

  const ordersReducer = (prevValue, currValue) => {
    if (currValue?.status?.value === "infoquote")
      return {
        infoquote: prevValue?.infoquote + Number(currValue?.amount),
        nagotiation: prevValue?.nagotiation,
        bid: prevValue?.bid,
        total: prevValue?.total + Number(currValue?.amount),
      };
    else if (currValue?.status?.value === "nagotiation")
      return {
        infoquote: prevValue?.infoquote,
        nagotiation: prevValue?.nagotiation + Number(currValue?.amount),
        bid: prevValue?.bid,
        total: prevValue?.total + Number(currValue?.amount),
      };
    return {
      infoquote: prevValue?.infoquote,
      nagotiation: prevValue?.nagotiation,
      bid: prevValue?.bid + Number(currValue?.amount),
      total: prevValue?.total + Number(currValue?.amount),
    };
  };

  useEffect(() => {
    let organizations = JSON.parse(localStorage.getItem("orgsList")) || [];
    let sales = JSON.parse(localStorage.getItem("salesList")) || [];
    let orders = JSON.parse(localStorage.getItem("ordersList")) || [];

    setNoData({ noSalesData: !sales.length, noOrdersData: !orders.length });

    let statOrgs = organizations.reduce(orgsReducer, organizationData);
    let statsSales = sales.reduce(salesReducer, salesData);
    let statsOrders = orders.reduce(ordersReducer, ordersData);

    setOrganizationData(statOrgs);
    setSalesData(statsSales);
    setOrdersData(statsOrders);
  }, []);

  return (
    <section className="dashboard__section">
      <h2>CRM Dashboard</h2>
      <div className="dashboard__container">
        <div className={`dashboard__basic--info`}>
          <table>
            <thead>
              <tr>
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
                  {salesData?.total?.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </td>
                <td>
                  {ordersData?.total?.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {!noData?.noSalesData && (
          <div className="dashboard__sales">
            <h3>Sales results:</h3>
            <PieChart
              animate
              animationDuration={500}
              animationEasing="ease-out"
              data={[
                {
                  title: `${salesData?.delivery === 0 ? "" : "Delivery"}`,
                  value: salesData?.delivery,
                  color: "#dd3300",
                },
                {
                  title: `${salesData?.completed === 0 ? "" : "Completed"}`,
                  value: salesData?.completed,
                  color: "#00ef11",
                },
              ]}
              label={(data) => data.dataEntry.title}
              labelStyle={{
                fontSize: "6px",
                fontWeight: "600",
                color: "white",
              }}
            />
          </div>
        )}
        {!noData?.noOrdersData && (
          <div className="dashboard__orders">
            <h3>Orders results:</h3>
            <PieChart
              animate
              animationDuration={500}
              animationEasing="ease-out"
              data={[
                {
                  title: `${ordersData?.infoquote === 0 ? "" : "Info Quotes"}`,
                  value: ordersData?.nagotiation,
                  color: "#dd3300",
                },
                {
                  title: `${
                    ordersData?.nagotiation === 0 ? "" : "Nagotiations"
                  }`,
                  value: ordersData?.infoquote,
                  color: "#00aaaa",
                },
                {
                  title: `${ordersData?.bid === 0 ? "" : "Bids"}`,
                  value: ordersData?.bid,
                  color: "#00ef11",
                },
              ]}
              label={(data) => data.dataEntry.title}
              labelStyle={{
                fontSize: "6px",
                fontWeight: "600",
                color: "white",
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
