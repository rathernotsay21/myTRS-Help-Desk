import React from 'react';
import styles from './styles.module.css';

const PaymentServices = () => {
  const paymentIcons = [
    { name: 'Authorize.net', src: '/img/payment_services/authorize_net.svg', alt: 'Authorize.net' },
    { name: 'Braintree', src: '/img/payment_services/Braintree.svg', alt: 'Braintree' },
    { name: 'Payeezy', src: '/img/payment_services/payeezy.svg', alt: 'Payeezy' },
    { name: 'Payflow', src: '/img/payment_services/Payflow.svg', alt: 'Payflow' },
    { name: 'PayPal', src: '/img/payment_services/paypal.svg', alt: 'PayPal' },
    { name: 'Stripe', src: '/img/payment_services/stripe.svg', alt: 'Stripe' }
  ];

  return (
    <div className={styles['payment-services']}>
      <div className={styles['payment-icons']}>
        {paymentIcons.map((icon, index) => (
          <div key={index} className={styles['payment-icon-wrapper']}>
            <img 
              src={icon.src} 
              alt={icon.alt}
              className={styles['payment-icon']}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentServices;