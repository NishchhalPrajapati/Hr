export const updateUserStatus = (status: boolean) => {
    return {
      type: "SET_USER_STATUS",
      payload: status,
    };
  };
  
  export const showSnackbarAction = (
    message: string,
    severity: "success" | "error" | "warning" | "info"
  ) => {
    return {
      type: "SHOW_SNACKBAR",
      payload: { open: true, message, severity },
    };
  };
  
  export const hideSnackbar = () => {
    return {
      type: "HIDE_SNACKBAR",
      payload: { open: false, message: "", severity: "success" },
    };
  };
  
  export const setRole = (role: string) => {
    return {
      type: "SET_ROLE",
      payload: role,
    };
  };
  
  export const setFirstLogin = (firstLogin: boolean) => {
    return {
      type: "SET_FIRST_LOGIN",
      payload: firstLogin,
    };
  };
  
  export const setUser = (data: any) => {
    return {
      type: "SET_USER",
      payload: data,
    };
  };
  
  export const setOrganization = (data: any) => {
    return {
      type: "SET_ORGANIZATION",
      payload: data,
    };
  };
  
  export const setOrganizationId = (data: any) => {
    return {
      type: "SET_ID",
      payload: data,
    };
  };
  
  export const clearUser = () => {
    return {
      type: "CLEAR_USER",
      payload: {},
    };
  };
  
  export const setContacts = (data: any) => {
    return {
      type: "SET_CONTACTS",
      payload: data,
    };
  };
  
  export const setFilterObject = (data: {}) => {
    return {
      type: "SET_FILTER_OBJECT",
      payload: data,
    };
  };
  
  export const updateTeamsAction = (data: string) => {
    return {
      type: "UPDATE_TEAMS",
      payload: data,
    };
  };
  
  export const updateDesignationsAction = (data: string) => {
    return {
      type: "UPDATE_DESIGNATIONS",
      payload: data,
    };
  };
  
  export const setOrganizationUsersList = (data: any[]) => {
    return {
      type: "SET_USERS_LIST",
      payload: data,
    };
  };
  
  export const setTeamLeadUsersList = (data: any[]) => {
    return {
      type: "SET_TEAMLEAD_USERS_LIST",
      payload: data,
    };
  };
  export const setBranchLists = (data: any[]) => {
    return {
      type: "SET_BRANCH_LIST",
      payload: data,
    };
  };
  
  export const setBranchUsersList = (data: any[]) => {
    return {
      type: "SET_BRANCH_USERS_LIST",
      payload: data,
    };
  };
  
  export const setClearFilter = (data: boolean) => {
    return {
      type: "CLEAR_FILTER",
      payload: { clear: data },
    };
  };
  
  export const setTotal = (data: number) => {
    return {
      type: "SET_TOTAL",
      payload: data,
    };
  };
  
  export const setCompleted = (data: number) => {
    return {
      type: "SET_COMPLETED",
      payload: data,
    };
  };
  
  export const updateStage = (data: {}) => {
    return {
      type: "UPDATE_STAGE",
      payload: data,
    };
  };
  