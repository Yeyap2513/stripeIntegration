import { NextResponse } from "next/server";

export const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16'
});

export const handleError = (error: any) => {
    console.error('Stripe API Error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  };
  