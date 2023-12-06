import { useState, useEffect } from "react";
import Header from "./components/Header";

function App() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const getInventory = async () => {
      try {
        const res = await fetch("/api/v1/app-service/get-apps", {
          body: JSON.stringify({
            pageNumber: 1,
            pageSize: 25,
          }),
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        });
        const fetchedInventory = res.json();

        console.log(fetchedInventory);
      } catch (error) {
        console.error(error);
      }
    };

    getInventory();
  }, []);

  return (
    <>
      <Header />
    </>
  );
}

export default App;
