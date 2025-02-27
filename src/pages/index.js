import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import ClientLogos from '@site/src/components/ClientLogos';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          myTRS
        </Heading>
        <p className="hero__subtitle">All-in-One Event & Registrant Management Software</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Explore Our Solutions
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="myTRS Help Desk - Resources, guides, and support for all your needs">
      <HomepageHeader />
      <ClientLogos />
      <main>
        <HomepageFeatures />
      </main>
      <div className="container margin-vert--xl">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <div className="padding-vert--md">
              <h2>About myTRS</h2>
              <p>
                myTRS is a comprehensive transaction reporting system designed to simplify 
                complex reporting processes for businesses. Our platform offers intuitive
                solutions for financial reporting, compliance, and data management.
              </p>
              <p>
                With a focus on user-friendly interfaces and powerful backend capabilities,
                myTRS helps organizations streamline their reporting workflows and gain
                valuable insights from their transaction data.
              </p>
            </div>
            
            <div className="padding-vert--md">
              <h2>Key Features</h2>
              <ul>
                <li>Automated transaction reporting and analysis</li>
                <li>Customizable dashboards and reports</li>
                <li>Real-time data processing and visualization</li>
                <li>Compliance with industry standards and regulations</li>
                <li>Secure data storage and management</li>
                <li>Integration with existing business systems</li>
              </ul>
            </div>

            <div className="padding-vert--md">
              <h2>Need Help?</h2>
              <p>
                This help desk contains comprehensive documentation, tutorials, and
                resources to help you get the most out of myTRS. Browse our documentation
                sections or use the search feature to find specific information.
              </p>
              <p>
                For additional support, please contact our customer service team at 
                <a href="mailto:support@my-trs.com"> support@my-trs.com</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}