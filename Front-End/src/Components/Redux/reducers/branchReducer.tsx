const branchListReducer = (
    state = {
      data: [],
    },
    action: {
      type: "SET_BRANCH_LIST";
      payload: any;
    }
  ) => {
    switch (action.type) {
      case "SET_BRANCH_LIST":
        return { ...state, data: action.payload };
      default:
        return state;
    }
  };
  
  export default branchListReducer;
  