import React from 'react';
import Logo from '@theme-original/Navbar/Logo';
import LogoDark from '/static/img/pipeops-dark.svg'

export default function LogoWrapper(props) {
  return (
    <>
      <Logo {...props} />
      <a className="logo-dark" href="/">
        <img
          alt="pipeops logo"
          src={
            "https://pipeops.io/_next/image?url=https%3A%2F%2Fpub-a1fbf367a4cd458487cfa3f29154ac93.r2.dev%2Ffastkoin.png&w=128&q=75"
          }
        />
      </a>
    </>
  );
}
