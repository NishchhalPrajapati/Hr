const branchUsersReducer = (
    state = {
      data: [],
    },
    action: {
      type: "SET_BRANCH_USERS_LIST";
      payload: any;
    }
  ) => {
    switch (action.type) {
      case "SET_BRANCH_USERS_LIST":
        return { ...state, data: action.payload };
      default:
        return state;
    }
  };
  
  export default branchUsersReducer;
  