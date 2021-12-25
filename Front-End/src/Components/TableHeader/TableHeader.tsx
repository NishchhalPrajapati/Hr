import React, { FunctionComponent, useState } from "react";
import styles from "./TableHeader.module.css";
import { IoChevronDown } from "react-icons/io5";
import FilterModal from "../../Components/FilterModel/FilterModal";
import { HeaderGroup } from "react-table";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { FaDotCircle } from "react-icons/fa";

type props = {
  headerGroups: HeaderGroup<any>[];
  selectAll?: (check: boolean) => void;
  allCheck?: boolean;
  setAllCheck?: (value: boolean) => void;
  panel:
    | "Organization"
    | "Super admin"
    | "User"
    | "Project"
    | "Task"
    | "CallLogs"
    | "LeadDistributor"
    | "API"
    | "NEWS"
    | "DrillDown";
};

type prop = {
  item: any;
  index: number;
  column: any;
  filterOpenIndex: number;
  setShowFiter: (index: number) => void;
  panel:
    | "Organization"
    | "Super admin"
    | "User"
    | "Project"
    | "Task"
    | "CallLogs"
    | "LeadDistributor"
    | "API"
    | "NEWS"
    | "DrillDown";
};

export const Header: FunctionComponent<prop> = ({
  item,
  index,
  column,
  filterOpenIndex,
  setShowFiter,
  panel,
}) => {
  const role = useSelector((state: any) => state.user.role);

  const [hideAnim, setHideAnim] = useState(false);
  const iconClass = classNames(
    styles.icon,
    { [styles.iconOpen]: index === filterOpenIndex },
    { [styles.iconClose]: hideAnim === true }
  );

  return (
    <div key={index}>
      <div className={styles.tHeadContainer}>
        <p>{item}</p>

        <IoChevronDown
          size={18}
          color={"#ffffff"}
          className={iconClass}
          onClick={(e) => {
            if (index === filterOpenIndex) {
              setHideAnim(true);
              setShowFiter(-1);
            } else {
              setHideAnim(false);
              setTimeout(() => setShowFiter(index), 100);
            }
          }}
        />
        {localStorage[`${panel + role + index}`] !== "[]" &&
          localStorage[`${panel + role + index}`] && (
            <div className={styles.tooltip}>
              <FaDotCircle
                size={8}
                color={"yellow"}
                style={{ paddingBottom: "8px" }}
              />
              <span className={styles.tooltiptext}>Filter</span>
            </div>
          )}
      </div>
      <div
        style={
          index === filterOpenIndex ? { display: "flex" } : { display: "none" }
        }
        className={styles.expandFilter}
      >
        <FilterModal
          filterId={panel + role + index}
          column={column}
          expand={index === filterOpenIndex}
          hide={() => {
            setShowFiter(-1);
          }}
        />
      </div>
    </div>
  );
};

const TableHeader: FunctionComponent<props> = ({
  headerGroups,
  selectAll,
  setAllCheck,
  allCheck,
  panel,
}) => {
  const [filterOpenIndex, setFilterOpenIndex] = useState(-1);

  const showFiter = (index: number) => {
    setFilterOpenIndex(index);
  };
  return (
    <>
      {headerGroups.map((headerGroup) => (
        <div
          {...headerGroup.getHeaderGroupProps()}
          style={{
            display: "flex",
            flexDirection: "row",
            position: "sticky",
            top: 0,
            zIndex: 2,
          }}
        >
          <div className={styles.sticky}>
            <div className={styles.snoDiv}>
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setAllCheck && setAllCheck(true);
                    selectAll && selectAll(true);
                  } else {
                    setAllCheck && setAllCheck(false);
                    selectAll && selectAll(false);
                  }
                }}
                checked={allCheck}
              />

              <p>Sr. No.</p>
            </div>
          </div>

          {/* <th className={styles.th} style={{ paddingLeft: "50px" }}>
            <p>Sr. No.</p>
          </th> */}

          {headerGroup.headers.map((column, index) => (
            <div className={styles.th} {...column.getHeaderProps()}>
              <Header
                item={column.render("Header")}
                index={index}
                column={column}
                setShowFiter={showFiter}
                filterOpenIndex={filterOpenIndex}
                panel={panel}
              />
            </div>
          ))}

          {/* <div className={styles.th} >
          <p>Use this for putting heading on to the table header
          </div> */}

          {panel === "Organization" && (
            <div className={styles.thSmall}>
              <p>Active/Inactive</p>
            </div>
          )}
          {panel === "Organization" && (
            <div className={styles.thSmall}>
              <p>Migrate Permissions</p>
            </div>
          )}
          {panel === "Organization" && (
            <div className={styles.thSmall}>
              <p>Branch</p>
            </div>
          )}
          {panel === "Organization" && (
            <div className={styles.thSmall}>
              <p>Primary Lead Manager</p>
            </div>
          )}
          {/* {panel === "Organization" && (
            <div className={styles.thSmall}>
              <p>Set Feild Permissions</p>
            </div>
          )} */}
          {panel === "Project" && (
            <div className={styles.th}>
              <p></p>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default TableHeader;
