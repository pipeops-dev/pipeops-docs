import React from 'react';
import clsx from 'clsx';
export default function FooterLayout({style, links, logo, copyright}) {
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
                {logo}
                <p className="footer-subtext">
                  Automating DevOps with Zest and Zenb
                </p>
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
