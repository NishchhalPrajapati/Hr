import moment from "moment";
import { setFilterObject } from "../Components/Redux/actions";

export const getDateString = (timeStamp: any) => {
  if (timeStamp) {
    const utcDate = moment.utc(timeStamp.toDate());
    const localDate = moment(utcDate).local();
    return localDate.format("DD MMM YY, LT");
  } else {
    return "";
  }
};
export const getFilterObject = (
  data: { [key: string]: any }[],
  dispatcher: any
) => {
  const finalData: { [key: string]: string[] } = {};
  data.forEach((item) => {
    Object.keys(item).forEach((key) => {
      let value = item[key];
      if (item[key]?.toDate) {
        value = getDateString(item[key]);
      } else if (key === "user_first_name") {
        value = item[key] + " " + item["user_last_name"];
        key = "Name";
      } else if (key === "admin_first_name") {
        value = item[key] + " " + item["admin_last_name"];
        key = "Admin Name";
      } else if (key === "transfer_status") {
        if (item[key] === false) {
          value = "False";
        } else if (item[key] === true) {
          value = "True";
        }
      }

      if (finalData[key]) {
        if (!finalData[key].includes(value)) {
          finalData[key].push(value);
        }
      } else {
        finalData[key] = [value];
      }
    });
  });

  dispatcher(setFilterObject(finalData));
};

export const getFilterBranch = (data: { [key: string]: any }[]) => {
  const finalData: { [key: string]: string[] } = {};
  data.forEach((item) => {
    Object.keys(item).forEach((key) => {
      let value = item[key];
      if (item[key]?.toDate) {
        value = getDateString(item[key]);
      } else if (key === "user_first_name") {
        value = item[key] + " " + item["user_last_name"];
        key = "Name";
      } else if (key === "admin_first_name") {
        value = item[key] + " " + item["admin_last_name"];
        key = "Admin Name";
      }

      if (finalData[key]) {
        if (!finalData[key].includes(value)) {
          finalData[key].push(value);
        }
      } else {
        finalData[key] = [value];
      }
    });
  });

  return finalData;
};

export const getDateAndTime = (timeStamp: string, format: string) => {
  const utcDate = moment.utc(timeStamp);
  const localDate = moment(utcDate).local();
  return localDate.format(format);
};

export const searchUserItem = (itemList: any[], searchQuery: string) => {
  let data = [...itemList];
  if (searchQuery.length !== 0) {
    if (searchQuery.match(/^[0-9]+$/) != null) {
      data = data.filter((item) => item.contact_no.includes(searchQuery));
    } else {
      data = data.filter((item) =>
        String(item.user_first_name + item.user_last_name)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }
  }
  return data;
};

export const searchAPIItem = (itemList: any[], searchQuery: string) => {
  let data = [...itemList];
  if (searchQuery.length !== 0) {
    if (searchQuery.match(/^[0-9]+$/) != null) {
    } else {
      data = data.filter((item) =>
        item.source.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  }
  return data;
};

export const searchColumnItem = (itemList: any[], searchQuery: string) => {
  let data = [...itemList];
  if (searchQuery.length !== 0) {
    if (searchQuery.match(/^[0-9]+$/) != null) {
    } else {
      data = data.filter((item) =>
        item.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  }
  return data;
};

export const searchOrganizationItem = (
  itemList: any[],
  searchQuery: string
) => {
  let data = [...itemList];
  if (searchQuery.length !== 0) {
    if (searchQuery.match(/^[0-9]+$/) != null) {
      data = data.filter((item) => item.mobile_number.includes(searchQuery));
    } else {
      data = data.filter((item) =>
        item.organization_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  }
  return data;
};

export const searchContacts = (filterData: any[], searchedItem: string) => {
  let data = [...filterData];
  if (searchedItem.match(/^[0-9]+$/) != null) {
    data = data.filter((item) => item.contact_no.includes(searchedItem));
  } else {
    data = data.filter((item) =>
      item.customer_name.toLowerCase().includes(searchedItem.toLowerCase())
    );
  }
  return data;
};

export const searchCallLogs = (filterData: any[], searchedItem: string) => {
  let data = [...filterData];
  if (searchedItem.match(/^[0-9]+$/) != null) {
    // data = data.filter((item) => item.contact_no.includes(searchedItem));
  } else {
    data = data.filter((item) =>
      item.created_by.toLowerCase().includes(searchedItem.toLowerCase())
    );
  }
  return data;
};

export const searchTaskItem = (itemList: any[], searchQuery: string) => {
  let data = [...itemList];
  if (searchQuery.length !== 0) {
    data = data.filter((item) =>
      item.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  return data;
};

export const searchProjectItem = (itemList: any[], searchQuery: string) => {
  let data = [...itemList];
  if (searchQuery.length !== 0) {
    data = data.filter((item) =>
      item.project_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  return data;
};

export const filterStatus = (itemsList: any[], status: string) => {
  let data = [...itemsList];
  if (status !== "ALL") {
    data = data.filter((item) => item.status === status);
  }
  return data;
};

export const filterTaskStatus = (itemsList: any[], status: string) => {
  let data = [...itemsList];
  if (status !== "ALL") {
    data = data.filter((item) => item.status === status);
  }
  return data;
};

export const filterProjectStatus = (itemsList: any[], status: string) => {
  let data = [...itemsList];
  if (status !== "ALL") {
    data = data.filter((item) => item.property_type === status);
  }
  return data;
};

export const properFormat = (name: string) => {
  if (typeof name !== "string") {
    return name;
  }
  if (name === "CALLBACK") {
    return "Call Back";
  }
  return name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
};

export const sortAnalytics = (a: any, b: any) => {
  if (a.Total > b.Total) {
    return -1;
  } else {
    return 1;
  }
};

export const chunk = (arr: any[], chunkSize: number) => {
  if (chunkSize <= 0) {
    return [];
  }
  var R = [];
  for (var i = 0, len = arr.length; i < len; i += chunkSize)
    // R.push(arr.slice(i, i + chunkSize));
  return R;
};

export const timer = (ms: number) => {
  return new Promise((res) => setTimeout(res, ms));
};
