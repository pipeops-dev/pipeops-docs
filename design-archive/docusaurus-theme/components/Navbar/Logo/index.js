import React from "react";
import Logo from "@theme-original/Navbar/Logo";
import LogoDark from "/static/img/pipeops-dark.svg";

export default function LogoWrapper(props) {
  return (
    <>
      <Logo {...props} />
      <a className="logo-dark" href="/">
        <img
          width={129}
          height={30}
          alt="pipeops logo"
          src={
            "https://pub-30c11acc143348fcae20835653c5514d.r2.dev//20/logo_Dark_673ab8cece.svg"
          }
        />
      </a>
    </>
  );
}
