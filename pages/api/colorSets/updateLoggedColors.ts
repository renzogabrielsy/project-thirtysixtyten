import supabase from "@/lib/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function updateLoggedColors(req: NextApiRequest, res: NextApiResponse) {
  const { user_id, loggedsixty, loggedthirty, loggedten } = req.body;

  if (req.method === 'POST') {
    const { data, error } = await supabase
      .from("logged_colors")
      .upsert([
        {
          user_id,
          loggedsixty,
          loggedthirty,
          loggedten,
        },
      ]);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ data });
  } else {
    return res.status(405).end(); // Method Not Allowed
  }
}
