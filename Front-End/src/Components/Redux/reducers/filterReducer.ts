const filterReducer = (
    state = {},
    action: {
      type: "SET_FILTER_OBJECT";
      payload: any;
    }
  ) => {
    switch (action.type) {
      case "SET_FILTER_OBJECT":
        return { ...state, ...action.payload };
  
      default:
        return state;
    }
  };
  
  export default filterReducer;
  