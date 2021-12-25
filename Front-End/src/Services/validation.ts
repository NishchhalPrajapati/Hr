import { showSnackbarAction } from "../Components/Redux/actions";
import { phoneValidate } from "../Values/validator";
import moment from "moment";
import { properFormat } from "../Values/utils";

export const InterestedLeadValidation = (
  map: any,
  dispatcher: any,
  contact: any,
  locationsList: any[],
  projectsList: any[],
  budgetsList: any[],
  resTypes: any[],
  comTypes: any[]
) => {
  if (!map.hasOwnProperty("Customer Name")) {
    dispatcher(showSnackbarAction("Please Select customer name", "error"));
    return false;
  } else if (!map.hasOwnProperty("Mobile No.")) {
    dispatcher(showSnackbarAction("Please Select contact number", "error"));

    return false;
  } else if (!map.hasOwnProperty("Lead Source")) {
    dispatcher(showSnackbarAction("Please Select Lead Source", "error"));

    return false;
  } else if (!map.hasOwnProperty("Property Type")) {
    dispatcher(showSnackbarAction("Please Select Property Type", "error"));

    return false;
  } else if (!map.hasOwnProperty("Property Stage")) {
    dispatcher(showSnackbarAction("Please Select Property Stage", "error"));

    return false;
  } else if (!map.hasOwnProperty("Location")) {
    dispatcher(showSnackbarAction("Please Select Location", "error"));

    return false;
  } else if (!map.hasOwnProperty("Project")) {
    dispatcher(showSnackbarAction("Please Select Project", "error"));

    return false;
  } else if (!map.hasOwnProperty("Budget")) {
    dispatcher(showSnackbarAction("Please Select Budget", "error"));

    return false;
  } else if (!map.hasOwnProperty("Next Follow Up Type")) {
    dispatcher(
      showSnackbarAction("Please Select Next Follow Up Type", "error")
    );

    return false;
  } else if (!map.hasOwnProperty("Next Follow Up Date & Time")) {
    dispatcher(
      showSnackbarAction("Please Select Next Follow Up Date & Time", "error")
    );

    return false;
  } else if (
    (properFormat(contact[map["Property Type"]]) !== "Residential" &&
      properFormat(contact[map["Property Type"]]) !== "Commercial") ||
    properFormat(contact[map["Property Type"]]) === ""
  ) {
    dispatcher(
      showSnackbarAction("Invalid Property Type at row " + contact.sno, "error")
    );

    return false;
  } else if (
    properFormat(contact[map["Property Stage"]]) === "" ||
    (properFormat(contact[map["Property Stage"]]) !== "Under Construction" &&
      properFormat(contact[map["Property Stage"]]) !== "Ready To Move In")
  ) {
    dispatcher(
      showSnackbarAction(
        "Invalid Property Stage at row " + contact.sno,
        "error"
      )
    );

    return false;
  } else if (
    properFormat(contact[map["Property Type"]]) === "Commercial" &&
    map.hasOwnProperty("Property Sub Type")
  ) {
    if (!comTypes.includes(contact[map["Property Sub Type"]])) {
      dispatcher(
        showSnackbarAction(
          "Invalid Property Sub Type at row " + contact.sno,
          "error"
        )
      );

      return false;
    } else {
      return true;
    }
  } else if (
    properFormat(contact[map["Property Type"]]) === "Residential" &&
    map.hasOwnProperty("Property Sub Type")
  ) {
    if (!resTypes.includes(contact[map["Property Sub Type"]])) {
      dispatcher(
        showSnackbarAction(
          "Invalid Property Sub Type at row " + contact.sno,
          "error"
        )
      );

      return false;
    } else {
      return true;
    }
  } else if (contact[map["Customer Name"]] === "") {
    dispatcher(
      showSnackbarAction("Invalid Customer Name at row " + contact.sno, "error")
    );

    return false;
  } else if (
    contact[map["Next Follow Up Type"]] === "" ||
    (properFormat(contact[map["Next Follow Up Type"]]) !== "Call Back" &&
      properFormat(contact[map["Next Follow Up Type"]]) !== "Site Visit" &&
      properFormat(contact[map["Next Follow Up Type"]]) !== "Meeting")
  ) {
    dispatcher(
      showSnackbarAction(
        "Invalid Next Follow Up Type at row " + contact.sno,
        "error"
      )
    );

    return false;
  } else if (
    contact[map["Next Follow Up Date & Time"]] === "" ||
    !moment(contact[map["Next Follow Up Date & Time"]], "MM/DD/YY HH:mm")
  ) {
    dispatcher(
      showSnackbarAction(
        "Invalid Next Follow Up Date & Time at row " + contact.sno,
        "error"
      )
    );

    return false;
  } else if (
    contact[map["Location"]] === "" ||
    !locationsList?.includes(contact[map["Location"]])
  ) {
    dispatcher(
      showSnackbarAction("Invalid Location at row " + contact.sno, "error")
    );

    return false;
  } else if (
    contact[map["Project"]] === "" ||
    !projectsList.includes(contact[map["Project"]])
  ) {
    console.log("project");
    dispatcher(
      showSnackbarAction("Invalid Project at row " + contact.sno, "error")
    );

    return false;
  } else if (
    contact[map["Budget"]] === "" ||
    !budgetsList.includes(contact[map["Budget"]])
  ) {
    dispatcher(
      showSnackbarAction("Invalid Budget at row " + contact.sno, "error")
    );

    return false;
  } else {
    return true;
  }
};

export const FreshLeadValidation = (
  map: any,
  dispatcher: any,
  contact: any,
  locationsList: any[],
  projectsList: any[],
  budgetsList: any[],
  resTypes: any[],
  comTypes: any[]
) => {
  if (!map.hasOwnProperty("Customer Name")) {
    dispatcher(showSnackbarAction("Please Select customer name", "error"));
    return false;
  } else if (!map.hasOwnProperty("Mobile No.")) {
    dispatcher(showSnackbarAction("Please Select contact number", "error"));

    return false;
  } else if (!map.hasOwnProperty("Lead Source")) {
    dispatcher(showSnackbarAction("Please Select Lead Source", "error"));

    return false;
  } else if (contact[map["Customer Name"]] === "") {
    dispatcher(
      showSnackbarAction("Invalid Customer Name at row " + contact.sno, "error")
    );

    return false;
  } else if (map.hasOwnProperty("Location")) {
    if (
      contact[map["Location"]] === "" ||
      !locationsList?.includes(contact[map["Location"]])
    ) {
      dispatcher(
        showSnackbarAction("Invalid Location at row " + contact.sno, "error")
      );

      return false;
    } else {
      return true;
    }
  } else if (map.hasOwnProperty("Project")) {
    if (!projectsList.includes(contact[map["Project"]])) {
      console.log("project:", contact[map["Project"]]);
      dispatcher(
        showSnackbarAction("Invalid Project at row " + contact.sno, "error")
      );

      return false;
    } else {
      return true;
    }
  } else if (map.hasOwnProperty("Budget")) {
    if (
      contact[map["Budget"]] === "" ||
      !budgetsList.includes(contact[map["Budget"]])
    ) {
      dispatcher(
        showSnackbarAction("Invalid Budget at row " + contact.sno, "error")
      );

      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
};

export const LostLeadValidation = (
  map: any,
  dispatcher: any,
  contact: any,
  locationsList: any[],
  budgetsList: any[],
  projectsList: any[],
  comTypes: any[],
  resTypes: any[]
) => {
  if (!map.hasOwnProperty("Customer Name")) {
    dispatcher(showSnackbarAction("Please Select customer name", "error"));

    return false;
  } else if (!map.hasOwnProperty("Mobile No.")) {
    dispatcher(showSnackbarAction("Please Select contact number", "error"));

    return false;
  } else if (!map.hasOwnProperty("Lead Source")) {
    dispatcher(showSnackbarAction("Please Select Lead Source", "error"));

    return false;
  } else if (!map.hasOwnProperty("Property Type")) {
    dispatcher(showSnackbarAction("Please Select Property Type", "error"));

    return false;
  } else if (!map.hasOwnProperty("Property Stage")) {
    dispatcher(showSnackbarAction("Please Select Property Stage", "error"));

    return false;
  } else if (!map.hasOwnProperty("Location")) {
    dispatcher(showSnackbarAction("Please Select Location", "error"));

    return false;
  } else if (!map.hasOwnProperty("Project")) {
    dispatcher(showSnackbarAction("Please Select Project", "error"));

    return false;
  } else if (!map.hasOwnProperty("Budget")) {
    dispatcher(showSnackbarAction("Please Select Budget", "error"));

    return false;
  } else if (!map.hasOwnProperty("Next Follow Up Type")) {
    dispatcher(
      showSnackbarAction("Please Select Next Follow Up Type", "error")
    );

    return false;
  } else if (!map.hasOwnProperty("Next Follow Up Date & Time")) {
    dispatcher(
      showSnackbarAction("Please Select Next Follow Up Date & Time", "error")
    );

    return false;
  } else if (!map.hasOwnProperty("Lost Reason")) {
    dispatcher(showSnackbarAction("Please Select Lost Reason", "error"));

    return false;
  } else if (
    (properFormat(contact[map["Property Type"]]) !== "Residential" &&
      properFormat(contact[map["Property Type"]]) !== "Commercial") ||
    properFormat(contact[map["Property Type"]]) === ""
  ) {
    dispatcher(
      showSnackbarAction("Invalid Property Type at row " + contact.sno, "error")
    );

    return false;
  } else if (
    properFormat(contact[map["Property Type"]]) === "Commercial" &&
    map.hasOwnProperty("Property Sub Type")
  ) {
    if (!comTypes.includes(contact[map["Property Sub Type"]])) {
      dispatcher(
        showSnackbarAction(
          "Invalid Property Sub Type at row " + contact.sno,
          "error"
        )
      );

      return false;
    } else {
      return true;
    }
  } else if (
    properFormat(contact[map["Property Type"]]) === "Residential" &&
    map.hasOwnProperty("Property Sub Type")
  ) {
    if (!resTypes.includes(contact[map["Property Sub Type"]])) {
      dispatcher(
        showSnackbarAction(
          "Invalid Property Sub Type at row " + contact.sno,
          "error"
        )
      );

      return false;
    } else {
      return true;
    }
  } else if (
    contact[map["Property Stage"]] === "" ||
    (properFormat(contact[map["Property Stage"]]) !== "Under Construction" &&
      properFormat(contact[map["Property Stage"]]) !== "Ready To Move In")
  ) {
    dispatcher(
      showSnackbarAction(
        "Invalid Property Stage at row " + contact.sno,
        "error"
      )
    );

    return false;
  } else if (contact[map["Customer Name"]] === "") {
    dispatcher(
      showSnackbarAction("Invalid Customer Name at row " + contact.sno, "error")
    );

    return false;
  } else if (
    contact[map["Next Follow Up Type"]] === "" ||
    (properFormat(contact[map["Next Follow Up Type"]]) !== "Call Back" &&
      properFormat(contact[map["Next Follow Up Type"]]) !== "Site Visit" &&
      properFormat(contact[map["Next Follow Up Type"]]) !== "Meeting")
  ) {
    dispatcher(
      showSnackbarAction(
        "Invalid Next Follow Up Type at row " + contact.sno,
        "error"
      )
    );

    return false;
  } else if (
    contact[map["Next Follow Up Date & Time"]] === "" ||
    !moment(contact[map["Next Follow Up Date & Time"]], "MM/DD/YY HH:mm")
  ) {
    dispatcher(
      showSnackbarAction(
        "Invalid Next Follow Up Date & Time at row " + contact.sno,
        "error"
      )
    );

    return false;
  } else if (
    contact[map["Lost Reason"]] === "" ||
    (properFormat(contact[map["Lost Reason"]]) !==
      "Better Deal/Already Purchased" &&
      properFormat(contact[map["Lost Reason"]]) !== "Loan Issue" &&
      properFormat(contact[map["Lost Reason"]]) !== "Financial Concern" &&
      properFormat(contact[map["Lost Reason"]]) !== "Plan Postpond" &&
      properFormat(contact[map["Lost Reason"]]) !== "Other")
  ) {
    dispatcher(
      showSnackbarAction(
        "Invalid Next Follow Up Type at row " + contact.sno,
        "error"
      )
    );

    return false;
  } else if (
    contact[map["Location"]] === "" ||
    !locationsList?.includes(contact[map["Location"]])
  ) {
    dispatcher(
      showSnackbarAction("Invalid Location at row " + contact.sno, "error")
    );

    return false;
  } else if (
    contact[map["Project"]] === "" ||
    !projectsList?.includes(contact[map["Project"]])
  ) {
    console.log("project");
    dispatcher(
      showSnackbarAction("Invalid Project at row " + contact.sno, "error")
    );

    return false;
  } else if (
    contact[map["Budget"]] === "" ||
    !budgetsList?.includes(contact[map["Budget"]])
  ) {
    dispatcher(
      showSnackbarAction("Invalid Budget at row " + contact.sno, "error")
    );

    return false;
  } else {
    return true;
  }
};

export const CallbackValidation = (map: any, dispatcher: any, contact: any) => {
  if (!map.hasOwnProperty("Customer Name")) {
    dispatcher(showSnackbarAction("Please Select customer name", "error"));

    return false;
  } else if (!map.hasOwnProperty("Mobile No.")) {
    dispatcher(showSnackbarAction("Please Select contact number", "error"));

    return false;
  } else if (!map.hasOwnProperty("Lead Source")) {
    dispatcher(showSnackbarAction("Please Select Lead Source", "error"));

    return false;
  } else if (!map.hasOwnProperty("Next Follow Up Type")) {
    dispatcher(
      showSnackbarAction("Please Select Next Follow Up Type", "error")
    );

    return false;
  } else if (!map.hasOwnProperty("Next Follow Up Date & Time")) {
    dispatcher(
      showSnackbarAction("Please Select Next Follow Up Date & Time", "error")
    );

    return false;
  } else if (!map.hasOwnProperty("Call Back Reason")) {
    dispatcher(showSnackbarAction("Please Select Call Back Reason", "error"));

    return false;
  } else if (contact[map["Customer Name"]] === "") {
    dispatcher(
      showSnackbarAction("Invalid Customer Name at row " + contact.sno, "error")
    );

    return false;
  } else if (
    contact[map["Next Follow Up Type"]] === "" ||
    (properFormat(contact[map["Next Follow Up Type"]]) !== "Call Back" &&
      properFormat(contact[map["Next Follow Up Type"]]) !== "Site Visit" &&
      properFormat(contact[map["Next Follow Up Type"]]) !== "Meeting")
  ) {
    dispatcher(
      showSnackbarAction(
        "Invalid Next Follow Up Type at row " + contact.sno,
        "error"
      )
    );

    return false;
  } else if (
    contact[map["Next Follow Up Date & Time"]] === "" ||
    !moment(contact[map["Next Follow Up Date & Time"]], "MM/DD/YY HH:mm")
  ) {
    dispatcher(
      showSnackbarAction(
        "Invalid Next Follow Up Date & Time at row " + contact.sno,
        "error"
      )
    );

    return false;
  } else if (
    contact[map["Call Back Reason"]] === "" ||
    (properFormat(contact[map["Call Back Reason"]]) !== "Not Picked" &&
      properFormat(contact[map["Call Back Reason"]]) !== "On Request" &&
      properFormat(contact[map["Call Back Reason"]]) !== "Not Reachable" &&
      properFormat(contact[map["Call Back Reason"]]) !== "Switched Off")
  ) {
    dispatcher(
      showSnackbarAction(
        "Invalid Call Back Reason at row " + contact.sno,
        "error"
      )
    );

    return false;
  } else {
    return true;
  }
};

export const NotInterestedValidation = (
  map: any,
  dispatcher: any,
  contact: any
) => {
  if (!map.hasOwnProperty("Customer Name")) {
    dispatcher(showSnackbarAction("Please Select customer name", "error"));

    return false;
  } else if (!map.hasOwnProperty("Mobile No.")) {
    dispatcher(showSnackbarAction("Please Select contact number", "error"));

    return false;
  } else if (!map.hasOwnProperty("Lead Source")) {
    dispatcher(showSnackbarAction("Please Select Lead Source", "error"));

    return false;
  } else if (!map.hasOwnProperty("Not interested reason")) {
    dispatcher(
      showSnackbarAction("Please Select Not Interested Reason", "error")
    );

    return false;
  } else if (contact[map["Customer Name"]] === "") {
    dispatcher(
      showSnackbarAction("Invalid Customer Name at row " + contact.sno, "error")
    );

    return false;
  } else if (contact[map["Not interested reason"]] === "") {
    dispatcher(
      showSnackbarAction(
        "Invalid Not Interested Reason at row " + contact.sno,
        "error"
      )
    );

    return false;
  } else {
    return true;
  }
};

export const WonValidation = (
  map: any,
  dispatcher: any,
  contact: any,
  locationsList: any[],
  budgetsList: any[],
  projectsList: any[],
  comTypes: any[],
  resTypes: any[]
) => {
  if (!map.hasOwnProperty("Customer Name")) {
    dispatcher(showSnackbarAction("Please Select customer name", "error"));

    return false;
  } else if (!map.hasOwnProperty("Mobile No.")) {
    dispatcher(showSnackbarAction("Please Select contact number", "error"));

    return false;
  } else if (!map.hasOwnProperty("Lead Source")) {
    dispatcher(showSnackbarAction("Please Select Lead Source", "error"));

    return false;
  } else if (!map.hasOwnProperty("Property Type")) {
    dispatcher(showSnackbarAction("Please Select Property Type", "error"));

    return false;
  } else if (!map.hasOwnProperty("Property Stage")) {
    dispatcher(showSnackbarAction("Please Select Property Stage", "error"));

    return false;
  } else if (!map.hasOwnProperty("Location")) {
    dispatcher(showSnackbarAction("Please Select Location", "error"));

    return false;
  } else if (!map.hasOwnProperty("Project")) {
    dispatcher(showSnackbarAction("Please Select Project", "error"));

    return false;
  } else if (!map.hasOwnProperty("Budget")) {
    dispatcher(showSnackbarAction("Please Select Budget", "error"));

    return false;
  } else if (!map.hasOwnProperty("Next Follow Up Type")) {
    dispatcher(
      showSnackbarAction("Please Select Next Follow Up Type", "error")
    );

    return false;
  } else if (!map.hasOwnProperty("Next Follow Up Date & Time")) {
    dispatcher(
      showSnackbarAction("Please Select Next Follow Up Date & Time", "error")
    );

    return false;
  } else if (
    (properFormat(contact[map["Property Type"]]) !== "Residential" &&
      properFormat(contact[map["Property Type"]]) !== "Commercial") ||
    contact[map["Property Type"]] === ""
  ) {
    dispatcher(
      showSnackbarAction("Invalid Property Type at row " + contact.sno, "error")
    );

    return false;
  } else if (
    properFormat(contact[map["Property Type"]]) === "Commercial" &&
    map.hasOwnProperty("Property Sub Type")
  ) {
    if (!comTypes.includes(contact[map["Property Sub Type"]])) {
      dispatcher(
        showSnackbarAction(
          "Invalid Property Sub Type at row " + contact.sno,
          "error"
        )
      );

      return false;
    } else {
      return true;
    }
  } else if (
    properFormat(contact[map["Property Type"]]) === "Residential" &&
    map.hasOwnProperty("Property Sub Type")
  ) {
    if (!resTypes.includes(contact[map["Property Sub Type"]])) {
      dispatcher(
        showSnackbarAction(
          "Invalid Property Sub Type at row " + contact.sno,
          "error"
        )
      );

      return false;
    } else {
      return true;
    }
  } else if (
    contact[map["Property Stage"]] === "" ||
    (properFormat(contact[map["Property Stage"]]) !== "Under Construction" &&
      properFormat(contact[map["Property Stage"]]) !== "Ready To Move In")
  ) {
    dispatcher(
      showSnackbarAction(
        "Invalid Property Stage at row " + contact.sno,
        "error"
      )
    );

    return false;
  } else if (contact[map["Customer Name"]] === "") {
    dispatcher(
      showSnackbarAction("Invalid Customer Name at row " + contact.sno, "error")
    );

    return false;
  } else if (
    contact[map["Next Follow Up Type"]] === "" ||
    (properFormat(contact[map["Next Follow Up Type"]]) !== "Call Back" &&
      properFormat(contact[map["Next Follow Up Type"]]) !== "Site Visit" &&
      properFormat(contact[map["Next Follow Up Type"]]) !== "Meeting")
  ) {
    dispatcher(
      showSnackbarAction(
        "Invalid Next Follow Up Type at row " + contact.sno,
        "error"
      )
    );

    return false;
  } else if (
    contact[map["Next Follow Up Date & Time"]] === "" ||
    !moment(contact[map["Next Follow Up Date & Time"]], "MM/DD/YY HH:mm")
  ) {
    dispatcher(
      showSnackbarAction(
        "Invalid Next Follow Up Date & Time at row " + contact.sno,
        "error"
      )
    );

    return false;
  } else if (
    contact[map["Location"]] === "" ||
    !locationsList.includes(contact[map["Location"]])
  ) {
    dispatcher(
      showSnackbarAction("Invalid Location at row " + contact.sno, "error")
    );

    return false;
  } else if (
    contact[map["Project"]] === "" ||
    !projectsList.includes(contact[map["Project"]])
  ) {
    console.log("project");
    dispatcher(
      showSnackbarAction("Invalid Project at row " + contact.sno, "error")
    );

    return false;
  } else if (
    contact[map["Budget"]] === "" ||
    !budgetsList.includes(contact[map["Budget"]])
  ) {
    dispatcher(
      showSnackbarAction("Invalid Budget at row " + contact.sno, "error")
    );

    return false;
  } else {
    return true;
  }
};

export const OverdueTaskValidation = (
  map: any,
  dispatcher: any,
  contact: any
) => {
  if (!map.hasOwnProperty("Customer Name")) {
    dispatcher(showSnackbarAction("Please Select customer name", "error"));

    return false;
  } else if (!map.hasOwnProperty("Task Type")) {
    dispatcher(showSnackbarAction("Please Select Task Type", "error"));

    return false;
  } else if (!map.hasOwnProperty("Lead Id")) {
    dispatcher(showSnackbarAction("Please Select Lead Id", "error"));

    return false;
  } else if (!map.hasOwnProperty("Due Date")) {
    dispatcher(showSnackbarAction("Please Select Due Date", "error"));

    return false;
  } else if (contact[map["Customer Name"]] === "") {
    dispatcher(
      showSnackbarAction("Invalid Customer Name at row " + contact.sno, "error")
    );

    return false;
  } else if (
    contact[map["Due Date"]] === "" ||
    !moment(contact[map["Due Date"]], "MM/DD/YY HH:mm")
  ) {
    dispatcher(
      showSnackbarAction("Invalid Due Date at row " + contact.sno, "error")
    );

    return false;
  } else if (
    contact[map["Task Type"]] === "" ||
    (properFormat(contact[map["Task Type"]]) !== "Meeting" &&
      properFormat(contact[map["Task Type"]]) !== "Site Visit" &&
      properFormat(contact[map["Task Type"]]) !== "Call Back")
  ) {
    dispatcher(
      showSnackbarAction("Invalid Task Type at row " + contact.sno, "error")
    );

    return false;
  } else if (contact[map["Lead Id"]] === "") {
    dispatcher(
      showSnackbarAction("Invalid Lead ID at row " + contact.sno, "error")
    );
    return false;
  } else {
    return true;
  }
};

export const PendingTaskValidation = (
  map: any,
  dispatcher: any,
  contact: any
) => {
  if (!map.hasOwnProperty("Customer Name")) {
    dispatcher(showSnackbarAction("Please Select customer name", "error"));

    return false;
  } else if (!map.hasOwnProperty("Task Type")) {
    dispatcher(showSnackbarAction("Please Select Task Type", "error"));

    return false;
  } else if (!map.hasOwnProperty("Lead Id")) {
    dispatcher(showSnackbarAction("Please Select Lead Id", "error"));

    return false;
  } else if (!map.hasOwnProperty("Due Date")) {
    dispatcher(showSnackbarAction("Please Select Due Date", "error"));

    return false;
  } else if (contact[map["Customer Name"]] === "") {
    dispatcher(
      showSnackbarAction("Invalid Customer Name at row " + contact.sno, "error")
    );

    return false;
  } else if (
    contact[map["Due Date"]] === "" ||
    !moment(contact[map["Due Date"]], "MM/DD/YY HH:mm")
  ) {
    dispatcher(
      showSnackbarAction("Invalid Due Date at row " + contact.sno, "error")
    );

    return false;
  } else if (
    contact[map["Task Type"]] === "" ||
    (properFormat(contact[map["Task Type"]]) !== "Meeting" &&
      properFormat(contact[map["Task Type"]]) !== "Site Visit" &&
      properFormat(contact[map["Task Type"]]) !== "Call Back")
  ) {
    dispatcher(
      showSnackbarAction("Invalid Task Type at row " + contact.sno, "error")
    );

    return false;
  } else if (contact[map["Lead Id"]] === "") {
    dispatcher(
      showSnackbarAction("Invalid Lead ID at row " + contact.sno, "error")
    );
    return false;
  } else {
    return true;
  }
};

export const CompletedTaskValidation = (
  map: any,
  dispatcher: any,
  contact: any
) => {
  if (!map.hasOwnProperty("Customer Name")) {
    dispatcher(showSnackbarAction("Please Select customer name", "error"));

    return false;
  } else if (!map.hasOwnProperty("Task Type")) {
    dispatcher(showSnackbarAction("Please Select Task Type", "error"));

    return false;
  } else if (!map.hasOwnProperty("Lead Id")) {
    dispatcher(showSnackbarAction("Please Select Lead Id", "error"));

    return false;
  } else if (!map.hasOwnProperty("Completed Date")) {
    dispatcher(showSnackbarAction("Please Select Completed Date", "error"));

    return false;
  } else if (contact[map["Customer Name"]] === "") {
    dispatcher(
      showSnackbarAction("Invalid Customer Name at row " + contact.sno, "error")
    );

    return false;
  } else if (
    contact[map["Completed Date"]] === "" ||
    !moment(contact[map["Completed Date"]], "MM/DD/YY HH:mm")
  ) {
    dispatcher(
      showSnackbarAction(
        "Invalid Completed Date at row " + contact.sno,
        "error"
      )
    );

    return false;
  } else if (
    contact[map["Task Type"]] === "" ||
    (properFormat(contact[map["Task Type"]]) !== "Meeting" &&
      properFormat(contact[map["Task Type"]]) !== "Site Visit" &&
      properFormat(contact[map["Task Type"]]) !== "Call Back")
  ) {
    dispatcher(
      showSnackbarAction("Invalid Task Type at row " + contact.sno, "error")
    );

    return false;
  } else if (contact[map["Lead Id"]] === "") {
    dispatcher(
      showSnackbarAction("Invalid Lead ID at row " + contact.sno, "error")
    );
    return false;
  } else {
    return true;
  }
};
