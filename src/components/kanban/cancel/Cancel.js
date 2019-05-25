import React from "react";
import { FaCross } from "../../icons";
import PropTypes from "prop-types";

const Cancel = props => (
  <button style={{ display: `flex`, alignItems: "center" }} {...props}>
    <FaCross className={`icon`} />
  </button>
);

Cancel.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Cancel;
