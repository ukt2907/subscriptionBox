// services/subscriptionService.js

import Stripe from 'stripe';
import Subscription from '../models/Subscription.js';
import Product from '../models/Product.js';  // Import Product model for fetching product ID
import config from '../config/config.js';

const stripe = new Stripe(config.STRIPE_SECRET_KEY);

export const createSubscription = async (userId, productId, subscriptionPlan, address) => {
  try {
    // Fetch Product details using productId
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error('Product not found');
    }


    let priceId;
    if (subscriptionPlan === '1 Month') {
        priceId = 'price_1Qmda4P1JC5G855Mt1wJifJk'}  // Monthly subscription price ID
    // } else if (subscriptionPlan === '3 Months') {
    //     priceId = 'price_1J2lOdJXHThpxGxxxxxx'; // Replace with actual price ID for 3 Months
    // } else if (subscriptionPlan === '6 Months') {
    //     priceId = 'price_1J2lOdJXHThpxGxxxxxx'; // Replace with actual price ID for 6 Months
    // }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: product.name, // Use product name for subscription
            },
            unit_amount: product.price * 100, // Price of product in cents (₹1 = 100 paise)
            recurring: { interval: 'month' }, // Set recurring interval based on subscription plan
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    // Create Subscription in MongoDB
    const subscription = await Subscription.create({
      userId,
      productId,
      subscriptionPlan,
      address,
      paymentStatus: 'Pending',
      stripeSubscriptionId: session.id, // Stripe subscription ID
      isActive: false, // Subscription is initially inactive
      nextBillingDate: new Date(), // Set next billing date based on subscription plan
    });

    return { sessionId: session.id, subscription };
  } catch (error) {
    console.error('Error creating subscription: ', error);
    throw new Error('Subscription creation failed');
  }
};
