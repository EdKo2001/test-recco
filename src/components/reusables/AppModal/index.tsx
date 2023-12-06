import { FC, useEffect, useState } from "react";

import { Modal, List } from "antd";
import { InventoryType } from "../../../App";

import styles from "./styles.module.css";

interface AppModalProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  appId: string;
}

const AppModal: FC<AppModalProps> = ({ isModalOpen, handleCancel, appId }) => {
  const [appOverview, setAppOverview] = useState<InventoryType>({
    appId: "",
    appName: "",
    appSources: [""],
    category: "",
  });
  const [appUsers, setAppUsers] = useState<string[]>([]);

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

        console.log("fetchedAppData", fetchedAppData.appOverview);
        setAppOverview(fetchedAppData.appOverview);
      } catch (error) {
        console.error(error);
      }
    };
    const getAppOverviewUsers = async () => {
      try {
        const res = await fetch(
          `/api/v1/app-service/get-app-overview-users/${appId}`,
          {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        const fetchedUsersData: Awaited<{
          appUsers: string[];
        }> = await res.json();

        console.log("fetchedAppData", fetchedUsersData.appUsers);
        setAppUsers(fetchedUsersData.appUsers);
      } catch (error) {
        console.error(error);
      }
    };

    appId && getAppOverview();
    appId && getAppOverviewUsers();
  }, [appId]);

  return (
    <Modal title="" open={isModalOpen} onCancel={handleCancel} footer={null}>
      <h2 className={styles.modal__title}>App Overview</h2>
      <div className={styles.modal__overview}>
        <ul className={styles.modal__list}>
          <li className={styles.modal__item}>
            App name: {appOverview.appName}
          </li>
          <li className={styles.modal__item}>
            Category: {appOverview.category}
          </li>
          <li className={styles.modal__item}>Users: {appUsers.length}</li>
          <li className={styles.modal__item}>
            Connector:
            <img src="/images/logo.svg" alt={appOverview.appSources[0]} />
          </li>
          <li className={styles.modal__item}>
            Last classification: 2 days ago
          </li>
        </ul>
      </div>
      <List
        header={"Username"}
        bordered
        dataSource={appUsers}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </Modal>
  );
};

export default AppModal;
