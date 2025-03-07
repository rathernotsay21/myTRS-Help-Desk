import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

// Hardcoded author profile component with direct image references
export default function AuthorPage() {
  return (
    <Layout
      title="Giang (Jen) Tran"
      description="Author page for Giang (Jen) Tran">
      <div className="container margin-top--lg margin-bottom--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <div className="card padding--lg">
              <div className="card__header">
                <div className="avatar avatar--vertical margin-bottom--md">
                  <div className="avatar__photo-link avatar__photo">
                    <img 
                      src="/img/staff_photos/Giang.webp" 
                      alt="Giang (Jen) Tran" 
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="avatar__intro">
                    <h1 className="avatar__name">Giang (Jen) Tran</h1>
                    <p className="avatar__subtitle">Account Manager</p>
                  </div>
                </div>
              </div>
              <div className="card__body">
                <p>
                  Giang is an Account Manager at myTRS, working closely with clients to ensure their event registration and volunteer management needs are met.
                </p>
              </div>
              <div className="card__footer">
                <Link
                  className="button button--primary"
                  href="https://www.linkedin.com/in/giangjentran/"
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
