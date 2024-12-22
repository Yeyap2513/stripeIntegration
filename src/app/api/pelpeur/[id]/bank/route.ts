import { NextRequest, NextResponse } from 'next/server';
import { handleError, stripe } from 'src/utils/stripe';

export async function POST(req: NextRequest) {
    try {
      const body = await req.json();
      const { account_id, bank_details } = body;
  
      const bankAccount = await stripe.accounts.createExternalAccount(account_id, {
        external_account: {
          object: 'bank_account',
          country: bank_details.country,
          currency: bank_details.currency,
          account_number: bank_details.account_number,
          routing_number: bank_details.routing_number,
        },
      });
  
      return NextResponse.json({ success: true, bank_account: bankAccount });
    } catch (error: any) {
      return handleError(error);
    }
  }

  export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const account_id = searchParams.get('account_id');
  
    if (!account_id) {
      return NextResponse.json({ success: false, message: 'Account ID is required' }, { status: 400 });
    }
  
    try {
      const bankAccounts = await stripe.accounts.listExternalAccounts(account_id, {
        object: 'bank_account',
      });
  
      return NextResponse.json({ success: true, bank_accounts: bankAccounts.data });
    } catch (error: any) {
      return handleError(error);
    }
  }
