import { FC, useEffect, useState } from "react";

import { Modal } from "antd";
import { InventoryType } from "../../../App";

interface AppModalProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  appId: string;
}

const AppModal: FC<AppModalProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  appId,
}) => {
  const [appOverview, setAppOverview] = useState({});

  useEffect(() => {
    const getAppOverview = async () => {
      try {
        const res = await fetch(
          `/api/v1/app-service/get-app-overview/${appId}`,
          {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        const fetchedAppData: Awaited<{
          appOverview: InventoryType;
        }> = await res.json();

        console.log(fetchedAppData);
      } catch (error) {
        console.error(error);
      }
    };

    getAppOverview();
  }, []);

  return (
    <Modal
      title="Basic Modal"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default AppModal;
