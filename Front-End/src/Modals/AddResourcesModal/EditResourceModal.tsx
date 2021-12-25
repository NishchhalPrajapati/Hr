import React, { FunctionComponent, useState } from "react";
import Modal from "react-modal";
import styles from "./AddResourceModal.module.css";
import { IoIosClose } from "react-icons/io";

type props = {
  open: boolean;
  close: () => void;
  heading: string;
  title: string;

  onSave: (v: any) => void;
};

const EditResources: FunctionComponent<props> = ({
  open,
  close,
  heading,
  title,
  onSave,
}) => {
  const [value, setValue] = useState(title);

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
      <p className={styles.heading}>{heading}</p>
      <div className={styles.nameBox}>
        <span className={styles.name}>{`Enter ${heading.split(" ")[1]}`}</span>
        <input
          className={styles.input}
          onChange={(event) => setValue(event.target.value)}
          value={value}
        />
      </div>
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

export default EditResources;
