import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Unparalleled Support & Partnership',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        TRS delivers more than software: we offer unmatched 1-on-1 support, even on weekends and holidays. Our team has consistently delivered world-class customer service for the past 25+ years. We are committed to your success as much as you are.

      </>
    ),
  },
  {
    title: 'Trusted by the Industry Experts',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Since 2000, TRS has been the trusted choice for major events, from Super Bowls to national conventions. Our proven expertise ensures seamless management.
      </>
    ),
  },
  {
    title: 'Powerful Event & Volunteer Registration Software',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        TRS streamlines complex events with a highly configurable registration platform, automated scheduling, and powerful reporting tools. Manage with ease, anytime, anywhere.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}