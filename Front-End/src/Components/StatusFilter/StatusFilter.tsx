import React, { FunctionComponent } from "react";
import styles from "./StatusFilter.module.css";
import classNames from "classnames";

type props = {
  setStatus: (status: string) => void;
  status?: string;
  taskFilter?: boolean;
  projectFilter?: boolean;
  setExpand: (data: boolean) => void;
  expand: boolean;
};

const StatusFilter: FunctionComponent<props> = ({
  setStatus,
  status,
  taskFilter,
  projectFilter,
  setExpand,
  expand,
}) => {
  const filterClass = classNames(styles.parent, {
    [styles.showFilterAnim]: expand === true,
  });

  return (
    <div className={filterClass}>
      <div className={styles.child}>
        {taskFilter === true ? (
          <>
            <p
              className={styles.text}
              style={
                status === "Completed"
                  ? { color: "#279ea0" }
                  : { color: "#000" }
              }
              onClick={() => {
                setStatus("Completed");
                setExpand(false);
              }}
            >
              COMPLETED
            </p>
            <div className={styles.line}></div>
            <p
              className={styles.text}
              style={
                status === "Pending" ? { color: "#279ea0" } : { color: "#000" }
              }
              onClick={() => {
                setStatus("Pending");
                setExpand(false);
              }}
            >
              PENDING
            </p>
            <div className={styles.line}></div>
            <p
              className={styles.text}
              style={
                status === "Overdue" ? { color: "#279ea0" } : { color: "#000" }
              }
              onClick={() => {
                setStatus("Overdue");
                setExpand(false);
              }}
            >
              OVERDUE
            </p>
            <div className={styles.line}></div>
            <p
              className={styles.text}
              style={
                status === "ALL" ? { color: "#279ea0" } : { color: "#000" }
              }
              onClick={() => {
                setStatus("ALL");
                setExpand(false);
              }}
            >
              ALL
            </p>
          </>
        ) : projectFilter === true ? (
          <>
            <p
              className={styles.text}
              style={
                status === "Commercial"
                  ? { color: "#279ea0" }
                  : { color: "#000" }
              }
              onClick={() => {
                setStatus("Commercial");
                setExpand(false);
              }}
            >
              COMMERCIAL
            </p>
            <div className={styles.line}></div>
            <p
              className={styles.text}
              style={
                status === "Residential"
                  ? { color: "#279ea0" }
                  : { color: "#000" }
              }
              onClick={() => {
                setStatus("Residential");
                setExpand(false);
              }}
            >
              RESIDENTIAL
            </p>
            <div className={styles.line}></div>
            <p
              className={styles.text}
              style={
                status === "ALL" ? { color: "#279ea0" } : { color: "#000" }
              }
              onClick={() => {
                setStatus("ALL");
                setExpand(false);
              }}
            >
              ALL
            </p>
          </>
        ) : (
          <>
            <p
              className={styles.text}
              style={
                status === "ACTIVE" ? { color: "#279ea0" } : { color: "#000" }
              }
              onClick={() => {
                setStatus("ACTIVE");
                setExpand(false);
              }}
            >
              ACTIVE
            </p>
            <div className={styles.line}></div>
            <p
              className={styles.text}
              style={
                status === "INACTIVE" ? { color: "#279ea0" } : { color: "#000" }
              }
              onClick={() => {
                setStatus("INACTIVE");
                setExpand(false);
              }}
            >
              INACTIVE
            </p>
            <div className={styles.line}></div>
            <p
              className={styles.text}
              style={
                status === "ALL" ? { color: "#279ea0" } : { color: "#000" }
              }
              onClick={() => {
                setStatus("ALL");
                setExpand(false);
              }}
            >
              ALL
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default StatusFilter;
