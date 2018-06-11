import React, { Component } from 'react';

function OrderPayment() {
  return (
    <form action="your-server-side-code" method="POST">
      <script
        src="https://checkout.stripe.com/checkout.js" class="stripe-button"
        data-key="pk_test_JI4xcG46VXKVXNWkj7dXtqFj"
        data-amount="999"
        data-name="FSA - Grace Shopper"
        data-description="Example charge"
        data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
        data-locale="auto" >
      </script>
    </form>
  )
}