import React, { FunctionComponent, useState } from "react";
import Modal from "react-modal";
import styles from "./AddResourceModal.module.css";
import { IoIosClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import axios from "axios";
import { async } from "@firebase/util";
type props = {
  open: boolean;
  close: () => void;
  heading: string;
  title: string;
  onSave?: (v: any) => void;
  name?:any
};

const AddResources: FunctionComponent<props> = ({
  open,
  close,
  heading,
  title,
  name
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit =async(formdata)=>{
    formdata.Organization="61c08377ca5d0b615f9a9a12"
    
    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post<any>(
      "/api/Resourse/addResourseModule",
      formdata,
      config
    );
    alert(data.message)
  }
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
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.icon} onClick={close}>
        <IoIosClose size={35} color={"#808080"} />
      </div>
      <p className={styles.heading}>{heading}</p>
      <div className={styles.nameBox}>
        <span className={styles.name}>{title}</span>
        <input
          className={styles.input}
          placeholder={title}
          {...register(`${name}`)}
        />
      </div>
      <div className={styles.button}>
        <button className={styles.cancel} onClick={close}>
          Cancel
        </button>
        <input type="submit" value="Save" />
         
      </div>
      </form>
    </Modal>
  );
};

export default AddResources;
