import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

//@utils
import { stripe } from "../../services/stripe";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const session = await getSession({ req });

    //create customer user into Stripe
    const stripeCustomers = await stripe.customers.create({
      email: session.user.email,
    });

    //create session user into stripe
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      allow_promotion_codes: true,
      customer: stripeCustomers.id,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      cancel_url: process.env.STRIPE_CANCEL_URL,
      success_url: process.env.STRIPE_SUCCESS_URL,
      line_items: [
        {
          price: "price_1Jq4qNFpcm4LwVocTl2QCEU2",
          quantity: 1,
        },
      ],
    });

    return res.status(200).json({ sessionId: stripeCheckoutSession.id });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
};