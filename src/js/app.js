import React from "react";
import ReactDOM from "react-dom";
import { SocialIcon } from "react-social-icons";
import anchorJS from 'anchor-js';

const anchors = new anchorJS();

const Links = () => (
  <React.Fragment>
    <SocialIcon network="github" url="https://github.com/dBozhinovski" />
    <SocialIcon network="twitter" url="https://twitter.com/d_bozhinovski" />
  </React.Fragment>
);

ReactDOM.render(<Links />, document.querySelector(".nav-social"));

if (document.querySelector(".social-share")) {
  ReactDOM.render(<Sharer />, document.querySelector(".social-share"));
}

anchors.add('.single h2, .single h3, .single h4, .single h5, .single h6');