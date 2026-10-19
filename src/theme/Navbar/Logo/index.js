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
            "https://pipeops-ops-fe-assets.objects.pipeops.run/20/logo_Dark_673ab8cece.svg"
          }
        />
      </a>
    </>
  );
}
