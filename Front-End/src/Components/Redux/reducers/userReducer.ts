const userReducer = (
    state = {
      data: {},
      status: undefined,
      role: undefined,
      firstLogin: false,
    },
    action: {
      type:
        | "SET_USER"
        | "SET_USER_STATUS"
        | "SET_ROLE"
        | "CLEAR_USER"
        | "SET_FIRST_LOGIN";
      payload: any;
    }
  ) => {
    switch (action.type) {
      case "SET_USER":
        return { ...state, data: { ...state.data, ...action.payload } };
      case "SET_USER_STATUS":
        return { ...state, status: action.payload };
      case "SET_ROLE":
        return { ...state, role: action.payload };
      case "CLEAR_USER":
        return { ...state, data: {} };
      case "SET_FIRST_LOGIN":
        return { ...state, firstLogin: action.payload };
      default:
        return state;
    }
  };
  
  export default userReducer;
  