import React, { FunctionComponent, useEffect, useState } from "react";
import styles from "../../Modals/BulkEditModal/BulkEditModal.module.css";
import Modal from "react-modal";
import { IoIosClose } from "react-icons/io";

import Dropdown from "../../Components/DropDown/Dropdown";
// import {
//   bulkEdit,
//   contactResources,
//   fetchConstants,
// } from "../../../Services/contacts";
import { useDispatch } from "react-redux";
import Loading from "../../Components/Loading/Loading";
import Firebase from "firebase/app";

type props = {
  organization_id: string;
  close: () => void;
  open: boolean;
  rowsData: any[];
};
const BulkEditModal: FunctionComponent<props> = ({
  organization_id,
  close,
  open,
  rowsData,
}) => {
  const [stageSelected, setStageSelected] = useState<any>({
    label: "Select",
    value: "Select",
  });
  const [projectSelected, setProjectSelected] = useState<any>({
    label: "Select",
    value: "Select",
  });

  const [locationSelected, setlocationSelected] = useState<any>({
    label: "Select",
    value: "Select",
  });
  const [budgetSelected, setBudgetSelected] = useState<any>({
    label: "Select",
    value: "Select",
  });
  const [propertyTypeSelected, setPropertyTypeSelected] = useState<any>({
    label: "Select",
    value: "Select",
  });
  const [propertyStageSelected, setPropertyStageSelected] = useState<any>({
    label: "Select",
    value: "Select",
  });
  const [notIntSelected, setNotIntSelected] = useState<any>({
    label: "Select",
    value: "Select",
  });
  const [lostSelected, setLostSelected] = useState<any>({
    label: "Select",
    value: "Select",
  });

  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [locationsList, setLocationsList] = useState<any[]>([]);
  const [budgetsList, setBudgetsList] = useState<any[]>([]);
  const [propertyTypeList, setPropertyTypeList] = useState<any[]>([]);
  const [propertyStageList, setPropertyStageList] = useState<any[]>([]);
  const [notIntReasonList, setNotIntReasonList] = useState<any[]>([]);
  const [lostReasonList, setLostReasonList] = useState<any[]>([]);
  const [changeData, setChangeData] = useState<{ [key: string]: string }>({});
  const [load, setLoad] = useState(false);

  const dispatcher = useDispatch();
  const stage = [
    "FRESH",
    "WON",
    "CALL BACK",
    "INTERESTED",
    "LOST",
    "NOT-INTERESTED",
  ];

//   useEffect(() => {
    // const unsub = contactResources(
    //   (data) => setLocationsList(data),
    //   (data) => setBudgetsList(data),
    //   (data) => setProjectsList(data),
    //   organization_id
    // );
    // const unsubConst = fetchConstants(
    //   (data) => setNotIntReasonList(data),
    //   (data) => setLostReasonList(data),
    //   (data) => setPropertyStageList(data),
    //   (data) => setPropertyTypeList(data)
    // );

    // return () => {
    //   unsub();
    //   unsubConst();
    // };
    // eslint-disable-next-line
//   }, []);

//   const apply = async () => {
    // console.log(changeData);
    // setLoad(true);

    // await bulkEdit(
    //   { ...changeData, modified_at: Firebase.firestore.Timestamp.now() },
    //   rowsData,
    //   dispatcher
    // );
    // setLoad(false);
    // close();
//   };
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
        <p className={styles.contactForm}>Contact Form</p>
        <div className={styles.cross} onClick={close}>
          <IoIosClose size={35} color={"#808080"} />
        </div>
      </div>
      <div className={styles.line}></div>
      <p className={styles.text}>
        Bulk edit allows you to apply same value to multiple records.
      </p>
      <div className={styles.box2}>
        <div className={styles.divide}>
          <div className={styles.title}>
            <p className={styles.one}>Stage</p>
            <p className={styles.two}></p>
          </div>
          <div style={{ marginTop: "7px" }}>
            <Dropdown
              option={stage}
              selectedValue={stageSelected}
              setSelectedValue={(value) => {
                console.log(value);
                setStageSelected(value);
                changeData["stage"] = value.value;
                setChangeData(changeData);
              }}
              disable={true}
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
              option={projectsList}
              selectedValue={projectSelected}
              setSelectedValue={(value) => {
                setProjectSelected(value);
                changeData["project"] = value.value;
                setChangeData(changeData);
              }}
            />
          </div>
        </div>
      </div>

      <div className={styles.box2}>
        <div className={styles.divide}>
          <div className={styles.title}>
            <p className={styles.one}>Location</p>
            <p className={styles.two}></p>
          </div>
          <div style={{ marginTop: "7px" }}>
            <Dropdown
              option={locationsList}
              selectedValue={locationSelected}
              setSelectedValue={(value) => {
                setlocationSelected(value);
                changeData["location"] = value.value;
                setChangeData(changeData);
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
              option={budgetsList}
              selectedValue={budgetSelected}
              setSelectedValue={(value) => {
                setBudgetSelected(value);
                changeData["budget"] = value.value;
                setChangeData(changeData);
              }}
            />
          </div>
        </div>
      </div>

      <div className={styles.box2}>
        <div className={styles.divide}>
          <div className={styles.title}>
            <p className={styles.one}>Property Type</p>
            <p className={styles.two}></p>
          </div>
          <div style={{ marginTop: "7px" }}>
            <Dropdown
              option={propertyTypeList}
              selectedValue={propertyTypeSelected}
              setSelectedValue={(value) => {
                setPropertyTypeSelected(value);
                changeData["property_type"] = value.value;
                setChangeData(changeData);
              }}
            />
          </div>
        </div>
        <div className={styles.divide}>
          <div className={styles.title}>
            <p className={styles.one}>Property Stage</p>
            <p className={styles.two}></p>
          </div>
          <div style={{ marginTop: "7px" }}>
            <Dropdown
              option={propertyStageList}
              selectedValue={propertyStageSelected}
              setSelectedValue={(value) => {
                setPropertyStageSelected(value);
                changeData["property_stage"] = value.value;
                setChangeData(changeData);
              }}
            />
          </div>
        </div>
      </div>

      <div className={styles.box2}>
        <div className={styles.divide}>
          <div className={styles.title}>
            <p className={styles.one}>Not Interested Reason</p>
            <p className={styles.two}></p>
          </div>
          <div style={{ marginTop: "7px" }}>
            <Dropdown
              option={notIntReasonList}
              selectedValue={notIntSelected}
              setSelectedValue={(value) => {
                setNotIntSelected(value);
                changeData["not_init_reason"] = value.value;
                setChangeData(changeData);
              }}
            />
          </div>
        </div>

        <div className={styles.divide}>
          <div className={styles.title}>
            <p className={styles.one}>Lost Reason</p>
            <p className={styles.two}></p>
          </div>
          <div style={{ marginTop: "7px" }}>
            <Dropdown
              option={lostReasonList}
              selectedValue={lostSelected}
              setSelectedValue={(value) => {
                setLostSelected(value);
                changeData["lost_reason"] = value.value;
                setChangeData(changeData);
              }}
            />
          </div>
        </div>
      </div>

      {/* <button className={styles.apply} onClick={apply}> */}
        {/* Apply */}
      {/* </button> */}
    </Modal>
  );
};

export default BulkEditModal;
