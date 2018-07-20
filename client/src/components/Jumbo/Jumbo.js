import React from "react";
import "./Jumbo.css";

const Jumbo = () =>{
return (
    <div className="jumbotron jumbotron-fluid m-0">
        <div className="container">
            <p className="text-center m-0">
                <i className="material-icons icon1 m-0">
                    blur_linear
                </i>
            </p>
            <h1 className="display-1 text-center head1">
               NY Times Article Search
            </h1>
            <h1 className="display-5 text-center head2">
                Search and Save NYT Articles... You can even comment on them...
            </h1>
        </div>
    </div>  
)};

export default Jumbo;