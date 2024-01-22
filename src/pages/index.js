import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import {
  SiGithub,
  SiSlack,
  SiDiscord,
  SiNextdotjs,
  SiJavascript,
  SiGoland,
  SiPhp,
  SiVuedotjs,
  SiReact,
  SiLaravel,
  SiSvelte,
} from "react-icons/si";

import styles from './index.module.css';


export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const communities = [
    {
      title: "Discord",
      description: "Join our fast growing community on discord.",
      icon: <SiDiscord />,
      url: "/discord",
    },
    {
      title: "Slack",
      description: "Join our slack community for support and instant updates.",
      icon: <SiSlack />,
      url: "/slack",
    },
    {
      title: "Github",
      description: "Contribute to our open source documentation on Github",
      icon: <SiGithub />,
      url: "/github",
    },
  ];
  const frameworks = [
    { title: "Javascript", icon: <SiJavascript /> },
    { title: "React", icon: <SiReact /> },
    { title: "Vue", icon: <SiVuedotjs /> },
    { title: "Next.js", icon: <SiNextdotjs /> },
    { title: "PHP", icon: <SiPhp /> },
    { title: "Laravel", icon: <SiLaravel /> },
    { title: "Golang", icon: <SiGoland /> },
    { title: "Svelte", icon: <SiSvelte /> },
  ];
  const getStarted = [
    {
      title: "Overview",
      description: "Find out what this docs is about in a summarized manner.",
      icon: <SiDiscord />,
      url: "/docs/intro",
    },
    {
      title: "Guides & Tutorials",
      description:
        "You can get help via our well detailed guides and tutorials",
      icon: <SiSlack />,
      url: "/docs/category/how-to-guides",
    },
    {
      title: "Changelogs",
      description:
        "See a list of our previous and current versions of changelogs",
      icon: <SiGithub />,
      url: "/docs/category/changelogs",
    },
  ];
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <header>
        <h1>PipeOps Documentation</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur. Eu ut nunc est orci mauris vel
          orci vitae. Mattis cum vel feugiat orci fringilla viverra. Netus
          mattis lorem at id nisl adipiscing sed.
        </p>
      </header>
      <main>
        <section>
          <h2>Get Started</h2>
          <div className={styles.cardsWrapper}>
            {getStarted.map(({title, description, url}) => (
              <a href={url} key={title} className={styles.cardVariantTwo}>
                <div>
                  <span></span>
                  <h3>{title}</h3>
                  <p>
                    {description}
                  </p>
                </div>
              </a>
            ))}
          </div>
          <h2>Some Supported Frameworks</h2>
          <div className={styles.cardsWrapper}>
            {frameworks.map(({title, icon}) => (
              <div key={title} className={styles.cardVariantThree}>
                <div>
                  <h3>{title}</h3>
                  <span>{icon}</span>
                </div>
              </div>
            ))}
          </div>
          <h2>Community</h2>
          <div className={styles.cardsWrapper}>
            {communities.map(({ title, description, icon, url }) => {
              return (
                <a href={url} key={title} className={styles.card}>
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
