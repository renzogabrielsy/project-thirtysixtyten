// pages/api/login.ts

import { NextApiRequest, NextApiResponse } from "next";
import supabase from '@/lib/supabaseClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return res.status(401).json({ error: error.message });
  return res.status(200).json(data);
}
