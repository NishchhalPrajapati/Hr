const organizationReducer = (
    state = {
      id: "",
      teams: [],
      designations: [],
    },
    action: {
      type:
        | "SET_ORGANIZATION"
        | "SET_ID"
        | "UPDATE_TEAMS"
        | "UPDATE_DESIGNATIONS";
      payload: any;
    }
  ) => {
    switch (action.type) {
      case "SET_ORGANIZATION":
        return { ...state, ...action.payload };
      case "SET_ID":
        return { ...state, id: action.payload };
      case "UPDATE_TEAMS":
        return { ...state, teams: [...state.teams, action.payload] };
      case "UPDATE_DESIGNATIONS":
        return {
          ...state,
          designations: [...state.designations, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default organizationReducer;
  