import Modal from "react-modal";
import React, { FunctionComponent, useEffect, useState } from "react";
import styles from "../../Modals/ChangeOwnerModels/ChangeOwnerModal.module.css";
import { IoIosClose } from "react-icons/io";
// import { changeDateForRoute, changeOwner } from "../../../Services/contacts";
import { useDispatch } from "react-redux";
import { showSnackbarAction } from "../../Components/Redux/actions";
import Loading from "../../Components/Loading/Loading";

import Dropdown from "../../Components/DropDown/Dropdown";
// import { functions } from "../../../Firebase";
import moment from "moment";
// import { fetchTransferReason } from "../../../Services/resources";
import { datesField } from "../../Values/tables";

type props = {
  open: boolean;
  close: () => void;
  usersList: any;
  rowsSelected: any[];
  organization_id: string;
  clearSelectedRowsData?: () => void;
};

const OwnerModal: FunctionComponent<props> = ({
  open,
  close,
  usersList,
  rowsSelected,
  clearSelectedRowsData,
  organization_id,
}) => {
  const [userIndex, setUserIndex] = useState(0);
  const [load, setLoad] = useState(false);
  const dispatcher = useDispatch();
  const [buttonType, setButtonType] = useState<any>("Next");
  const [fresh, setFresh] = useState(false);
  const [tasks, setTasks] = useState(false);
  const [notes, setNotes] = useState(false);
  const [attachments, setAttachments] = useState(false);
  const [contactDetails, setContactDetails] = useState(false);
  const [reasonSelected, setReasonSelected] = useState<any>({
    label: "Select",
    value: "Select",
  });
  const [ownerSelected, setOwnerSelected] = useState<any>({
    label: "Select",
    value: "Select",
  });
  const [ownerList, setOwnerList] = useState<any[]>([]);

  useEffect(() => {
    let data: any = [];
    usersList.map((item: any, index: number) =>
      data.push(
        `${item.user_first_name} ${item.user_last_name} (${item.user_email})`
      )
    );

    setOwnerList(data);
  }, [usersList]);

  useEffect(() => {
    if (ownerSelected.value !== "") {
      let owner: any;
      usersList.map((item: any, index: number) => {
        owner = `${item.user_first_name} ${item.user_last_name} (${item.user_email})`;
        if (String(owner) === String(ownerSelected.value)) {
          setUserIndex(index + 1);
        }
      });
    }
  }, [ownerSelected]);

  const Next = () => {
    setButtonType("Change Owner");

    return {
      OwnerModal,
    };
  };

  const [reasons, setReasons] = useState<any[]>([]);

  // useEffect(() => {
    // const unsub = fetchTransferReason(organization_id, (data) =>
      // setReasons(data)
    // );

    // return () => {
      // unsub();
    // };
  // }, [organization_id]);
  // useEffect(() => {
    // console.log(usersList);
  // }, [usersList]);
  // const submit = async () => {
    // rowsSelected.forEach((item) => {
      // datesField.forEach((date) => {
        // if (item[date] && item[date] !== "" && item[date].toDate) {
          // item[date] = moment(item[date].toDate()).toString();
        // }
      // });
    // });
    // if (userIndex === 0) {
      // dispatcher(showSnackbarAction("Select a User !!", "error"));
    // } else if (
      // reasonSelected.value === "" ||
      // reasonSelected.value === "Select"
    // ) {
      // dispatcher(showSnackbarAction("Please Select A Reason!!", "error"));
    // } else {
      // setLoad(true);

      // functions
        // .httpsCallable("transferLead")({
          // leadsData: rowsSelected,
          // options: {
            // fresh: fresh,
            // notes: notes,
            // attachments: attachments,
            // task: tasks,
            // contactDetails: contactDetails,
          // },
          // owner: {
            // email: usersList[userIndex - 1].user_email.toLowerCase(),
            // uid: usersList[userIndex - 1].uid,
            // organization_id: usersList[userIndex - 1].organization_id,
          // },
          // reason: reasonSelected.value,
        // })
        // .then(() => {
          // dispatcher(showSnackbarAction("Owner Updated!!", "success"));
          // setLoad(false);
          // close();
          // clearSelectedRowsData && clearSelectedRowsData();
        // })
        // .catch((error) => {
          // console.log("owner change error:", error);
        // });
    // }
  // };

  return (
    <>
      {load && <Loading />}
      {buttonType == "Change Owner" && (
        <Modal
          isOpen={open}
          className={styles.parent}
          overlayClassName={styles.overlay}
          onRequestClose={close}
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
        >
          <div className={styles.icon} onClick={close}>
            <IoIosClose size={35} color={"#808080"} />
          </div>
          <p className={styles.heading}>Select A Reason To Transfer</p>
          <div style={{ marginTop: "20px" }}>
            <Dropdown
              option={reasons}
              selectedValue={reasonSelected}
              setSelectedValue={(value) => {
                setReasonSelected(value);
              }}
            />
          </div>

          <div className={styles.button} style={{ marginTop: "100px" }}>
            <button
              className={styles.cancel}
              style={{ marginRight: "80px" }}
              onClick={close}
            >
              Cancel
            </button>

            {/* <button className={styles.change} onClick={submit}> */}
              {/* Change Owner */}
            {/* </button> */}
          </div>
        </Modal>
      )}

      {buttonType == "Next" && (
        <Modal
          isOpen={open}
          className={styles.parent}
          overlayClassName={styles.overlay}
          onRequestClose={close}
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
        >
          <div className={styles.icon} onClick={close}>
            <IoIosClose size={35} color={"#808080"} />
          </div>
          <p className={styles.heading}>Change Owner</p>
          <div className={styles.nameBox}>
            <span className={styles.name} style={{ marginRight: "10px" }}>
              Choose Owner
            </span>
            <div style={{ width: "100%" }}>
              <Dropdown
                option={ownerList}
                selectedValue={ownerSelected}
                setSelectedValue={(value) => {
                  setOwnerSelected(value);
                  // handleClick()
                }}
              />
            </div>
            {/* <select
              className={styles.input}
              onChange={(e) => setUserIndex(e.target.selectedIndex)}
            >
              <option>Select</option>
              {usersList.map((item: any, index: number) => (
                <option key={index}>
                  {`${item.user_first_name} ${item.user_last_name} (${item.user_email})`}
                </option>
              ))}
            </select> */}
          </div>
          <div className={styles.nameBox}>
            <div style={{ margin: "10px 0" }}>
              Do you want to transfer lead(s) As Fresh?
            </div>
            <input
              onChange={(e) => {
                setFresh(e.target.checked);
                if (e.target.checked === true) {
                  setTasks(false);
                }
              }}
              type="checkbox"
              style={{ right: "20px", position: "absolute" }}
              name="check"
            />
          </div>

          <p className={styles.optionHeading}>Select Options</p>
          <div style={{ width: "40%" }}>
            {fresh === false && (
              <div className={styles.options}>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setTasks(e.target.checked);
                  }}
                />
                <p className={styles.optionText}>Open Tasks</p>
              </div>
            )}

            <div className={styles.options}>
              <input
                type="checkbox"
                onChange={(e) => {
                  setNotes(e.target.checked);
                }}
              />
              <p className={styles.optionText}>Notes</p>
            </div>
            <div className={styles.options}>
              <input
                type="checkbox"
                onChange={(e) => {
                  setAttachments(e.target.checked);
                }}
              />
              <p className={styles.optionText}>Attachments</p>
            </div>
            {fresh === true && (
              <div className={styles.options}>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setContactDetails(e.target.checked);
                  }}
                />
                <p className={styles.optionText}>Contact Details</p>
              </div>
            )}
          </div>
          <div className={styles.button}>
            <button className={styles.cancel} onClick={close}>
              Cancel
            </button>
            <button className={styles.change} onClick={Next}>
              Next
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default OwnerModal;
