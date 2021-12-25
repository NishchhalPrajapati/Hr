import Firebase from "firebase/app";
// import { firestore, functions, storage } from "../Firebase";
import {
  setBranchUsersList,
  setCompleted,
  setContacts,
  setTotal,
  showSnackbarAction,
} from ".././Components/Redux/actions";
// import { phoneValidate, validateNumber } from "../Values/validators";
import * as XLSX from "xlsx";
import { datesField, stageList } from "../Values/tables";
import moment from "moment";
import {
  CallbackValidation,
  FreshLeadValidation,
  InterestedLeadValidation,
  LostLeadValidation,
  NotInterestedValidation,
  WonValidation,
} from "./validation";
// import { chunk, properFormat, timer } from "../Values/utils";

export const createContacts = async (
  organization_id: string,
  email: string,
  first_name: string,
  last_name: string,
  contact_no: any,
  created_by: string,
  uid: string,
  dispatcher: any,
  history: any,
  user_email: any,
  alternate_no: any,
  country_code: string,
  setLoad: (data: boolean) => void,
  country: string,
  property_type: string,
  property_stage: string,
  location: string,
  budget: string,
  project: string,
  property_sub_type: string,
  leadSource: string,
  notes: string
) => {
  console.log(user_email);
  let result = false;
  if (alternate_no !== "") {
    // const res = await functions.httpsCallable("checkLead")(
    //   JSON.stringify({
        // organization_id: organization_id,
        // contactList: [contact_no, alternate_no],
    //   })
    // );
    // result = res.data;
  } 
  else 
  {
    // const res = await functions.httpsCallable("checkLead")(
    //   JSON.stringify({
        // organization_id: organization_id,
        // contact_no: contact_no,
    //   })
    // );
    // result = res.data;
  }

  let check = true;

  if (result === false) {
    dispatcher(
      showSnackbarAction("This Contact Number Already Exists", "warning")
    );
    setLoad && setLoad(false);
  } else {
    if (check === true) {
    //   const contactDoc = firestore.collection("contacts").doc();
      contact_no
        .set({
          alternate_no: alternate_no,
          organization_id: organization_id,
          associate_status: true,
          budget: budget,
        //   contact_no: validateNumber({ contact_no, country }).contact_no,
          country_code: country_code,
        //   created_at: Firebase.firestore.Timestamp.now(),
          created_by: created_by,
          customer_image: "",
          customer_name: first_name + " " + last_name,
          email: email.toLowerCase(),
          lead_source: leadSource,
        //   lead_assign_time: Firebase.firestore.Timestamp.now(),
          location: location,
          lost_reason: "",
        //   modified_at: Firebase.firestore.Timestamp.now(),
          not_int_reason: "",
          other_not_int_reason: "",
          other_lost_reason: "",
          previous_owner: "",
          project: project,
          property_stage: property_stage,
          property_type: property_type,
          property_sub_type: property_sub_type,
          source_status: true,
          stage: "FRESH",
          transfer_status: false,
          uid: uid,
          contact_owner_email: user_email.toLowerCase(),
          feedback_time: "",
          next_follow_up_type: "",
          next_follow_up_date_time: "",
        })
        .then(() => {
        //   functions.httpsCallable("sendNotifications")(
            // JSON.stringify({
            //   organization_id: organization_id,
            //   notifications: { [uid]: 1 },
            // })
        //   );
          if (notes !== "") {
            // firestore
            //   .collection("contactResources")
            //   .doc(contactDoc.id)
            //   .set({
                // notes: [
                //   {
                    // note: notes,
                    // created_at: Firebase.firestore.Timestamp.now(),
                //   },
                // ],
            //   });
          }

          dispatcher(showSnackbarAction("Contact Created!!", "success"));
          setLoad(false);
          history.replace("/");
        })
        .catch((error: any) => {
          console.log("Firestore Contacts error", error);
          setLoad(false);
        });
    } else {
      console.log("Firestore Contacts error");
      dispatcher(showSnackbarAction("Error!! Try Again!!", "error"));
      setLoad(false);
    }
  }
};

const sortContacts = (a: any, b: any) => {
  if (a.created_at === undefined || a.created_at.toDate === undefined) {
    console.log(a);
    return 1;
  }
  if (a.created_at.toDate() > b.created_at.toDate()) {
    return -1;
  } else {
    return 1;
  }
};

// export const fetchAllStageContacts = (
//   organization_id: string,
//   dispatcher: any,
//   user: any,
//   organizationUsers: any[],
//   all?: boolean
// ) => {
//   const subscriber = firestore
    // .collection("contacts")
    // .where("organization_id", "==", organization_id)
    // .where("stage", "in", ["FRESH", "INTERESTED", "CALLBACK"])
    // .onSnapshot((contact: any[]) => {
    //   let dataFresh: any[] = [];
    //   let dataInterested: any[] = [];
    //   let dataCallback: any[] = [];
    //   let uidList: any[] = [];
// 
    //   let branchExist = false;
    //   if (user.branchPermission && !user.branchPermission.includes("All")) {
        // uidList.push(user.uid);
        // organizationUsers.forEach((users) => {
        //   if (users.branch) {
            // if (user.branchPermission.includes(users.branch)) {
            //   uidList.push(users.uid);
            // }
        //   }
        // });
        // branchExist = true;
        // dispatcher(setBranchUsersList(uidList));
    //   }
    //   if (user.branchPermission && user.branchPermission.includes("All")) {
        // uidList.push(user.uid);
        // organizationUsers.forEach((users) => {
        //   uidList.push(users.uid);
        // });
        // dispatcher(setBranchUsersList(uidList));
    //   }
// 
    //   if (contact) {
        // contact.forEach((contact: any) => {
        //   if (contact.data().stage === "FRESH") {
            // if (all === false) {
            //   if (contact.data().transfer_status === false) {
                // if (
                //   branchExist === true &&
                //   uidList.includes(contact.data().uid)
                // ) {
                //   dataFresh.push({
                    // ...contact.data(),
                    // contactId: contact.id,
                    // contact_owner_email: contact
                    //   .data()
                    //   .contact_owner_email.toLowerCase(),
                //   });
                // } else if (branchExist === false) {
                //   dataFresh.push({
                    // ...contact.data(),
                    // contactId: contact.id,
                    // contact_owner_email: contact
                    //   .data()
                    //   .contact_owner_email.toLowerCase(),
                //   });
                // }
            //   }
            // } else {
            //   if (
                // branchExist === true &&
                // uidList.includes(contact.data().uid)
            //   ) {
                // dataFresh.push({
                //   ...contact.data(),
                //   contactId: contact.id,
                //   contact_owner_email: contact
                    // .data()
                    // .contact_owner_email.toLowerCase(),
                // });
            //   } else if (branchExist === false) {
                // dataFresh.push({
                //   ...contact.data(),
                //   contactId: contact.id,
                //   contact_owner_email: contact
                    // .data()
                    // .contact_owner_email.toLowerCase(),
                // });
            //   }
            // }
        //   } else if (contact.data().stage === "INTERESTED") {
            // if (all === false) {
            //   if (contact.data().transfer_status === false) {
                // if (
                //   branchExist === true &&
                //   uidList.includes(contact.data().uid)
                // ) {
                //   dataInterested.push({
                    // ...contact.data(),
                    // contactId: contact.id,
                    // contact_owner_email: contact
                    //   .data()
                    //   .contact_owner_email.toLowerCase(),
                //   });
                // } else if (branchExist === false) {
                //   dataInterested.push({
                    // ...contact.data(),
                    // contactId: contact.id,
                    // contact_owner_email: contact
                    //   .data()
                    //   .contact_owner_email.toLowerCase(),
                //   });
                // }
            //   }
            // } else {
            //   if (
                // branchExist === true &&
                // uidList.includes(contact.data().uid)
            //   ) {
                // dataInterested.push({
                //   ...contact.data(),
                //   contactId: contact.id,
                //   contact_owner_email: contact
                    // .data()
                    // .contact_owner_email.toLowerCase(),
                // });
            //   } else if (branchExist === false) {
                // dataInterested.push({
                //   ...contact.data(),
                //   contactId: contact.id,
                //   contact_owner_email: contact
                    // .data()
                    // .contact_owner_email.toLowerCase(),
                // });
            //   }
            // }
        //   } else if (contact.data().stage === "CALLBACK") {
            // if (all === false) {
            //   if (contact.data().transfer_status === false) {
                // if (
                //   branchExist === true &&
                //   uidList.includes(contact.data().uid)
                // ) {
                //   dataCallback.push({
                    // ...contact.data(),
                    // contactId: contact.id,
                    // contact_owner_email: contact
                    //   .data()
                    //   .contact_owner_email.toLowerCase(),
                //   });
                // } else if (branchExist === false) {
                //   dataCallback.push({
                    // ...contact.data(),
                    // contactId: contact.id,
                    // contact_owner_email: contact
                    //   .data()
                    //   .contact_owner_email.toLowerCase(),
                //   });
                // }
            //   }
            // } else {
            //   if (
                // branchExist === true &&
                // uidList.includes(contact.data().uid)
            //   ) {
                // dataCallback.push({
                //   ...contact.data(),
                //   contactId: contact.id,
                //   contact_owner_email: contact
                    // .data()
                    // .contact_owner_email.toLowerCase(),
                // });
            //   } else if (branchExist === false) {
                // dataCallback.push({
                //   ...contact.data(),
                //   contactId: contact.id,
                //   contact_owner_email: contact
                    // .data()
                    // .contact_owner_email.toLowerCase(),
                // });
            //   }
            // }
        //   }
        // });

        // dispatcher(setContacts({ FRESH: dataFresh.sort(sortContacts) }));
        // dispatcher(
        //   setContacts({ INTERESTED: dataInterested.sort(sortContacts) })
        // );
        // dispatcher(setContacts({ CALLBACK: dataCallback.sort(sortContacts) }));
    //   } else {
        // console.log("org not found");
    //   }
    // });
//   return subscriber;
// };

// export const fetchAllContacts = (
//   organization_id: string,
//   stage: string,
//   dispatcher: any,
//   user: any,
//   organizationUsers?: any[],
//   all?: boolean
// ) => {
//   const subscriber = firestore
    // .collection("contacts")
    // .where("organization_id", "==", organization_id)
    // .where("stage", "==", stage)
    // .onSnapshot((contact) => {
    //   const data: any[] = [];
    //   let uidList: any[] = [];
    //   if (user.profile === "Lead Manager") {
        // if (user.branchPermission) {
        //   if (user.branchPermission.includes("All")) {
            // organizationUsers?.forEach((users) => {
            //   uidList.push(users.uid);
            // });
        //   } else {
            // organizationUsers?.forEach((users) => {
            //   if (users.branch) {
                // if (user.branchPermission.includes(users.branch)) {
                //   uidList.push(users.uid);
                // }
            //   }
            // });
        //   }
        // } else {
        //   organizationUsers?.forEach((users) => {
            // uidList.push(users.uid);
        //   });
        // }
    //   }
// 
    //   if (contact) {
        // if (user.profile === "Lead Manager") {
        //   contact.forEach((contact) => {
            // if (uidList.includes(contact.data().uid)) {
            //   if (all === false) {
                // if (contact.data().transfer_status === false) {
                //   data.push({
                    // ...contact.data(),
                    // contactId: contact.id,
                    // contact_owner_email: contact
                    //   .data()
                    //   .contact_owner_email.toLowerCase(),
                //   });
                // }
            //   } else {
                // data.push({
                //   ...contact.data(),
                //   contactId: contact.id,
                //   contact_owner_email: contact
                    // .data()
                    // .contact_owner_email.toLowerCase(),
                // });
            //   }
            // }
        //   });
        // } else {
        //   contact.forEach((contact) => {
            // if (all === false) {
            //   if (contact.data().transfer_status === false) {
                // data.push({
                //   ...contact.data(),
                //   contactId: contact.id,
                //   contact_owner_email: contact
                    // .data()
                    // .contact_owner_email.toLowerCase(),
                // });
            //   }
            // } else {
            //   data.push({
                // ...contact.data(),
                // contactId: contact.id,
                // contact_owner_email: contact
                //   .data()
                //   .contact_owner_email.toLowerCase(),
            //   });
            // }
        //   });
        // }
// 
        // dispatcher(setContacts({ [stage]: data.sort(sortContacts) }));
    //   } else {
        // console.log("org not found");
    //   }
    // });
//   return subscriber;
// };
// 
// export const fetchContacts = (uid: string, stage: string, dispatcher: any) => {
//   const subscriber = firestore
    // .collection("contacts")
    // .where("uid", "==", uid)
    // .where("stage", "==", stage)
    // .onSnapshot((contact) => {
    //   const data: any[] = [];
// 
    //   if (contact) {
        // contact.forEach((contact) => {
        //   data.push({
            // ...contact.data(),
            // contactId: contact.id,
            // contact_owner_email: contact
            //   .data()
            //   .contact_owner_email.toLowerCase(),
        //   });
        // });
// 
        // dispatcher(setContacts({ [stage]: data.sort(sortContacts) }));
    //   } else {
        // console.log("org not found");
    //   }
    // });
//   return subscriber;
// };
// 
// export const fetchDrillDownAllContacts = (
//   organization_id: string,
//   stage: string,
//   dispatcher: any
// ) => {
//   firestore
    // .collection("contacts")
    // .where("organization_id", "==", organization_id)
    // .where("stage", "==", stage)
    // .get()
    // .then((contact) => {
    //   const data: any[] = [];
    //   if (contact) {
        // contact.forEach((contact) => {
        //   data.push({
            // ...contact.data(),
            // contactId: contact.id,
            // contact_owner_email: contact
            //   .data()
            //   .contact_owner_email.toLowerCase(),
        //   });
        // });
        // dispatcher(setContacts({ [stage]: data.sort(sortContacts) }));
    //   } else {
        // console.log("org not found");
    //   }
    // });
// };
// 
// export const fetchTeamLeadContacts = (
//   setContacts: (data: any[]) => void,
//   uidList: any[]
// ) => {
//   const subscriber = firestore
    // .collection("contacts")
    // .where("uid", "in", uidList)
    // .onSnapshot((contact) => {
    //   const data: any[] = [];
    //   if (contact) {
        // contact.forEach((contact) => {
        //   data.push({
            // ...contact.data(),
            // contactId: contact.id,
            // contact_owner_email: contact
            //   .data()
            //   .contact_owner_email.toLowerCase(),
        //   });
        // });
        // setContacts(data.sort(sortContacts));
    //   } else {
        // console.log("Team Lead Error");
    //   }
    // });
//   return subscriber;
// };
// 
// export const fetchLeadSources = (
//   setLeadSource: (data: any[]) => void,
//   organization_id: string
// ) => {
//   const subscriber = firestore
    // .collection("organizationResources")
    // .doc(organization_id)
    // .onSnapshot((resources) => {
    //   if (resources) {
        // const resourceData = resources.data();
// 
        // if (resourceData?.leadSources) {
        //   setLeadSource(resourceData?.leadSources);
        // } else {
        //   setLeadSource([]);
        // }
    //   } else {
        // console.log("Org not found");
    //   }
    // });
//   return subscriber;
// };
// 
// const checkLeadSource = (
//   leadSourceList: any[],
//   leadSource: any[],
//   dispatcher: any
// ) => {
//   let count = 0;
// 
//   leadSourceList.forEach((item: any) => {
    // if (leadSource.includes(item.leadSource)) {
    // } else {
    //   dispatcher(
        // showSnackbarAction(
        //   "Lead Source At " + item.sno + " does not exists!!",
        //   "error"
        // )
    //   );
    //   count = count + 1;
    // }
//   });
//   if (count === 0) {
    // return true;
//   } else {
    // return false;
//   }
// };

// export const mapContactsTemplate = (
//   data: { [key: string]: any }[],
//   map: { [key: string]: string },
//   organization_id: string,
//   dispatcher: any,
//   submit: () => void,
//   usersList: any[],
//   setLoad: (data: boolean) => void,
//   leadSource: any[],
//   name: string,
//   projects: any[],
//   locations: any[],
//   budgets: any[],
//   country: string,
//   resTypes: any[],
//   comTypes: any[]
// ) => {
//   let templateList: any[] = [];
//   let contactList: any[] = [];
//   let notesList: any[] = [];
//   let leadSourceList: any[] = [];
//   let checkStage: boolean = true;
//   let numberList: any[] = [];
// 
//   data.forEach((contact, index) => {
    // if (checkStage === false) {
    //   setLoad(false);
    //   return;
    // }
    // let uid = "";
    // if (map["Owner"]) {
    //   const userData = usersList.filter(
        // (item) =>
        //   String(item.user_email).toLowerCase() ===
        //   String(contact[map["Owner"]].toLowerCase())
    //   );
    //   uid = userData.length === 0 ? "" : userData[0].uid;
    //   if (uid === "") {
        // dispatcher(
        //   showSnackbarAction(
            // "Please Provide The Owner For the Contact At: " + contact.sno,
            // "error"
        //   )
        // );
// 
        // checkStage = false;
        // return;
    //   }
    // }
// 
    // if (!map.hasOwnProperty("Customer Name")) {
    //   dispatcher(showSnackbarAction("Please Select customer name", "error"));
    //   checkStage = false;
    //   return;
    // } else if (!map.hasOwnProperty("Mobile No.")) {
    //   dispatcher(showSnackbarAction("Please Select contact number", "error"));
// 
    //   checkStage = false;
    //   return;
    // } else if (!map.hasOwnProperty("Lead Source")) {
    //   dispatcher(showSnackbarAction("Please Select Lead Source", "error"));
// 
    //   checkStage = false;
// 
    //   return;
    // } else if (!map.hasOwnProperty("Stage")) {
    //   dispatcher(showSnackbarAction("Please Select Stage", "error"));
// 
    //   checkStage = false;
// 
    //   return;
    // } else if (!map.hasOwnProperty("Country Code")) {
    //   dispatcher(showSnackbarAction("Please Select Country Code", "error"));
// 
    //   checkStage = false;
// 
    //   return;
    // } else if (contact[map["Customer Name"]] === "") {
    //   dispatcher(
        // showSnackbarAction(
        //   "Invalid Customer Name at row " + contact.sno,
        //   "error"
        // )
    //   );
// 
    //   checkStage = false;
    //   return;
    // } else if (contact[map["Country Code"]] === "") {
    //   dispatcher(
        // showSnackbarAction(
        //   "Invalid Country Code at row " + contact.sno,
        //   "error"
        // )
    //   );
// 
    //   checkStage = false;
    //   return;
    // } else if (map.hasOwnProperty("Inventory Type")) {
    //   if (
        // contact[map["Inventory Type"]] !== "Primary" &&
        // contact[map["Inventory Type"]] !== "Secondary" &&
        // contact[map["Inventory Type"]] !== ""
    //   ) {
        // dispatcher(
        //   showSnackbarAction(
            // "Invalid Inventory Type at row " + contact.sno,
            // "error"
        //   )
        // );
        // checkStage = false;
        // return;
    //   }
    // } else if (
    //   contact[map["Stage"]] === "" ||
    //   !stageList.includes(contact[map["Stage"]].toUpperCase())
    // ) {
    //   dispatcher(
        // showSnackbarAction("Invalid Stage at row " + contact.sno, "error")
    //   );
// 
    //   checkStage = false;
    //   return;
    // }
    // if (map["Stage"] && contact[map["Stage"]].toUpperCase() === "INTERESTED") {
    //   console.log("interested");
    //   checkStage = InterestedLeadValidation(
        // map,
        // dispatcher,
        // contact,
        // locations,
        // projects,
        // budgets,
        // resTypes,
        // comTypes
    //   );
    // } else if (map["Stage"] && contact[map["Stage"]].toUpperCase() === "LOST") {
    //   checkStage = LostLeadValidation(
        // map,
        // dispatcher,
        // contact,
        // locations,
        // budgets,
        // projects,
        // comTypes,
        // resTypes
    //   );
    // } else if (
    //   map["Stage"] &&
    //   contact[map["Stage"]].toUpperCase() === "CALL BACK"
    // ) {
    //   checkStage = CallbackValidation(map, dispatcher, contact);
    // } else if (
    //   map["Stage"] &&
    //   contact[map["Stage"]].toUpperCase() === "NOT INTERESTED"
    // ) {
    //   checkStage = NotInterestedValidation(map, dispatcher, contact);
    // } else if (map["Stage"] && contact[map["Stage"]].toUpperCase() === "WON") {
    //   checkStage = WonValidation(
        // map,
        // dispatcher,
        // contact,
        // locations,
        // budgets,
        // projects,
        // comTypes,
        // resTypes
    //   );
    // } else if (
    //   map["Stage"] &&
    //   contact[map["Stage"]].toUpperCase() === "FRESH"
    // ) {
    //   checkStage = FreshLeadValidation(
        // map,
        // dispatcher,
        // contact,
        // locations,
        // projects,
        // budgets,
        // resTypes,
        // comTypes
    //   );
    // } else {
    //   dispatcher(
        // showSnackbarAction("Invalid Stage at row: " + contact.sno, "error")
    //   );
    //   checkStage = false;
    // }
    // if (checkStage === false) {
    //   return;
    // }
// 
    // templateList.push({
    //   alternate_no: map["Alternate No."]
        // ? contact[map["Alternate No."]]
        //   ? contact[map["Alternate No."]]
        //   : ""
        // : "",
    //   organization_id: organization_id,
    //   associate_status: true,
    //   budget: map["Budget"] ? contact[map["Budget"]] : "",
    //   contact_no: map["Mobile No."]
        // ? validateNumber({ contact_no: contact[map["Mobile No."]], country })
            // .contact_no
        // : "",
    //   country_code: map["Country Code"] ? contact[map["Country Code"]] : "",
    //   created_at: map["Created At"]
        // ? contact[map["Created At"]] !== ""
        //   ? Firebase.firestore.Timestamp.fromDate(
            //   moment(contact[map["Created At"]], "MM/DD/YY HH:mm").toDate()
            // )
        //   : Firebase.firestore.Timestamp.now()
        // : Firebase.firestore.Timestamp.now(),
    //   created_by: map["Created By"]
        // ? contact[map["Created By"]]
        //   ? contact[map["Created By"]]
        //   : name
        // : name,
    //   call_back_reason: map["Call Back Reason"]
        // ? contact[map["Call Back Reason"]]
        // : "",
    //   customer_image: "",
    //   customer_name: map["Customer Name"] ? contact[map["Customer Name"]] : "",
    //   email: map["Email ID"] ? contact[map["Email ID"]].toLowerCase() : "",
    //   lead_source: map["Lead Source"] ? contact[map["Lead Source"]] : "",
    //   lead_assign_time: map["Lead Assign At"]
        // ? contact[map["Lead Assign At"]] !== ""
        //   ? Firebase.firestore.Timestamp.fromDate(
            //   moment(contact[map["Lead Assign At"]], "MM/DD/YY HH:mm").toDate()
            // )
        //   : Firebase.firestore.Timestamp.now()
        // : Firebase.firestore.Timestamp.now(),
    //   modified_at: Firebase.firestore.Timestamp.now(),
    //   addset: map["Addset"]
        // ? contact[map["Addset"]]
        //   ? contact[map["Addset"]]
        //   : ""
        // : "",
    //   campaign: map["Campaign"]
        // ? contact[map["Campaign"]]
        //   ? contact[map["Campaign"]]
        //   : ""
        // : "",
    //   stage_change_at: map["Stage Change At"]
        // ? contact[map["Stage Change At"]] !== ""
        //   ? Firebase.firestore.Timestamp.fromDate(
            //   moment(contact[map["Stage Change At"]], "MM/DD/YY HH:mm").toDate()
            // )
        //   : Firebase.firestore.Timestamp.now()
        // : Firebase.firestore.Timestamp.now(),
    //   location: map["Location"] ? contact[map["Location"]] : "",
    //   lost_reason: map["Lost Reason"] ? contact[map["Lost Reason"]] : "",
    //   not_int_reason: map["Not interested reason"]
        // ? contact[map["Not interested reason"]]
        // : "",
    //   other_not_int_reason: "",
    //   other_lost_reason: "",
    //   previous_owner: "",
    //   project: map["Project"] ? contact[map["Project"]] : "",
    //   property_stage: map["Property Stage"]
        // ? properFormat(contact[map["Property Stage"]])
        // : "",
    //   property_type: map["Property Type"]
        // ? properFormat(contact[map["Property Type"]])
        // : "",
    //   property_sub_type: map["Property Sub Type"]
        // ? properFormat(contact[map["Property Sub Type"]])
        // : "",
    //   source_status: true,
    //   inventory_type: map["Inventory Type"]
        // ? properFormat(contact[map["Inventory Type"]])
        // : "",
    //   stage: map["Stage"]
        // ? contact[map["Stage"]].toUpperCase() === "CALL BACK"
        //   ? "CALLBACK"
        //   : contact[map["Stage"]].toUpperCase()
        // : "FRESH",
    //   transfer_status: false,
    //   uid: uid,
    //   contact_owner_email: map["Owner"]
        // ? contact[map["Owner"]].toLowerCase()
        // : "",
    //   feedback_time: "",
    //   next_follow_up_type: map["Next Follow Up Type"]
        // ? contact[map["Next Follow Up Type"]]
        // : "",
    //   next_follow_up_date_time: map["Next Follow Up Date & Time"]
        // ? contact[map["Next Follow Up Date & Time"]] !== ""
        //   ? Firebase.firestore.Timestamp.fromDate(
            //   moment(
                // contact[map["Next Follow Up Date & Time"]],
                // "MM/DD/YY HH:mm"
            //   ).toDate()
            // )
        //   : ""
        // : "",
    // });
// 
    // if (
    //   numberList.includes(
        // validateNumber({ contact_no: contact[map["Mobile No."]], country })
        //   .contact_no
    //   )
    // ) {
    //   dispatcher(
        // showSnackbarAction("Repeted Contact at " + contact.sno, "error")
    //   );
// 
    //   checkStage = false;
    //   return;
    // } else {
    //   contactList.push({
        // contact_no: validateNumber({
        //   contact_no: contact[map["Mobile No."]],
        //   country,
        // }).contact_no,
        // sno: contact.sno,
    //   });
    //   numberList.push(
        // validateNumber({ contact_no: contact[map["Mobile No."]], country })
        //   .contact_no
    //   );
    // }
    // if (map.hasOwnProperty("Notes")) {
    //   notesList.push(contact[map["Notes"]]);
    // }
    // leadSourceList.push({
    //   leadSource: contact[map["Lead Source"]],
    //   sno: contact.sno,
    // });
//   });
// 
//   if (templateList.length === data.length) {
    // let check = false;
    // check = checkLeadSource(leadSourceList, leadSource, dispatcher);
    // if (check === true) {
    //   createContactsFirebase(
        // templateList,
        // contactList,
        // dispatcher,
        // submit,
        // (data: boolean) => setLoad(data),
        // organization_id,
        // notesList
    //   );
    // } else {
    //   setLoad(false);
    // }
//   }
//   if (templateList.length === 0) {
    // setLoad(false);
//   }
// };

// const createContactsFirebase = async (
//   data: any[],
//   contactList: any[],
//   dispatcher: any,
//   submit: () => void,
//   setLoad: (data: boolean) => void,
//   organization_id: any,
//   notesList: any[]
// ) => {
//   const contacts: string[] = [];
// 
//   contactList.forEach((item) => contacts.push(item.contact_no));
//   const funcData = JSON.stringify({
    // organization_id: organization_id,
    // contact_no: contacts,
//   });
//   const result = await functions.httpsCallable("checkMultipleLead")(funcData);
// 
//   if (result.data !== true) {
    // const contact = contactList.filter(
    //   (item) => item.contact_no === result.data
    // );
    // dispatcher(
    //   showSnackbarAction(
        // result.data + " Contact Already Exists at " + contact[0].sno,
        // "error"
    //   )
    // );
    // setLoad(false);
//   } else {
    // if (data.length > 500) {
    //   dispatcher(setTotal(data.length));
    //   const splitedData = chunk(data, 500);
    //   const notesData = chunk(notesList, 500);
    //   dispatcher(setCompleted(0));
    //   let total = 0;
    //   try {
        // for (let i = 0; i < splitedData.length; i++) {
        //   total += splitedData[i].length;
        //   await createMultipleContact(splitedData[i], notesData[i]);
// 
        //   dispatcher(setCompleted(total));
        // }
        // dispatcher(setTotal(0));
        // sendNotifications(data, organization_id);
        // dispatcher(showSnackbarAction("Contacts Uploaded!!", "success"));
        // submit();
        // setLoad(false);
    //   } catch (error) {
        // console.log("Create contacts error", error);
        // setLoad(false);
    //   }
    // } else {
    //   createMultipleContact(data, notesList)
        // .then(() => {
        //   sendNotifications(data, organization_id);
        //   dispatcher(showSnackbarAction("Contacts Uploaded!!", "success"));
        //   submit();
        //   setLoad(false);
        // })
        // .catch((error) => {
        //   console.log("Create contacts error", error);
        //   setLoad(false);
        // });
    // }
//   }
// };

// const createMultipleContact = async (data: any[], notesList: any[]) => {
//   const batch = firestore.batch();
//   const notesBatch = firestore.batch();
// 
//   data.forEach((item, index) => {
    // const contactsRef = firestore.collection("contacts").doc();
    // const notesRef = firestore
    //   .collection("contactResources")
    //   .doc(contactsRef.id);
    // batch.set(contactsRef, item, { merge: true });
    // if (notesList !== undefined && notesList.length !== 0) {
    //   if (notesList[index] !== "") {
        // notesBatch.set(
        //   notesRef,
        //   {
            // notes: [
            //   {
                // note: notesList[index],
                // created_at: Firebase.firestore.Timestamp.now(),
            //   },
            // ],
        //   },
        //   { merge: true }
        // );
    //   }
    // }
//   });
//   await batch.commit();
//   if (notesList !== undefined && notesList.length !== 0) {
    // await notesBatch.commit();
//   }
// };
// 
// const sendNotifications = async (data: any[], organization_id: string) => {
//   const notificationData: { [key: string]: number } = {};
//   data.forEach((item) => {
    // if (item.uid !== "") {
    //   if (notificationData[item.uid]) {
        // notificationData[item.uid] += 1;
    //   } else {
        // notificationData[item.uid] = 1;
    //   }
    // }
//   });
//   functions.httpsCallable("sendNotifications")(
    // JSON.stringify({
    //   organization_id: organization_id,
    //   notifications: notificationData,
    // })
//   );
// };

export const handleFileUpload = (
  file: any,
  setData: (data: any[]) => void,
  setColumns: (data: any[]) => void,
  setLoad: (data: boolean) => void
) => {
  setTimeout(
    () =>
      readFile(
        file,
        (data: any) => setData(data),
        (col: any) => setColumns(col)
      ),
    100
  );
  setLoad(false);
};

const readFile = (
  file: any,
  setData: (data: any[]) => void,
  setColumns: (data: any[]) => void
) => {
  const reader = new FileReader();
  reader.onload = (evt: ProgressEvent<FileReader>) => {
    /* Parse data */
    const bstr = evt?.target?.result;
    const wb = XLSX.read(bstr, { type: "binary" });
    /* Get first worksheet */
    const wsname = wb.SheetNames[0];
    const ws: any = wb.Sheets[wsname];
    /* Convert array of arrays */
    //@ts-ignore
    const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
    processData(
      data,
      (data: any) => setData(data),
      (col: any) => setColumns(col)
    );
  };
  reader.readAsBinaryString(file);
};

const processData = (
  dataString: any,
  setData: (data: any[]) => void,
  setColumns: (data: any[]) => void
) => {
  const dataStringLines = dataString.split(/\r\n|\n/);
  const headers = dataStringLines[0].split(
    /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
  );

  const list: any = [];
  let sno = 1;
  for (let i = 1; i < dataStringLines.length; i++) {
    const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
    if (headers && row.length === headers.length) {
      let obj: any = {};
      for (let j = 0; j < headers.length; j++) {
        let d = row[j];
        if (d.length > 0) {
          if (d[0] === '"') d = d.substring(1, d.length - 1);
          if (d[d.length - 1] === '"') d = d.substring(d.length - 2, 1);
        }
        if (headers[j]) {
          obj[headers[j]] = d;
        }
      }

      // remove the blank rows
      if (Object.values(obj).filter((x) => x).length > 0) {
        obj = { ...obj, sno };
        list.push(obj);
        sno = sno + 1;
      }
    }
  }

  // prepare columns list from headers
  const columns = headers.map((c: any) => ({
    name: c,
    selector: c,
  }));

  setData(list);
  setColumns(columns);
};

// export const fetchTasks = (
//   setTasks: (data: any[]) => void,
//   organization_id: string,
//   user: any,
//   branchUsers: any[]
// ) => {
//   const subscriber = firestore
    // .collection("tasks")
    // .where("organization_id", "==", organization_id)
    // .onSnapshot((task) => {
    //   let data: any[] = [];
    //   if (task) {
        // if (user.branchPermission) {
        //   task.docs.forEach((task) => {
            // if (branchUsers.includes(task.data().uid)) {
            //   let taskList: any = [];
            //   task.data().tasks.forEach((item: any) => {
                // let taskData = { ...item };
                // taskData["stage"] = task.data().stage;
                // taskData["contact_owner_email"] =
                //   task.data().contact_owner_email;
                // taskData["project"] = task.data().project;
                // taskData["location"] = task.data().location;
                // taskData["budget"] = task.data().budget;
                // taskData["contact_no"] = task.data().contact_no;
                // taskData["inventory_type"] = task.data().inventory_type;
                // taskData["source"] = task.data().source;
                // taskData["transfer_status"] = task.data().transfer_status;
// 
                // taskList.push(taskData);
            //   });
            //   data = data.concat(taskList);
            // }
        //   });
        // } else {
        //   task.docs.forEach((task) => {
            // let taskList: any = [];
            // task.data().tasks.forEach((item: any) => {
            //   let taskData = { ...item };
            //   taskData["stage"] = task.data().stage;
            //   taskData["contact_owner_email"] = task.data().contact_owner_email;
            //   taskData["project"] = task.data().project;
            //   taskData["location"] = task.data().location;
            //   taskData["budget"] = task.data().budget;
            //   taskData["contact_no"] = task.data().contact_no;
            //   taskData["inventory_type"] = task.data().inventory_type;
            //   taskData["source"] = task.data().source;
            //   taskData["transfer_status"] = task.data().transfer_status;
// 
            //   taskList.push(taskData);
            // });
            // data = data.concat(taskList);
        //   });
        // }
// 
        // data.forEach((task) => {
        //   if (
            // task.status === "Pending" &&
            // task.due_date.toDate() < new Date()
        //   ) {
            // task.status = "Overdue";
        //   }
        // });
        // setTasks(data);
    //   } else {
        // console.log("org not found");
    //   }
    // });
//   return subscriber;
// };

// export const fetchTlTasks = (
//   setTasks: (data: any[]) => void,
//   organization_id: string,
//   teamUsers: any[]
// ) => {
//   const subscriber = firestore
    // .collection("tasks")
    // .where("organization_id", "==", organization_id)
    // .onSnapshot((task) => {
    //   let data: any[] = [];
    //   if (task) {
        // task.docs.forEach((task) => {
        //   if (teamUsers.includes(task.data().uid)) {
            // let taskList: any = [];
            // task.data().tasks.forEach((item: any) => {
            //   let taskData = { ...item };
            //   taskData["stage"] = task.data().stage;
            //   taskData["contact_owner_email"] = task.data().contact_owner_email;
            //   taskData["project"] = task.data().project;
            //   taskData["location"] = task.data().location;
            //   taskData["budget"] = task.data().budget;
            //   taskData["contact_no"] = task.data().contact_no;
            //   taskData["inventory_type"] = task.data().inventory_type;
            //   taskData["source"] = task.data().source;
            //   taskData["transfer_status"] = task.data().transfer_status;
// 
            //   taskList.push(taskData);
            // });
            // data = data.concat(taskList);
        //   }
        // });
// 
        // data.forEach((task) => {
        //   if (
            // task.status === "Pending" &&
            // task.due_date.toDate() < new Date()
        //   ) {
            // task.status = "Overdue";
        //   }
        // });
        // setTasks(data);
    //   } else {
        // console.log("org not found");
    //   }
    // });
//   return subscriber;
// };
// 
// export const fetchSalesTasks = (
//   setTasks: (data: any[]) => void,
//   organization_id: string,
//   uid: any[]
// ) => {
//   const subscriber = firestore
    // .collection("tasks")
    // .where("organization_id", "==", organization_id)
    // .where("uid", "==", uid)
    // .onSnapshot((task) => {
    //   let data: any[] = [];
    //   if (task) {
        // task.docs.forEach((task) => {
        //   let taskList: any = [];
        //   task.data().tasks.forEach((item: any) => {
            // let taskData = { ...item };
            // taskData["stage"] = task.data().stage;
            // taskData["contact_owner_email"] = task.data().contact_owner_email;
            // taskData["project"] = task.data().project;
            // taskData["location"] = task.data().location;
            // taskData["budget"] = task.data().budget;
            // taskData["contact_no"] = task.data().contact_no;
            // taskData["inventory_type"] = task.data().inventory_type;
            // taskData["source"] = task.data().source;
            // taskData["transfer_status"] = task.data().transfer_status;
// 
            // taskList.push(taskData);
        //   });
        //   data = data.concat(taskList);
        // });
// 
        // data.forEach((task) => {
        //   if (
            // task.status === "Pending" &&
            // task.due_date.toDate() < new Date()
        //   ) {
            // task.status = "Overdue";
        //   }
        // });
        // setTasks(data);
    //   } else {
        // console.log("org not found");
    //   }
    // });
//   return subscriber;
// };

// export const fetchLeadTasks = (
//   setTasks: (data: any[]) => void,
//   contactId: string
// ) => {
//   const subscribe = firestore
    // .collection("tasks")
    // .doc(contactId)
    // .onSnapshot((task) => {
    //   if (task) {
        // const data = task.data();
        // if (data) {
        //   setTasks(data.tasks);
        // } else {
        //   setTasks([]);
        // }
    //   } else {
        // console.log("Contact not Found");
        // setTasks([]);
    //   }
    // });
//   return subscribe;
// };
 
// export const fetchContactResources = (
//   setNotes: (data: any[]) => void,
//   setAttachments: (data: any[]) => void,
//   setCallLogs: (data: any[]) => void,
//   contactId: string
// ) => {
//   const subscribe = firestore
    // .collection("contactResources")
    // .doc(contactId)
    // .onSnapshot((resources) => {
    //   if (resources) {
        // const data = resources.data();
        // if (data?.notes) {
        //   setNotes(data.notes);
        // } else {
        //   setNotes([]);
        // }
        // if (data?.attachments) {
        //   setAttachments(data.attachments);
        // } else {
        //   setAttachments([]);
        // }
        // if (data?.callLogs) {
        //   setCallLogs(data.callLogs);
        // } else {
        //   setCallLogs([]);
        // }
    //   } else {
        // console.log("contact not Found");
    //   }
    // });
//   return subscribe;
// };

// export const fetchCallLogs = (
//   setCallList: (data: any[]) => void,
//   organization_id: string
// ) => {
//   let callList: any[] = [];
//   const subscribe = firestore
    // .collection("contactResources")
    // .where("organization_id", "==", organization_id)
    // .onSnapshot((resources) => {
    //   resources.docs.forEach((resource) => {
        // const data = resource.data();
        // console.log(data);
        // if (data?.callLogs) {
        //   callList.push({
            // uid: data.uid,
            // data: data.callLogs,
            // contactId: resource.id,
            // customer_name: data.customer_name,
            // stage: data.stage,
            // contact_owner_email: data.contact_owner_email,
            // project: data.project,
            // location: data.location,
            // budget: data.budget,
            // contact_no: data.contact_no,
            // inventory_type: data.inventory_type,
            // source: data.source,
            // transfer_status: data.transfer_status,
        //   });
        // }
    //   });
    //   console.log(callList);
    //   setCallList(callList);
    // });
//   return subscribe;
// };

// export const fetchUserCallLogs = (
//   setCallList: (data: any[]) => void,
//   uid: string
// ) => {
//   let callList: any[] = [];
//   const subscribe = firestore
    // .collection("contactResources")
    // .where("uid", "==", uid)
    // .onSnapshot((resources) => {
    //   if (resources.docs.length > 0) {
        // resources.docs.forEach((resource) => {
        //   const data = resource.data();
// 
        //   if (data?.callLogs) {
            // callList.push({
            //   uid: data.uid,
            //   data: data.callLogs,
            //   contactId: resource.id,
            //   customer_name: data.customer_name,
            //   stage: data.stage,
            //   contact_owner_email: data.contact_owner_email,
            //   project: data.project,
            //   location: data.location,
            //   budget: data.budget,
            //   contact_no: data.contact_no,
            //   inventory_type: data.inventory_type,
            //   source: data.source,
            //   transfer_status: data.transfer_status,
            // });
        //   }
// 
        //   setCallList(callList);
        // });
    //   } else {
        // setCallList([]);
    //   }
    // });
//   return subscribe;
// };

// export const fetchProjects = (
//   setProjects: (data: any[]) => void,
//   organization_id: string
// ) => {
//   const subscriber = firestore
    // .collection("organizationResources")
    // .doc(organization_id)
    // .onSnapshot((projects) => {
    //   if (projects) {
        // const projectData = projects.data();
        // if (projectData?.projects) {
        //   setProjects(projectData?.projects);
        // } else {
        //   setProjects([]);
        // }
    //   } else {
        // setProjects([]);
        // console.log("Org not found");
    //   }
    // });
//   return subscriber;
// };

// export const deleteProject = async (
//   project: string,
//   organization_id: string,
//   projectList: any[],
//   index: number,
//   dispatcher: any,
//   setLoad: (data: boolean) => void
// ) => {
//   let data: any[] = [];
//   firestore
    // .collection("contacts")
    // .where("organization_id", "==", organization_id)
    // .where("project", "==", project)
    // .get()
    // .then((contact) => {
    //   if (contact) {
        // contact.forEach((item) => {
        //   data.push(item.data());
        // });
    //   }
// 
    //   if (data.length !== 0) {
        // dispatcher(
        //   showSnackbarAction("This Project Is Used In Some Contacts", "error")
        // );
        // setLoad(false);
    //   } else {
        // projectList.splice(index, 1);
        // try {
        //   firestore
            // .collection("organizationResources")
            // .doc(organization_id)
            // .set(
            //   {
                // projects: projectList,
            //   },
            //   { merge: true }
            // );
        //   dispatcher(showSnackbarAction("Project Deleted", "success"));
        //   setLoad(false);
        // } catch (e) {
        //   console.log("Error:", e);
        //   dispatcher(showSnackbarAction("Error! Try Again.", "error"));
        //   setLoad(false);
        // }
    //   }
    // });
// };

export const craeteMultipleProject = (
  data: { [key: string]: any }[],
  map: { [key: string]: string },
  organization_id: string,
  dispatcher: any,
  submit: () => void,
  usersList: any[],
  setLoad: (data: boolean) => void
) => {};

// export const createProject = (
//   organization_id: string,
//   project_name: string,
//   developer_name: string,
//   address: string,
//   rera_link: string,
//   walkthrough_link: string,
//   type: string,
//   created_by: string,
//   dispatcher: any,
//   history: any,
//   setLoad: (data: boolean) => void
// ) => {
//   const doc = firestore.collection("projectResources").doc();
//   doc.set(
    // {
    //   brochures: [],
    //   priceLists: [],
    //   forms: [],
    //   layouts: [],
    //   organization_id: organization_id,
    // },
    // { merge: true }
//   );
//   firestore
    // .collection("organizationResources")
    // .doc(organization_id)
    // .set(
    //   {
        // organization_id: organization_id,
        // projects: Firebase.firestore.FieldValue.arrayUnion({
        //   project_name: project_name,
        //   developer_name: developer_name,
        //   address: address,
        //   walkthrough_link: walkthrough_link,
        //   rera_link: rera_link,
        //   property_type: type,
        //   created_at: Firebase.firestore.Timestamp.now(),
        //   created_by: created_by,
        //   project_id: doc.id,
        // }),
    //   },
    //   { merge: true }
    // )
    // .then(() => {
    //   dispatcher(showSnackbarAction("Project Added", "success"));
    //   setLoad(false);
    //   history.push("./projects");
    // })
    // .catch((error) => {
    //   console.log("Projects Error", error);
    //   setLoad(false);
    // });
// };

// export const changeOwner = async (
//   selectedOwner: any,
//   selectedRowsData: any[],
//   dispatcher: any,
//   organization_id: string
// ) => {
//   const batch = firestore.batch();
// 
//   if (selectedRowsData.length > 500) {
    // return false;
//   } else {
    // selectedRowsData.forEach((item) => {
    //   const contactsRef = firestore.collection("contacts").doc(item.contactId);
    //   const tasksRef = firestore.collection("tasks").doc(item.contactId);
    //   batch.set(
        // contactsRef,
        // {
        //   uid: selectedOwner.uid,
        //   contact_owner_email: selectedOwner.user_email.toLowerCase(),
        //   lead_assign_time: Firebase.firestore.Timestamp.now(),
        //   modified_at: Firebase.firestore.Timestamp.now(),
        //   previous_owner: item.contact_owner_email,
        //   previous_owner_one: item.previous_owner ? item.previous_owner : "",
        // },
        // { merge: true }
    //   );
    //   batch.set(
        // tasksRef,
        // {
        //   uid: selectedOwner.uid,
        // },
        // { merge: true }
    //   );
    // });
// 
    // try {
    //   await batch.commit();
// 
    //   let uid = selectedOwner.uid;
    //   functions.httpsCallable("sendNotifications")(
        // JSON.stringify({
        //   organization_id: organization_id,
        //   notifications: { [uid]: selectedRowsData.length },
        // })
    //   );
    //   dispatcher(showSnackbarAction("Owner Updated!!", "success"));
    // } catch (error) {
    //   console.log("error", error);
    //   dispatcher(showSnackbarAction("Error!!", "error"));
    // }
//   }
// };

// export const bulkEdit = async (
//   changeData: { [key: string]: any },
//   selectedRowsData: any[],
//   dispatcher: any
// ) => {
//   const batch = firestore.batch();
// 
//   if (selectedRowsData.length > 500) {
    // return false;
//   } else {
    // selectedRowsData.forEach((item) => {
    //   const contactsRef = firestore.collection("contacts").doc(item.contactId);
    //   batch.set(contactsRef, changeData, { merge: true });
    // });
    // try {
    //   await batch.commit();
    //   dispatcher(showSnackbarAction("Leads Updated!!", "success"));
    // } catch (error) {
    //   console.log("error");
    //   dispatcher(showSnackbarAction("Error!!", "error"));
    // }
//   }
// };

// export const contactResources = (
//   setLocations: (data: any[]) => void,
//   setBudgets: (data: any[]) => void,
//   setProjects: (data: any[]) => void,
// 
//   organization_id: string,
//   setLeadSource?: (data: any[]) => void
// ) => {
//   const subscriber = firestore
    // .collection("organizationResources")
    // .doc(organization_id)
    // .onSnapshot((resources) => {
    //   if (resources) {
        // const resourceData = resources.data();
        // if (resourceData?.locations) {
        //   let data: any = [];
        //   resourceData.locations.forEach((item: any) => {
            // data.push(item.location_name);
        //   });
// 
        //   setLocations(data);
        // } else {
        //   setLocations([]);
        // }
        // if (resourceData?.budgets) {
        //   let data: any = [];
        //   resourceData.budgets.forEach((item: any) => {
            // data.push(item.budget);
        //   });
// 
        //   setBudgets(data);
        // } else {
        //   setBudgets([]);
        // }
        // if (resourceData?.projects) {
        //   let data: any = [];
        //   resourceData.projects.forEach((item: any) => {
            // data.push(item.project_name);
        //   });
// 
        //   setProjects(data);
        // } else {
        //   setProjects([]);
        // }
        // if (resourceData?.leadSources) {
        //   let data: any[] = [];
        //   resourceData?.leadSources.forEach((item: any) => {
            // data.push(item.leadSource);
        //   });
        //   setLeadSource && setLeadSource(data);
        // } else {
        //   setLeadSource && setLeadSource([]);
        // }
    //   } else {
        // console.log("Org not found");
    //   }
    // });
//   return subscriber;
// };

// export const editContact = async (
//   contactId: string,
//   first_name: string,
//   last_name: string,
//   contact_no: string,
//   alternate_no: string,
//   stage: string,
//   project: string,
//   budget: string,
//   location: string,
//   property_type: string,
//   property_stage: string,
//   lead_source: string,
//   not_init_reason: string,
//   other_not_init_reason: string,
//   lost_reason: string,
//   other_lost_reason: string,
//   dispatcher: any,
//   history: any,
//   setLoad: (data: boolean) => void,
//   check: boolean,
//   organization_id: string,
//   property_sub_type: string,
//   country_code: string
// ) => {
//   if (check === true) {
    // const funcData = JSON.stringify({
    //   organization_id: organization_id,
    //   contact_no: contact_no,
    // });
    // const result = await functions.httpsCallable("checkLead")(funcData);
    // if (result.data === false) {
    //   dispatcher(
        // showSnackbarAction("This Contact Number Already Exists", "warning")
    //   );
    //   setLoad && setLoad(false);
    // } else {
    //   firestore
        // .collection("contacts")
        // .doc(contactId)
        // .set(
        //   {
            // alternate_no,
            // budget,
            // contact_no,
            // customer_name: first_name + " " + last_name,
            // country_code,
            // lead_source,
// 
            // location,
            // lost_reason,
            // modified_at: Firebase.firestore.Timestamp.now(),
// 
            // not_init_reason,
            // other_not_init_reason,
            // other_lost_reason,
// 
            // project,
            // property_stage,
            // property_type,
            // property_sub_type,
            // stage,
        //   },
        //   { merge: true }
        // )
        // .then(() => {
        //   dispatcher(
            // showSnackbarAction(
            //   "Record has been updated successfully !",
            //   "success"
            // )
        //   );
        //   setLoad(false);
        //   history.replace("/");
        // })
        // .catch((e) => {
        //   console.log("Error edit:", e);
        //   dispatcher(showSnackbarAction("Error! Try Again!!", "error"));
        //   setLoad(false);
        // });
    // }
//   } else {
    // firestore
    //   .collection("contacts")
    //   .doc(contactId)
    //   .set(
        // {
        //   alternate_no,
        //   budget,
        //   contact_no,
        //   customer_name: first_name + " " + last_name,
        //   country_code,
        //   lead_source,
// 
        //   location,
        //   lost_reason,
        //   not_init_reason,
        //   other_not_init_reason,
        //   other_lost_reason,
// 
        //   project,
        //   property_stage,
        //   property_type,
// 
        //   stage,
        // },
        // { merge: true }
    //   )
    //   .then(() => {
        // dispatcher(showSnackbarAction("Contact Details Edited!!", "success"));
        // setLoad(false);
        // history.replace("/");
    //   })
    //   .catch((e) => {
        // console.log("Error edit:", e);
        // dispatcher(showSnackbarAction("Error! Try Again!!", "error"));
        // setLoad(false);
    //   });
//   }
// };

// export const fetchConstants = (
//   setNotIntReason: (data: any[]) => void,
//   setLostReason: (data: any[]) => void,
//   setPropertyStage: (data: any[]) => void,
//   setPropertyType: (data: any[]) => void,
//   setFollowUpType?: (data: any[]) => void,
//   setCallBack?: (data: any[]) => void
// ) => {
//   const subscriber = firestore
    // .collection("values")
    // .doc("constants")
    // .onSnapshot((constant) => {
    //   if (constant) {
        // if (constant.data()?.not_interested) {
        //   setNotIntReason(constant.data()?.not_interested);
        // }
        // if (constant.data()?.lost_reasons) {
        //   setLostReason(constant.data()?.lost_reasons);
        // }
        // if (constant.data()?.property_stage) {
        //   setPropertyStage(constant.data()?.property_stage);
        // }
        // if (constant.data()?.property_type) {
        //   setPropertyType(constant.data()?.property_type);
        // }
        // if (constant.data()?.follow_up_type && setFollowUpType) {
        //   setFollowUpType(constant.data()?.follow_up_type);
        // }
        // if (constant.data()?.call_back && setCallBack) {
        //   setCallBack(constant.data()?.call_back);
        // }
    //   }
    // });
//   return subscriber;
// };

export const getDataFromRoute = (contacts: any[]) => {
  let data = JSON.parse(JSON.stringify(contacts));
  data.forEach((item: any) => {
    Object.keys(item).forEach((key) => {
      if (datesField.includes(key) && item[key] !== "") {
        item[key] = moment(item[key]);
      }
    });
  });
  return data;
};

export const changeDateForRoute = (contacts: any[]) => {
  let data = JSON.parse(JSON.stringify(contacts));

  data.forEach((item: any, index: number) => {
    Object.keys(item).forEach((key) => {
      if (datesField.includes(key) && item[key] !== "") {
        item[key] = contacts[index][key].toDate
          ? contacts[index][key].toDate()
          : "";
      }
    });
  });
  return JSON.stringify(data);
};

// export const changeLeadStage = (
//   leadId: string,
//   leadData: {},
//   setLoad: (value: boolean) => void,
//   dispatcher: any,
//   close: () => void,
//   history: any,
//   taskList?: any
// ) => {
//   setLoad(true);
// 
//   const batch = firestore.batch();
//   const taskCollection = firestore.collection("tasks").doc(leadId);
//   const leadCollection = firestore.collection("contacts").doc(leadId);
//   batch.update(leadCollection, {
    // ...leadData,
    // modified_at: Firebase.firestore.Timestamp.now(),
    // stage_change_at: Firebase.firestore.Timestamp.now(),
//   });
// 
//   if (taskList && taskList.length !== 0) {
    // let taskData = {
    //   status: "INACTIVE",
    //   tasks: modifyTaskStatus(taskList),
    // };
    // batch.update(taskCollection, { ...taskData });
//   }
// 
//   batch
    // .commit()
    // .then(() => {
    //   setLoad(false);
    //   dispatcher(showSnackbarAction("Lead Status Updated!!", "success"));
    //   close();
    //   history.push("/");
    // })
    // .catch((error) => {
    //   setLoad(false);
    //   dispatcher(showSnackbarAction("Try Again!!", "error"));
    //   console.log("change stage error", error);
    //   close();
    // });
// };

// export const createTaskFirebase = (
//   leadId: string,
//   tasks: any[],
//   task: any,
//   leadDataUpdate: {},
//   setLoad: (value: boolean) => void,
//   dispatcher: any,
//   user: any,
//   close: () => void,
//   history: any
// ) => {
//   tasks = modifyTaskStatus(tasks);
//   task = {
    // ...task,
    // created_at: Firebase.firestore.Timestamp.now(),
    // leadId,
    // created_by: user.user_email,
//   };
//   setLoad(true);
//   tasks.unshift(task);
//   const batch = firestore.batch();
//   const taskCollection = firestore.collection("tasks").doc(leadId);
//   const leadCollection = firestore.collection("contacts").doc(leadId);
//   batch.set(
    // taskCollection,
    // {
    //   status: "ACTIVE",
    //   tasks,
    //   uid: user.uid,
    //   organization_id: user.organization_id,
    // },
    // { merge: true }
//   );
//   batch.update(leadCollection, leadDataUpdate);
//   batch
    // .commit()
    // .then(() => {
    //   setLoad(false);
    //   dispatcher(showSnackbarAction("Lead Status Updated!!", "success"));
    //   close();
    //   history.push("/");
    // })
    // .catch((error) => {
    //   setLoad(false);
    //   dispatcher(showSnackbarAction("Try Again!!", "error"));
    //   console.log("Task Create Error", error);
    // });
// };

// export const reScheduleTaskFirebase = async (
//   date: Date,
//   tasks: any[],
//   leadId: string,
//   dispatcher: any,
//   history: any
// ) => {
//   let task = { ...tasks[0] };
//   task.due_date = date;
//   tasks[0] = task;
//   try {
    // const batch = firestore.batch();
    // const taskCollection = firestore.collection("tasks").doc(leadId);
    // const leadCollection = firestore.collection("contacts").doc(leadId);
    // batch.set(taskCollection, { tasks }, { merge: true });
    // batch.update(leadCollection, {
    //   next_follow_up_date_time: date,
    //   modified_at: Firebase.firestore.Timestamp.now(),
    // });
    // await batch.commit().then(() => {
    //   dispatcher(showSnackbarAction("Task Reshduled!", "success"));
    //   history.push("/");
    // });
//   } catch (error) {
    // dispatcher(showSnackbarAction("Try Again!!", "error"));
    // console.log("Reschdule Error", error);
//   }
// };

export const validateInterested = (
  firstName: string,
  lastName: string,
  propertyType: string,
  propertySubType: string,
  propertyStage: string,
  location: string,
  project: string,
  budget: string,
  followUp: string,
  date: Date,
  leadSource: string,
  alternate: string,
  property_sub_type: string,
  dispatcher: any
) => {
  let error = "";
  if (firstName.length == 0) {
    error = "First Name is required!";
  } else if (lastName.length == 0) {
    error = "Last Name is required!";
  } else if (propertyType === "Select") {
    error = "Property Type is required!";
  } else if (propertySubType === "Select") {
    error = "Property Sub Type is required!";
  } else if (propertySubType === "Select") {
    error = "Property Sub Type is required!";
  } else if (leadSource === "Select") {
    error = "Lead Source is required!";
  } else if (propertyStage === "Select") {
    error = "Property Stage is required!";
  } else if (location === "Select") {
    error = "Location is required!";
  } else if (project === "Select") {
    error = "Project is required!";
  } else if (budget === "Select") {
    error = "Budget is required!";
  } else if (followUp === "Select") {
    error = "Follow Up is required!";
  } else if (date < new Date()) {
    error = "Task Cannot be Schedule For Old Date & Time!";
  }
  if (error == "") {
    return {
      budget: budget,
      customer_name: firstName + " " + lastName,
      location: location,
      project: project,
      property_stage: propertyStage,
      property_type: propertyType,
      property_sub_type: property_sub_type,
      stage: "INTERESTED",
      alternate_no: alternate,
      next_follow_up_type: followUp,
      next_follow_up_date_time: moment(date).toDate(),
    //   modified_at: Firebase.firestore.Timestamp.now(),
    //   stage_change_at: Firebase.firestore.Timestamp.now(),
    };
  } else {
    dispatcher(showSnackbarAction(error, "error"));
    return undefined;
  }
};

export const modifyTaskStatus = (tasks: any[]) => {
  if (tasks.length < 1) {
    return tasks;
  }
  let taskData = { ...tasks[0] };
  taskData.status = "Completed";
//   taskData = { ...taskData, completed_at: Firebase.firestore.Timestamp.now() };
  tasks[0] = taskData;
  return tasks;
};

export const uploadAttachment = async (
  leadId: string,
  // uri: string,
  file: any,
  attachments: any[],
  type: string,
  filename: string,
  dispatcher: any,
  setLoad: (data: boolean) => void,
  close: () => void
) => {
  const path = `${leadId}/${type}/${filename}`;
//   const reference = storage.ref(path);
//   await reference.put(file);
//   const url = await reference.getDownloadURL();
  const firestoreData = {
    name: filename,
    type: type,
    // url: url,
    // created_at: Firebase.firestore.Timestamp.now(),
  };

//   const result = await addAttachmentFirestore(
    // leadId,
    // firestoreData,
    // attachments
//   );
//   if (result) {
    // dispatcher(showSnackbarAction("Uploaded Successfully!", "success"));
    // setLoad(false);
    // close();
//   } else {
    // dispatcher(showSnackbarAction("Upload Error!!", "error"));
    // setLoad(false);
    // close();
//   }
};

// export const addAttachmentFirestore = async (
//   leadId: string,
//   data: {},
//   attachments: any[]
// ) => {
//   let attachmentsData: any[] = [...attachments];
//   attachmentsData.unshift(data);
//   try {
    // await firestore.collection("contactResources").doc(leadId).set(
    //   {
        // attachments: attachmentsData,
    //   },
    //   { merge: true }
    // );
    // return true;
//   } catch (error) {
    // console.log("attachments firestore", error);
    // return false;
//   }
// };

// export const addNoteFirebase = (
//   leadId: string,
//   notes: any[],
//   note: string,
//   setLoad: (value: boolean) => void,
//   dispatcher: any,
//   close?: () => void
// ) => {
//   if (note.length === 0) {
    // dispatcher(showSnackbarAction("Please Add A Note", "error"));
    // return;
//   }
//   setLoad(true);
//   let noteData = [...notes];
//   noteData.unshift({
    // note: note,
    // created_at: Firebase.firestore.Timestamp.now(),
//   });
//   firestore
    // .collection("contactResources")
    // .doc(leadId)
    // .set(
    //   {
        // notes: noteData,
    //   },
    //   { merge: true }
    // )
    // .then(() => {
    //   dispatcher(showSnackbarAction("Saved", "success"));
    //   setLoad(false);
    //   close && close();
    // })
    // .catch((error) => {
    //   setLoad(false);
    //   dispatcher(showSnackbarAction("Try Again!!", "error"));
    //   console.log("AddNote Error", error);
    // });
// };

// export const fetchpropertySubType = (
//   organization_id: string,
//   setComTypes: (data: any[]) => void,
//   setResTypes: (data: any[]) => void,
//   setLeadSource: (data: any[]) => void
// ) => {
//   const subscriber = firestore
    // .collection("organizationResources")
    // .doc(organization_id)
    // .onSnapshot((doc) => {
    //   const resourceData = doc.data();
    //   if (resourceData?.comTypes) {
        // setComTypes(resourceData?.comTypes);
    //   } else {
        // setComTypes([]);
    //   }
    //   if (resourceData?.resTypes) {
        // setResTypes(resourceData?.resTypes);
    //   } else {
        // setResTypes([]);
    //   }
    //   if (resourceData?.leadSources) {
        // let data: any[] = [];
        // resourceData?.leadSources.forEach((item: any) => {
        //   data.push(item.leadSource);
        // });
        // setLeadSource(data);
    //   } else {
        // setLeadSource([]);
    //   }
    // });

//   return subscriber;
// };

// export const CreateLeadDistribution = (
//   organization_id: string,
//   leadSourceList: string[],
//   projectList: string[],
//   locationList: string[],
//   budgetList: string[],
//   propertyList: string[],
//   usersList: any[],
//   dispatcher: any,
//   setLoad: (data: boolean) => void,
//   close: () => void
// ) => {
//   firestore
    // .collection("leadDistribution")
    // .doc(organization_id)
    // .set(
    //   {
        // organization_id: organization_id,
        // logic: Firebase.firestore.FieldValue.arrayUnion({
        //   source: leadSourceList,
        //   project: projectList,
        //   location: locationList,
        //   budget: budgetList,
        //   property_type: propertyList,
        //   users: usersList,
        //   created_at: Firebase.firestore.Timestamp.now(),
        //   modify_at: Firebase.firestore.Timestamp.now(),
        // }),
    //   },
    //   { merge: true }
    // )
    // .then(() => {
    //   dispatcher(showSnackbarAction("Lead Distribution Created!!", "success"));
    //   setLoad(false);
    //   close();
    // })
    // .catch((error) => {
    //   console.log("Lead Distribution Created Error:", error);
    //   dispatcher(showSnackbarAction("Try Again!!", "error"));
    //   setLoad(false);
    //   close();
    // });
// };

// export const fetchLeadDistributions = (
//   organization_id: string,
//   setData: (data: any[]) => void
// ) => {
//   const subscribe = firestore
    // .collection("leadDistribution")
    // .doc(organization_id)
    // .onSnapshot((doc) => {
    //   if (doc) {
        // const data = doc.data();
        // if (data?.logic) {
        //   data.logic.forEach((logic: any) => {
            // logic.users = logic.users.map((user: any) => user.user_email);
        //   });
// 
        //   setData(data.logic);
        // } else {
        //   setData([]);
        // }
    //   } else {
        // setData([]);
    //   }
    // });
// 
//   return subscribe;
// };

// export const fetchLeadDistributionsEdit = (
//   organization_id: string,
//   setData: (data: any[]) => void
// ) => {
//   const subscribe = firestore
    // .collection("leadDistribution")
    // .doc(organization_id)
    // .onSnapshot((doc) => {
    //   if (doc) {
        // const data = doc.data();
        // if (data?.logic) {
        //   setData(data.logic);
        // } else {
        //   setData([]);
        // }
    //   } else {
        // setData([]);
    //   }
    // });
// 
//   return subscribe;
// };

// export const editLeadDistribution = (
//   organization_id: string,
//   leadDistributionList: any[],
//   dispatcher: any,
//   setLoad: (data: boolean) => void,
//   close: () => void
// ) => {
//   firestore
    // .collection("leadDistribution")
    // .doc(organization_id)
    // .set(
    //   {
        // logic: leadDistributionList,
    //   },
    //   { merge: true }
    // )
    // .then(() => {
    //   dispatcher(showSnackbarAction("Lead Distribution Updated!!", "success"));
    //   setLoad(false);
    //   close();
    // })
    // .catch((error) => {
    //   dispatcher(showSnackbarAction("Error!! Try Again!!", "error"));
    //   setLoad(false);
    //   console.log("Upload Error:", error);
    // });
// };
