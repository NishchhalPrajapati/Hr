import Firebase from "firebase/app";
// import { firestore, functions } from "../Firebase";
import { showSnackbarAction } from "../Components/Redux/actions";
// import { country_code } from "../Values/constants";

let organizationId = "";

// export const fetchOrganizations = (setData: (data: any[]) => void) => {
//   const subscriber = firestore
    // .collection("organizations")
    // .onSnapshot((organizations) => {
    //   const data: any[] = [];
    //   if (organizations) {
        // organizations.forEach((organization) => {
        //   data.push({
            // ...organization.data(),
            // organization_id: organization.id,
        //   });
        // });
        // setData(data);
    //   } else {
        // setData([]);
    //   }
    // });
//   return subscriber;
// };

// export const createOrganization = (
//   organization_name: string,
//   mobile_number: number,
//   email_id: string,
//   address: string,
//   country: string,
//   state: string,
//   city: string,
//   pincode: number,
//   admin_first_name: string,
//   admin_last_name: string,
//   admin_contact_number: number,
//   admin_email_id: string,
//   no_of_employees: number,
//   history: any,
//   dispatcher: any,
//   window: any,
//   setLoad: (data: boolean) => void
// ) => {
//   let password = "";
//   if (admin_first_name.length < 4) {
    // password =
    //   admin_first_name.toUpperCase() +
    //   admin_last_name.slice(0, 4 - admin_first_name.length).toUpperCase() +
    //   "@" +
    //   admin_contact_number.toString().slice(0, 4);
//   } else {
    // password =
    //   admin_first_name.slice(0, 4).toUpperCase() +
    //   "@" +
    //   admin_contact_number.toString().slice(0, 4);
//   }
//   const org_id = firestore.collection("organizations").doc();
//   functions
    // .httpsCallable("createOrganization")(
    //   JSON.stringify({
        // email: admin_email_id.toLowerCase(),
        // password: password,
        // displayName: admin_first_name + " " + admin_last_name,
        // organization_id: org_id.id,
    //   })
    // )
    // .then((response) => {
    //   org_id
        // .set(
        //   {
            // organization_name: organization_name,
            // mobile_number: mobile_number,
            // email_id: email_id.toLowerCase(),
            // address: address,
            // country: country,
            // state: state,
            // city: city,
            // created_at: Firebase.firestore.Timestamp.now(),
            // pincode: pincode,
            // admin_first_name: admin_first_name,
            // admin_last_name: admin_last_name,
            // admin_contact_number: admin_contact_number,
            // admin_email_id: admin_email_id.toLowerCase(),
            // no_of_employees: no_of_employees,
            // teams: [],
            // designations: [],
            // status: "ACTIVE",
            // auth_id: response.data,
        //   },
        //   { merge: true }
        // )
        // .then(() => {
        //   firestore.collection("users").doc(response.data).set({
            // user_first_name: admin_first_name,
            // user_last_name: admin_last_name,
            // user_email: admin_email_id.toLowerCase(),
            // team: "",
            // reporting_to: "",
            // contact_no: admin_contact_number,
            // designation: "Organization Admin",
            // status: "ACTIVE",
            // organization_id: org_id.id,
            // created_by: "Super Admin",
            // created_at: Firebase.firestore.Timestamp.now(),
            // profile: "Admin",
            // uid: response.data,
            // user_image: "",
            // device_id: "",
            // country: country,
            // state: state,
        //   });
        //   dispatcher(showSnackbarAction("Organization Created!!", "success"));
        //   setLoad(false);
        //   history.replace("/");
        // })
        // .catch((error) => {
        //   console.log("Firstore organization error", error);
        //   setLoad(false);
        // });
    // })
    // .catch((err) => {
    //   console.log("role error", err);
// 
    //   dispatcher(showSnackbarAction("Organization Already exists!!", "error"));
    //   setLoad(false);
    // });
// };

// export const editOrganization = (
//   organization_id: string,
//   organization_name: string,
//   mobile_number: number,
//   email_id: string,
//   address: string,
//   country: string,
//   state: string,
//   city: string,
//   pincode: number,
//   admin_first_name: string,
//   admin_last_name: string,
//   admin_contact_number: number,
//   admin_email_id: string,
//   no_of_employees: number,
//   auth_id: string,
//   history: any,
//   dispatcher: any,
//   setLoad: (data: boolean) => void
// ) => {
//   firestore
    // .collection("organizations")
    // .doc(organization_id)
    // .set(
    //   {
        // organization_name: organization_name,
        // mobile_number: mobile_number,
        // email_id: email_id.toLowerCase(),
        // address: address,
        // country: country,
        // state: state,
        // city: city,
        // created_at: Firebase.firestore.Timestamp.now(),
        // pincode: pincode,
        // admin_first_name: admin_first_name,
        // admin_last_name: admin_last_name,
        // admin_contact_number: admin_contact_number,
        // admin_email_id: admin_email_id.toLowerCase(),
        // no_of_employees: no_of_employees,
        // teams: [],
        // designations: [],
        // status: "ACTIVE",
        // auth_id: auth_id,
    //   },
    //   { merge: true }
    // )
    // .then(() => {
    //   dispatcher(
        // showSnackbarAction("Organization Details Updated!!", "success")
    //   );
    //   setLoad(false);
    //   history.replace("/");
    // })
    // .catch((error) => {
    //   console.log("Edit Org Error:", error);
    //   dispatcher(showSnackbarAction("Error!! Try Again!!", "error"));
    //   setLoad(false);
    // });
// };

// export const fetchOrganizationsData = (
//   email: string,
//   setTeams: (data: any[]) => void,
//   setDesignations: (data: any[]) => void,
//   setId: (data: string) => void
// ) => {
//   const subscriber = firestore
    // .collection("organizations")
    // .where("admin_email_id", "==", email)
    // .onSnapshot((organization) => {
    //   if (organization) {
        // const org = organization.docs[0];
        // organizationId = org.id;
        // setId(organizationId);
// 
        // setTeams(organization.docs[0].data().teams);
        // setDesignations(organization.docs[0].data().designations);
    //   } else {
        // console.log("org not found");
    //   }
    // });
//   return subscriber;
// };

// export const updatePrimaryLeader = (
//   organization_id: string,
//   primary_lead_manager_email: string
//   setLoad: (data: boolean) => void
// ) => {
//   firestore
    // .collection("organizations")
    // .doc(organization_id)
    // .set(
    //   {
        // primary_lead_manager: primary_lead_manager_email,
    //   },
    //   { merge: true }
    // )
    // .then(() => {
    //   console.log("Primary lead manager updated");
    //   setLoad(false);
    // })
    // .catch((e) => {
    //   console.log("Error:", e);
    //   setLoad(false);
    // });
// };

// export const updateTeams = (
//   teamName: string,
//   setLoad: (value: boolean) => void,
//   organization_id: string,
//   setShowTeamModal: (value: boolean) => void,
//   dispatcher: any
// ) => {
//   setLoad(true);
//   firestore
    // .collection("organizations")
    // .doc(organization_id)
    // .set(
    //   {
        // teams: Firebase.firestore.FieldValue.arrayUnion(teamName),
    //   },
    //   { merge: true }
    // )
    // .then(() => {
    //   dispatcher(showSnackbarAction("Team Added", "success"));
    //   setLoad(false);
    //   setShowTeamModal(false);
    // })
    // .catch((e) => {
    //   console.log("Error", e);
    // });
// };

// export const updateDesignations = (
//   designation: string,
//   setLoad: (value: boolean) => void,
//   organization_id: string,
//   setShowDesigModal: (value: boolean) => void,
//   dispatcher: any
// ) => {
//   setLoad(true);
//   firestore
    // .collection("organizations")
    // .doc(organization_id)
    // .set(
    //   {
        // designations: Firebase.firestore.FieldValue.arrayUnion(designation),
    //   },
    //   { merge: true }
    // )
    // .then(() => {
    //   dispatcher(showSnackbarAction("Designation Added", "success"));
    //   setLoad(false);
    //   setShowDesigModal(false);
    // })
    // .catch((e) => {
    //   console.log("Error", e);
    // });
// };

// export const updateOrganizationStatus = (
//   organization_id: string,
//   status: string,
//   setLoad: (data: boolean) => void
// ) => {
//   firestore
    // .collection("organizations")
    // .doc(organization_id)
    // .set(
    //   {
        // status: status,
    //   },
    //   { merge: true }
    // )
    // .then(() => {
    //   console.log("Status updated");
    //   setLoad(false);
    // })
    // .catch((e) => {
    //   console.log("Error:", e);
    //   setLoad(false);
    // });
// };

// export const updateAPIStatus = (
//   id: string,
//   status: string,
//   setLoad: (data: boolean) => void
// ) => {
//   firestore
    // .collection("apiTokens")
    // .doc(id)
    // .set(
    //   {
        // status: status,
    //   },
    //   { merge: true }
    // )
    // .then(() => {
    //   console.log("Status updated");
    //   setLoad(false);
    // })
    // .catch((e) => {
    //   console.log("Error:", e);
    //   setLoad(false);
    // });
// };

// export const fetchUsers = (setData: (data: any[]) => void, dispatcher: any) => {
//   const subscriber = firestore.collection("users").onSnapshot((users) => {
    // const data: any[] = [];
// 
    // if (users) {
    //   users.forEach((users) => {
        // data.push(users.data());
    //   });
// 
    //   setData(data);
    // } else {
    //   setData([]);
    // }
//   });
//   return subscriber;
// };

export const createUser = async (
  user_email: string,
  user_first_name: string,
  user_last_name: string,
  team: any,
  reporting_to: any,
  contact_no: string,
  designation: any,
  branch: any,
  status: string,
  profile: string,
  dispatcher: any,
  history: any,
  id: any,
  created_by: string,
  country: string,
  state: string,
  multiple: boolean,
  setLoad?: (data: boolean) => void,
  reportingToProfile?: any
) => {
  let check = false;
  if (reportingToProfile) {
    check = true;
    let reportingProfile = "";
    reportingToProfile.forEach((item: any) => {
      if (item.value === reporting_to) {
        reportingProfile = item.label;
      }
    });

    if (profile === "CEO") {
      if (reportingProfile === "Sales" || reportingProfile === "Team Lead") {
        dispatcher(
          showSnackbarAction("CEO Cannot Report To Lower Profiles!!", "warning")
        );
        setLoad && setLoad(false);
      } else {
        check = false;
      }
    } else if (profile === "Lead Manager") {
      if (
        reportingProfile === "Sales" ||
        reportingProfile === "Team Lead" ||
        reportingProfile === "CEO"
      ) {
        dispatcher(
          showSnackbarAction(
            "Lead Manager Cannot Report To Lower Profiles!!",
            "warning"
          )
        );
        setLoad && setLoad(false);
      } else {
        check = false;
      }
    } else if (profile === "Team Lead") {
      if (reportingProfile === "Sales") {
        dispatcher(
          showSnackbarAction(
            "Team Lead Cannot Report To Lower Profiles",
            "warning"
          )
        );
        setLoad && setLoad(false);
      } else {
        check = false;
      }
    } else {
      check = false;
    }
  }
  if (check === false) {
    let result: { data: any } = { data: true };
    if (multiple === false) {
      const funcData = JSON.stringify({
        contact_no: contact_no,
      });
    //   result = await functions.httpsCallable("checkUser")(funcData);
    }

    if (result.data === false) {
      dispatcher(
        showSnackbarAction("User Contact Number Already Exists!!", "warning")
      );
      setLoad && setLoad(false);
    } else {
      try {
        let password = "";
        if (user_first_name.length < 4) {
          password =
            user_first_name.toUpperCase() +
            user_last_name.slice(0, 4 - user_first_name.length).toUpperCase() +
            "@" +
            contact_no.toString().slice(0, 4);
        } else {
          password =
            user_first_name.slice(0, 4).toUpperCase() +
            "@" +
            contact_no.toString().slice(0, 4);
        }
        // const response = await functions.httpsCallable("createUser")(
        //   JSON.stringify({
            // role: profile,
            // organization_id: id,
            // userData: {
            //   email: user_email,

            //   password: password,
            //   displayName: user_first_name + " " + user_last_name,
            // },
        //   })
        // );
        // try {
        //   await firestore
            // .collection("users")
            // .doc(response.data)
            // .set(
            //   {
                // user_first_name,
                // user_last_name: user_last_name ? user_last_name : "",
                // user_email: user_email.toLowerCase(),
                // team,
                // reporting_to,
                // contact_no,
                // designation,
                // status,
                // organization_id: id,
                // created_by: created_by,
                // created_at: Firebase.firestore.Timestamp.now(),
                // profile,
                // uid: response.data,
                // user_image: "",
                // device_id: "",
                // country: country,
                // state: state,
                // branch: branch,
            //   },
            //   { merge: true }
            // );
          dispatcher(showSnackbarAction("User Created!!", "success"));
          setLoad && setLoad(false);
          history.replace("/");
        } catch (error) {
          console.log("Firstore organization error", error);
          setLoad && setLoad(false);
        }
    //   } catch (error) {
        // dispatcher(
        //   showSnackbarAction("User Email ID Already exists!!", "error")
        // );
        setLoad && setLoad(false);
      }
    }
  }
// };

// export const setLeadPermission = (
//   organization_id: string,
//   profile: string,
//   options: any[],
//   dispatcher: any,
//   setLoad: (val: boolean) => void,
//   close: () => void,
//   organizationUsers: any[]
// ) => {
//   firestore
    // .collection("organizationResources")
    // .doc(organization_id)
    // .set(
    //   {
        // permission: {
        //   [profile]: options,
        // },
    //   },
    //   { merge: true }
    // )
    // .then(() => {
    //   organizationUsers.forEach((user) => {
        // if (user.profile === profile) {
        //   if (user.leadView) {
            // Object.keys(user.leadView).forEach((key) => {
            //   let data: string[] = [];
            //   user.leadView[key].forEach((item: string) => {
                // if (options.includes(item)) {
                //   data.push(item);
                // }
            //   });
            //   user.leadView[key] = data;
            // });
            // firestore.collection("users").doc(user.uid).set(
            //   {
                // leadView: user.leadView,
            //   },
            //   { merge: true }
            // );
        //   }
        // }
    //   });
// 
    //   dispatcher(showSnackbarAction("Lead View Permission Updated", "success"));
    //   setLoad(false);
    //   close();
    // })
    // .catch((error) => {
    //   console.log("Lead View Error", error);
    //   setLoad(false);
    //   close();
    // });
// };

// export const fetchOrganizationLeadPermission = (
//   organization_id: string,
//   setPermissions: (data: any) => void
// ) => {
//   const subscriber = firestore
    // .collection("organizationResources")
    // .doc(organization_id)
    // .onSnapshot((resources) => {
    //   if (resources) {
        // const resourceData = resources.data();
        // if (resourceData?.permission) {
        //   setPermissions(resourceData?.permission);
        // } else {
        //   setPermissions([]);
        // }
    //   } else {
        // console.log("Org not found");
    //   }
    // });
//   return subscriber;
// };

// export const createApi = (
//   organization_id: string,
//   source: string,
//   countryCode: string,
//   dispatcher: any,
//   setLoad: (val: boolean) => void,
//   close: () => void
// ) => {
//   firestore
    // .collection("apiTokens")
    // .doc()
    // .set({
    //   created_at: Firebase.firestore.Timestamp.now(),
    //   organization_id: organization_id,
    //   source: source,
    //   country_code: countryCode,
    //   status: "ACTIVE",
    // })
    // .then(() => {
    //   dispatcher(showSnackbarAction("API Created !!", "success"));
    //   setLoad(false);
    //   close();
    // })
    // .catch((error) => {
    //   console.log("API Error:", error);
    //   dispatcher(showSnackbarAction("Error!! Try Again!!", "error"));
    //   setLoad(false);
    // });
// };

// export const editApi = (
//   source: string,
//   countryCode: string,
//   token: string,
//   dispatcher: any,
//   setLoad: (val: boolean) => void,
//   close: () => void,
//   editClose: () => void
// ) => {
//   console.log(source, countryCode, token);
//   firestore
    // .collection("apiTokens")
    // .doc(token)
    // .set(
    //   {
        // source: source,
        // country_code: countryCode,
    //   },
    //   { merge: true }
    // )
    // .then(() => {
    //   dispatcher(showSnackbarAction("API Edited!!", "success"));
    //   setLoad(false);
    //   close();
    //   editClose();
    // })
    // .catch((error) => {
    //   dispatcher(showSnackbarAction("Try Again!!", "error"));
    //   console.log("Api edit error:", error);
    //   setLoad(false);
    // });
// };

// export const createNews = (
//   organization_id: string,
//   areaName: string,
//   link: string,
//   dispatcher: any,
//   setLoad: (val: boolean) => void,
//   close: () => void
// ) => {
//   firestore
    // .collection("news")
    // .doc(organization_id)
    // .set(
    //   {
        // news: Firebase.firestore.FieldValue.arrayUnion({
        //   created_at: Firebase.firestore.Timestamp.now(),
        //   name: areaName,
        //   link: link,
        // }),
    //   },
    //   { merge: true }
    // )
    // .then(() => {
    //   dispatcher(showSnackbarAction("News Link Added !!", "success"));
    //   setLoad(false);
    //   close();
    // })
    // .catch((error) => {
    //   console.log("News Error:", error);
    //   dispatcher(showSnackbarAction("Error!! Try Again!!", "error"));
    //   setLoad(false);
    // });
// };

// export const fetchApi = (
//   organization_id: string,
//   setAPI: (data: any[]) => void
// ) => {
//   const subscriber = firestore
    // .collection("apiTokens")
    // .where("organization_id", "==", organization_id)
    // .onSnapshot((apis) => {
    //   const data: any[] = [];
// 
    //   if (apis) {
        // apis.forEach((api) => {
        //   data.push({ ...api.data(), api_key: api.id });
        // });
        // setAPI(data);
    //   } else {
        // console.log("Api error");
    //   }
    // });
//   return subscriber;
// };

// export const fetchNews = (
//   organization_id: string,
//   setNews: (data: any[]) => void
// ) => {
//   const subscriber = firestore
    // .collection("news")
    // .doc(organization_id)
    // .onSnapshot((news) => {
    //   if (news) {
        // const newsData = news.data();
        // if (newsData?.news) {
        //   setNews(newsData.news);
        // } else {
        //   setNews([]);
        // }
    //   } else {
        // console.log("organization not found");
    //   }
    // });
//   return subscriber;
// };

// export const fetchApiData = (
//   organization_id: string,
//   setAPIData: (data: any[]) => void
// ) => {
//   const subscriber = firestore
    // .collection("API-Data")
    // .where("organization_id", "==", organization_id)
    // .onSnapshot((apis) => {
    //   const data: any[] = [];
    //   if (apis) {
        // apis.docs.forEach((api) => {
        //   data.push(api.data());
        // });
// 
        // setAPIData(data);
    //   } else {
        // console.log("Api Data error");
    //   }
    // });
//   return subscriber;
// };

// export const fetchApiFilterData = (
//   organization_id: string,
//   setAPIData: (data: any[]) => void,
//   prevDate: any,
//   currentDate: any
// ) => {
//   const subscriber = firestore
    // .collection("API-Data")
    // .where("organization_id", "==", organization_id)
    // .where("created_at", ">=", prevDate)
    // .where("created_at", "<=", currentDate)
    // .onSnapshot((apis) => {
    //   const data: any[] = [];
    //   if (apis) {
        // apis.docs.forEach((api) => {
        //   data.push(api.data());
        // });
// 
        // setAPIData(data);
    //   } else {
        // console.log("Api Data error");
    //   }
    // });
//   return subscriber;
// };

// export const correctLeadCount = (
//   organization_id: string,
//   setLoad: (data: boolean) => void,
//   dispatcher: any
// ) => {
//   firestore
    // .collection("contacts")
    // .where("organization_id", "==", organization_id)
    // .get()
    // .then((leads: { data: () => any; }[]) => {
    //   const finalData: {
        // [key: string]: { [key: string]: { [key: string]: number } };
    //   } = {};

    //   leads.forEach((lead: { data: () => any; }) => {
        // const leadData = lead.data();
        // const uid = leadData.uid === "" ? "NOTASSIGNED" : leadData.uid;
        // if (leadData.organization_id === "" || leadData.stage === "") {
        //   return;
        // }
        // if (finalData[leadData.organization_id]) {
        //   if (finalData[leadData.organization_id][uid]) {
            // if (finalData[leadData.organization_id][uid][leadData.stage]) {
            //   finalData[leadData.organization_id][uid][leadData.stage] += 1;
            // } else {
            //   finalData[leadData.organization_id][uid][leadData.stage] = 1;
            // }
        //   } else {
            // finalData[leadData.organization_id][uid] = {
            //   [leadData.stage]: 1,
            // };
        //   }
        // } else {
        //   finalData[leadData.organization_id] = {
            // [uid]: { [leadData.stage]: 1 },
        //   };
        // }
    //   });

    //   Object.keys(finalData).forEach((orgId) => {
        // Object.keys(finalData[orgId]).forEach((user) => {
        //   if (finalData[orgId][user]["INTERESTED"]) {
            // finalData[orgId][user]["FOLLOWUP"] =
            //   finalData[orgId][user]["INTERESTED"];
        //   } else {
            // finalData[orgId][user]["FOLLOWUP"] = 0;
        //   }
        //   if (finalData[orgId][user]["CALLBACK"]) {
            // finalData[orgId][user]["FOLLOWUP"] +=
            //   finalData[orgId][user]["CALLBACK"];
        //   }
        // });
    //   });
// 
    //   firestore
        // .collection("counts")
        // .doc(organization_id)
        // .set(finalData[organization_id])
        // .then(() => {
        //   setLoad(false);
        //   console.log(finalData);
        //   dispatcher(showSnackbarAction("Counts Corrected!!", "success"));
        // });
    // });
// };

// export const updateApiPrimaryLead = (
//   organization_id: string,
//   uid: string,
//   primary_lead_manager_email: string
//   setLoad: (data: boolean) => void
// ) => {
//   firestore
    // .collection("apiTokens")
    // .where("organization_id", "==", organization_id)
    // .get()
    // .then((docs) => {
    //   const batch = firestore.batch();
    //   docs.forEach((doc) => {
        // batch.set(
        //   doc.ref,
        //   {
            // primary_lead_manager_email: primary_lead_manager_email,
            // primary_lead_manager_uid: uid,
        //   },
        //   { merge: true }
        // );
    //   });
// 
    //   batch
        // .commit()
        // .then(() => {
        //   console.log("updateApiPrimaryLead", "success");
        // })
        // .catch((error) => {
        //   console.log("Error:", error);
        // });
    // });
// };

// export const changeLeadsStage = (
//   leadsList: any[],
//   dispatcher: any,
//   setLoad: (data: boolean) => void
// ) => {
//   leadsList.forEach((item) => {
    // firestore
    //   .collection("contacts")
    //   .doc(item)
    //   .set(
        // {
        //   stage: "FRESH",
        //   next_follow_up_type: "",
        //   next_follow_up_date_time: "",
        //   not_int_reason: "",
        //   lost_reason: "",
        //   other_not_int_reason: "",
        //   other_lost_reason: "",
        // },
        // { merge: true }
    //   )
    //   .then(() => {
        // dispatcher(showSnackbarAction("Lead Stage Update", "success"));
        // setLoad(false);
    //   })
    //   .catch((err) => {
        // console.log("Lead Stage Error:", err);
        // dispatcher(showSnackbarAction("Please Try Again!!", "error"));
        // setLoad(false);
    //   });
//   });
// };

// export const setUserFeildPermissions = (
//   uid: string,
//   organization_id: string,
//   permissionObject: any,
//   dispatcher: any,
//   setLoad: (data: boolean) => void,
//   close: () => void
// ) => {
//   firestore
    // .collection("permissions")
    // .doc(uid)
    // .set(
    //   {
        // contacts: permissionObject,
        // uid: uid,
        // organization_id: organization_id,
    //   },
    //   { merge: true }
    // )
    // .then(() => {
    //   dispatcher(showSnackbarAction("Permissions Set!!", "success"));
    //   setLoad(false);
    //   close();
    // })
    // .catch(() => {
    //   dispatcher(showSnackbarAction("Please Try Again!!", "error"));
    //   setLoad(false);
    //   close();
    // });
// };

// export const setProfilePermissions = (
//   orgId: string,
//   profile: string,
//   permissionObject: any,
//   dispatcher: any,
//   setLoad: (data: boolean) => void,
//   close: () => void
// ) => {
//   firestore
    // .collection("permissions")
    // .doc(orgId)
    // .set(
    //   {
        // [profile]: permissionObject,
        // organization_id: orgId,
    //   },
    //   { merge: true }
    // )
    // .then(() => {
    //   dispatcher(showSnackbarAction("Permissions Set!!", "success"));
    //   setLoad(false);
    //   close();
    // })
    // .catch(() => {
    //   dispatcher(showSnackbarAction("Please Try Again!!", "error"));
    //   setLoad(false);
    //   close();
    // });
// };

// export const fetchProfilePermissions = (
//   orgId: string,
//   profile: string,
//   setPermissions: (data: any) => void
// ) => {
//   firestore
    // .collection("permissions")
    // .doc(orgId)
    // .onSnapshot((doc) => {
    //   if (doc.data()) {
        // const data = doc.data();
        // if (data?.[profile]) {
        //   setPermissions(data?.[profile]);
        // } else {
        //   setPermissions(undefined);
        // }
    //   } else {
        // setPermissions(undefined);
    //   }
    // });
// };

// export const fetchUserPermissions = (
//   uid: string,
//   setPermissions: (data: any) => void
// ) => {
//   firestore
    // .collection("permissions")
    // .doc(uid)
    // .onSnapshot((doc) => {
    //   if (doc.data()) {
        // const data = doc.data();
        // if (data?.contacts) {
        //   setPermissions(data?.contacts);
        // } else {
        //   setPermissions(undefined);
        // }
    //   } else {
        // setPermissions(undefined);
    //   }
    // });
// };
