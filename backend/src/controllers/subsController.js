import Stripe from "stripe";
import Subscription from "../models/Subscription.js";  // assuming your subscription model
import config from "../config/config.js";

const stripe = new Stripe(config.STRIPE_SECRET_KEY);

// Controller function to create a Stripe checkout session
export const createSubscription = async (req, res) => {
  try {
    // Subscription Plan Details (e.g., price ID from Stripe)
    const { productId, subscriptionPlan } = req.body;

    // You need to create a Stripe Price ID on Stripe Dashboard and use it here
    const priceId = getPriceIdFromSubscriptionPlan(subscriptionPlan);  // Implement this function as per your needs

    // Create a checkout session with Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/cancel`,
      metadata: {
        product_id: productId,  // Pass the product ID and other info as metadata if needed
      },
    });

    // Save the subscription details in the DB
    const subscription = new Subscription({
      userId: req.user.id,  // Assume you have authentication middleware to get the logged-in user
      productId,
      subscriptionPlan,
      subscriptionDate: new Date(),
      nextBillingDate: getNextBillingDate(subscriptionPlan), // Implement this function
      stripeSubscriptionId: session.id, // Save the Stripe session ID in the database
    });

    await subscription.save();

    // Return the checkout session URL to redirect the user to Stripe checkout
    res.json({ sessionUrl: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Subscription creation failed" });
  }
};

// Helper function to get the price ID based on the subscription plan
const getPriceIdFromSubscriptionPlan = (plan) => {
  switch (plan) {
    case '1 Month':
      return 'price_1Hh3B1JHpaTY0A1uL7NrzZuZ'; // Replace with your actual Stripe price ID
    case '3 Months':
      return 'price_1Hh3B1JHpaTY0A1uK9FxmY6r'; // Replace with your actual Stripe price ID
    case '6 Months':
      return 'price_1Hh3B1JHpaTY0A1uPv7jHeF1'; // Replace with your actual Stripe price ID
    default:
      throw new Error('Invalid subscription plan');
  }
};
