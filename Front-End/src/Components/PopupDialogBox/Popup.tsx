import React, { useState, useEffect, FunctionComponent } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// import {
//   updateApiPrimaryLead,
//   updatePrimaryLeader,
// } from "../../Services/organizations";
type props = {
  CurrLeader: number;
  setCurrLeader: (index: number) => void;
  index: number;
  leaderName: string;
  primary_lead_manager_email: string;
  organization_id: string;
  uid: string;
  leader: string;
  prevLeader: string;
};

const AlertDialog: FunctionComponent<props> = ({
  CurrLeader,
  setCurrLeader,
  index,
  leaderName,
  primary_lead_manager_email,
  organization_id,
  uid,
  leader,
  prevLeader,
}) => {
  const [dialogOpen, setdialogOpen] = useState(false);
  const [API, setAPI] = useState<any[]>([]);
  const handleClickOpen = () => {
    // updatePrimaryLeader(organization_id, primary_lead_manager_email);
    // updateApiPrimaryLead(organization_id, uid, primary_lead_manager_email);
    setCurrLeader(index);
    setdialogOpen(!dialogOpen);
  };

  const handleClose = () => {
    setdialogOpen(!dialogOpen);
  };
  const dialogOpenFunc = () => {
    setdialogOpen(!dialogOpen);
  };

  return (
    <div>
      <input
        type="checkbox"
        onChange={dialogOpenFunc}
        checked={CurrLeader === index || prevLeader === leader}
      />
      <Dialog
        open={dialogOpen}
        onClose={dialogOpenFunc}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are You Sure?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Do you really want to change ${leaderName} from primary Lead manager`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleClickOpen} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
