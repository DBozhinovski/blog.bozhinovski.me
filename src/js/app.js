import React from "react";
import ReactDOM from "react-dom";
import {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  GooglePlusIcon,
} from "react-share";
import { SocialIcon } from "react-social-icons";

const Sharer = () => (
  <div>
    <TwitterShareButton url={location.href} title={document.title}><TwitterIcon round /></TwitterShareButton>
    <GooglePlusShareButton url={location.href} title={document.title}><GooglePlusIcon round /></GooglePlusShareButton>
    <FacebookShareButton url={location.href} title={document.title}><FacebookIcon round /></FacebookShareButton>
  </div>
);

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

// JS Goes here - ES6 supported
if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", (user) => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}
