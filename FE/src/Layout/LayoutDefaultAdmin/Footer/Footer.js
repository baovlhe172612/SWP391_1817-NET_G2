import React from "react";
import './Footer.css'

function Footer() {
  return (
    <>
      <div className="div">
        <ul className="ull"> 
          <li className="lill">
            <a className="all" href="https://twitter.com/julesforrest">Twitter</a>
          </li>
          <li className="lill">
            <a className="all" href="https://codepen.io/julesforrest">Codepen</a>
          </li>
          <li className="lill">
            <a className="all" href="mailto:julesforrest@gmail.com">Email</a>
          </li>
          <li className="lill">
            <a className="all" href="https://dribbble.com/julesforrest">Dribbble</a>
          </li>
          <li className="lill">
            <a className="all" href="https://github.com/julesforrest">Github</a>
          </li>
          <li className="lill">
            <p>👋</p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Footer;
