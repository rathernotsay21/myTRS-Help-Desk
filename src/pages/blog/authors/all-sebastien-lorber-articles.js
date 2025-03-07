import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

// Hardcoded author profile component with direct image references
export default function AuthorPage() {
  return (
    <Layout
      title="Florence (Fleck) May"
      description="Author page for Florence (Fleck) May">
      <div className="container margin-top--lg margin-bottom--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <div className="card padding--lg">
              <div className="card__header">
                <div className="avatar avatar--vertical margin-bottom--md">
                  <div className="avatar__photo-link avatar__photo">
                    <img 
                      src="/img/staff_photos/Flory.webp" 
                      alt="Florence (Fleck) May" 
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="avatar__intro">
                    <h1 className="avatar__name">Florence (Fleck) May</h1>
                    <p className="avatar__subtitle">President</p>
                  </div>
                </div>
              </div>
              <div className="card__body">
                <p>
                  Florence is the President of myTRS, bringing decades of experience in event and volunteer management to help organizations run successful events.
                </p>
              </div>
              <div className="card__footer">
                <Link
                  className="button button--primary"
                  href="https://www.linkedin.com/in/florencemay/"
                >
                  <i className="fa-brands fa-linkedin margin-right--sm"></i>
                  LinkedIn
                </Link>
              </div>
            </div>
            
            <div className="margin-top--xl">
              <h2>Posts</h2>
              <article className="margin-top--lg">
                <Link to="/blog/welcome">
                  <h3>Welcome</h3>
                </Link>
                <p className="margin-bottom--sm">
                  <time dateTime="2021-08-26T00:00:00.000Z">August 26, 2021</time>
                  {' · '}One min read
                </p>
                <p>Here are a few tips you might find useful...</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
