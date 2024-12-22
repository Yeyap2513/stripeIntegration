// Add a card
import { NextRequest, NextResponse } from 'next/server';
import { stripe, handleError } from 'src/utils/stripe';


export async function POST(req: NextRequest) {
    try {
      const body = await req.json();
      const { account_id, card_details } = body;
  
      const card = await stripe.accounts.createExternalAccount(account_id, {
        external_account: {
          object: 'card',
          number: card_details.number,
          exp_month: card_details.exp_month,
          exp_year: card_details.exp_year,
          cvc: card_details.cvc,
        },
      });
  
      return NextResponse.json({ success: true, card });
    } catch (error: any) {
      return handleError(error);
    }
  }
  
  // List cards
  export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const account_id = searchParams.get('account_id');
  
    if (!account_id) {
      return NextResponse.json({ success: false, message: 'Account ID is required' }, { status: 400 });
    }
  
    try {
      const cards = await stripe.accounts.listExternalAccounts(account_id, {
        object: 'card',
      });
  
      return NextResponse.json({ success: true, cards: cards.data });
    } catch (error: any) {
      return handleError(error);
    }
  }
  