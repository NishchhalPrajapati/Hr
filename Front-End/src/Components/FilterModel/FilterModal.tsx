import React, {
    FunctionComponent,
    useEffect,
    useState,
    useRef,
    useCallback,
  } from "react";
  import styles from "./FilterModal.module.css";
  import { AiOutlineArrowUp } from "react-icons/ai";
  import { AiOutlineArrowDown } from "react-icons/ai";
  import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
  import { Checkbox } from "@material-ui/core";
  import { connect, useDispatch } from "react-redux";
  import classNames from "classnames";
  import InfiniteScroll from "react-infinite-scroll-component";
  import { dateFieldList } from "../../Values/tables";
  import moment from "moment";
  import { setClearFilter } from "../../Components/Redux/actions";
  
  type props = {
    expand: boolean;
    column: any;
    filterObject: { [key: string]: string[] };
    hide: () => void;
    filterId: string;
    globalClearFilter: boolean;
  };
  
  const FilterModal: FunctionComponent<props> = ({
    column,
    filterObject,
    expand,
    hide,
    filterId,
    globalClearFilter,
  }) => {
    const filterRef = useRef(null);
    const [filterRow, setFilterRow] = useState<any[]>([]);
    const [dateArray, setDateArray] = useState<Date[]>([]);
    const [sort, setSort] = useState(0);
    const [searchedItem, setsearchedItem] = useState("");
    const [filterItems, setFilterItems] = useState<string[]>([]);
    const dispatcher = useDispatch();
    const clearFilter = () => {
      column.clearSortBy();
      setSort(0);
      setFilterRow([]);
      setDateArray([]);
      localStorage.setItem(filterId, JSON.stringify([]));
      localStorage.setItem(filterId + "sort", "0");
      column.setFilter(undefined);
      hide();
    };
    const close = () => {
      hide();
      setCurrentLimit(5);
    };
  
    useEffect(() => {
      if (globalClearFilter === true) {
        clearFilter();
        dispatcher(setClearFilter(false));
      }
    }, [globalClearFilter]);
  
    useEffect(() => {
      const savedFilters = localStorage.getItem(filterId);
      if (savedFilters) {
        if (dateFieldList.includes(column.Header)) {
          let dates = JSON.parse(savedFilters);
          if (dates?.length === 2) {
            let newdates = [moment(dates[0]).toDate(), moment(dates[1]).toDate()];
  
            setDateArray(newdates);
            setFilterRow(newdates);
          }
        } else {
          setFilterRow(JSON.parse(savedFilters));
        }
      }
      const savedSort = localStorage.getItem(filterId + "sort");
  
      if (savedSort) {
        setTimeout(() => {
          if (savedSort === "1") {
            setSort(1);
          } else if (savedSort === "2") {
            setSort(2);
          } else {
            setSort(0);
          }
        }, 100);
      } else {
        setTimeout(() => {
          setSort(0);
        }, 100);
      }
      // eslint-disable-next-line
    }, []);
  
    useEffect(() => {
      const savedSort = localStorage.getItem(filterId + "sort");
      if (column.isSorted === false && savedSort === null) setSort(0);
      // eslint-disable-next-line
    }, [column.isSorted]);
  
    useEffect(() => {
      if (sort === 1) {
        column.toggleSortBy(false);
      } else if (sort === 2) {
        column.toggleSortBy(true);
      }
      // eslint-disable-next-line
    }, [filterObject]);
  
    useEffect(() => {
      if (sort === 1) {
        column.toggleSortBy(false);
      } else if (sort === 2) {
        column.toggleSortBy(true);
      }
      // eslint-disable-next-line
    }, [sort]);
  
    useEffect(() => {
      if (filterRow.length === 0) {
        column.setFilter([]);
      } else {
        column.setFilter(filterRow);
      }
    }, [filterRow, column, filterObject]);
  
    useEffect(() => {
      if (filterObject[column.id]) {
        setFilterItems(filterObject[column.id]);
      }
    }, [column.id, filterObject]);
  
    useEffect(() => {
      if (searchedItem.length === 0) {
        setFilterItems(filterObject[column.id]);
      } else {
        const data = filterItems.filter((item) =>
          item.toLowerCase().includes(searchedItem.toLowerCase())
        );
        setFilterItems(data);
      }
      // eslint-disable-next-line
    }, [searchedItem]);
  
    const handleClickOutside = useCallback((event: any) => {
      const element: any = filterRef.current;
      if (element && !element.contains(event.target)) {
        hide();
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
  
    const filterClass = classNames(styles.parent, {
      [styles.showFilterAnim]: expand === true,
    });
    const [currentLimit, setCurrentLimit] = useState(5);
  
    const setDateFilter = (date: Date | null, type: "from" | "to") => {
      if (date === null) {
        return;
      }
      let tempDateArray = [...dateArray];
      if (type === "from") {
        const newDate = moment(date).startOf("day").toDate();
        tempDateArray[0] = newDate;
      } else {
        const newDate = moment(date).endOf("day").toDate();
        tempDateArray[1] = newDate;
      }
  
      setDateArray(tempDateArray);
      if (tempDateArray[0] && tempDateArray[1]) {
        setFilterRow(tempDateArray);
        localStorage.setItem(filterId, JSON.stringify(tempDateArray));
      }
    };
    return (
      <div className={filterClass} ref={filterRef}>
        <div
          className={styles.child}
          onClick={() => {
            setSort(1);
            hide();
            localStorage.setItem(filterId + "sort", "1");
          }}
        >
          <AiOutlineArrowUp color={sort === 1 ? "#279ea0" : "#000"} size={20} />
          <p className={styles.text}>
            {column.Header === "Lead Assign Date & Time"
              ? "Oldest to latest"
              : column.Header === "Created Date & Time"
              ? "Oldest to latest"
              : "Sort A to Z"}
          </p>
        </div>
        <div
          className={styles.child}
          onClick={() => {
            setSort(2);
            hide();
            localStorage.setItem(filterId + "sort", "2");
          }}
        >
          <AiOutlineArrowDown color={sort === 2 ? "#279ea0" : "#000"} size={20} />
          <p className={styles.text}>
            {column.Header === "Lead Assign Date & Time"
              ? "Latest to Oldest"
              : column.Header === "Created Date & Time"
              ? "Latest to Oldest"
              : "Sort Z to A"}
          </p>
        </div>
        <div className={styles.line} />
        {dateFieldList.includes(column.Header) ? (
          <div className={styles.dateInputContainer}>
            <p
              className={styles.optionText}
              style={{ marginTop: "5px", marginBottom: "4px" }}
            >
              From:
            </p>
            <input
              type="date"
              id="from"
              name="from"
              value={
                dateArray[0] ? moment(dateArray[0]).format("YYYY-MM-DD") : ""
              }
              onChange={(e) => {
                setDateFilter(e.target.valueAsDate, "from");
              }}
            />
            <p
              className={styles.optionText}
              style={{ marginTop: "12px", marginBottom: "4px" }}
            >
              To:
            </p>
            <input
              type="date"
              id="to"
              name="to"
              value={
                dateArray[1] ? moment(dateArray[1]).format("YYYY-MM-DD") : ""
              }
              onChange={(e) => setDateFilter(e.target.valueAsDate, "to")}
            />
          </div>
        ) : (
          <>
            <div className={styles.searchBox}>
              <input
                className={styles.searchText}
                placeholder={"Search"}
                onChange={(val) => setsearchedItem(val.target.value)}
                value={searchedItem}
              />
              {searchedItem.length === 0 ? (
                <AiOutlineSearch color={"#279ea0"} size={15} />
              ) : (
                <AiOutlineClose
                  color={"#ff0000"}
                  size={15}
                  onClick={() => setsearchedItem("")}
                />
              )}
            </div>
  
            <div className={styles.resultBox}>
              <InfiniteScroll
                height={180}
                dataLength={currentLimit}
                next={() => setCurrentLimit(currentLimit + 5)}
                hasMore={filterItems?.length > currentLimit}
                loader={<h4>Loading...</h4>}
                className={styles.infiniteScroll}
              >
                {filterItems &&
                  filterItems.slice(0, currentLimit).map((item, index) => (
                    <div key={index} className={styles.checkView}>
                      <Checkbox
                        size="small"
                        onChange={(e) => {
                          const data = [...filterRow];
                          if (e.target.checked) {
                            data.push(item);
                            setFilterRow(data);
                          } else if (!e.target.checked) {
                            const val = data.indexOf(item);
                            if (val > -1) {
                              data.splice(val, 1);
                            }
                            setFilterRow(data);
                            column.setFilter(undefined);
                          }
  
                          localStorage.setItem(filterId, JSON.stringify(data));
                        }}
                        checked={filterRow.includes(item)}
                      />
                      <p className={styles.optionText}>{item}</p>
                    </div>
                  ))}
              </InfiniteScroll>
            </div>
          </>
        )}
  
        <div className={styles.buttonBox}>
          <button className={styles.clearButton} onClick={clearFilter}>
            Clear Filter
          </button>
          <button className={styles.applyButton} onClick={close}>
            Close
          </button>
        </div>
      </div>
    );
  };
  
  const mapStateToProps = (state: any) => {
    return {
      filterObject: state.filterObject,
      globalClearFilter: state.clearFilter.clear,
    };
  };
  
  export default connect(mapStateToProps)(FilterModal);
  