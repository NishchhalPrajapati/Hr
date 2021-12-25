const snackbarReducer = (
    state = { open: false, message: "", severity: "success" },
    action: { type: "SHOW_SNACKBAR" | "HIDE_SNACKBAR"; payload: any }
  ) => {
    switch (action.type) {
      case "SHOW_SNACKBAR":
        return { ...action.payload };
      case "HIDE_SNACKBAR":
        return { ...action.payload };
      default:
        return state;
    }
  };
  
  export default snackbarReducer;
  