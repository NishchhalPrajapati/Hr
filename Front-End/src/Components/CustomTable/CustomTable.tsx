import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import commonStyle from "../../Components/common.module.css";
import {
  useTable,
  useSortBy,
  useFilters,
  useColumnOrder,
  usePagination,
} from "react-table";
import { getFilterObject } from "../../Values/utils";
import { connect, useDispatch } from "react-redux";
import TableHeader from "../TableHeader/TableHeader";
import CustomToggle from "../CustomToggel";
import ColumnManagerModal from "../../Modals/ColumnManager/ColumnManager";
import { setClearFilter, showSnackbarAction } from ".././Redux/actions";
import { FiEdit3 } from "react-icons/fi";
import Loading from "../Loading/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import AlertDialog from "../PopupDialogBox/Popup";
import DistributionModel from "../../Modals/DistrbutionModel/DistributionModel";
import { MdDelete } from "react-icons/md";
// import  { useHistory }  from "react-router";
// import { updateUserImport, updateUserStatus } from "../../Services/users";
// import {
// fetchApi,
// updateAPIStatus,
// updateOrganizationStatus,
// } from "../../Services/organizations";

type props = {
  tableColumns: any[];
  tableRows: any[] | undefined;
  selectedRows: any[];
  setSelectedRows: (data: any[]) => void;
  tableType:
  | "Organization"
  | "Super admin"
  | "User"
  | "Task"
  | "CallLogs"
  | "API"
  | "NEWS"
  | "LeadDistributor"
  | "DrillDown";
  showColumnModal: boolean;
  hideColumnModal: () => void;
  selectedRowsData?: any[];
  setSelectedRowsData?: (data: any[]) => void;
  setSearchedItem?: (text: any) => void;
  organization: any;
  organizationUsers: any[];
  role: any;
  setBranch?: (text: boolean) => void;
  setUid?: (data: string) => void;
  setProfile?: (data: string) => void;
  user: any;
  setApiModal?: (data: boolean) => void;
  setApiEdit?: (data: boolean) => void;
  setApiData?: (data: any) => void;
  setUserPermissionModal?: (data: boolean) => void;
};

const CustomTable: FunctionComponent<props> = ({
  tableColumns,
  tableRows,
  selectedRows,
  setSelectedRows,
  tableType,
  showColumnModal,
  hideColumnModal,
  selectedRowsData,
  setSelectedRowsData,
  setSearchedItem,
  organization,
  organizationUsers,
  role,
  setBranch,
  setUid,
  user,
  setApiModal,
  setApiEdit,
  setApiData,
  setUserPermissionModal,
  setProfile,
}) => {
  const dispatcher = useDispatch();
  // const history = useHistory();
  const [checked, setChecked] = useState(false);
  const [showDistributionModal, setShowDistributionModal] = useState(false);
  const [load, setLoad] = useState(false);
  const [distributionData, setDistributionData] = useState();
  const [indexs, setIndex] = useState(0);
  const selectAll = (checked: boolean) => {
    if (
      tableType === "User" ||
      tableType === "Organization" ||
      tableType === "CallLogs" ||
      tableType === "Task"
    ) {
      if (checked === true) {
        if (page) {
          let selectRowsIndex: any[] = [...selectedRows];

          Array.from(Array(page?.length).keys()).forEach((index) => {
            selectRowsIndex.push(pageSize * pageIndex + index + 1);
          });
          setSelectedRows(selectRowsIndex);
        }

        if (page) {
          if (selectedRowsData) {
            let selectRows: any[] = [...selectedRowsData];
            page.forEach((item: any) => {
              selectRows.push(item.original);
            });
            setSelectedRowsData && setSelectedRowsData(selectRows);
          } else {
            let selectRows: any[] = [];
            page.forEach((item: any) => {
              selectRows.push(item.original);
            });
            setSelectedRowsData && setSelectedRowsData(selectRows);
          }
        }
      } else {
        setSelectedRows([]);
        setSelectedRowsData && setSelectedRowsData([]);
      }
    } else {
      if (checked === true) {
        setSelectedRows(Array.from(Array(page?.length).keys()));
      } else {
        setSelectedRows([]);
      }
    }
  };

  const columns = useMemo(() => tableColumns, [tableColumns]);
  const data = useMemo(() => (tableRows ? tableRows : []), [tableRows]);
  const [currentLimit, setCurrentLimit] = useState(20);
  const [recordCounts, setRecordsCount] = useState<any[]>([]);
  const [CurrLeader, setCurrLeader] = useState(-1);
  const [active, setActiveUsers] = useState(0);
  const tableInstance: any = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useSortBy,
    useColumnOrder,
    usePagination
  );

  const {
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    allColumns,

    //@ts-ignore
    setColumnOrder,
    //@ts-ignore

    toggleHideAllColumns,
  } = tableInstance;

  const { pageIndex, pageSize } = state;
  const [API, setAPI] = useState<any[]>([]);
  useEffect(() => {
    setPageSize(100);
    const savedColumns = localStorage.getItem("columns");
    if (savedColumns) {
      setColumnOrder(JSON.parse(savedColumns));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (organizationUsers) {
      let activeUsers = organizationUsers.filter(
        (item) => item.status === "ACTIVE"
      );
      setActiveUsers(activeUsers.length);
    }
  }, [organizationUsers]);

  useEffect(() => {
    let l = [10, 25, 50, 100, 200, 500];
    l.push(rows.length);
    setRecordsCount(l);
  }, [rows]);

  const setColumns = (columnList: any) => {
    setColumnOrder(columnList);
    localStorage.setItem("columns", JSON.stringify(columnList));
  };
  // useEffect(() => {
  // // if (organization.id) fetchApi(organization.id, (data: React.SetStateAction<any[]>) => setAPI(data));
  // }, [organization.id]);
  // {console.log(API[0].primary_lead_manager_email)}

  useEffect(() => {
    if (tableRows) {
      getFilterObject(tableRows, dispatcher);
    }
  }, [tableRows, dispatcher]);

  const checkStatus = (email: string) => {
    const l = data.filter((item) => item.reporting_to === email);
    if (l.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  const onToggle = (event: any, row: any) => {
    if (tableType === "Organization") {
      setLoad(true);
      if (event.target.checked) {
        let check = checkStatus(row.original.user_email);
        if (check === true) {
          // updateUserStatus(row.original.uid, "INACTIVE", (data: boolean | ((prevState: boolean) => boolean)) =>
          // setLoad(data)
          // );
        } else {
          dispatcher(
            showSnackbarAction(
              "Some Users Are Reporting To This User!!",
              "warning"
            )
          );
          setLoad(false);
        }
      } else {
        let activeUsers = organizationUsers.filter(
          (item) => item.status === "ACTIVE"
        );
        if (activeUsers.length === Number(organization.no_of_employees)) {
          dispatcher(
            showSnackbarAction(
              "Maximum active users limit reached!!",
              "warning"
            )
          );
          setLoad(false);
        } else {
          // updateUserStatus(row.original.uid, "ACTIVE", (data: boolean | ((prevState: boolean) => boolean)) => setLoad(data));
        }
      }
    }
    if (tableType === "Super admin") {
      setLoad(true);
      if (event.target.checked) {
        // updateOrganizationStatus(
        // row.original.organization_id,
        // "INACTIVE",
        // (data: boolean | ((prevState: boolean) => boolean)) => setLoad(data)
        // );
      } else {
        // updateOrganizationStatus(
        // row.original.organization_id,
        // "ACTIVE",
        // (data: boolean | ((prevState: boolean) => boolean)) => setLoad(data)
        // );
      }
    }
    if (tableType === "API") {
      setLoad(true);
      if (event.target.checked) {
        // updateAPIStatus(row.original.api_key, "INACTIVE", (data: boolean | ((prevState: boolean) => boolean)) =>
        // setLoad(data)
        // );
      } else {
        // updateAPIStatus(row.original.api_key, "ACTIVE", (data: boolean | ((prevState: boolean) => boolean)) =>
        // setLoad(data)
        // );
      }
    }
  };

  const changeImport = (event: any, row: any) => {
    setLoad(true);
    if (event.target.checked) {
      // updateUserImport(
      // row.original.organization_id,
      // row.original.user_email,
      // true,
      // dispatcher,
      // (data: boolean | ((prevState: boolean) => boolean)) => setLoad(data)
      // );
    } else {
      // updateUserImport(
      // row.original.organization_id,
      // row.original.user_email,
      // false,
      // dispatcher,
      // (data: boolean | ((prevState: boolean) => boolean)) => setLoad(data)
      // );
    }
  };

  const onCheck = (event: any, row: any, index: number) => {
    if (
      tableType === "User" ||
      tableType === "Organization" ||
      tableType === "Task"
    ) {
      if (event.target.checked) {
        let data = [...selectedRows];
        data.push(index);
        setSelectedRows(data);
        if (selectedRowsData) {
          let rowData = [...selectedRowsData];
          rowData.push(row);
          setSelectedRowsData && setSelectedRowsData(rowData);
        }
      } else if (!event.target.checked) {
        let data = [...selectedRows];
        let item = selectedRows.indexOf(index);
        if (item > -1) {
          data.splice(item, 1);
        }
        setSelectedRows(data);
        if (selectedRowsData) {
          let rowData = [...selectedRowsData];
          let val = selectedRowsData.indexOf(row);
          if (val > -1) {
            rowData.splice(val, 1);
          }
          setSelectedRowsData && setSelectedRowsData(rowData);
        }
      }
    }

    if (event.target.checked) {
      let data = [...selectedRows];
      data.push(index);
      setSelectedRows(data);
    } else if (!event.target.checked) {
      let data = [...selectedRows];
      let item = selectedRows.indexOf(index);
      if (item > -1) {
        data.splice(item, 1);
      }
      setSelectedRows(data);
    }
  };

  const clearFilter = () => {
    setSearchedItem && setSearchedItem("");
    var key: any;
    for (var i = 0; i < localStorage.length; i++) {
      key = localStorage.key(i);

      if (key !== "columns") {
        localStorage.removeItem(key);
      }
    }
    dispatcher(setClearFilter(true));
    if (tableType === "User") {
      // history.push("/");
    }
  };
  const location: any = useLocation();

  return (
    <>
      <div className={commonStyle.child} id="scrollable">
        {/* {load === true && <Loading />} */}
        <div style={{ width: "max-content" }}>
          {/* <TableHeader */}
          {/* // headerGroups={headerGroups} */}
          {/* // selectAll={(data) => { */}
          {/* // selectAll(data); */}
          {/* // setChecked(data); */}
          {/* // }} */}
          {/* // panel={tableType} */}
          {/* // allCheck={checked} */}
          {/* // /> */}
          <InfiniteScroll
            style={{ overflow: "visible" }}
            dataLength={currentLimit}
            next={() => setCurrentLimit(currentLimit + 20)}
            hasMore={rows.length > currentLimit}
            loader={""}
            scrollableTarget="scrollable"
            className={commonStyle.infiniteScroll}
          >
            {tableRows && (
              <div {...getTableBodyProps()}>
                {page.slice(0, currentLimit).map((row: any, index: number) => {
                  prepareRow(row);
                  return (
                    <div
                      {...row.getRowProps()}
                      style={
                        row.original.status === "INACTIVE"
                          ? {
                            backgroundColor: "#D3D3D3",
                            borderWidth: 2,
                            display: "flex",
                            flexDirection: "row",
                          }
                          : {
                            backgroundColor: "#ffffff",
                            display: "flex",
                            flexDirection: "row",
                          }
                      }
                    >
                      <div className={commonStyle.sticky}>
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (row.original.transfer_status === true) {
                              dispatcher(
                                showSnackbarAction(
                                  "This Lead Cannot be Transfered",
                                  "error"
                                )
                              );
                            } else {
                              onCheck(
                                e,
                                row.original,
                                pageSize * pageIndex + index + 1
                              );
                            }
                          }}
                          checked={selectedRows.includes(
                            pageSize * pageIndex + index + 1
                          )}
                        />
                        {tableType !== "Task" && (
                          <FiEdit3
                            size={15}
                            color="#279EA0"
                            style={{ marginRight: "10px" }}
                            onClick={() => {
                              if (tableType === "Organization") {
                                // history.push({
                                // pathname: "/addUsers",

                                // state: {
                                // detail: row.original,
                                // edit: true,
                                // },
                                // });
                              } else if (tableType === "User") {
                                if (row.original.transfer_status === true) {
                                  dispatcher(
                                    showSnackbarAction(
                                      "This Lead Cannot be Edited",
                                      "error"
                                    )
                                  );
                                } else {
                                  // history.push({
                                  // pathname: "/editContacts",
                                  // state: { detail: row.original },
                                  // });
                                }
                              } else if (tableType === "Super admin") {
                                // history.push({
                                // pathname: "/editOrganizations",
                                // state: { detail: row.original },
                                // });
                              } else if (tableType === "LeadDistributor") {
                                setShowDistributionModal(true);
                                // setDistributionData(row.original);
                                // setIndex(index);
                              } else if (tableType === "API") {
                                setApiEdit && setApiEdit(true);
                                setApiModal && setApiModal(true);
                                setApiData && setApiData(row.original);
                              }
                            }}
                          />
                        )}
                        {showDistributionModal && (
                          <DistributionModel
                            open={showDistributionModal}
                            organization_id={user.organization_id}
                            close={() => {
                              setShowDistributionModal(false);
                            }}
                          // data={distributionData}
                          // index={indexs}
                          />
                        )}

                        {pageSize * pageIndex + index + 1}
                      </div>
                      {/*  render table data all at a time */}
                      {row.cells.map((cell: any) => {
                        return (
                          <div
                            className={commonStyle.td}
                            {...cell.getCellProps()}
                            style={
                              cell.column.Header === "News Link"
                                ? { minWidth: "490px" }
                                : {}
                            }
                            onClick={() => {
                              if (
                                cell.column.Header === "Customer Name" &&
                                tableType === "User"
                              ) {
                                // history.push({
                                // pathname: "/contactDetails",
                                // state: {
                                // detail: {
                                // ...cell.row.original,
                                // created_at:
                                // cell.row.original[
                                // "created_at"
                                // ].toDate(),
                                // lead_assign_time:
                                // cell.row.original[
                                // "lead_assign_time"
                                // ].toDate(),
                                // next_follow_up_date_time: cell.row
                                // .original["next_follow_up_date_time"]
                                // ? cell.row.original[
                                // "next_follow_up_date_time"
                                // ].toDate()
                                // : "",
                                // modified_at: cell.row.original[
                                // "modified_at"
                                // ]
                                // ? cell.row.original[
                                // "modified_at"
                                // ].toDate()
                                // : "",
                                // stage_change_at: cell.row.original[
                                // "stage_change_at"
                                // ]
                                // ? cell.row.original[
                                // "stage_change_at"
                                // ].toDate()
                                // : "",
                                // },
                                // },
                                // });
                              }
                            }}
                          >
                            {cell.render("Cell")}
                          </div>
                        );
                      })}

                      {tableType === "Organization" && (
                        <div
                          className={commonStyle.td}
                        // style={{ minWidth: "317px" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              paddingRight: "10px",
                              justifyContent: "space-between",
                            }}
                          >
                            {(tableType === "Organization" ||
                              tableType === "Super admin" ||
                              tableType === "API") && (
                                <CustomToggle
                                  size="small"
                                  onChange={(e: any) => onToggle(e, row)}
                                  checked={
                                    row.original.status === "INACTIVE"
                                      ? true
                                      : false
                                  }
                                />
                              )}
                          </div>
                        </div>
                      )}

                      {tableType === "Organization" ? (
                        <div className={commonStyle.tdSmall}>
                          {row.original.profile === "Lead Manager" ? (
                            <input
                              type="checkbox"
                              onChange={(e) => changeImport(e, row)}
                              checked={
                                row.original.import === true ? true : false
                              }
                            />
                          ) : null}
                        </div>
                      ) : null}

                      {tableType === "Organization" ? (
                        <div
                          className={commonStyle.tdSmall}
                          style={{ paddingLeft: "30px" }}
                        >
                          {row.original.profile === "Lead Manager" ? (
                            <button
                              className={commonStyle.branchButton}
                              onClick={() => {
                                setBranch && setBranch(true);
                                setUid && setUid(row.original.uid);
                              }}
                            >
                              Branch
                            </button>
                          ) : null}
                        </div>
                      ) : null}

                      {/* {console.log(row.original)} */}
                      {/* {console.log(row.value)} */}

                      {tableType === "Organization" ? (
                        <>
                          <div
                            className={commonStyle.tdSmall}
                            style={{ paddingLeft: "15px" }}
                          >
                            {row.original.profile === "Lead Manager" ? (
                              <AlertDialog
                                leader={row.values.user_email}
                                uid={row.original.uid}
                                primary_lead_manager_email={
                                  row.original.user_email
                                }
                                organization_id={row.original.organization_id}
                                leaderName={
                                  row.original.user_first_name +
                                  " " +
                                  row.original.user_last_name
                                }
                                CurrLeader={CurrLeader}
                                setCurrLeader={(index: number) =>
                                  setCurrLeader(index)
                                }
                                index={index}
                                prevLeader={API[0]?.primary_lead_manager_email}
                              />
                            ) : null}
                          </div>
                          {/* <div
                            className={commonStyle.tdSmall}
                            style={{ paddingLeft: "70px" }}
                          >
                            <button
                              className={commonStyle.branchButton}
                              onClick={() => {
                                setUserPermissionModal &&
                                  setUserPermissionModal(true);
                                setUid && setUid(row.original.uid);
                                setProfile && setProfile(row.original.profile);
                              }}
                            >
                              Permission
                            </button>
                          </div> */}
                        </>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            )}
          </InfiniteScroll>
        </div>
      </div>

      <div style={{ marginBottom: "23px" }}>
        {/* <span> */}
        {/* Page{" "} */}
        {/* <strong> */}
        {/* {pageIndex + 1} of {pageOptions.length} */}
        {/* </strong>{" "} */}
        {/* </span> */}
        {/* <span> */}
        {/* | Go to Page:{" "} */}
        {/* <input */}
        {/* // type="number" */}
        {/* // defaultValue={pageIndex} */}
        {/* // onChange={(e) => { */}
        {/* // const pageNumber = e.target.value ? Number(e.target.value) : 0; */}
        {/* // gotoPage(pageNumber - 1); */}
        {/* // }} */}
        {/* // style={{ width: "50px" }} */}
        {/* // /> */}
        {/* </span> */}
        {/* <select */}
        {/* // value={pageSize} */}
        {/* // onChange={(e) => setPageSize(Number(e.target.value))} */}
        {/* // > */}
        {/* {recordCounts.map((pagesize) => ( */}
        {/* <option key={pagesize} value={pagesize}> */}
        {/* Show {pagesize} */}
        {/* </option> */}
        {/* ))} */}
        {/* </select> */}
        {/* <button */}
        {/* // onClick={() => { */}
        {/* // gotoPage(0); */}
        {/* // setChecked(false); */}
        {/* // }} */}
        {/* // disabled={!canPreviousPage} */}
        {/* // > */}
        {/* {"<<"} */}
        {/* </button> */}
        {/* <button */}
        {/* // onClick={() => { */}
        {/* // previousPage(); */}
        {/* // setChecked(false); */}
        {/* // }} */}
        {/* // disabled={!canPreviousPage} */}
        {/* // > */}
        {/* Previous */}
        {/* </button> */}
        {/* <button */}
        {/* // onClick={() => { */}
        {/* // nextPage(); */}
        {/* // setChecked(false); */}
        {/* // }} */}
        {/* // disabled={!canNextPage} */}
        {/* // > */}
        {/* Next */}
        {/* </button> */}
        {/* <button */}
        {/* // onClick={() => { */}
        {/* // gotoPage(pageCount - 1); */}
        {/* // setChecked(false); */}
        {/* // }} */}
        {/* // disabled={!canNextPage} */}
        {/* // > */}
        {/* {">>"} */}
        {/* </button> */}
      </div>
      <div className={commonStyle.count}>
        {/* <button */}
        {/* // className={commonStyle.clearFilter} */}
        {/* // style={ */}
        {/* // location.state?.detail || localStorage.length > 0 */}
        {/* // ? { color: "#fff", borderColor: "#fff" } */}
        {/* // : { color: "#555", borderColor: "#555" } */}
        {/* // } */}
        {/* // onClick={() => clearFilter()} */}
        {/* // > */}
        {/* Clear Filter */}
        {/* </button> */}
        {tableType === "Organization" && (
          <>
            {/* <div className={commonStyle.selectContainer}> */}
            {/* <p className={commonStyle.countHead}>Total Licence:</p> */}
            {/* <p className={commonStyle.number}> */}
            {/* {organization.no_of_employees} */}
            {/* </p> */}
            {/* </div> */}
            {/* <div className={commonStyle.selectContainer}> */}
            {/* <p className={commonStyle.countHead}>Active Licence:</p> */}
            {/* <p className={commonStyle.number}>{active}</p> */}
            {/* </div> */}
          </>
        )}
        {/* <div className={commonStyle.selectContainer}> */}
        {/* <p className={commonStyle.countHead}>Selected Records:</p> */}
        {/* <p className={commonStyle.number}>{selectedRows.length}</p> */}
        {/* </div> */}
        {/* <div className={commonStyle.countContainer}> */}
        {/* <p className={commonStyle.countHead}>Total Records:</p> */}
        {/* <p className={commonStyle.number}>{rows.length}</p> */}
        {/* </div> */}
      </div>

      {showColumnModal === true && (
        <ColumnManagerModal
          columnsList={allColumns}
          open={showColumnModal}
          close={hideColumnModal}
          onChangeColumns={(data: any[]) => setColumns(data)}
          toggleAllColumns={toggleHideAllColumns}
        />
      )}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state.user.data,
    organizationUsers: state.organizationUsers.data,
    role: state.user.role,
    organization: state.organization,
  };
};

export default connect(mapStateToProps)(CustomTable);
