import { NextRequest, NextResponse } from 'next/server';
import { stripe } from 'src/utils/stripe';

export async function DELETE(req: NextRequest) {
    try {
        const body = await req.json();
        const { account_id } = body;

        const account = await stripe.accounts.del(account_id);

        return NextResponse.json({ success: true, deleted: account.deleted, id: account.id });
    } catch (error: any) {
        console.error('Erreur lors de la suppression du compte Stripe:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}