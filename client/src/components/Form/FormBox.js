import React from "react";
import './FormStyle.css';

export const FormBox = props => (
    <form {...props} className="fbox p-5">
        <div className="d-flex flex-column justify-content-center">
            {props.children}
        </div>
    </form>
);