import React, { FunctionComponent, useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./ColumnManager.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import classNames from "classnames";

type props = {
  columnsList: any[];
  open: boolean;
  close: () => void;
  onChangeColumns?: (changeList: []) => void;
  toggleAllColumns?: any;
};

var row: any;

const ColumnManagerModal: FunctionComponent<props> = ({
  columnsList,
  open,
  close,
  onChangeColumns,
  toggleAllColumns,
}) => {
  const [searchQuery, setsearchQuery] = useState("");
  const [sample, setSample] = useState<any[]>([]);

  useEffect(() => {
    let data = [...columnsList];
    setSample(data);
  }, [columnsList]);

  const start = (event: any) => {
    row = event.target;
  };
  const dragover = (event: any) => {
    var e = event;
    e.preventDefault();
    let children = Array.from(e.target.parentNode.parentNode.children);
    if (children.length === columnsList.length) {
      if (children.indexOf(e.target.parentNode) > children.indexOf(row)) {
        e.target.parentNode.after(row);
        const content = reorder(
          sample,
          children.indexOf(row),
          children.indexOf(e.target.parentNode)
        );
        setSample(content);
      } else {
        e.target.parentNode.before(row);
        const content = reorder(
          sample,

          children.indexOf(row),
          children.indexOf(e.target.parentNode)
        );
        setSample(content);
      }
    }
  };

  const reorder = (list: any, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onSave = () => {
    let data: any = [];
    sample.map((item) => data.push(item.id));
    onChangeColumns && onChangeColumns(data);
    close();
  };

  const onCancel = () => {
    close();
  };

  const onReset = () => {
    let data = [...columnsList];
    toggleAllColumns(false);
    setSample(data);
  };

  const filterClass = classNames(styles.parent, {
    [styles.showColumnAnim]: open === true,
  });

  return (
    <Modal
      style={{ overlay: { zIndex: 100 } }}
      isOpen={open}
      className={filterClass}
      overlayClassName={styles.overlay}
      onRequestClose={close}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div className={styles.headContainer}>
        <p className={styles.manageText}>Manage Columns</p>
        <div className={styles.searchBox}>
          <input
            className={styles.searchText}
            placeholder="Search"
            onChange={(val) => setsearchQuery(val.target.value)}
          />
          <AiOutlineSearch />
        </div>
      </div>

      <div className={styles.listContainer}>
        {sample.map((item: any) => {
          if (item.Header.toLowerCase().includes(searchQuery.toLowerCase())) {
            return (
              <div
                key={item.id}
                className={styles.child}
                draggable={true}
                onDragStart={start}
                onDragOver={dragover}
              >
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  {...item.getToggleHiddenProps()}
                />
                <p className={styles.text}>{item.Header}</p>
              </div>
            );
          }
        })}
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.cancelButton} onClick={onCancel}>
          Cancel
        </button>
        <button className={styles.resetButton} onClick={onReset}>
          Reset
        </button>
        <button className={styles.saveButton} onClick={onSave}>
          Save
        </button>
      </div>
    </Modal>
  );
};

export default ColumnManagerModal;
