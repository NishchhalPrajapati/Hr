const teamLeadUsersReducer = (
    state = {
      data: [],
    },
    action: {
      type: "SET_TEAMLEAD_USERS_LIST";
      payload: any;
    }
  ) => {
    switch (action.type) {
      case "SET_TEAMLEAD_USERS_LIST":
        return { ...state, data: action.payload };
      default:
        return state;
    }
  };
  
  export default teamLeadUsersReducer;
  