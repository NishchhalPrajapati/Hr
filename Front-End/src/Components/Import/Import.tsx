import React, {
    FunctionComponent,
    useState,
    useRef,
    useEffect,
    useCallback,
  } from "react";
  import styles from "./Import.module.css";
  import { CSVLink } from "react-csv";
  import classNames from "classnames";
  import { connect, useDispatch } from "react-redux";
  import { showSnackbarAction } from "../Redux/actions";
  
  type props = {
    onClick?: () => void;
    setExpandImport: (data: boolean) => void;
    onExport?: () => any;
    onCallLogsImport?: () => any;
    onNotesImport?: () => any;
    onTasksImport?: () => any;
    expand: boolean;
    close: () => void;
    user: any;
    role: any;
  };
  
  const Import: FunctionComponent<props> = ({
    onClick,
    setExpandImport,
    onExport,
    onNotesImport,
    onCallLogsImport,
    onTasksImport,
    expand,
    close,
    role,
    user,
  }) => {
    const csvLink: any = useRef();
    const modalRef = useRef(null);
    const filterClass = classNames(styles.parent, {
      [styles.showAnim]: expand === true,
    });
    const [feilds, setFields] = useState([]);
    const dispatcher = useDispatch();
  
    useEffect(() => {
      setFields(onExport && onExport());
      // eslint-disable-next-line
    }, []);
  
    const handleClickOutside = useCallback((event: any) => {
      const element: any = modalRef.current;
      if (element && !element.contains(event.target)) {
        close();
      }
      // eslint-disable-next-line
    }, []);
  
    useEffect(() => {
      if (expand === true) {
        setTimeout(
          () => document.addEventListener("click", handleClickOutside),
          100
        );
      } else {
        document.removeEventListener("click", handleClickOutside);
      }
  
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
      // eslint-disable-next-line
    }, [expand]);

    return (
      <div
        className={filterClass}
        ref={modalRef}
        style={user.import !== true ? { height: "100px" } : {}}
      >
        {
          <>
            <div
              onClick={() => {
                if (feilds.length !== 0) {
                  csvLink.current.link.click();
                } 
                else {
                  dispatcher(
                    showSnackbarAction(
                      "Please Select The Records To Export",
                      "error"
                    )
                  );
                }
              }}
            >
            <p className={styles.importText}>Export</p>

              <CSVLink
                data={feilds}
                filename={"data.csv"}
                className={styles.importText}
                ref={csvLink}
                target="_blank"
              />
            </div>
            <div className={styles.line}></div>
          </>
        }
  
        <p
          className={styles.importText}
          onClick={() => {
            onClick && onClick();
            setExpandImport(false);
          }}
        >
          {role === "Lead Manager" || role === "Team Lead"
            ? "Import Contacts"
            : "Import Users"}
        </p>
  
        {user.import === true && (
          <>
            {onCallLogsImport && (
               <>
                <div className={styles.line}></div>
  
                <p
                   className={styles.importText}
                   onClick={() => {
                     setExpandImport(false);
                     onCallLogsImport && onCallLogsImport();
                   }}
                 >
                  Import Call Logs
                </p>
              </>
             )}
  
            {onNotesImport && (
               <>
                <div className={styles.line}></div>
                <p
                   className={styles.importText}
                   onClick={() => {
                     onNotesImport && onNotesImport();
                     setExpandImport(false);
                   }}
                 >
                  Import Notes
                </p>
              </>
             )}
  
            {onTasksImport && (
               <>
                <div className={styles.line}></div>
                <p
                  className={styles.importText}
                   onClick={() => {
                   onTasksImport && onTasksImport();
                   setExpandImport(false);
                   }}
                 >
                  Import Tasks
                </p>
              </>
             )}
          </>
        )}
      </div>
    );
  };
  
  const mapStateToProps = (state: any) => {
    return {
      user: state.user.data,
      role: state.user.role,
    };
  };
  
  export default connect(mapStateToProps)(Import);
  