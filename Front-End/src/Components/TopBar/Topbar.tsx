import React, { FunctionComponent, useState } from "react";
import styles from "./Topbar.module.css";
import { AiFillCaretDown } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import StatusFilter from "../StatusFilter/StatusFilter";
import Import from "../../Components/Import/Import";
import { BsColumnsGap } from "react-icons/bs";
import { connect, useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5";
import { showSnackbarAction, updateStage } from "../Redux/actions";
import { useEffect } from "react";
// import { correctLeadCount } from "../../Services/organization";
import DistributionModel from "../../Modals/DistrbutionModel/DistributionModel";



type props = {
  user: any;
  history: any;
  title: string;
  path: string;
  onClick?: () => void;
  owner?: boolean;
  changeOwner?: () => void;
  onChange?: (text: any) => void;
  setStatus?: (status: string) => void;
  filterText: string;
  status?: string;
  taskFilter?: boolean;
  projectFilter?: boolean;
  setColumnModal?: (data: boolean) => void;
  show: boolean;
  userRole: any;
  showStatusBox?: boolean;
  onExport?: () => void;
  onCallLogsImport?: () => void;
  onNotesImport?: () => void;
  onTasksImport?: () => void;
  setBulkEdit?: () => void;
  leadsStage: any;
  setListViewModal?: (data: boolean) => void;
  setApiModal?: (data: boolean) => void;
  setApiFilter?: (data: string) => void;
  apiFilterData?: string;
  organizationId: string;
  setLoad?: (data: boolean) => void;
  setChangeStageModal?: (data: boolean) => void;
  setDeleteRecordsModal?: (data: boolean) => void;
  setPermissionsModal?: (data: boolean) => void;
  transferLeads?: any[];
};

const TopBar: FunctionComponent<props> = ({


  user,
  history,
  title,
  path,
  onClick,
  owner,
  changeOwner,
  onChange,
  setStatus,
  filterText,
  status,
  taskFilter,
  projectFilter,

  setColumnModal,
  show,
  userRole,
  showStatusBox,
  onExport,
  onCallLogsImport,
  onNotesImport,
  onTasksImport,
  setBulkEdit,
  leadsStage,
  setListViewModal,
  setApiModal,
  setApiFilter,
  apiFilterData,
  organizationId,
  setLoad,
  setChangeStageModal,
  setDeleteRecordsModal,
  setPermissionsModal,
  transferLeads,
}) => {
  const [expand, setExpand] = useState(false);
  const [expandImport, setExpandImport] = useState(false);
  const [value, setValue] = useState("");
  const [showDistributionModal, setShowDistributionModal] = useState(false);
  const dispatcher = useDispatch();

  const onStageChange = (event: any, stage: string) => {
    if (event.target.checked) {
      dispatcher(updateStage({ [stage]: true }));
    } else if (!event.target.checked) {
      if (stage !== "FRESH" && stage !== "INTERESTED" && stage !== "CALLBACK") {
        dispatcher(updateStage({ [stage]: false }));
      }
    }
  };

  const apiFilter = (event: any, filter: string) => {
    if (event.target.checked) {
      if (setApiFilter) {
        setApiFilter(filter);
      }
    } else {
      if (setApiFilter) {
        setApiFilter("");
      }
    }
  };

  return (
    <div className={styles.topBar}>


      {title === "Add User" && (
        <>
          <button
            style={{ marginLeft: "20px" }}
            className={styles.addBox}
            onClick={() => {
              setListViewModal && setListViewModal(true);
            }}
          >
            Set List View

          </button>

          <button
            style={{ marginLeft: "20px" }}
            className={styles.addBox}
            onClick={() => {
              setPermissionsModal && setPermissionsModal(true);
            }}
          > Permissions
          </button>
        </>
      )}

      {title === "Add Api Data" && (
        <>
          <div className={styles.leadContainer}>
            <div className={styles.leadBox}>
              <p className={styles.leadText}>Last 7 Days</p>
              <input
                type="checkbox"
                onChange={(e) => {
                  apiFilter(e, "7");
                }}
                checked={apiFilterData === "7" ? true : false}
              />
            </div>
            <div className={styles.leadBox}>
              <p className={styles.leadText}>Last 30 Days</p>
              <input
                type="checkbox"
                onChange={(e) => {
                  apiFilter(e, "30");
                }}
                checked={apiFilterData === "30" ? true : false}
              />
            </div>
            <div className={styles.leadBox}>
              <p className={styles.leadText}>All</p>
              <input
                type="checkbox"
                onChange={(e) => {
                  apiFilter(e, "all");
                }}
                checked={apiFilterData === "all" ? true : false}
              />
            </div>
          </div>
        </>
      )}

        {/* {show === true && title !== "drilldown" && ( */}
        {/* //  <>  */}
          {/* {(userRole === "Lead Manager" || */}
          {/* // userRole === "organization" || */}
          {/* // userRole === "Team Lead") && ( */}
          <div
            className={styles.arrowBox}
            onClick={() => setExpandImport(!expandImport)}
          >

            <FaChevronDown />
            {expandImport === true && (
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "37px",
                }}
              >
                <Import
                  onClick={onClick}
                  setExpandImport={(data) => setExpandImport(data)}
                  onExport={onExport}
                  expand={expandImport}
                  close={() => setExpandImport(false)}
                  onCallLogsImport={onCallLogsImport}
                  onNotesImport={onNotesImport}
                  onTasksImport={onTasksImport}
                />
              </div>
            )}
          </div>
             {/* )}  */}
        {/* </> */}
          {/* )} */}
        <div className={styles.columnManage}>
          <BsColumnsGap
            size={20}
            onClick={() => {
              setColumnModal && setColumnModal(true);
            }}
          />
          <span className={styles.tooltiptext}>Column Manager</span>
        </div>

      </div>
  
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state.user.data,
    userRole: state.user.role,
    leadsStage: state.leadsStage.stage,
    organizationId: state.organization.id,
  };
};

export default connect(mapStateToProps)(TopBar);
