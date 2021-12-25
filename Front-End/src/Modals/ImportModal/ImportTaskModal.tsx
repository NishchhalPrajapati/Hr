import Modal from "react-modal";
import React, { Dispatch, FunctionComponent, useEffect, useState } from "react";
import styles from "./ImportModal.module.css";
import { Checkbox } from "@material-ui/core";
import { IoIosClose, IoMdDocument } from "react-icons/io";
import { handleFileUpload } from "../../Services/contacts";
import { useDispatch } from "react-redux";
import Loading from "../../Components/Loading/Loading";

// import { mapNotes, mapTasks } from "../../Services/resources";
import { nameList, ownerList } from "../../Values/tables";

type props = {
  open: boolean;
  close: () => void;
  organization_id: string;
  usersList: any[];
  user: any;
};

const ImportTasksModal: FunctionComponent<props> = ({
  open,
  close,
  organization_id,
  usersList,
  user,
}) => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [select, setSelected] = useState<any[]>([]);
  const [load, setLoad] = useState(false);

  // const [colSelect, setColSelect] = useState<any[]>([]);
  const [colName, setColName] = useState<{ [key: string]: string }>({});

  const [choice, setChoice] = useState([
    { name: "Owner", selected: false },
    { name: "Customer Name", selected: false },
    { name: "Status", selected: false },
    { name: "Task Type", selected: false },
    { name: "Call Back Reason", selected: false },
    { name: "Due Date", selected: false },
    { name: "Completed Date", selected: false },
    { name: "Lead Id", selected: false },
    { name: "Created At", selected: false },
  ]);

  useEffect(() => {
    const columns = Object.values(colName);
    let tempChoices = [...choice];
    tempChoices.forEach((choice, index) => {
      if (columns.includes(choice.name)) {
        tempChoices[index].selected = true;
      } else {
        tempChoices[index].selected = false;
      }
    });

    setChoice(tempChoices);
    // eslint-disable-next-line
  }, [colName]);

  useEffect(() => {
    let data: {} = {};
    columns.forEach((item: any, index: number) => {
      data = {
        ...data,
        [item.name]: nameList.includes(item.name)
          ? "Customer Name"
          : item.name === "lead id"
          ? "Lead Id"
          : item.name === "status"
          ? "Status"
          : ownerList.includes(item.name)
          ? "Owner"
          : item.name === "due date"
          ? "Due Date"
          : item.name === "completed date"
          ? "Completed Date"
          : item.name === "task type"
          ? "Task Type"
          : item.name === "call back reason"
          ? "Call Back Reason"
          : "",
      };
    });
    setColName(data);
  }, [columns]);

  const upload = (file: any) => {
    handleFileUpload(
      file,
      (data: any) => setData(data),
      (col: any) => setColumns(col),
      (data: boolean) => setLoad(data)
    );
  };

  const dispatcher = useDispatch();

  const onSubmit = () => {
    setLoad(true);
    const map: { [key: string]: string } = {};
    Object.keys(colName).forEach((key) => {
      if (colName[key] !== "") map[colName[key]] = key;
    });

    let val: any[] = [...data];
    select.sort(function (a, b) {
      return b - a;
    });
    select.forEach((index) => {
      val.splice(index, 1);
    });

    mapTasks(
      val,
      map,
      dispatcher,
      close,
      (data: boolean) => setLoad(data),
      organization_id,
      usersList,
      user.user_first_name + " " + user.user_last_name
    );
  };

  const onSelect = (item: any, value: string) => {
    let data: any = { ...colName };

    for (var key in data) {
      if (key === item.name) {
        data[key] = value === "Select" ? "" : value;
      }
    }
    setColName(data);
  };

  return (
    <Modal
      style={{ overlay: { zIndex: 100 } }}
      className={styles.parent}
      isOpen={open}
      onRequestClose={close}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      {load === true && <Loading />}
      {data.length !== 0 ? (
        <>
          <div className={styles.cross} onClick={close}>
            <IoIosClose size={35} color={"#808080"} />
          </div>
          <p className={styles.contactForm}>Import Data for "Tasks Form"</p>
          <div className={styles.tableBox}>
            <table className={styles.table}>
              <thead className={styles.head}>
                <tr>
                  <th className={styles.th}></th>
                  <th className={styles.th}>Sno.</th>
                  {columns.map((item: any, index: number) => (
                    <th key={index} className={styles.th}>
                      <div className={styles.tHeadContainer}>
                        <p>{item.name}</p>
                      </div>
                      <div className={styles.drop}>
                        <select
                          key={index}
                          className={styles.options}
                          onChange={(val) => {
                            onSelect(item, val.target.value);
                            // let data: any = { ...colName };

                            // for (var key in data) {
                            //   if (key === item.name) {
                            //     data[key] =
                            //       val.target.value === "Select"
                            //         ? ""
                            //         : val.target.value;
                            //   }
                            // }
                            // setColName(data);
                          }}
                        >
                          <option>
                            {nameList.includes(item.name)
                              ? "Customer Name"
                              : item.name === "lead id"
                              ? "Lead Id"
                              : item.name === "status"
                              ? "Status"
                              : ownerList.includes(item.name)
                              ? "Owner"
                              : item.name === "due date"
                              ? "Due Date"
                              : item.name === "completed date"
                              ? "Completed Date"
                              : item.name === "task type"
                              ? "Task Type"
                              : item.name === "call back reason"
                              ? "Call Back Reason"
                              : ""}
                          </option>
                          {choice.map((item: any, index: number) => (
                            <option disabled={item.selected} key={index}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </th>
                  ))}
                  <th className={styles.th}></th>
                </tr>
              </thead>
              <tbody>
                {data.map((item: any, index: number) => (
                  <tr
                    key={index}
                    className={styles.no}
                    style={
                      select.includes(index)
                        ? { backgroundColor: "#00000030" }
                        : {
                            backgroundColor: "#ffffff",
                            borderBottomColor: "#f3f3f3",
                            borderBottomWidth: "5px",
                          }
                    }
                  >
                    <td>
                      <Checkbox
                        key={index}
                        checked={select.includes(index) ? false : true}
                        onChange={(e: { target: { checked: any; }; }) => {
                          if (!e.target.checked) {
                            let data = [...select];
                            data.push(index);
                            setSelected(data);
                          } else if (e.target.checked) {
                            let data = [...select];
                            let item = select.indexOf(index);
                            if (item > -1) {
                              data.splice(item, 1);
                            }
                            setSelected(data);
                          }
                        }}
                      />
                    </td>
                    <td className={styles.td}>{index + 1}</td>
                    {Object.values(item).map((item: any, index: number) => (
                      <td
                        className={styles.td}
                        key={index}
                        // style={
                        //   colSelect.includes(index)
                        //     ? { backgroundColor: "#00000050" }
                        //     : {}
                        // }
                      >
                        {item}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.buttonBox}>
            <button className={styles.cancel} onClick={close}>
              Cancel
            </button>
            <button className={styles.confirm} onClick={() => onSubmit()}>
              Confirm
            </button>
          </div>
        </>
      ) : (
        <div className={styles.child}>
          <div className={styles.cross} onClick={close}>
            <IoIosClose size={35} color={"#808080"} />
          </div>
          <p className={styles.contactForm}>Import Data for "Tasks Form"</p>
          <div
            className={styles.dragBox}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => {
              e.preventDefault();
              upload(e.dataTransfer.files[0]);
            }}
          >
            <IoMdDocument size={100} color={"#808080"} />
            <p>Drag Your Files Here</p>
          </div>
          <div className={styles.selectBox}>
            <label htmlFor="file-input" className={styles.uploadButton}>
              Upload File
            </label>
            <input
              id="file-input"
              className={styles.select}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={(e: any) => upload(e.target.files[0])}
            />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ImportTasksModal;

function mapTasks(val: any[], map: { [key: string]: string; }, dispatcher: Dispatch<any>, close: () => void, arg4: (data: boolean) => void, organization_id: string, usersList: any[], arg7: string) {
    throw new Error("Function not implemented.");
}

