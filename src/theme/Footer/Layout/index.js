import React from "react";
import clsx from "clsx";
export default function FooterLayout({ style, links, logo, copyright }) {
  return (
    <footer
      className={clsx("footer", {
        "footer--dark": style === "dark",
      })}
    >
      <div className="container container-fluid">
        {(logo || copyright) && (
          <div className="footer__bottom">
            {logo && (
              <div className="margin-bottom--sm">
                <div>
                  {logo}
                  <p className="footer-subtext">
                    Automating DevOps with Zest and Zen.
                  </p>
                </div>
                <img
                  src="https://pub-950943fa1bc54978bed46ef104f9d81a.r2.dev/soc2-logo-blue.svg"
                  alt="stamp for SOC1"
                  width={64}
                  height={64}
                />
              </div>
            )}
          </div>
        )}
        {links}
      </div>
      {copyright}
    </footer>
  );
}
