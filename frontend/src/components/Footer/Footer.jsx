/* eslint-disable no-unused-vars */
import React from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faTwitter,
  faSquareFacebook,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer>
      <div className="footer-item">&#169;2023 All Rights Reserved</div>
      <div className="footer-item">
        <FontAwesomeIcon icon={faYoutube} />
        <FontAwesomeIcon icon={faTwitter} />
        <FontAwesomeIcon icon={faSquareFacebook} />
      </div>
      <div className="footer-item">
        <button> Contact Us</button>
        <button> Privacy Policy</button>
        <button> Help</button>
      </div>
    </footer>
  );
}
