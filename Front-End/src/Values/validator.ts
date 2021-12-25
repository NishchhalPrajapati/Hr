export const emailValidate = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = re.test(String(email).toLowerCase());
    if (valid) {
      return "";
    } else {
      return "Invalid Email";
    }
  };
  
  export const passwordValidate = (password: string) => {
    if (password.length >= 8) {
      return "";
    } else {
      return "Minimum 8 char password required";
    }
  };
  
  export const phoneValidate = (phone: string) => {
    const re = /[0-9]{2}\d{8}/;
    const valid = re.test(phone);
    if (valid) {
      return "";
    } else {
      return "Invalid Phone No.";
    }
  };
  
  export const validateNumber = (request: {
    contact_no: string;
    country: string;
  }) => {
    let contact = request.contact_no.replace(/ /g, "").replace(/-/g, "");
    if (request.country === "United Arab Emirates") {
      return { country_code: "+971", contact_no: contact };
    } else {
      return { country_code: "+91", contact_no: contact };
    }
  };
  