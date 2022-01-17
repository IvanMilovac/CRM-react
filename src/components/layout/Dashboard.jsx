import React from "react";
/* import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config"; */

const Dashboard = () => {
  /* useEffect(() => {
    async function getData() {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        setData((prev) => [...prev, doc.data()]);
      });
    }
    getData();
  }, [data]); */

  return <div style={{ flex: "1 1 auto", padding: "2.5%" }}>Dashboard</div>;
};

export default Dashboard;
