import React, { FunctionComponent, useEffect, useState } from "react";
import TopBar from "../../Components/TopBar/Topbar";
import commonStyle from "../common.module.css";
import { connect, useDispatch } from "react-redux";
import OwnerModal from "../../Modals/ChangeOwnerModels/ChangeOwnerModal";
import ImportContactsModal from "../../Modals/ImportModal/ImportContactsModal";
import { CONTACT_COLUMNS, datesField } from "../../Values/tables";
import Loading from "../../Components/Loading/Loading";
import { getDateString, searchContacts } from "../../Values/utils";
import CustomTable from "../../Components/CustomTable/CustomTable";
import BulkEditModal from "../../Modals/BulkEditModal/BulkEditModal";
import { showSnackbarAction } from "../../Components/Redux/actions";
import { useLocation } from "react-router";
import { getDataFromRoute } from "../../Services/contacts";
import ImportCallLogsModal from "../../Modals/ImportModal/ImportCallLogsModal";
import ImportNotesModal from "../../Modals/ImportModal/ImportNotesModal";
import ImportTasksModal from "../../Modals/ImportModal/ImportTaskModal";

type props = {
  history: any;
  user: any;
  contacts: {
    data: any;
  };
  organizationUsers: any;
  role: any;
  teamLeadUsers: any;
};
let usersList: any[] = [];

const UserPanel: FunctionComponent<props> = ({
  history,
  user,
  contacts,
  organizationUsers,
  role,
  teamLeadUsers,
}) => {
  const location: any = useLocation();
  const [showImportModal, setShowImportModal] = useState(false);
  const [callLogsImportModal, setCallLogsImportModal] = useState(false);
  const [notesImportModal, setNotesImportModal] = useState(false);
  const [tasksImportModal, setTasksImportModal] = useState(false);
  const [show, setShow] = useState(false);
  const [showBulkEdit, setShowBulkEdit] = useState(false);
  const [owner, setOwner] = useState(false);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [selectedRowsData, setSelectedRowsData] = useState<any[]>([]);

  const [filterData, setFilterData] = useState<any[] | undefined>(undefined);
  const [searchedItem, setsearchedItem] = useState("");
  const [columnModal, setColumnModal] = useState(false);
  const [allContacts, setAllContacts] = useState<any[] | undefined>(undefined);
  const [transferStatusTrueRows, setTransferStatusTrueRows] = useState<any[]>(
    []
  );
  let dispatcher = useDispatch();
  const createUsersList = (email: string, users: any[], uid: boolean) => {
    users.map((item: any) => {
      if (usersList.includes(item)) {
        return;
      } else {
        if (item.reporting_to === email && item.status === "ACTIVE") {
          if (!usersList.includes(item)) {
            usersList.push(item);
          }

          createUsersList(item.user_email, users, uid);
        }
      }
    });
  };

  useEffect(() => {
    if (user === undefined) {
      setFilterData([]);

      dispatcher(showSnackbarAction("User Does Not Exists!!", "error"));
    }
  }, []);

  useEffect(() => {
    let trueStatusList: any = [];
    selectedRowsData.forEach((row) => {
      Object.keys(row).forEach((item) => {
        if (item === "transfer_status") {
          trueStatusList.push(row[item]);
        }
      });
    });
    setTransferStatusTrueRows(trueStatusList);
  }, [selectedRowsData]);

  useEffect(() => {
    let contact: any[] = [];
    Object.keys(contacts.data).forEach((key) => {
      contact = [...contact, ...contacts.data[key]];
    });
    setAllContacts(contact);
  }, [contacts.data]);

  useEffect(() => {
    let mapReportingTo: { [key: string]: string } = {};
    if (organizationUsers) {
      organizationUsers.forEach((item: any) => {
        if (mapReportingTo[item.uid] === undefined) {
          mapReportingTo[item.uid] = item.reporting_to;
        }
      });
    }

    if (allContacts) {
      allContacts.forEach((item: any) => {
        if (item.uid === "") {
          item["reporting_to"] = "";
        } else {
          item["reporting_to"] = mapReportingTo[item.uid]
            ? mapReportingTo[item.uid]
            : "";
        }
      });
    }

    // eslint-disable-next-line
  }, [allContacts]);

  const setUsersList = () => {
    if (role === "Lead Manager") {
      organizationUsers.map((item: any) => {
        if (usersList.includes(item)) {
          return;
        } else {
          if (item.status === "ACTIVE") {
            usersList.push(item);
          }
        }
      });
    } else {
      createUsersList(user.user_email, organizationUsers, false);
    }
  };

  useEffect(() => {
    if (selectedRows.length > 0) {
      setOwner(true);
    } else if (selectedRows.length === 0) {
      setOwner(false);
    }
  }, [selectedRows]);

  useEffect(() => {
    if (role !== "Team Lead") {
      if (allContacts === undefined) {
      } else {
        if (location.state?.detail) {
          const routeData = getDataFromRoute(location.state.detail);
          setFilterData(routeData);
        } else {
          setFilterData(allContacts);
        }
      }
    }
  }, [allContacts, role, location]);

  useEffect(() => {
    if (role === "Team Lead") {
      if (teamLeadUsers && allContacts) {
        if (location.state?.detail) {
          const routeData = getDataFromRoute(location.state.detail);
          setFilterData(
            routeData.filter((item: any) => teamLeadUsers.includes(item.uid))
          );
        } else {
          setFilterData(
            allContacts.filter((item) => teamLeadUsers.includes(item.uid))
          );
        }
      }
    }
    // eslint-disable-next-line
  }, [role, allContacts, teamLeadUsers, location]);

  useEffect(() => {
    if (searchedItem.length === 0) {
      if (allContacts) {
        if (role !== "Team Lead") {
          if (location.state?.detail) {
            const routeData = getDataFromRoute(location.state.detail);
            setFilterData(routeData);
          } else {
            setFilterData(allContacts);
          }
        } else {
          if (location.state?.detail) {
            const routeData = getDataFromRoute(location.state.detail);
            setFilterData(
              routeData.filter((item: any) => teamLeadUsers.includes(item.uid))
            );
          } else {
            setFilterData(
              allContacts.filter((item) => teamLeadUsers.includes(item.uid))
            );
          }
        }
      }
    } else {
      if (allContacts) {
        const data = searchContacts(allContacts, searchedItem);
        setFilterData(data);
      }
    }
    // eslint-disable-next-line
  }, [searchedItem, location, teamLeadUsers]);

  const clearSelectedRowsData = () => {
    setSelectedRowsData([]);
    setSelectedRows([]);
  };

  const exportFile = () => {
    let data: any[] = [];
    if (selectedRowsData.length === 0) {
    } else {
      selectedRowsData.forEach((item) => {
        data.push({
          Id: item.contactId,
          "Customer Name": item.customer_name,
          "Mobile No": item.contact_no,
          "Email ID": item.email,
          Stage: item.stage,
          Owner: item.contact_owner_email,
          "CallBack Reason": item.call_back_reason,
          "Property Type": item.property_type,
          "Property Stage": item.property_stage,
          Location: item.location,
          Project: item.project,
          "Not Interested Reason": item.not_int_reason,
          "Lost Reason": item.lost_reason,
          "Other Not Interested Reason": item.other_not_int_reason,
          "Other Lost Reason": item.other_lost_reason,
          "Previous Owner": item.previous_owner,
          "Next follow Up Type": item.next_follow_up_type,
          "Next Follow Up Date & Time": getDateString(
            item.next_follow_up_date_time
          ),
          AddSet: item.addset,
          Campaign: item.campaign,
          Budget: item.budget,
          "Lead Source": item.lead_source,
          "Transfer Status": item.transfer_status,
          "Associate Status": item.associate_status,
          "Source Status": item.source_status,
          "Created By": item.created_by,
          "Created At": getDateString(item.created_at),
          "Lead Assign At": getDateString(item.lead_assign_time),
        });
      });
    }

    return data;
  };

  return (
    <>
      <div className={commonStyle.topBar}>
        <TopBar
          history={history}
          title={"Add Contacts"}
          path={"/addContacts"}
          onClick={() => {
            setShowImportModal(true);
          }}
          owner={owner}
          changeOwner={() => {
            setUsersList();
            setShow(true);
          }}
          onChange={(val) => setsearchedItem(val)}
          filterText={"Status"}
          setColumnModal={(data) => setColumnModal(data)}
          show={true}
          showStatusBox={true}
          onExport={exportFile}
          setBulkEdit={() => {
            setShowBulkEdit(true);
          }}
          onCallLogsImport={() => {
            setCallLogsImportModal(true);
          }}
          onNotesImport={() => {
            setNotesImportModal(true);
          }}
          onTasksImport={() => {
            setTasksImportModal(true);
          }}
          transferLeads={transferStatusTrueRows}
        />
      </div>
      <div className={commonStyle.parent}>
        {filterData === undefined && <Loading />}
        <CustomTable
          tableColumns={CONTACT_COLUMNS}
          tableRows={filterData}
          selectedRows={selectedRows}
          setSelectedRows={(data) => setSelectedRows(data)}
          tableType="User"
          showColumnModal={columnModal}
          hideColumnModal={() => setColumnModal(false)}
          selectedRowsData={selectedRowsData}
          setSelectedRowsData={(data) => setSelectedRowsData(data)}
          setSearchedItem={(val) => setsearchedItem(val)}
        />

       
           <OwnerModal
            open={show}
            close={() => {
              setShow(false);
            }}
            usersList={usersList}
            rowsSelected={selectedRowsData}
            clearSelectedRowsData={clearSelectedRowsData}
            organization_id={user.organization_id}
          />
        {/* )} */}

         {showImportModal && (
          <ImportContactsModal
            open={showImportModal}
            close={() => setShowImportModal(false)}
            organization_id={user.organization_id}
            history={history}
            usersList={organizationUsers}
            user={user}
          />
        )}
        {callLogsImportModal && (
          <ImportCallLogsModal
            open={callLogsImportModal}
            close={() => setCallLogsImportModal(false)}
            organization_id={user.organization_id}
            usersList={organizationUsers}
          />
        )}

         {notesImportModal && (
          <ImportNotesModal
            open={notesImportModal}
            close={() => setNotesImportModal(false)}
          />
        )}
        {tasksImportModal && (
          <ImportTasksModal
            open={tasksImportModal}
            close={() => setTasksImportModal(false)}
            organization_id={user.organization_id}
            usersList={organizationUsers}
            user={user}
          />
        )}
        {showBulkEdit && (
          <BulkEditModal
            open={showBulkEdit}
            organization_id={user.organization_id}
            close={() => {
              setShowBulkEdit(false);
              clearSelectedRowsData();
            }}
            rowsData={selectedRowsData}
          />
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state.user.data,
    role: state.user.role,
    contacts: state.contacts,
    organizationUsers: state.organizationUsers.data,
    teamLeadUsers: state.teamLeadUsers.data,
  };
};

export default connect(mapStateToProps)(UserPanel);
