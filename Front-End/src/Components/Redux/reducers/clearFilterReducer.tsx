const clearFilterReducer = (
    state = { clear: false },
    action: { type: "CLEAR_FILTER"; payload: any }
  ) => {
    switch (action.type) {
      case "CLEAR_FILTER":
        return { ...action.payload };
      default:
        return state;
    }
  };
  
  export default clearFilterReducer;
  