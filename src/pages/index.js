import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import {
  SiGithub,
  SiSlack,
  SiDiscord,
  SiNextdotjs,
  SiGoland,
  SiDjango,
  SiPhp,
  SiVuedotjs,
  SiReact,
  SiLaravel,
  SiRust,
} from "react-icons/si";
import { SearchFile, Changelog, Bookmark } from "../../static/img";

import styles from "./index.module.css";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const communities = [
    {
      title: "Discord",
      description: "Join our fast growing community on discord.",
      icon: <SiDiscord />,
      url: "https://discord.gg/PQscGtfFD2",
    },
    {
      title: "Slack",
      description: "Join our slack community for support and instant updates.",
      icon: <SiSlack />,
      url: "https://join.slack.com/t/pipeopscommunity/shared_invite/zt-23gmjrl0k-Pzm2cBgIMTsUu5Az73PYKg",
    },
    {
      title: "Github",
      description: "Contribute to our open source documentation on Github",
      icon: <SiGithub />,
      url: "https://github.com/pipeops-dev",
    },
  ];
  const frameworks = [
    {
      title: "React.js",
      icon: <SiReact />,
      link: "/docs/how-to-guides/deployment-templates/deploy-react-template",
    },
    {
      title: "Vue.js",
      icon: <SiVuedotjs />,
      link: "/docs/how-to-guides/deployment-templates/deploy-vuejs-template",
    },
    {
      title: "Next.js",
      icon: <SiNextdotjs />,
      link: "/docs/how-to-guides/deployment-templates/deploy-nextjs-template",
    },
    {
      title: "PHP",
      icon: <SiPhp />,
      link: "/docs/how-to-guides/deployment-templates/deploy-php-template",
    },
    {
      title: "Laravel",
      icon: <SiLaravel />,
      link: "/docs/how-to-guides/deployment-templates/deploy-php-laravel-template",
    },
    {
      title: "Django",
      icon: <SiDjango />,
      link: "/docs/how-to-guides/deployment-templates/deploy-a-django-template",
    },
    {
      title: "Golang",
      icon: <SiGoland />,
      link: "/docs/how-to-guides/deployment-templates/deploy-golang-template",
    },
    {
      title: "Rust",
      icon: <SiRust />,
      link: "",
    },
  ];

  const getStarted = [
    {
      title: "Overview",
      description: "Find out what this docs is about in a summarized manner.",
      icon: <SearchFile />,
      url: "/docs/overview",
    },
    {
      title: "Guides & Tutorials",
      description:
        "You can get help via our well detailed guides and tutorials",
      icon: <Bookmark />,
      url: "/docs/category/getting-started",
    },
    {
      title: "Changelogs",
      description:
        "See a list of our previous and current versions of changelogs",
      icon: <Changelog />,
      url: "/docs/category/changelogs",
    },
  ];
  return (
    <Layout
      title={`${siteConfig.title} `}
      description="Description will go into a meta tag in <head />"
    >
      <header>
        <h1>PipeOps Documentation</h1>
        <p>
          Welcome to PipeOps Documentation! Empower your projects with our
          innovative no-code platform. Start by creating an account using the
          'getting started & user guides' to learn how to deploy your apps in
          minutes.
        </p>
      </header>
      <main>
        <section>
          <h2>Get Started</h2>
          <div className={styles.cardsWrapper}>
            {getStarted.map(({ title, description, url, icon }, index) => (
              <a href={url} key={title} className={styles.cardVariantTwo}>
                <div>
                  <span>
                    {icon}
                    <img
                      src={
                        index === 0
                          ? "/img/overviewGradient.svg"
                          : index === 1
                          ? "/img/guidesGradient.svg"
                          : "/img/changelogGradient.svg"
                      }
                      alt={title}
                    />
                  </span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </a>
            ))}
          </div>
          <h2>Some Supported Frameworks</h2>
          <div className={styles.cardsWrapper}>
            {frameworks.map(({ title, icon, link }) => (
              <a href={link} key={title} className={styles.cardVariantThree}>
                <div>
                  <h3>{title}</h3>
                  <span>{icon}</span>
                </div>
              </a>
            ))}
          </div>
          <h2>Community</h2>
          <div className={styles.cardsWrapper}>
            {communities.map(({ title, description, icon, url }) => {
              return (
                <a
                  target="_blank"
                  href={url}
                  key={title}
                  className={styles.card}
                >
                  <div>
                    <span>{icon}</span>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      </main>
    </Layout>
  );
}
