import { FC, ReactNode } from "react";

import styles from "./styles.module.css";

interface ContainerProps {
  wide?: boolean;
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({ wide, children }) => {
  return (
    <div className={`${styles.container} ${wide ? styles.wide : ""}`}>
      {children}
    </div>
  );
};

export default Container;
