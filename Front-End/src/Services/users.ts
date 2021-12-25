import {
    showSnackbarAction,
    setOrganizationUsersList,
    setUser,
    setTeamLeadUsersList,
  } from "../Components/Redux/actions";
  import { phoneValidate } from "../Values/validator";
  import { createUser } from "../Services/organization";
//   import { db, firestore, functions, storage } from "../Firebase";
  import Firebase from "firebase/app";
  import { StringKey } from "react-table";
  export const createMultipleUsers = async (
    data: { [key: string]: any }[],
    map: { [key: string]: string },
    organization_id: string,
    dispatcher: any,
    submit: () => void,
    created_by: string,
    setLoad: (data: boolean) => void,
    history: any,
    activeUsers: number,
    organizationUser: number,
    country: string,
    state: string
  ) => {
    let error = false;
    let contactList: any[] = [];
    data.forEach((userData, index) => {
      if (map.hasOwnProperty("Mobile No.")) {
        const no = String(userData[map["Mobile No."]]);
        userData[map["Mobile No."]] = no.substring(no.length - 10);
      }
      if (!map.hasOwnProperty("Name")) {
        dispatcher(showSnackbarAction("Please Select customer name", "error"));
        error = true;
        contactList = [];
        return;
      } else if (!map.hasOwnProperty("Mobile No.")) {
        dispatcher(showSnackbarAction("Please Select contact number", "error"));
        error = true;
        contactList = [];
        return;
      } else if (!map.hasOwnProperty("Email ID")) {
        dispatcher(showSnackbarAction("Please Select email id", "error"));
        error = true;
        contactList = [];
        return;
      } else if (!map.hasOwnProperty("Reporting To")) {
        dispatcher(
          showSnackbarAction("Please Select contact Reporting manager", "error")
        );
        error = true;
        contactList = [];
        return;
      } else if (!map.hasOwnProperty("Profile")) {
        dispatcher(showSnackbarAction("Please Select Profile", "error"));
        error = true;
        contactList = [];
        return;
      } else if (!map.hasOwnProperty("Designation")) {
        dispatcher(showSnackbarAction("Please Select designation", "error"));
        error = true;
        contactList = [];
        return;
      } else if (!map.hasOwnProperty("Team")) {
        dispatcher(showSnackbarAction("Please Select Team Name", "error"));
        error = true;
        contactList = [];
        return;
      } else if (!map.hasOwnProperty("Branch")) {
        dispatcher(showSnackbarAction("Please Select Branch", "error"));
        error = true;
        contactList = [];
        return;
      } else if (phoneValidate(userData[map["Mobile No."]]).length !== 0) {
        dispatcher(
          showSnackbarAction(
            "Invalid Contact Number at row " + userData.sno,
            "error"
          )
        );
        error = true;
        contactList = [];
        return;
      } else if (userData[map["Name"]] === "") {
        dispatcher(
          showSnackbarAction(
            "Invalid Customer Name at row " + userData.sno,
            "error"
          )
        );
        error = true;
        contactList = [];
        return;
      }
    });
    if (error === false) {
      setLoad(true);
  
      data.forEach((item) => {
        if (contactList.includes(item[map["Mobile No."]])) {
          dispatcher(showSnackbarAction("Repeated User At " + item.sno, "error"));
        } else {
          contactList.push({
            contact_no: item[map["Mobile No."]],
            sno: item.sno,
          });
        }
      });
  
    //   const user = await checkUserList(contactList, dispatcher);
    //   if (user === true) {
        // data.forEach(async (userData, index) => {
        //   activeUsers = activeUsers + 1;
        //   createUser(
            // userData[map["Email ID"]],
            // String(userData[map["Name"]]).split(" ")[0],
            // String(userData[map["Name"]]).split(" ")[1],
            // userData[map["Team"]],
            // userData[map["Reporting To"]],
            // userData[map["Mobile No."]],
            // userData[map["Designation"]],
            // userData[map["Branch"]],
            // activeUsers <= organizationUser ? "ACTIVE" : "INACTIVE",
            // userData[map["Profile"]],
            // dispatcher,
            // history,
            // organization_id,
            // created_by,
            // country,
            // state,
            // true
        //   );
        // });
    //   }
    // }
    // setLoad(false);
    // submit();
//   };
  
//   const checkUserList = async (contactList: any[], dispatcher: any) => {
    // const contacts: string[] = [];
    // contactList.forEach((item) => contacts.push(item.contact_no));
    // const funcData = JSON.stringify({
    //   contact_no: contacts,
    // });
    // const result = await functions.httpsCallable("checkMultipleUser")(funcData);
    // if (result.data !== true) {
    //   const contact = contactList.filter(
        // (item) => item.contact_no === result.data
    //   );
    //   dispatcher(
        // showSnackbarAction(
        //   result.data + " User Already Exists at " + contact[0].sno,
        //   "error"
        // )
    //   );
    //   return false;
    // } else {
    //   return true;
    // }
//   };
//   
//   const sortUsers = (a: any, b: any) => {
    // if (a.created_at.toDate() > b.created_at.toDate()) {
    //   return 1;
    // } else {
    //   return -1;
    // }
//   };
//   let uidList: any[] = [];
//   const createUsersList = (email: string, users: any[]) => {
    // users.forEach((item: any) => {
    //   if (item.reporting_to === email) {
        // if (!uidList.includes(item.uid)) {
        //   uidList.push(item.uid);
        //   createUsersList(item.user_email, users);
        // }
    //   }
    // });
//   };
  
//   export const fetchOrganizationsUsers = (
    // dispatcher: any,
    // organization_id: string,
    // user?: any
//   ) => {
    // const subscribe = firestore
    //   .collection("users")
    //   .where("organization_id", "==", organization_id)
    //   .onSnapshot((users) => {
        // const data: any[] = [];
        // if (users) {
        //   users.forEach((users) => {
            // data.push(users.data());
        //   });
        //   dispatcher(setOrganizationUsersList(data.sort(sortUsers)));
        //   if (user) {
            // if (user.profile === "Team Lead") {
            //   if (data) {
                // if (!uidList.includes(user.uid)) {
                //   uidList.push(user.uid);
                // }
                // createUsersList(user.user_email, data);
            //   }
            //   console.log(uidList);
            //   dispatcher(setTeamLeadUsersList(uidList));
            // }
        //   }
        // } else {
        //   console.log("not found");
        // }
    //   });
    // return subscribe;
//   };
  
//   export const updateUserStatus = (
    // uid: string,
    // status: string,
    // setLoad: (data: boolean) => void
//   ) => {
    // if (status === "ACTIVE") {
    //   firestore
        // .collection("users")
        // .doc(uid)
        // .set(
        //   {
            // status: status,
//   
            // activated_at: Firebase.firestore.Timestamp.now(),
        //   },
        //   { merge: true }
        // )
        // .then(() => {
        //   setLoad(false);
        // })
        // .catch((e) => {
        //   console.log("Error:", e);
        //   setLoad(false);
        // });
    // } else {
    //   firestore
        // .collection("users")
        // .doc(uid)
        // .set(
        //   {
            // status: status,
            // deactivated_at: Firebase.firestore.Timestamp.now(),
        //   },
        //   { merge: true }
        // )
        // .then(() => {
        //   setLoad(false);
        // })
        // .catch((e) => {
        //   console.log("Error:", e);
        //   setLoad(false);
        // });
    // }
//   };
  
//   export const EditUserDetails = async (
    // uid: string,
    // user_first_name: string,
    // user_last_name: string,
    // contact_no: string,
    // designation: string,
    // profile: string,
    // reporting_to: string,
    // team: string,
    // dispatcher: any,
    // check: boolean,
    // setLoad: (data: boolean) => void,
    // history: any,
    // reportingToProfile: any,
    // branch: any
//   ) => {
    // let start = true;
    // let reportingProfile = "";
    // reportingToProfile.forEach((item: any) => {
    //   if (item.value === reporting_to) {
        // reportingProfile = item.label;
    //   }
    // });
//   
    // if (profile === "CEO") {
    //   if (reportingProfile === "Sales" || reportingProfile === "Team Lead") {
        // dispatcher(
        //   showSnackbarAction("CEO Cannot Report To Lower Profiles!!", "warning")
        // );
        // setLoad && setLoad(false);
    //   } else {
        // start = false;
    //   }
    // } else if (profile === "Lead Manager") {
    //   if (
        // reportingProfile === "Sales" ||
        // reportingProfile === "Team Lead" ||
        // reportingProfile === "CEO"
    //   ) {
        // dispatcher(
        //   showSnackbarAction(
            // "Lead Manager Cannot Report To Lower Profiles!!",
            // "warning"
        //   )
        // );
        // setLoad && setLoad(false);
    //   } else {
        // start = false;
    //   }
    // } else if (profile === "Team Lead") {
    //   if (reportingProfile === "Sales") {
        // dispatcher(
        //   showSnackbarAction(
            // "Team Lead Cannot Report To Lower Profiles",
            // "warning"
        //   )
        // );
        // setLoad && setLoad(false);
    //   } else {
        // start = false;
    //   }
    // } else {
    //   start = false;
    // }
    // if (start === false) {
    //   let result: { data: any } = { data: true };
    //   if (check === true) {
        // const funcData = JSON.stringify({
        //   contact_no: contact_no,
        // });
        // result = await functions.httpsCallable("checkUser")(funcData);
    //   } else {
        // result.data = true;
    //   }
  
    //   if (result.data === false) {
        // dispatcher(
        //   showSnackbarAction("User Contact Number Already Exists!!", "warning")
        // );
        // setLoad && setLoad(false);
    //   } else {
        // firestore
        //   .collection("users")
        //   .doc(uid)
        //   .set(
            // {
            //   user_first_name,
            //   user_last_name,
            //   contact_no,
            //   designation,
            //   profile,
            //   reporting_to,
            //   team,
            //   branch,
            // },
            // { merge: true }
        //   )
        //   .then(async () => {
            // await functions.httpsCallable("changeRole")(
            //   JSON.stringify({ uid: uid, role: profile })
            // );
            dispatcher(
              showSnackbarAction(
                "Record has been updated successfully !",
                "success"
              )
            );
            setLoad(false);
            history.replace("/");
          }
        //   .catch((e) => {
            // console.log("Error edit:", e);
            // dispatcher(showSnackbarAction("Error! Try Again!!", "error"));
            // setLoad(false);
        //   });
      }
    // }
//   };
  
//   export const fetchProfilesData = (setProfile: (data: any[]) => void) => {
    // const subscriber = firestore
    //   .collection("values")
    //   .doc("profiles")
    //   .onSnapshot((profiles) => {
        // if (profiles) {
        //   setProfile(profiles.data()?.profiles);
        // } else {
        //   console.log("profiles not found");
        // }
    //   });
    // return subscriber;
//   };
  
//   export const uploadUserImage = async (
    // file: any,
    // uid: string,
    // deletePrev: boolean,
    // dispatcher: any
//   ) => {
    // const path = `userImages/${uid}`;
    // const reference = storage.ref(path);
    // if (deletePrev) {
    //   await reference.delete();
    // }
    // try {
    //   const snapshot = await reference.put(file);
    //   const url = await reference.getDownloadURL();
    //   dispatcher(setUser({ user_image: url }));
    //   try {
        // await firestore.collection("users").doc(uid).set(
        //   {
            // user_image: url,
        //   },
        //   { merge: true }
        // );
    //   } catch (error) {
        // console.log("User Image Upload Error", error);
        // dispatcher(showSnackbarAction("Error!!", "error"));
    //   }
    // } catch (error) {
    //   console.log("User Image Upload Error", error);
    //   dispatcher(showSnackbarAction("Error!!", "error"));
    // }
//   };
  
//   export const updateUserImport = (
    // organization_id: string,
    // email: string,
    // importStatus: boolean,
    // dispatcher: any,
    // setLoad: (data: boolean) => void
//   ) => {
    // firestore
    //   .collection("users")
    //   .where("organization_id", "==", organization_id)
    //   .where("user_email", "==", email)
    //   .get()
    //   .then((users) => {
        // users.docs.forEach((user) => {
        //   user.ref
            // .set(
            //   {
                // import: importStatus,
            //   },
            //   { merge: true }
            // )
            // .then(() => {
            //   console.log("Import status updated");
            //   dispatcher(
                // showSnackbarAction("Import Properties Updated", "success")
            //   );
            //   setLoad(false);
            // })
            // .catch((error) => {
            //   console.log("Import status error", error);
            //   setLoad(false);
            // });
        // });
    //   });
//   };
  
//   export const setBranchPermission = (
    // uid: string,
    // dispatcher: any,
    // setLoad: (data: boolean) => void,
    // branchList: any[],
    // close: () => void
//   ) => {
    // firestore
    //   .collection("users")
    //   .doc(uid)
    //   .set(
        // {
        //   branchPermission: branchList,
        // },
        // { merge: true }
    //   )
    //   .then(() => {
        // dispatcher(showSnackbarAction("Branch Permissions Set!!", "success"));
        // setLoad(false);
        // close();
    //   })
    //   .catch((error) => {
        // console.log("Branch Permissions Set Error-", error);
        // setLoad(false);
        // close();
    //   });
//   };
  
//   export const fetchBranchList = (
    // uid: string,
    // setBranchList: (data: any[]) => void
//   ) => {
    // firestore
    //   .collection("users")
    //   .where("uid", "==", uid)
    //   .get()
    //   .then((user) => {
        // user.docs.forEach((user) => {
        //   if (user.data().branchPermission) {
            // setBranchList(user.data().branchPermission);
        //   } else {
            // setBranchList([]);
        //   }
        // });
    //   });
//   };
  
//   export const DeleteRecords = async (
    // uid: string,
    // organization_id: string,
    // dispatcher: any,
    // setLoad: (data: boolean) => void,
    // close: () => void
//   ) => {
    // try {
    //   await db.ref(`/${organization_id}/${uid}`).remove();
    //   const docs = await firestore
        // .collection("contacts")
        // .where("uid", "==", uid)
        // .get();
    //   console.log("Total docs - ", docs.size);
    //   docs.forEach(async (doc) => {
        // await firestore.collection("tasks").doc(doc.id).delete();
        // await firestore.collection("contactSearch").doc(doc.id).delete();
        // await firestore.collection("contactResources").doc(doc.id).delete();
        // await doc.ref.delete();
        // console.log("Deleted - ", doc.id);
    //   });
    //   const doc = await firestore
        // .collection("analytics")
        // .where("uid", "==", uid)
        // .get();
    //   console.log("Total docs - ", doc.size);
    //   doc.forEach(async (doc) => {
        // try {
        //   await doc.ref.delete();
        //   console.log("Deleted - ", doc.id);
        // } catch (error) {
        //   console.log("unable to delete - ", doc.id);
        // }
    //   });
//   
    //   dispatcher(showSnackbarAction("Deleted Records!!", "success"));
    //   setLoad(false);
    //   close();
    // } catch (error) {
    //   console.log("unable to delete");
    //   dispatcher(showSnackbarAction("Error!! Try Again!!", "error"));
    //   setLoad(false);
    //   close();
    // }
//   };
  
//   export const setUserFeildsPermission = (
    // uid: string,
    // finalObject: any,
    // dispatcher: any,
    // setLoad: (data: boolean) => void,
    // close: () => void
//   ) => {
    // const doc = firestore
    //   .collection("permissions")
    //   .doc(uid)
    //   .set(finalObject, { merge: true })
    //   .then(() => {
        // dispatcher(showSnackbarAction("User Permissions Updated!!", "success"));
        // setLoad(false);
        // close();
    //   })
    //   .catch(() => {
        // dispatcher(showSnackbarAction("Please Try Again!!", "error"));
        // setLoad(false);
        // close();
    //   });
// };
