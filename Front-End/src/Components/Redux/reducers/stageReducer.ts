const stageReducer = (
    state = {
      stage: {
        FRESH: true,
        INTERESTED: true,
        CALLBACK: true,
        WON: false,
        LOST: false,
        "NOT INTERESTED": false,
        ALL: false,
      },
    },
    action: {
      type: "UPDATE_STAGE";
      payload: any;
    }
  ) => {
    switch (action.type) {
      case "UPDATE_STAGE":
        return { ...state, stage: { ...state.stage, ...action.payload } };
  
      default:
        return state;
    }
  };
  
  export default stageReducer;
  