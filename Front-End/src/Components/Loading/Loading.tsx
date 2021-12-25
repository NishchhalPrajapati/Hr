import React, { FunctionComponent } from "react";
import ReactLoading from "react-loading";
import styles from "./Loading.module.css";
import Logo from "../../assets/images/sideBarIcon/head.svg";
import { connect } from "react-redux";
type props = {
  logo?: boolean;
  progress: any;
};

const Loading: FunctionComponent<props> = ({ logo, progress }) => {
  return (
    <div className={styles.parent} style={{ backgroundColor: "#00000020" }}>
      <ReactLoading
        type={"spinningBubbles"}
        color={"#279ea0"}
        height={90}
        width={90}
      />
      {logo && (
        <img
          src={Logo}
          alt={"Logo"}
          style={{ position: "fixed", bottom: 50 }}
        />
      )}
      {progress.total !== 0 && (
        <p
          style={{
            marginTop: "60px",
            color: "#2FA2D3",
            fontSize: "24px",
            fontWeight: 600,
          }}
        >
          {progress.completed} / {progress.total} Completed
        </p>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    progress: state.progress,
  };
};

export default connect(mapStateToProps)(Loading);
