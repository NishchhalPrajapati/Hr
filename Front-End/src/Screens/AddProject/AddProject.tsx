import React, { useRef, useState, useEffect } from "react";
import styles from "./AddProject.module.css";
import { AiOutlineClose } from "react-icons/ai";
import TextInput from "../../Components/TextInput/TextInput";
import { connect, useDispatch } from "react-redux";
// import { createProject } from "../../Services/contacts";
import Dropdown from "../../Components/DropDown/Dropdown";
import Loading from "../../Components/Loading/Loading";
import { showSnackbarAction } from "../../Components/Redux/actions";

const AddProject = ({ history, user }: any) => {
  const dispatcher = useDispatch();
  const projectNameRef: any = useRef();
  const developerNameRef: any = useRef();
  const reraLinkRef: any = useRef();
  const walkthroughLinkRef: any = useRef();
  const addressRef: any = useRef();
  const [propertyTypeSelected, setPropertyTypeSelected] = useState<any>({
    label: "Select",
    value: "Select",
  });
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    let data = ["Commercial", "Residential"];
    setPropertyTypes(data);
  }, []);

  useEffect(() => {
    window.onbeforeunload = function () {
      return "Are you really want to perform the action?";
    };
  }, []);

  const checkProject = () => {
    if (projectNameRef.current.value === "") {
      dispatcher(showSnackbarAction("Please Enter Project Name", "error"));
      return false;
    } else if (developerNameRef.current.value === "") {
      dispatcher(showSnackbarAction("Please Enter Developer Name", "error"));
      return false;
    } else if (addressRef.current.value === "") {
      dispatcher(showSnackbarAction("Please Enter Address", "error"));
      return false;
    } else if (walkthroughLinkRef.current.value === "") {
      dispatcher(showSnackbarAction("Please Enter Walkthrough Link", "error"));
      return false;
    } else if (
      propertyTypeSelected.label === "Select" ||
      propertyTypeSelected.label === ""
    ) {
      dispatcher(showSnackbarAction("Please Enter Property Type", "error"));
      return false;
    } else {
      return true;
    }
  };

  const create = () => {
    setLoad(true);
    let check = false;
    check = checkProject();
    if (check === true) {
    //   createProject(
        // user.organization_id,
        // projectNameRef.current.value,
        // developerNameRef.current.value,
        // addressRef.current.value,
        // reraLinkRef.current.value,
        // walkthroughLinkRef.current.value,
        // propertyTypeSelected.label,
        // user.user_first_name + " " + user.user_last_name,
        // dispatcher,
        // history,
        // (data: boolean) => setLoad(data)
    //   );
    } else {
      setLoad(false);
    }
  };

  return (
    <div className={styles.parent}>
      {load === true && <Loading />}
      <div className={styles.child}>
        <div className={styles.headerView}>
          <p className={styles.heading}> Add Project Details</p>
          <AiOutlineClose
            className={styles.closeIcon}
            size={25}
            onClick={() => history.replace("/projects")}
          />
        </div>
        <div className={styles.box2}>
          <div className={styles.divide}>
            <div className={styles.title}>
              <p className={styles.one}>Developer Name</p>
              <p className={styles.two}>*</p>
            </div>
            <div>
              <TextInput
                title={"Enter developer name"}
                style={{ backgroundColor: "#fff" }}
                ref={developerNameRef}
              ></TextInput>
            </div>
          </div>
          <div className={styles.divide}>
            <div className={styles.title}>
              <p className={styles.one}>Project Name</p>
              <p className={styles.two}>*</p>
            </div>
            <div>
              <TextInput
                title={"Enter project name"}
                style={{ backgroundColor: "#fff" }}
                ref={projectNameRef}
              ></TextInput>
            </div>
          </div>
        </div>

        <div className={styles.box2}>
          <div className={styles.divide}>
            <div className={styles.title}>
              <p className={styles.one}>Property Type</p>
              <p className={styles.two}>*</p>
            </div>
            <div style={{ marginTop: "7px" }}>
              <Dropdown
                option={propertyTypes}
                selectedValue={propertyTypeSelected}
                setSelectedValue={(value) => setPropertyTypeSelected(value)}
              />
            </div>
          </div>

          <div className={styles.divide}>
            <div className={styles.title}>
              <p className={styles.one}>Address</p>
              <p className={styles.two}>*</p>
            </div>
            <div>
              <TextInput
                title={"Enter address"}
                style={{ backgroundColor: "#fff" }}
                ref={addressRef}
              />
            </div>
          </div>
        </div>

        <div className={styles.box2}>
          <div className={styles.divide}>
            <div className={styles.title}>
              <p className={styles.one}>Rera Link</p>
            </div>
            <div>
              <TextInput
                title={"Enter rera link"}
                style={{ backgroundColor: "#fff" }}
                ref={reraLinkRef}
              />
            </div>
          </div>

          <div className={styles.divide}>
            <div className={styles.title}>
              <p className={styles.one}>Walkthrough Link</p>
              <p className={styles.two}>*</p>
            </div>
            <div>
              <TextInput
                title={"Enter walkthrough link"}
                style={{ backgroundColor: "#fff" }}
                ref={walkthroughLinkRef}
              />
            </div>
          </div>
        </div>

        <button className={styles.button} onClick={() => create()}>
          Submit
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state.user.data,
  };
};

export default connect(mapStateToProps)(AddProject);
