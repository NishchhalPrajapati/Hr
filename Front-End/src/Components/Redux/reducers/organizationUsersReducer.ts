const organizationUserReducer = (
    state = {
      data: undefined,
    },
    action: {
      type: "SET_USERS_LIST";
      payload: any;
    }
  ) => {
    switch (action.type) {
      case "SET_USERS_LIST":
        return { ...state, data: action.payload };
      default:
        return state;
    }
  };
  
  export default organizationUserReducer;
  