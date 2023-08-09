import React, { useState, useEffect } from "react";
import "./App.css";
import Table from "./Components/Table";
import { ProductType } from "./Types";

// Server URL
const URL1 = `${process.env.REACT_APP_API_BASE_URL}/branch1`;
const URL2 = `${process.env.REACT_APP_API_BASE_URL}/branch2`;
const URL3 = `${process.env.REACT_APP_API_BASE_URL}/branch3`;

const App: React.FC<{}> = () => {
  const [tableData, setTableData] = useState<ProductType>([]);
  const [filter, setFilter] = useState("");

  const fetchData = async () => {
    try {
      const response1 = await fetch(URL1);
      const data1 = await response1.json();

      const response2 = await fetch(URL2);
      const data2 = await response2.json();

      const response3 = await fetch(URL3);
      const data3 = await response3.json();

      const responseFromThreeBranches = [
        ...data1[0].products,
        ...data2[0].products,
        ...data3[0].products,
      ];
      const mergedProductsMap = new Map();
      responseFromThreeBranches.forEach((product) => {
        const existingProduct = mergedProductsMap.get(product.name);
        if (existingProduct) {
          existingProduct.sold += product.sold;
        } else {
          mergedProductsMap.set(product.name, { ...product });
        }
      });
      // console.log(mergedProductsMap.values());
      const uniqueProducts = Array.from(mergedProductsMap.values());

      const sortedData = uniqueProducts.sort((a, b) =>
        a.name > b.name ? 1 : -1
      );
      setTableData(sortedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = tableData.filter((input) =>
    input.name.toLowerCase().includes(filter.toLowerCase())
  );

  const totalRevenue = filteredData.reduce(
    (total, product) => total + product.sold,
    0
  );
  console.log(totalRevenue);

  return (
    <div className={"main"}>
      <h6 className={"title"}>Wowcherfy App</h6>
      <label>
        Search Products : &nbsp;
        <input
          type="search"
          placeholder="Search by Product Name "
          onChange={(e) => setFilter(e.target.value)}
        />
      </label>
      <br />
      <Table tableData={filteredData} revenue={totalRevenue} />
    </div>
  );
};

export default App;
