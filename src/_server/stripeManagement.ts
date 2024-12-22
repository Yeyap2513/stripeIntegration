import { stripe } from '../utils/stripe';

export const createAccount = async (data: any) => {
    return stripe.accounts.create(data);
};

export const updateAccount = async (accountId: string, data: any) => {
    return stripe.accounts.update(accountId, data);
};

export const retrieveAccount = async (accountId: string) => {
    return stripe.accounts.retrieve(accountId);
};

export const deleteAccount = async (accountId: string) => {
    return stripe.accounts.del(accountId);
};
