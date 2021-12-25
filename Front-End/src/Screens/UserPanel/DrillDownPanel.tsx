import React, { FunctionComponent, useEffect, useState } from "react";
import TopBar from "../../Components/TopBar/Topbar";
import commonStyle from "../../Components/common.module.css";
import { CONTACT_COLUMNS } from "../../Values/tables";
// import CustomTable from "../../Components/CustomTable/CustomTable";
// import { getDataFromRoute } from "../../Services/contacts";
import { useDispatch } from "react-redux";
import { setClearFilter } from "../../Components/Redux/actions";

type props = { history: any; user: any };

const DrilldownPanel: FunctionComponent<props> = ({ history, user }) => {
  const [searchedItem, setsearchedItem] = useState("");
  const [columnModal, setColumnModal] = useState(false);
  const [filterData, setFilterData] = useState<any[] | undefined>(undefined);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [selectedRowsData, setSelectedRowsData] = useState<any[]>([]);
  const dispatcher = useDispatch();

  useEffect(() => {
    var key: any;
    for (var i = 0; i < localStorage.length; i++) {
      key = localStorage.key(i);

      if (key !== "columns" && key !== "drilldownData") {
        localStorage.removeItem(key);
      }
    }
    dispatcher(setClearFilter(true));
    const savedData = localStorage.getItem("drilldownData");
    if (savedData) {
    //   setFilterData(getDataFromRoute(JSON.parse(savedData)));
    }
  }, []);
  return (
    <>
      <div className={commonStyle.topBar}>
        <TopBar
          history={history}
          title={"drilldown"}
          path={"/addContacts"}
          onChange={(val) => setsearchedItem(val)}
          filterText={"Status"}
          setColumnModal={(data) => setColumnModal(data)}
          show={true}
          showStatusBox={true}
        />
      </div>

      <div className={commonStyle.parent}>
        {/* <CustomTable */}
        {/* //   tableColumns={CONTACT_COLUMNS} */}
        {/* //   tableRows={filterData} */}
        {/* //   selectedRows={selectedRows} */}
        {/* //   setSelectedRows={(data: React.SetStateAction<any[]>) => setSelectedRows(data)} */}
        {/* //   tableType="DrillDown" */}
        {/* //   showColumnModal={columnModal} */}
        {/* //   hideColumnModal={() => setColumnModal(false)} */}
        {/* //   selectedRowsData={selectedRowsData} */}
        {/* //   setSelectedRowsData={(data: React.SetStateAction<any[]>) => setSelectedRowsData(data)} */}
        {/* //   setSearchedItem={(val: React.SetStateAction<string>) => setsearchedItem(val)} */}
        {/* // /> */}
      </div>
    </>
  );
};

export default DrilldownPanel;
