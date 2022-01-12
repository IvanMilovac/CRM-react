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
  }, [data]); 

  const handleClick = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };*/

  return (
    <div style={{ flex: "1 1 auto", padding: "2.5%" }}>
      Dashboard
      {/* <button onClick={() => handleClick()}>Click Me</button>
      {data.map((item, index) => (
        <p key={index}>{item.name}</p>
      ))} */}
    </div>
  );
};

export default Dashboard;
