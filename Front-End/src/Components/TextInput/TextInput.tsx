import React, { useEffect, useState } from "react";
import styles from "./TextInput.module.css";

type props = {
  title: string;
  children?: any;
  style?: any;
  validator?: (value: string) => string;
  length?: boolean;
  disabled?: boolean;
  value?: string;
};

const TextInput = React.forwardRef(
  (
    { title, children, style, validator, length, disabled, value }: props,
    ref: any
  ) => {
    const [errorMsg, setErrorMsg] = useState("");
    const [val, setVal] = useState("");

    useEffect(() => {
      if (value) setVal(value);
    }, [value]);

    return (
      <>
        <div className={styles.input} style={style}>
          {children}
          <input
            style={style}
            className={styles.inputText}
            type="text"
            name="name"
            placeholder={title}
            ref={ref}
            onBlur={(event) => {
              if (validator) {
                setErrorMsg(validator(ref.current.value));
              }
            }}
            maxLength={length === true ? 10 : undefined}
            readOnly={disabled}
            onChange={(e) => setVal(e.target.value)}
            value={val}
          />
        </div>
        {errorMsg.length !== 0 && <p className={styles.error}>{errorMsg}</p>}
      </>
    );
  }
);

export default TextInput;
