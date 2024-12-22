import { NextRequest, NextResponse } from 'next/server';
import { stripe } from 'src/utils/stripe';

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { account_id, individual } = body;

        const account = await stripe.accounts.update(account_id, { individual });

        return NextResponse.json({ success: true, account });
    } catch (error: any) {
        console.error('Erreur lors de la mise à jour du compte Stripe:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const account_id = searchParams.get('account_id');

    if (!account_id) {
        return NextResponse.json({ success: false, message: 'Account ID is required' }, { status: 400 });
    }

    try {
        const account = await stripe.accounts.retrieve(account_id);
        return NextResponse.json({ success: true, account });
    } catch (error: any) {
        console.error('Erreur lors de la récupération du compte Stripe:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

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