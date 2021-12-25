import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";

export default withStyles({
  switchBase: {
    "&$checked + $track": {
      backgroundColor: "#ff0000",
    },
  },
  checked: {},
  track: {
    backgroundColor: "#00ff00",
  },
  thumb: {
    backgroundColor: "#ffffff",
  },
})(Switch);
