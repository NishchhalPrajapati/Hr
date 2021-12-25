import moment from "moment";
import { properFormat } from "./utils";

const getDateString = (value: any) => {
  const utcDate = moment.utc(value.toDate());
  const localDate = moment(utcDate).local();
  return localDate.format("DD MMM YY, LT");
};

function multiSelectFilter(rows: any, columnIds: any, filterValue: any) {
  // Filters only if filters are selected
  if (columnIds.includes("Name")) {
    return filterValue.length === 0
      ? rows
      : rows.filter((row: any) =>
          filterValue.includes(
            String(
              row.original["user_first_name"] +
                " " +
                row.original["user_last_name"]
            )
          )
        );
  } else if (columnIds.includes("Admin Name")) {
    return filterValue.length === 0
      ? rows
      : rows.filter((row: any) =>
          filterValue.includes(
            String(
              row.original["admin_first_name"] +
                " " +
                row.original["admin_last_name"]
            )
          )
        );
  } else {
    return filterValue.length === 0
      ? rows
      : rows.filter((row: any) =>
          filterValue.includes(String(row.original[columnIds]))
        );
  }
}

const compareDates = (filterValue: any[], field: any) => {
  if (filterValue[0] <= field.toDate() && filterValue[1] >= field.toDate()) {
    return true;
  } else {
    return false;
  }
};

function dateFilter(rows: any, columnIds: any, filterValue: any) {
  if (columnIds.includes("created_at")) {
    return filterValue.length === 0
      ? rows
      : rows.filter((row: any) =>
          compareDates(filterValue, row.original["created_at"])
        );
  } else if (columnIds.includes("lead_assign_time")) {
    return filterValue.length === 0
      ? rows
      : rows.filter((row: any) =>
          compareDates(filterValue, row.original["lead_assign_time"])
        );
  } else if (columnIds.includes("next_follow_up_date_time")) {
    return filterValue.length === 0
      ? rows
      : rows.filter(
          (row: any) =>
            row.original["next_follow_up_date_time"] &&
            row.original["next_follow_up_date_time"].toDate &&
            compareDates(filterValue, row.original["next_follow_up_date_time"])
        );
  } else if (columnIds.includes("stage_change_at")) {
    return filterValue.length === 0
      ? rows
      : rows.filter(
          (row: any) =>
            row.original["stage_change_at"] &&
            row.original["stage_change_at"].toDate &&
            compareDates(filterValue, row.original["stage_change_at"])
        );
  } else if (columnIds.includes("deactivated_at")) {
    return filterValue.length === 0
      ? rows
      : rows.filter(
          (row: any) =>
            row.original["deactivated_at"] &&
            row.original["deactivated_at"].toDate &&
            compareDates(filterValue, row.original["deactivated_at"])
        );
  } else if (columnIds.includes("activated_at")) {
    return filterValue.length === 0
      ? rows
      : rows.filter(
          (row: any) =>
            row.original["activated_at"] &&
            row.original["activated_at"].toDate &&
            compareDates(filterValue, row.original["activated_at"])
        );
  } else if (columnIds.includes("modified_at")) {
    return filterValue.length === 0
      ? rows
      : rows.filter(
          (row: any) =>
            row.original["modified_at"] &&
            row.original["modified_at"].toDate &&
            compareDates(filterValue, row.original["modified_at"])
        );
  } else if (columnIds.includes("due_date")) {
    return filterValue.length === 0
      ? rows
      : rows.filter(
          (row: any) =>
            row.original["due_date"] &&
            row.original["due_date"].toDate &&
            compareDates(filterValue, row.original["due_date"])
        );
  } else if (columnIds.includes("completed_at")) {
    return filterValue.length === 0
      ? rows
      : rows.filter(
          (row: any) =>
            row.original["completed_at"] &&
            row.original["completed_at"].toDate &&
            compareDates(filterValue, row.original["completed_at"])
        );
  }
}

export const ORGANIZATION_COLUMNS = [
  {
    Header: "Name",
    accessor: "organization_name",
    Cell: (props: any) => {
      return props.value
        .toLowerCase()
        .split(" ")
        .map(function (word: any) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Mobile No.",
    accessor: "mobile_number",
    filter: multiSelectFilter,
  },
  {
    Header: "Email ID",
    accessor: "email_id",
    Cell: (props: any) => {
      return props.value
        .toLowerCase()
        .split(" ")
        .map(function (word: any) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Status",
    accessor: "status",
    filter: multiSelectFilter,
  },
  {
    Header: "Address",
    accessor: "address",
    Cell: (props: any) => {
      return props.value
        .toLowerCase()
        .split(" ")
        .map(function (word: any) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
    },
    filter: multiSelectFilter,
  },
  {
    Header: "City",
    accessor: "city",
    Cell: (props: any) => {
      return props.value
        .toLowerCase()
        .split(" ")
        .map(function (word: any) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
    },
    filter: multiSelectFilter,
  },
  {
    Header: "State",
    accessor: "state",
    Cell: (props: any) => {
      return props.value
        .toLowerCase()
        .split(" ")
        .map(function (word: any) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Admin Name",
    accessor: (d: any) => `${d.admin_first_name} ${d.admin_last_name}`,
    Cell: (props: any) => {
      return props.value
        .toLowerCase()
        .split(" ")
        .map(function (word: any) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Admin Contact No.",
    accessor: "admin_contact_number",
    filter: multiSelectFilter,
  },
  {
    Header: "Admin Email",
    accessor: "admin_email_id",
    Cell: (props: any) => {
      return props.value
        .toLowerCase()
        .split(" ")
        .map(function (word: any) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
    },
    filter: multiSelectFilter,
  },
  {
    Header: "No. of Employees",
    accessor: "no_of_employees",
    filter: multiSelectFilter,
  },
  {
    Header: "Created Date & Time",
    accessor: "created_at",
    Cell: (props: any) => {
      const utcDate = moment.utc(props.value.toDate());
      const localDate = moment(utcDate).local();
      return localDate.format("DD MMM YY, LT");
    },

    sortType: (rowA: any, rowB: any, id: any, desc: any) => {
      if (rowA.values[id]?.toDate && rowB.values[id]?.toDate) {
        if (rowA.values[id].toDate() > rowB.values[id].toDate()) return 1;
        else return -1;
      } else {
        if (rowA.values[id]?.toDate === undefined && rowB.values[id]?.toDate) {
          return desc ? -1 : 1;
        } else if (
          rowA.values[id]?.toDate &&
          rowB.values[id]?.toDate === undefined
        ) {
          return desc ? 1 : -1;
        }
        return -1;
      }
    },
    filter: dateFilter,
  },
];

export const USER_COLUMNS = [
  {
    Header: "Name",
    accessor: (d: any) => `${d.user_first_name} ${d.user_last_name}`,
    Cell: (props: any) => {
      return props.value
        .toLowerCase()
        .split(" ")
        .map(function (word: any) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Mobile No.",
    accessor: "contact_no",
    filter: multiSelectFilter,
  },
  {
    Header: "Email ID",
    accessor: "user_email",

    filter: multiSelectFilter,
  },
  {
    Header: "Team",
    accessor: "team",

    filter: multiSelectFilter,
  },
  {
    Header: "Reporting To",
    accessor: "reporting_to",

    filter: multiSelectFilter,
  },
  {
    Header: "Designation",
    accessor: "designation",
    Cell: (props: any) => {
      return props.value
        .toLowerCase()
        .split(" ")
        .map(function (word: any) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Status",
    accessor: "status",
    filter: multiSelectFilter,
  },
  {
    Header: "Branch",
    accessor: "branch",
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return props.value;
      }
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Created By",
    accessor: "created_by",
    Cell: (props: any) => {
      return props.value
        .toLowerCase()
        .split(" ")
        .map(function (word: any) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Created Date & Time",
    accessor: "created_at",
    Cell: (props: any) => {
      const utcDate = moment.utc(props.value.toDate());
      const localDate = moment(utcDate).local();
      return localDate.format("DD MMM YY, LT");
    },
    sortType: (rowA: any, rowB: any, id: any, desc: any) => {
      if (rowA.values[id]?.toDate && rowB.values[id]?.toDate) {
        if (rowA.values[id].toDate() > rowB.values[id].toDate()) return 1;
        else return -1;
      } else {
        if (rowA.values[id]?.toDate === undefined && rowB.values[id]?.toDate) {
          return desc ? -1 : 1;
        } else if (
          rowA.values[id]?.toDate &&
          rowB.values[id]?.toDate === undefined
        ) {
          return desc ? 1 : -1;
        }
        return -1;
      }
    },
    filter: dateFilter,
  },
  {
    Header: "Deactivated At",
    accessor: "deactivated_at",
    Cell: (props: any) => {
      if (
        props.value === "" ||
        props.value === undefined ||
        props.value === null
      ) {
        return "";
      } else {
        const utcDate = moment.utc(props.value.toDate());
        const localDate = moment(utcDate).local();
        return localDate.format("DD MMM YY, LT");
      }
    },
    sortType: (rowA: any, rowB: any, id: any, desc: any) => {
      if (rowA.values[id]?.toDate && rowB.values[id]?.toDate) {
        if (rowA.values[id].toDate() > rowB.values[id].toDate()) return 1;
        else return -1;
      } else {
        if (rowA.values[id]?.toDate === undefined && rowB.values[id]?.toDate) {
          return desc ? -1 : 1;
        } else if (
          rowA.values[id]?.toDate &&
          rowB.values[id]?.toDate === undefined
        ) {
          return desc ? 1 : -1;
        }
        return -1;
      }
    },
    filter: dateFilter,
  },
  {
    Header: "Activated At",
    accessor: "activated_at",
    Cell: (props: any) => {
      if (
        props.value === "" ||
        props.value === undefined ||
        props.value === null
      ) {
        return "";
      } else {
        const utcDate = moment.utc(props.value.toDate());
        const localDate = moment(utcDate).local();
        return localDate.format("DD MMM YY, LT");
      }
    },
    sortType: (rowA: any, rowB: any, id: any, desc: any) => {
      if (rowA.values[id]?.toDate && rowB.values[id]?.toDate) {
        if (rowA.values[id].toDate() > rowB.values[id].toDate()) return 1;
        else return -1;
      } else {
        if (rowA.values[id]?.toDate === undefined && rowB.values[id]?.toDate) {
          return desc ? -1 : 1;
        } else if (
          rowA.values[id]?.toDate &&
          rowB.values[id]?.toDate === undefined
        ) {
          return desc ? 1 : -1;
        }
        return -1;
      }
    },
    filter: dateFilter,
  },
  {
    Header: "Profile",
    accessor: "profile",
    Cell: (props: any) => {
      return props.value
        .toLowerCase()
        .split(" ")
        .map(function (word: any) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
    },
    filter: multiSelectFilter,
  },
];

export const CONTACT_COLUMNS = [
  {
    Header: "Customer Name",
    accessor: "customer_name",
    Cell: (props: any) => {
      return properFormat(props.value);
    },
    filter: multiSelectFilter,
  },

  {
    Header: "Mobile No.",
    accessor: "contact_no",
    filter: multiSelectFilter,
  },
  {
    Header: "Alternate No.",
    accessor: "alternate_no",
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return props.value;
      }
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Country Code",
    accessor: "country_code",
    filter: multiSelectFilter,
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return properFormat(props.value);
      }
    },
  },

  {
    Header: "Email ID",
    accessor: "email",

    filter: multiSelectFilter,
  },
  {
    Header: "Stage",
    accessor: "stage",
    Cell: (props: any) => {
      return properFormat(props.value);
    },

    filter: multiSelectFilter,
  },
  {
    Header: "Owner",

    accessor: "contact_owner_email",

    filter: multiSelectFilter,
  },
  {
    Header: "Reporting To",

    accessor: "reporting_to",

    filter: multiSelectFilter,
  },
  {
    Header: "Call Back Reason",
    accessor: "call_back_reason",

    filter: multiSelectFilter,
  },
  {
    Header: "Property Type",
    accessor: "property_type",

    filter: multiSelectFilter,
  },
  {
    Header: "Property Sub Type",
    accessor: "property_sub_type",
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return properFormat(props.value);
      }
    },
    filter: multiSelectFilter,
  },

  {
    Header: "Property Stage",
    accessor: "property_stage",

    filter: multiSelectFilter,
  },
  {
    Header: "Location",
    accessor: "location",

    filter: multiSelectFilter,
  },
  {
    Header: "Project",
    accessor: "project",

    filter: multiSelectFilter,
  },
  {
    Header: "Budget",
    accessor: "budget",

    filter: multiSelectFilter,
  },
  {
    Header: "Inventory Type",
    accessor: "inventory_type",
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return properFormat(props.value);
      }
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Campaign",
    accessor: "campaign",
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return properFormat(props.value);
      }
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Add set",
    accessor: "addset",
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return properFormat(props.value);
      }
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Not Interested Reason",
    accessor: "not_int_reason",

    filter: multiSelectFilter,
  },

  {
    Header: "Lost Reason",
    accessor: "lost_reason",

    filter: multiSelectFilter,
  },
  {
    Header: "Other Not Interested Reason",
    accessor: "other_not_int_reason",

    filter: multiSelectFilter,
  },
  {
    Header: "Other Lost Reason",
    accessor: "other_lost_reason",

    filter: multiSelectFilter,
  },
  {
    Header: "Previous Owner",
    accessor: "previous_owner",

    filter: multiSelectFilter,
  },
  {
    Header: "Lead Source",
    accessor: "lead_source",

    filter: multiSelectFilter,
  },
  {
    Header: "Transfer Status",
    accessor: "transfer_status",
    Cell: (props: any) => {
      if (typeof props.value == "boolean") {
        if (props.value === true) {
          return "True";
        } else {
          return "False";
        }
      } else {
        return props.value;
      }
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Associate Status",
    accessor: "associate_status",
    Cell: (props: any) => {
      if (typeof props.value == "boolean") {
        if (props.value) return "True";
        else return "False";
      } else {
        return "";
      }
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Source Status",
    accessor: "source_status",
    Cell: (props: any) => {
      if (typeof props.value == "boolean") {
        if (props.value) return "True";
        else return "False";
      } else {
        return "";
      }
    },
    filter: multiSelectFilter,
  },

  {
    Header: "Transfer Reason",
    accessor: "transfer_reason",
    cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return props.value;
      }
    },

    filter: multiSelectFilter,
  },
  {
    Header: "Previous Stage 1",
    accessor: "previous_stage_1",
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return properFormat(props.value);
      }
    },

    filter: multiSelectFilter,
  },
  {
    Header: "Previous Stage 2",
    accessor: "previous_stage_2",
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return properFormat(props.value);
      }
    },

    filter: multiSelectFilter,
  },
  {
    Header: "Transfer By 1",
    accessor: "transfer_by_1",
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return properFormat(props.value);
      }
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Transfer By 2",
    accessor: "transfer_by_2",
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return properFormat(props.value);
      }
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Previous Owner 1",
    accessor: "previous_owner_1",
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return properFormat(props.value);
      }
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Previous Owner 2",
    accessor: "previous_owner_2",
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return properFormat(props.value);
      }
    },
    filter: multiSelectFilter,
  },

  {
    Header: "Next Follow Up Date & Time",
    accessor: "next_follow_up_date_time",
    Cell: (props: any) => {
      if (props.value === "" || props.value.toDate === undefined) {
        return "";
      } else {
        const utcDate = moment.utc(props.value.toDate());
        const localDate = moment(utcDate).local();
        return localDate.format("DD MMM YY, LT");
      }
    },

    sortType: (rowA: any, rowB: any, id: any, desc: any) => {
      if (rowA.values[id]?.toDate && rowB.values[id]?.toDate) {
        if (rowA.values[id].toDate() > rowB.values[id].toDate()) return 1;
        else return -1;
      } else {
        if (rowA.values[id]?.toDate === undefined && rowB.values[id]?.toDate) {
          return desc ? -1 : 1;
        } else if (
          rowA.values[id]?.toDate &&
          rowB.values[id]?.toDate === undefined
        ) {
          return desc ? 1 : -1;
        }
        return -1;
      }
    },
    filter: dateFilter,
  },
  {
    Header: "Next Follow Up Type",
    accessor: "next_follow_up_type",
    Cell: (props: any) => {
      return properFormat(props.value);
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Created By",
    accessor: "created_by",
    Cell: (props: any) => {
      return properFormat(props.value);
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Created Date & Time",
    accessor: "created_at",
    Cell: (props: any) => {
      if (
        props.value === "" ||
        props.value === undefined ||
        props.value.toDate === undefined
      ) {
        return "";
      } else {
        const utcDate = moment.utc(props.value.toDate());
        const localDate = moment(utcDate).local();
        return localDate.format("DD MMM YY, LT");
      }
    },

    sortType: (rowA: any, rowB: any, id: any, desc: any) => {
      if (rowA.values[id]?.toDate && rowB.values[id]?.toDate) {
        if (rowA.values[id].toDate() > rowB.values[id].toDate()) return 1;
        else return -1;
      } else {
        if (rowA.values[id]?.toDate === undefined && rowB.values[id]?.toDate) {
          return desc ? -1 : 1;
        } else if (
          rowA.values[id]?.toDate &&
          rowB.values[id]?.toDate === undefined
        ) {
          return desc ? 1 : -1;
        }
        return -1;
      }
    },
    filter: dateFilter,
  },

  {
    Header: "Modified Date & Time",
    accessor: "modified_at",
    Cell: (props: any) => {
      if (
        props.value === "" ||
        props.value === undefined ||
        props.value.toDate === undefined
      ) {
        return "";
      } else {
        const utcDate = moment.utc(props.value.toDate());
        const localDate = moment(utcDate).local();
        return localDate.format("DD MMM YY, LT");
      }
    },

    sortType: (rowA: any, rowB: any, id: any, desc: any) => {
      if (rowA.values[id]?.toDate && rowB.values[id]?.toDate) {
        if (rowA.values[id].toDate() > rowB.values[id].toDate()) return 1;
        else return -1;
      } else {
        if (rowA.values[id]?.toDate === undefined && rowB.values[id]?.toDate) {
          return desc ? -1 : 1;
        } else if (
          rowA.values[id]?.toDate &&
          rowB.values[id]?.toDate === undefined
        ) {
          return desc ? 1 : -1;
        }
        return -1;
      }
    },
    filter: dateFilter,
  },
  {
    Header: "Stage Change Date & Time",
    accessor: "stage_change_at",
    Cell: (props: any) => {
      if (
        props.value === "" ||
        props.value === undefined ||
        props.value.toDate === undefined
      ) {
        return "";
      } else {
        const utcDate = moment.utc(props.value.toDate());
        const localDate = moment(utcDate).local();
        return localDate.format("DD MMM YY, LT");
      }
    },

    sortType: (rowA: any, rowB: any, id: any, desc: any) => {
      if (rowA.values[id]?.toDate && rowB.values[id]?.toDate) {
        if (rowA.values[id].toDate() > rowB.values[id].toDate()) return 1;
        else return -1;
      } else {
        if (rowA.values[id]?.toDate === undefined && rowB.values[id]?.toDate) {
          return desc ? -1 : 1;
        } else if (
          rowA.values[id]?.toDate &&
          rowB.values[id]?.toDate === undefined
        ) {
          return desc ? 1 : -1;
        }
        return -1;
      }
    },
    filter: dateFilter,
  },
  {
    Header: "Lead Assign Date & Time",
    accessor: "lead_assign_time",
    Cell: (props: any) => {
      if (
        props.value === "" ||
        props.value === undefined ||
        props.value.toDate === undefined
      ) {
        return "";
      } else {
        const utcDate = moment.utc(props.value.toDate());
        const localDate = moment(utcDate).local();
        return localDate.format("DD MMM YY, LT");
      }
    },

    sortType: (rowA: any, rowB: any, id: any, desc: any) => {
      if (rowA.values[id]?.toDate && rowB.values[id]?.toDate) {
        if (rowA.values[id].toDate() > rowB.values[id].toDate()) return 1;
        else return -1;
      } else {
        if (rowA.values[id]?.toDate === undefined && rowB.values[id]?.toDate) {
          return desc ? -1 : 1;
        } else if (
          rowA.values[id]?.toDate &&
          rowB.values[id]?.toDate === undefined
        ) {
          return desc ? 1 : -1;
        }
        return -1;
      }
    },
    filter: dateFilter,
  },
];

export const PROJECT_COLUMNS = [
  {
    Header: "Project Name",
    accessor: "project_name",
    Cell: (props: any) => {
      return properFormat(props.value);
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Developer Name",
    accessor: "developer_name",
    Cell: (props: any) => {
      return properFormat(props.value);
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Address",
    accessor: "address",
    Cell: (props: any) => {
      return properFormat(props.value);
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Rera Link",
    accessor: "rera_link",
    filter: multiSelectFilter,
  },
  {
    Header: "Walkthrough Link",
    accessor: "walkthrough_link",
    filter: multiSelectFilter,
  },
  {
    Header: "Property Type",
    accessor: "property_type",
    Cell: (props: any) => {
      return properFormat(props.value);
    },
    filter: multiSelectFilter,
  },

  {
    Header: "Created By",
    accessor: "created_by",
    Cell: (props: any) => {
      return properFormat(props.value);
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Created Date & Time",
    accessor: "created_at",
    Cell: (props: any) => {
      if (
        props.value === "" ||
        props.value === undefined ||
        !props.value.toDate
      ) {
        return "";
      } else {
        const utcDate = moment.utc(props.value.toDate());
        const localDate = moment(utcDate).local();
        return localDate.format("DD MMM YY, LT");
      }
    },

    sortType: (rowA: any, rowB: any, id: any, desc: any) => {
      if (rowA.values[id]?.toDate && rowB.values[id]?.toDate) {
        if (rowA.values[id].toDate() > rowB.values[id].toDate()) return 1;
        else return -1;
      } else {
        if (rowA.values[id]?.toDate === undefined && rowB.values[id]?.toDate) {
          return desc ? -1 : 1;
        } else if (
          rowA.values[id]?.toDate &&
          rowB.values[id]?.toDate === undefined
        ) {
          return desc ? 1 : -1;
        }
        return -1;
      }
    },
    filter: dateFilter,
  },
];

export const TASK_COLUMNS = [
  {
    Header: "Full Name",
    accessor: "full_name",
    Cell: (props: any) => {
      return properFormat(props.value);
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Employee Code",
    accessor: "employee_Code",
    Cell: (props: any) => {
      return properFormat(props.value);
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Emp. Mail",
    accessor: "emp_mail",
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return properFormat(props.value);
      }
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Owner",
    accessor: "owner",
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return properFormat(props.value);
      }
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Reporting to",
    accessor: "reporting_to",
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return properFormat(props.value);
      }
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Team",
    accessor: "team",
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return properFormat(props.value);
      }
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Branch",
    accessor: "branch",
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return properFormat(props.value);
      }
    },
    filter: multiSelectFilter,
  },
  // {
    // Header: "Contact No.",
    // accessor: "contact_no",
    // Cell: (props: any) => {
      // if (props.value === "" || props.value === undefined) {
        // return "";
      // } else {
        // return properFormat(props.value);
      // }
    // },
    // filter: multiSelectFilter,
  // },
  // {
    // Header: "Inventory Type",
    // accessor: "inventory_type",
    // Cell: (props: any) => {
      // if (props.value === "" || props.value === undefined) {
        // return "";
      // } else {
        // return properFormat(props.value);
      // }
    // },
    // filter: multiSelectFilter,
  // },
  // {
    // Header: "Source",
    // accessor: "source",
    // Cell: (props: any) => {
      // if (props.value === "" || props.value === undefined) {
        // return "";
      // } else {
        // return properFormat(props.value);
      // }
    // },
    // filter: multiSelectFilter,
  // },
  // {
    // Header: "Transfer Status",
    // accessor: "transfer_status",
    // Cell: (props: any) => {
      // if (typeof props.value == "boolean") {
        // if (props.value) return "True";
        // else return "False";
      // } else {
        // return "";
      // }
    // },
    // filter: multiSelectFilter,
  // },
  // {
    // Header: "Due Date & Time",
    // accessor: "due_date",
    // Cell: (props: any) => {
      // if (props.value === undefined || !props.value.toDate) {
        // return "";
      // } else {
        // const utcDate = moment.utc(props.value.toDate());
        // const localDate = moment(utcDate).local();
        // return localDate.format("DD MMM YY, LT");
      // }
    // },

    // sortType: (rowA: any, rowB: any, id: any, desc: any) => {
      // if (rowA.values[id]?.toDate && rowB.values[id]?.toDate) {
        // if (rowA.values[id].toDate() > rowB.values[id].toDate()) return 1;
        // else return -1;
      // } else {
        // if (rowA.values[id]?.toDate === undefined && rowB.values[id]?.toDate) {
          // return desc ? -1 : 1;
        // } else if (
          // rowA.values[id]?.toDate &&
          // rowB.values[id]?.toDate === undefined
        // ) {
          // return desc ? 1 : -1;
        // }
        // return -1;
      // }
    // },
    // filter: dateFilter,
  // },
  // {
    // Header: "Completed Date & Time",
    // accessor: "completed_at",
    // filter: dateFilter,
    // Cell: (props: any) => {
      // if (props.value === "" || props.value === undefined) {
        // return "";
      // } else {
        // const utcDate = moment.utc(props.value.toDate());
        // const localDate = moment(utcDate).local();
        // return localDate.format("DD MMM YY, LT");
      // }
    // },
    // sortType: (rowA: any, rowB: any, id: any, desc: any) => {
      // if (rowA.values[id]?.toDate && rowB.values[id]?.toDate) {
        // if (rowA.values[id].toDate() > rowB.values[id].toDate()) return 1;
        // else return -1;
      // } else {
        // if (rowA.values[id]?.toDate === undefined && rowB.values[id]?.toDate) {
          // return desc ? -1 : 1;
        // } else if (
          // rowA.values[id]?.toDate &&
          // rowB.values[id]?.toDate === undefined
        // ) {
          // return desc ? 1 : -1;
        // }
        // return -1;
      // }
    // },
  // },
  // {
    // Header: "Call Reason",
    // accessor: "call_back_reason",

    // filter: multiSelectFilter,
  // },

  // {
    // Header: "Status",
    // accessor: "status",

    // filter: multiSelectFilter,
  // },
  // {
    // Header: "Created By",
    // accessor: "created_by",

    // filter: multiSelectFilter,
  // },
  // {
    // Header: "Created Date & Time",
    // accessor: "created_at",
    // Cell: (props: any) => {
      // const utcDate = moment.utc(props.value.toDate());
      // const localDate = moment(utcDate).local();
      // return localDate.format("DD MMM YY, LT");
    // },

    // sortType: (rowA: any, rowB: any, id: any, desc: any) => {
      // if (rowA.values[id]?.toDate && rowB.values[id]?.toDate) {
        // if (rowA.values[id].toDate() > rowB.values[id].toDate()) return 1;
        // else return -1;
      // } else {
        // if (rowA.values[id]?.toDate === undefined && rowB.values[id]?.toDate) {
          // return desc ? -1 : 1;
        // } else if (
          // rowA.values[id]?.toDate &&
          // rowB.values[id]?.toDate === undefined
        // ) {
          // return desc ? 1 : -1;
        // }
        // return -1;
      // }
    // },
    // filter: dateFilter,
  // },
];

export const API_COLUMNS = [
  {
    Header: "Source",
    accessor: "source",
    Cell: (props: any) => {
      return properFormat(props.value);
    },
    filter: multiSelectFilter,
  },

  {
    Header: "Status",
    accessor: "status",

    filter: multiSelectFilter,
  },

  {
    Header: "Country Code",
    accessor: "country_code",
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return properFormat(props.value);
      }
    },
    filter: multiSelectFilter,
  },

  {
    Header: "Created Date & Time",
    accessor: "created_at",
    Cell: (props: any) => {
      const utcDate = moment.utc(props.value.toDate());
      const localDate = moment(utcDate).local();
      return localDate.format("DD MMM YY, LT");
    },

    sortType: (rowA: any, rowB: any, id: any, desc: any) => {
      if (rowA.values[id]?.toDate && rowB.values[id]?.toDate) {
        if (rowA.values[id].toDate() > rowB.values[id].toDate()) return 1;
        else return -1;
      } else {
        if (rowA.values[id]?.toDate === undefined && rowB.values[id]?.toDate) {
          return desc ? -1 : 1;
        } else if (
          rowA.values[id]?.toDate &&
          rowB.values[id]?.toDate === undefined
        ) {
          return desc ? 1 : -1;
        }
        return -1;
      }
    },
    filter: dateFilter,
  },

  {
    Header: "API Key",
    accessor: "api_key",

    filter: multiSelectFilter,
  },
];

export const NEWS_COLUMNS = [
  {
    Header: "Area Name",
    accessor: "name",
    Cell: (props: any) => {
      return properFormat(props.value);
    },
    filter: multiSelectFilter,
  },

  {
    Header: "News Link",
    accessor: "link",

    filter: multiSelectFilter,
  },

  {
    Header: "Created Date & Time",
    accessor: "created_at",
    Cell: (props: any) => {
      const utcDate = moment.utc(props.value.toDate());
      const localDate = moment(utcDate).local();
      return localDate.format("DD MMM YY, LT");
    },

    sortType: (rowA: any, rowB: any, id: any, desc: any) => {
      if (rowA.values[id]?.toDate && rowB.values[id]?.toDate) {
        if (rowA.values[id].toDate() > rowB.values[id].toDate()) return 1;
        else return -1;
      } else {
        if (rowA.values[id]?.toDate === undefined && rowB.values[id]?.toDate) {
          return desc ? -1 : 1;
        } else if (
          rowA.values[id]?.toDate &&
          rowB.values[id]?.toDate === undefined
        ) {
          return desc ? 1 : -1;
        }
        return -1;
      }
    },
    filter: dateFilter,
  },
];

export const APIDATA_COLUMNS = [
  {
    Header: "Customer Name",
    accessor: "customer_name",
    Cell: (props: any) => {
      return properFormat(props.value);
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Mobile No.",
    accessor: "contact_no",
    filter: multiSelectFilter,
  },
  {
    Header: "Alternate No.",
    accessor: "alternate_no",
    filter: multiSelectFilter,
  },
  {
    Header: "Country Code",
    accessor: "country_code",
    filter: multiSelectFilter,
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return properFormat(props.value);
      }
    },
  },
  {
    Header: "Associate Contact",
    accessor: "associate_contact",
    filter: multiSelectFilter,
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return properFormat(props.value);
      }
    },
  },
  {
    Header: "Email ID",
    accessor: "email",

    filter: multiSelectFilter,
  },
  {
    Header: "Stage",
    accessor: "stage",
    Cell: (props: any) => {
      return properFormat(props.value);
    },

    filter: multiSelectFilter,
  },
  {
    Header: "Campaign",
    accessor: "campaign",
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return properFormat(props.value);
      }
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Add set",
    accessor: "addset",
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return properFormat(props.value);
      }
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Owner",

    accessor: "contact_owner_email",

    filter: multiSelectFilter,
  },
  {
    Header: "Status",
    accessor: "status",
    filter: multiSelectFilter,
  },
  {
    Header: "Fail Reason",
    accessor: "fail_reason",
    filter: multiSelectFilter,
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return properFormat(props.value);
      }
    },
  },
  {
    Header: "Property Type",
    accessor: "property_type",

    filter: multiSelectFilter,
  },

  {
    Header: "Property Stage",
    accessor: "property_stage",

    filter: multiSelectFilter,
  },
  {
    Header: "Location",
    accessor: "location",

    filter: multiSelectFilter,
  },
  {
    Header: "Project",
    accessor: "project",

    filter: multiSelectFilter,
  },
  {
    Header: "Budget",
    accessor: "budget",

    filter: multiSelectFilter,
  },
  {
    Header: "Lead Source",
    accessor: "lead_source",

    filter: multiSelectFilter,
  },

  {
    Header: "Created By",
    accessor: "created_by",
    Cell: (props: any) => {
      return properFormat(props.value);
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Created Date & Time",
    accessor: "created_at",
    Cell: (props: any) => {
      const utcDate = moment.utc(props.value.toDate());
      const localDate = moment(utcDate).local();
      return localDate.format("DD MMM YY, LT");
    },

    sortType: (rowA: any, rowB: any, id: any, desc: any) => {
      if (rowA.values[id]?.toDate && rowB.values[id]?.toDate) {
        if (rowA.values[id].toDate() > rowB.values[id].toDate()) return 1;
        else return -1;
      } else {
        if (rowA.values[id]?.toDate === undefined && rowB.values[id]?.toDate) {
          return desc ? -1 : 1;
        } else if (
          rowA.values[id]?.toDate &&
          rowB.values[id]?.toDate === undefined
        ) {
          return desc ? 1 : -1;
        }
        return -1;
      }
    },
    filter: dateFilter,
  },

  {
    Header: "Lead Assign Date & Time",
    accessor: "lead_assign_time",
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        const utcDate = moment.utc(props.value.toDate());
        const localDate = moment(utcDate).local();
        return localDate.format("DD MMM YY, LT");
      }
    },

    sortType: (rowA: any, rowB: any, id: any, desc: any) => {
      if (rowA.values[id]?.toDate && rowB.values[id]?.toDate) {
        if (rowA.values[id].toDate() > rowB.values[id].toDate()) return 1;
        else return -1;
      } else {
        if (rowA.values[id]?.toDate === undefined && rowB.values[id]?.toDate) {
          return desc ? -1 : 1;
        } else if (
          rowA.values[id]?.toDate &&
          rowB.values[id]?.toDate === undefined
        ) {
          return desc ? 1 : -1;
        }
        return -1;
      }
    },
    filter: dateFilter,
  },
];

export const nameList = [
  "Name",
  "Customer Name",
  "User Name",
  "Contact Name",
  "Consumer Name",
  "Customer name",
];

export const emailList = [
  "Email ID",
  "Email Id",
  "Email id",
  "Mail",
  "ID",
  "id",
];

export const phoneList = [
  "Contact Number",
  "Phone Number",
  "Number",
  "Mobile No",
  "Mobile No.",
  "Phone No",
  "Phone No.",
  "Mobile",
  "Contact No.",
  "Contact No",
];

export const ownerList = [
  "Owner",
  "Contact Owner",
  "Lead Owner",
  "owner",
  "Contact Owner Email ID",
];

export const leadSource = ["Lead Source", "lead source", "Source"];

export const reportingList = [
  "Reporting To",
  "Reporting Manager Email ID",
  "Reporting Email ID",
];

export const profileList = ["Profile", "profile", "Profile assigned"];

export const DesignationList = ["Designation", "Desig", "designation"];

export const teamList = ["Team", "Team Name", "Team Assigned"];

export const LEAD_DISTRIBUTOR_COLUMNS = [
  {
    Header: "Source",
    accessor: "source",
    filter: multiSelectFilter,
  },
  {
    Header: "Project",
    accessor: "project",
    filter: multiSelectFilter,
  },
  {
    Header: "Location",
    accessor: "location",
    filter: multiSelectFilter,
  },
  {
    Header: "Budget",
    accessor: "budget",
    filter: multiSelectFilter,
  },
  {
    Header: "Property Type",
    accessor: "property_type",
    filter: multiSelectFilter,
  },
  {
    Header: "Associate",
    accessor: "users",
    filter: multiSelectFilter,
  },
  {
    Header: "Created Date & Time",
    accessor: "created_at",
    Cell: (props: any) => {
      const utcDate = moment.utc(props.value.toDate());
      const localDate = moment(utcDate).local();
      return localDate.format("DD MMM YY, LT");
    },

    sortType: (rowA: any, rowB: any, id: any, desc: any) => {
      if (rowA.values[id]?.toDate && rowB.values[id]?.toDate) {
        if (rowA.values[id].toDate() > rowB.values[id].toDate()) return 1;
        else return -1;
      } else {
        if (rowA.values[id]?.toDate === undefined && rowB.values[id]?.toDate) {
          return desc ? -1 : 1;
        } else if (
          rowA.values[id]?.toDate &&
          rowB.values[id]?.toDate === undefined
        ) {
          return desc ? 1 : -1;
        }
        return -1;
      }
    },
    filter: dateFilter,
  },
];

export const CALLLOG_COLUMNS = [
  {
    Header: "Customer Name",
    accessor: "customer_name",
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return properFormat(props.value);
      }
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Owner",
    accessor: "contact_owner_email",
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return properFormat(props.value);
      }
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Stage",
    accessor: "stage",
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return properFormat(props.value);
      }
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Project",
    accessor: "project",
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return properFormat(props.value);
      }
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Location",
    accessor: "location",
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return properFormat(props.value);
      }
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Budget",
    accessor: "budget",
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return properFormat(props.value);
      }
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Contact No.",
    accessor: "contact_no",
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return properFormat(props.value);
      }
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Inventory Type",
    accessor: "inventory_type",
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return properFormat(props.value);
      }
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Source",
    accessor: "source",
    Cell: (props: any) => {
      if (props.value === "" || props.value === undefined) {
        return "";
      } else {
        return properFormat(props.value);
      }
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Transfer Status",
    accessor: "transfer_status",
    Cell: (props: any) => {
      if (typeof props.value == "boolean") {
        if (props.value) return "True";
        else return "False";
      } else {
        return "";
      }
    },
    filter: multiSelectFilter,
  },

  {
    Header: "Created By",
    accessor: "created_by",
    Cell: (props: any) => {
      if (props.value == undefined) {
        return "";
      } else {
        return props.value;
      }
    },
    filter: multiSelectFilter,
  },
  {
    Header: "Duration",
    accessor: "duration",

    filter: multiSelectFilter,
  },
  {
    Header: "Created Date & Time",
    accessor: "created_at",
    Cell: (props: any) => {
      const utcDate = moment.utc(props.value.toDate());
      const localDate = moment(utcDate).local();
      return localDate.format("DD MMM YY, LT");
    },

    sortType: (rowA: any, rowB: any, id: any, desc: any) => {
      if (rowA.values[id]?.toDate && rowB.values[id]?.toDate) {
        if (rowA.values[id].toDate() > rowB.values[id].toDate()) return 1;
        else return -1;
      } else {
        if (rowA.values[id]?.toDate === undefined && rowB.values[id]?.toDate) {
          return desc ? -1 : 1;
        } else if (
          rowA.values[id]?.toDate &&
          rowB.values[id]?.toDate === undefined
        ) {
          return desc ? 1 : -1;
        }
        return -1;
      }
    },
    filter: dateFilter,
  },
];

export const dateFieldList = [
  "Created Date & Time",
  "Next Follow Up Date & Time",
  "Stage Change Date & Time",
  "Modified Date & Time",
  "Completed Date & Time",
  "Due Date & Time",
  "Lead Assign Date & Time",
];

export const datesField = [
  "created_at",
  "next_follow_up_date_time",
  "stage_change_at",
  "modified_at",
  "lead_assign_time",
];

export const stageList = [
  "FRESH",
  "INTERESTED",
  "NOT INTERESTED",
  "CALL BACK",
  "LOST",
  "WON",
];

export const feildsMap = {
  "Alternate No.": "alternate_no",
  "Country Code": "country_code",

  "Inventory Type": "inventory_type",
  Campaign: "campaign",
  Addset: "addset",
  "Previous Owner": "previous_owner",
  "Lead Source": "lead_source",
  "Transfer Reason": "transfer_reason",
};

export const DisabledMap = {
  "Created By": "created_by",
  "Created Date & Time": "created_at",
  "Modified Date & Time": "modified_at",
  "Transfer Status": "transfer_status",
  "Associate Status": "associate_status",
  "Source Status": "source_status",
  "Stage Change Date & Time": "stage_change_at",
  "Lead Assign Date & Time": "lead_assign_at",
  "Reporting To": "reporting_to",
  "Call Back Reason": "call_back_reason",
  "Next Follow Up Date & Time": "next_follow_up_date_time",
  "Next Follow Up Type": "next_follow_up_type",
  "Not Interested Reason": "not_interested_reason",
  "Lost Reason": "lost_reason",
  "Previous Owner 1": "previous_owner_1",
  "Previous Owner 2": "previous_owner_2",
  "Previous Stage 1": "previous_stage_1",
  "Previous stage 2": "previous_stage_2",
  "Transfer By 1": "transfer_by_1",
  "Transfer By 2": "transfer_by_2",
};

export const ReadWriteMap = {
  "Customer Name": "customer_name",
  "Mobile No.": "contact_no",
  Owner: "contact_owner_email",
};

export const Readap = {
  "Email Id": "email",
  Stage: "stage",
  Location: "location",
  Project: "project",
  Budget: "budget",
  "Property Type": "property_type",
  "Property Sub Type": "property_sub_type",
  "Property Stage": "property_stage",
};
