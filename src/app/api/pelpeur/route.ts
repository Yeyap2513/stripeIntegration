// /src/api/helpeurs.js
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from 'src/utils/stripe';


const stripeInstance = stripe;

//Faire une factory pour simplifier la modification de certains paramètres
export async function POST(req: NextRequest) {
    console.log(req)
  try {
    const body = await req.json();
    const { country, individual } = body;
    console.log(req)

    // Création du compte Stripe Connected
    const account = await stripeInstance.accounts.create({
      business_type: 'individual',
      country: "ca",
      email: individual.email,
      individual: individual,
      capabilities: {
        transfers: { requested: true },
        card_payments: { requested: true },
      },
    });

    return NextResponse.json({ success: true, accountId: account.id });
  } catch (error: any) {
    console.error('Erreur lors de la création du compte Stripe:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
