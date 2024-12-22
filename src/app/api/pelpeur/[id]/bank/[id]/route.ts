import { NextRequest, NextResponse } from "next/server";
import { handleError, stripe } from 'src/utils/stripe';

export async function DELETE(req: NextRequest) {
    try {
      const body = await req.json();
      const { account_id, external_account_id } = body;
  
      const deletedBankAccount = await stripe.accounts.deleteExternalAccount(
        account_id,
        external_account_id
      );
  
      return NextResponse.json({ success: true, deleted: deletedBankAccount.deleted });
    } catch (error: any) {
      return handleError(error);
    }
  }