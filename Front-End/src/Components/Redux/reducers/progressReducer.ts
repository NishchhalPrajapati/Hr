const progressReducer = (
    state = {
      total: 0,
      completed: 0,
    },
    action: {
      type: "SET_TOTAL" | "SET_COMPLETED";
      payload: any;
    }
  ) => {
    switch (action.type) {
      case "SET_TOTAL":
        return { ...state, total: action.payload };
  
      case "SET_COMPLETED":
        return { ...state, completed: action.payload };
  
      default:
        return state;
    }
  };
  
  export default progressReducer;
  