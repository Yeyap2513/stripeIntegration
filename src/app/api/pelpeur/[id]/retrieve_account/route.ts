import { stripe } from 'src/utils/stripe';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const account_id = searchParams.get('account_id');

  if (!account_id) {
    return NextResponse.json({ error: 'account_id is required' }, { status: 400 });
  }

  try {
    const account = await stripe.accounts.retrieve(account_id);
    return NextResponse.json({ account });
  } catch (error: any) {
    console.error('Erreur lors de la récupération du compte Stripe:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
