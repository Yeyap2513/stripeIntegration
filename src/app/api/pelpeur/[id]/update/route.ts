import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "src/utils/stripe";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { account_id, individual } = req.body;
      const account = await stripe.accounts.update(account_id, {
        individual: individual,
      });
      res.json({
        account: account, // Retourne les informations mises à jour
      });
      return res
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour d'un compte Stripe", error);
      res.status(500).send({ error: error.message });
      return res
    }
  };