import React, { FunctionComponent, useEffect, useState } from "react";
import styles from "./DistributionModel.module.css";
import Modal from "react-modal";
import { IoIosClose } from "react-icons/io";
import Firebase from "firebase/app";

import Dropdown from "../DropDown/Dropdown";
// import {
  // contactResources,
  // CreateLeadDistribution,
  // editLeadDistribution,
  // fetchConstants,
  // fetchLeadDistributionsEdit,
  // fetchpropertySubType,
// } from "../../Services/contacts";
import { useDispatch, connect } from "react-redux";
import Loading from "../../Components/Loading/Loading";

import { showSnackbarAction } from "../Redux/actions";

type props = {
  organization_id: string;
  close: () => void;
  open: boolean;
  organizationUsers: any;
  data?: any;
  index?: number;
};

const DistributionModel: FunctionComponent<props> = (
  {
    organization_id,
    close,
    open,

    organizationUsers,
    data,
    index,
  },
  { history, user }: { history: any; user: any }
) => {
  const [projectSelected, setProjectSelected] = useState<any>([]);

  const [locationSelected, setlocationSelected] = useState<any>([]);
  const [budgetSelected, setBudgetSelected] = useState<any>([]);
  const [propertyTypeSelected, setPropertyTypeSelected] = useState<any>([]);
  const [filterData, setFilterData] = useState<any[]>([]);
  const [sourceSelected, setSourceSelected] = useState<any>([]);
  const [associateSelected, setAssociateSelected] = useState<any>([]);

  const dispatcher = useDispatch();

  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [locationsList, setLocationsList] = useState<any[]>([]);
  const [budgetsList, setBudgetsList] = useState<any[]>([]);
  const [propertyTypeList, setPropertyTypeList] = useState<any[]>([]);
  const [propertyStageList, setPropertyStageList] = useState<any[]>([]);
  const [notIntReasonList, setNotIntReasonList] = useState<any[]>([]);
  const [lostReasonList, setLostReasonList] = useState<any[]>([]);
  const [load, setLoad] = useState(false);
  const [leadSourceList, setLeadSourceList] = useState<any[]>([]);
  const [comTypes, setComTypes] = useState<any[]>([]);
  const [resTypes, setResTypes] = useState<any[]>([]);
  const [associateList, setAssociateList] = useState<any[]>([]);
  const [uid, setUids] = useState<any>({});

  useEffect(() => {
    let data: any = [];
    let uids: { [key: string]: string } = {};
    organizationUsers.forEach((item: any, index: number) => {
      data.push(
        `${item.user_first_name} ${item.user_last_name} -${item.user_email}`
      );
      uids[item.user_email] = item.uid;
    });

    setUids(uids);
    setAssociateList(data);
  }, [organizationUsers]);

  useEffect(() => {
    if (data) {
      console.log(index);
      if (organization_id) {
        // fetchLeadDistributionsEdit(organization_id, (data) =>
          // setFilterData(data)
        // );
      }
      let project = data.project.map((item: any, index: number) =>
        item === "Team Lead"
          ? {
              value: item,
              label: "Team Leader",
            }
          : { value: item, label: item }
      );
      let location = data.location.map((item: any, index: number) =>
        item === "Team Lead"
          ? {
              value: item,
              label: "Team Leader",
            }
          : { value: item, label: item }
      );
      let budget = data.budget.map((item: any, index: number) =>
        item === "Team Lead"
          ? {
              value: item,
              label: "Team Leader",
            }
          : { value: item, label: item }
      );
      let property_type = data.property_type.map((item: any, index: number) =>
        item === "Team Lead"
          ? {
              value: item,
              label: "Team Leader",
            }
          : { value: item, label: item }
      );
      let source = data.source.map((item: any, index: number) =>
        item === "Team Lead"
          ? {
              value: item,
              label: "Team Leader",
            }
          : { value: item, label: item }
      );
      let users = data.users.map((item: any, index: number) =>
        item === "Team Lead"
          ? {
              value: item,
              label: "Team Leader",
            }
          : { value: item, label: item }
      );
      setlocationSelected(location);
      setProjectSelected(project);
      setBudgetSelected(budget);
      setPropertyTypeSelected(property_type);
      setSourceSelected(source);
      setAssociateSelected(users);
    }
  }, []);

  // useEffect(() => {
    // const unsub = contactResources(
      // (data) => setLocationsList(data),
      // (data) => setBudgetsList(data),
      // (data) => setProjectsList(data),
      // organization_id
    // );
    // const unsubConst = fetchConstants(
      // (data) => setNotIntReasonList(data),
      // (data) => setLostReasonList(data),
      // (data) => setPropertyStageList(data),
      // (data) => setPropertyTypeList(data)
    // );
    // const unsubProperty = fetchpropertySubType(
      // organization_id,
      // (data) => setComTypes(data),
      // (data) => setResTypes(data),
      // (data) => setLeadSourceList(data)
    // );
    // return () => {
      // unsub();
      // unsubConst();
      // unsubProperty();
    // };
    // eslint-disable-next-line
  // }, []);

  const onSubmit = () => {
    let source: any = [];
    let project: any = [];
    let location: any = [];
    let budget: any = [];
    let propertyType: any = [];
    let usersList: any = [];
    projectSelected.forEach((item: any) => {
      if (item.value !== "Select") {
        project.push(item.value);
      }
    });
    sourceSelected.forEach((item: any) => {
      if (item.value !== "Select") {
        source.push(item.value);
      }
    });
    locationSelected.forEach((item: any) => {
      if (item.value !== "Select") {
        location.push(item.value);
      }
    });
    budgetSelected.forEach((item: any) => {
      if (item.value !== "Select") {
        budget.push(item.value);
      }
    });
    propertyTypeSelected.forEach((item: any) => {
      if (item.value !== "Select") {
        propertyType.push(item.value);
      }
    });
    associateSelected.forEach((item: any) => {
      if (item.value !== "Select") {
        let l = item.value.split("-");
        let email = l[1];
        usersList.push({ uid: uid[email], user_email: email });
      }
    });
    if (usersList.length === 0) {
      dispatcher(showSnackbarAction("Please select A User", "error"));
    } else if (
      source.length === 0 &&
      project.length === 0 &&
      location.length === 0 &&
      budget.length === 0 &&
      propertyType.length === 0
    ) {
      dispatcher(showSnackbarAction("Please Select A Value", "error"));
    } else {
      setLoad(true);
      // CreateLeadDistribution(
        // organization_id,
        // source,
        // project,
        // location,
        // budget,
        // propertyType,
        // usersList,
        // dispatcher,
        // (data) => setLoad(data),
        // close
      // );
    }
  };

  const onEdit = () => {
    let source: any = [];
    let project: any = [];
    let location: any = [];
    let budget: any = [];
    let propertyType: any = [];
    let usersList: any = [];

    projectSelected.forEach((item: any) => {
      if (item.value !== "Select") {
        project.push(item.value);
      }
    });
    sourceSelected.forEach((item: any) => {
      if (item.value !== "Select") {
        source.push(item.value);
      }
    });
    locationSelected.forEach((item: any) => {
      if (item.value !== "Select") {
        location.push(item.value);
      }
    });
    budgetSelected.forEach((item: any) => {
      if (item.value !== "Select") {
        budget.push(item.value);
      }
    });
    propertyTypeSelected.forEach((item: any) => {
      if (item.value !== "Select") {
        propertyType.push(item.value);
      }
    });
    associateSelected.forEach((item: any) => {
      if (item.value !== "Select") {
        let l = item.value.split("-");

        let email = l[1];
        if (l[1] === undefined) {
          usersList.push({ uid: uid[item.value], user_email: item.value });
        } else {
          usersList.push({ uid: uid[email], user_email: email });
        }
      }
    });

    if (usersList.length === 0) {
      dispatcher(showSnackbarAction("Please select A User", "error"));
    } else if (
      source.length === 0 &&
      project.length === 0 &&
      location.length === 0 &&
      budget.length === 0 &&
      propertyType.length === 0
    ) {
      dispatcher(showSnackbarAction("Please Select A Value", "error"));
    } else {
      setLoad(true);

      if (index !== undefined) {
        filterData[index] = {
          source: source,
          project: project,
          location: location,
          budget: budget,
          property_type: propertyType,
          users: usersList,
        //   created_at: Firebase.firestore.Timestamp.now(),
        //   modify_at: Firebase.firestore.Timestamp.now(),
        };
        // editLeadDistribution(
          // organization_id,
          // filterData,
          // dispatcher,
          // (data) => setLoad(data),
          // close
        // );
      }
    }
  };

  const deleteLogic = () => {
    if (index !== undefined) {
      const newList = [...filterData];
      newList.splice(index, 1);
      setFilterData(newList);
      // editLeadDistribution(
        // organization_id,
        // newList,
        // dispatcher,
        // (data) => setLoad(data),
        // close
      // );
    }
  };

  return (
    <Modal
      className={styles.parent}
      isOpen={open}
      shouldCloseOnOverlayClick={true}
      overlayClassName={styles.overlay}
      shouldCloseOnEsc={true}
      onRequestClose={close}
    >
      {load === true && <Loading />}
      <div className={styles.firstDiv}>
        <p className={styles.contactForm}>
          {data ? "Edit Distribution Logic" : "Distribution Logic"}
        </p>
        <div className={styles.cross} onClick={close}>
          <IoIosClose size={35} color={"#808080"} />
        </div>
      </div>
      <div className={styles.line}></div>

      <div className={styles.divide}>
        <div className={styles.title}>
          <p className={styles.one}>Source</p>
          <p className={styles.two}></p>
        </div>
        <div style={{ marginTop: "7px" }}>
          <Dropdown
            isMulti
            option={leadSourceList}
            selectedValue={sourceSelected}
            setSelectedValue={(value) => {
              setSourceSelected(value);
            }}
          />
        </div>
      </div>
      <div className={styles.divide}>
        <div className={styles.title}>
          <p className={styles.one}>Project</p>
          <p className={styles.two}></p>
        </div>
        <div style={{ marginTop: "7px" }}>
          <Dropdown
            isMulti
            option={projectsList}
            selectedValue={projectSelected}
            setSelectedValue={(value) => {
              setProjectSelected(value);
            }}
          />
        </div>
      </div>
      <div className={styles.divide}>
        <div className={styles.title}>
          <p className={styles.one}>Location</p>
          <p className={styles.two}></p>
        </div>
        <div style={{ marginTop: "7px" }}>
          <Dropdown
            isMulti
            option={locationsList}
            selectedValue={locationSelected}
            setSelectedValue={(value) => {
              setlocationSelected(value);
            }}
          />
        </div>
      </div>

      <div className={styles.divide}>
        <div className={styles.title}>
          <p className={styles.one}>Budget</p>
          <p className={styles.two}></p>
        </div>
        <div style={{ marginTop: "7px" }}>
          <Dropdown
            isMulti
            option={budgetsList}
            selectedValue={budgetSelected}
            setSelectedValue={(value) => {
              setBudgetSelected(value);
            }}
          />
        </div>
      </div>

      <div className={styles.divide}>
        <div className={styles.title}>
          <p className={styles.one}>Property Type</p>
          <p className={styles.two}></p>
        </div>
        <div style={{ marginTop: "7px" }}>
          <Dropdown
            isMulti
            option={propertyTypeList}
            selectedValue={propertyTypeSelected}
            setSelectedValue={(value) => {
              setPropertyTypeSelected(value);
            }}
          />
        </div>
      </div>
      <div className={styles.divide}>
        <div className={styles.title}>
          <p className={styles.one}>Associate</p>
          <p className={styles.two}></p>
        </div>
        <div style={{ marginTop: "7px" }}>
          <Dropdown
            isMulti
            option={associateList}
            selectedValue={associateSelected}
            setSelectedValue={(value) => {
              setAssociateSelected(value);
            }}
          />
        </div>
      </div>

      {data ? (
        <div className={styles.buttonsBox}>
          <button className={styles.delete} onClick={deleteLogic}>
            Delete
          </button>
          <button className={styles.apply} onClick={onEdit}>
            Edit
          </button>
        </div>
      ) : (
        <button className={styles.apply} onClick={onSubmit}>
          Apply
        </button>
      )}
    </Modal>
  );
};
const mapStateToProps = (state: any) => {
  return {
    user: state.user.data,
    organizationUsers: state.organizationUsers.data,
  };
};
export default connect(mapStateToProps)(DistributionModel);
