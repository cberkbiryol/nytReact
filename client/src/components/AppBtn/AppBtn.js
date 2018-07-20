import React from "react";
import "./AppBtn.css";

const AppBtn = props => (
  <div>
  {props.type==="delete" ? (
    <span className="delete-btn" {...props}>
      ✗
    </span>
  ) : (
    <a className={`btn btn-lg btn-${props.btype}`} {...props}> 
      {props.type}
    </a>
  )}
  </div>
);

export default AppBtn;
