import React from 'react';
import styles from './styles.module.css';
import ResponsiveImage from '@site/src/components/ResponsiveImage';

const IntegrationPartners = () => {
  const paymentPartners = [
    { name: 'Authorize.net', src: '/img/payment_services/authorize_net.svg', width: 120, height: 40 },
    { name: 'Braintree', src: '/img/payment_services/Braintree.svg', width: 120, height: 40 },
    { name: 'Payeezy', src: '/img/payment_services/payeezy.svg', width: 120, height: 40 },
    { name: 'Payflow', src: '/img/payment_services/Payflow.svg', width: 120, height: 40 },
    { name: 'PayPal', src: '/img/payment_services/paypal.svg', width: 120, height: 40 },
    { name: 'Stripe', src: '/img/payment_services/stripe.svg', width: 120, height: 40 }
  ];

  return (
    <div className={styles.partnersContainer}>
      <div className={styles.partnersGrid}>
        {paymentPartners.map((partner, index) => (
          <div key={index} className={styles.partnerLogo}>
            <ResponsiveImage
              src={partner.src}
              alt={`${partner.name} payment method`}
              className={styles.partnerImage}
              width={partner.width}
              height={partner.height}
              lazy={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntegrationPartners;