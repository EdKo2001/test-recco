import { useState, useEffect } from "react";

import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

import Header from "./components/Header";

interface DataType {
  key: number;
  name: string;
  category: string;
  connector: { url: string; alt: string };
}

interface InventoryType {
  appId: string;
  appName: string;
  appSources: string[];
  category: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Connector",
    dataIndex: "connector",
    key: "connector",
    render: ({ url, alt }) => <img src={url} alt={alt} />,
    sorter: (a, b) => a.name.length - b.name.length,
  },
];

function App() {
  const [inventory, setInventory] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);

  const [pageSize, setPageSize] = useState(25);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const getInventory = async () => {
      try {
        const res = await fetch("/api/v1/app-service/get-apps", {
          body: JSON.stringify({
            pageNumber,
            pageSize,
          }),
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        });
        const fetchedInventory: Awaited<{
          appRows: InventoryType[];
          totalCount: number;
        }> = await res.json();

        const mappedRows: DataType[] = fetchedInventory.appRows.map(
          (row, idx) => ({
            key: idx + 1,
            name: row.appName,
            category: row.category,
            connector: { url: "/images/logo.svg", alt: row.appSources[0] },
          })
        );

        setTotalCount(fetchedInventory.totalCount);
        setInventory(mappedRows);

        console.log(fetchedInventory);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    getInventory();
  }, [pageSize, pageNumber]);

  return (
    <>
      <Header />
      <div>
        <h1>App Inventory</h1>
        <Table
          columns={columns}
          dataSource={inventory}
          loading={loading}
          pagination={{
            position: ["bottomCenter"],
            onChange: (page) => {
              setPageNumber(page - 1);
            },
            onShowSizeChange: (cur, selectedPageSize) => {
              setPageSize(selectedPageSize);
            },
            pageSize,
            pageSizeOptions: ["25", "50"],
            showSizeChanger: true,
            total: totalCount,
          }}
        />
        ;
      </div>
    </>
  );
}

export default App;
