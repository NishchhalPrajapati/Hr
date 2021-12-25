import Modal from "react-modal";
import React, { Dispatch, FunctionComponent, useEffect, useState } from "react";
import styles from "../../Modals/ImportModal/ImportModal.module.css";
import { Checkbox } from "@material-ui/core";
import { IoIosClose, IoMdDocument } from "react-icons/io";
import { handleFileUpload } from "../../Services/contacts";
import { useDispatch } from "react-redux";
import Loading from "../../Components/Loading/Loading";
import { showSnackbarAction } from "../../Components/Redux/actions";
import {
  emailList,
  leadSource,
  nameList,
  ownerList,
  phoneList,
} from "../../Values/tables";
// import { fetchResources } from "../../../Services/resources";

type props = {
  open: boolean;
  close: () => void;
  organization_id: string;
  history: any;
  usersList: any[];
  user: any;
};

const ImportModal: FunctionComponent<props> = ({
  open,
  close,
  organization_id,
  history,
  usersList,
  user,
}) => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [select, setSelected] = useState<any[]>([]);
  const [load, setLoad] = useState(false);
  const [leadSourceList, setLeadSourceList] = useState<any[] | undefined>(
    undefined
  );
  const [projectList, setProjectsList] = useState<any[] | undefined>(undefined);
  const [locationList, setLocationsList] = useState<any[] | undefined>(
    undefined
  );
  const [budgetList, setBudgetsList] = useState<any[] | undefined>(undefined);
  const [carouselList, setCarouselList] = useState<any[] | undefined>(
    undefined
  );
  const [comTypes, setComTypes] = useState<any[] | undefined>(undefined);
  const [resTypes, setResTypes] = useState<any[] | undefined>(undefined);

  // const [colSelect, setColSelect] = useState<any[]>([]);
  const [colName, setColName] = useState<{ [key: string]: string }>({});

  const [choice, setChoice] = useState([
    { name: "Customer Name", selected: false },
    { name: "Mobile No.", selected: false },
    { name: "Stage", selected: false },
    { name: "Email ID", selected: false },
    { name: "Budget", selected: false },
    { name: "Call Back Reason", selected: false },
    { name: "Project", selected: false },
    { name: "Property Type", selected: false },
    { name: "Property Stage", selected: false },
    { name: "Next Follow Up Type", selected: false },
    { name: "Next Follow Up Date & Time", selected: false },
    { name: "Location", selected: false },
    { name: "Lost Reason", selected: false },
    { name: "Not interested reason", selected: false },
    { name: "Other Lost Reason", selected: false },
    { name: "Other Not interested reason", selected: false },
    { name: "Lead Source", selected: false },
    { name: "Created By", selected: false },
    { name: "Created At", selected: false },
    { name: "Owner", selected: false },
    { name: "Lead Assign At", selected: false },
    { name: "Stage Change At", selected: false },
    { name: "Country Code", selected: false },
    { name: "Alternate No.", selected: false },
    { name: "Property Sub Type", selected: false },
    { name: "Addset", selected: false },
    { name: "Campaign", selected: false },
    { name: "Notes", selected: false },
    { name: "Inventory Type", selected: false },
  ]);

  useEffect(() => {
    let data: {} = {};
    columns.forEach((item: any, index: number) => {
      data = {
        ...data,
        [item.name]: nameList.includes(item.name)
          ? "Customer Name"
          : emailList.includes(item.name)
          ? "Email ID"
          : phoneList.includes(item.name)
          ? "Mobile No."
          : ownerList.includes(item.name)
          ? "Owner"
          : leadSource.includes(item.name)
          ? "Lead Source"
          : "",
      };
    });
    setColName(data);
  }, [columns]);

  useEffect(() => {
    if (organization_id) {
      const unsub = fetchResources(
        (data) => setLocationsList(data),
        (data) => setBudgetsList(data),
        (data) => setCarouselList(data),
        (data) => setLeadSourceList(data),
        (data) => setComTypes(data),
        (data) => setResTypes(data),
        organization_id
      );

      const unsubs = fetchProjects(
        (data) => setProjectsList(data),
        organization_id
      );

      return () => {
        // unsub();
        // unsubs();
      };
    }
  }, [organization_id]);

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

  const upload = async (file: any) => {
    setLoad(true);
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
    let dataList: any[] = [];
    leadSourceList?.map((item) => {
      dataList.push(item.leadSource);
    });
    let projects: any[] = [];

    projectList?.map((item) => {
      projects.push(item.project_name);
    });
    let locations: any[] = [];
    locationList?.map((item) => {
      locations.push(item.location_name);
    });
    let budgets: any[] = [];
    budgetList?.map((item) => {
      budgets.push(item.budget);
    });
    if (dataList.length > 0 && resTypes && comTypes) {
      mapContactsTemplate(
        val,
        map,
        organization_id,
        dispatcher,
        close,
        usersList,
        (data: boolean) => setLoad(data),
        dataList,
        user.user_first_name + " " + user.user_last_name,
        projects,
        locations,
        budgets,
        user.country ? user.country : "India",
        resTypes,
        comTypes
      );
    } else {
      dispatcher(
        showSnackbarAction("No Lead Source Added In Resources", "warning")
      );
      setLoad(false);
    }
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
          <p className={styles.contactForm}>Import Data for "Contact Form"</p>
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
                          }}
                        >
                          <option>
                            {nameList.includes(item.name)
                              ? "Customer Name"
                              : emailList.includes(item.name)
                              ? "Email ID"
                              : phoneList.includes(item.name)
                              ? "Mobile No."
                              : ownerList.includes(item.name)
                              ? "Owner"
                              : leadSource.includes(item.name)
                              ? "Lead Source"
                              : "Select"}
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
                        onChange={(e) => {
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
                      <td className={styles.td} key={index}>
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
          {load === true && <Loading />}
          <div className={styles.cross} onClick={close}>
            <IoIosClose size={35} color={"#808080"} />
          </div>
          <p className={styles.contactForm}>Import Data for "Contact Form"</p>
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

export default ImportModal;

function fetchResources(arg0: (data: any) => void, arg1: (data: any) => void, arg2: (data: any) => void, arg3: (data: any) => void, arg4: (data: any) => void, arg5: (data: any) => void, organization_id: string) {
    throw new Error("Function not implemented.");
}

function fetchProjects(arg0: (data: any) => void, organization_id: string) {
    throw new Error("Function not implemented.");
}

function mapContactsTemplate(val: any[], map: { [key: string]: string; }, organization_id: string, dispatcher: Dispatch<any>, close: () => void, usersList: any[], arg6: (data: boolean) => void, dataList: any[], arg8: string, projects: any[], locations: any[], budgets: any[], arg12: any, resTypes: any[], comTypes: any[]) {
    throw new Error("Function not implemented.");
}

