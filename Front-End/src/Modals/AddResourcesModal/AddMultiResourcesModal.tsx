import React, { FunctionComponent, useState } from "react";
import Modal from "react-modal";
import styles from "./AddResourceModal.module.css";
import { IoIosClose } from "react-icons/io";

type props = {
  open: boolean;
  close: () => void;
  heading: string[];
  onSave: (v: any) => void;
};

const AddMultiResources: FunctionComponent<props> = ({
  open,
  close,
  heading,
  onSave,
}) => {
  const [value, setValue] = useState("");
  return (
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
      {/* <p className={styles.heading}>{heading}</p> */}
    {heading.map((head:any)=>(
 <div className={styles.nameBox}>
 <span className={styles.name}>{head}</span>
 <input
   className={styles.input}
   placeholder={`Enter ${head}`}
   onChange={(event) => setValue(event.target.value)}
 />
 <br/>
 </div> 
    ))}
      <div className={styles.button}>
        <button className={styles.cancel} onClick={close}>
          Cancel
        </button>
        <button className={styles.change} onClick={() => onSave(value)}>
          Save
        </button>
      </div>
    </Modal>
  );
};

export default AddMultiResources;
