import { NextRequest, NextResponse } from 'next/server';
import { handleError, stripe } from 'src/utils/stripe';
  
  
  // Delete a card
export async function DELETE(req: NextRequest) {
try {
    const body = await req.json();
    const { account_id, external_account_id } = body;

    const deletedCard = await stripe.accounts.deleteExternalAccount(
    account_id,
    external_account_id
    );

    return NextResponse.json({ success: true, deleted: deletedCard.deleted });
} catch (error: any) {
    return handleError(error);
}
}
  