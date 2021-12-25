const contactsReducer = (
    state = {
      data: {
        FRESH: [],
        INTERESTED: [],
        CALLBACK: [],
        LOST: [],
        WON: [],
        "NOT INTERESTED": [],
      },
    },
    action: {
      type: "SET_CONTACTS";
      payload: any;
    }
  ) => {
    switch (action.type) {
      case "SET_CONTACTS":
        return { ...state, data: { ...state.data, ...action.payload } };
  
      default:
        return state;
    }
  };
  
  export default contactsReducer;
  