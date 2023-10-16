// pages/api/colorSets/fetchLoggedColors.ts
import supabase from "@/lib/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function fetchLoggedColors(req: NextApiRequest, res: NextApiResponse) {
  const { user_id } = req.query;  // Changed from req.body to req.query

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from("logged_colors")
      .select("loggedsixty, loggedthirty, loggedten")  // Specify columns to select
      .eq("user_id", user_id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ data });
  } else {
    return res.status(405).end(); // Method Not Allowed
  }
}
