import supabase from "@/lib/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function createColorSet(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log("Request Body:", req.body);
    const { user_id, name, colors } = req.body;

    // Create a new color set
    const { data: colorSetData, error: colorSetError } = await supabase
      .from('colorsets')
      .insert([{ user_id, name }])
      .select()

    if (colorSetError) {
      console.log("Color Set Error:", colorSetError);
      return res.status(400).json({ error: colorSetError.message });
    }

    const colorSetId = (colorSetData as any)?.[0].id;
    console.log("Color Set ID:", colorSetId);

    // Add colors to the color preferences table, linking them to the newly created color set
    const colorPreferences = {
      colorset_id: colorSetId,
      sixty: colors[0],
      thirty: colors[1],
      ten: colors[2]
    };

    console.log("Color Preferences:", colorPreferences);

    const { data: colorPreferencesData, error: colorPreferencesError } = await supabase
      .from('colorpreferences')
      .insert([colorPreferences]);

    console.log("Color Preferences Data", colorPreferencesData);

    if (colorPreferencesError) {
      return res.status(400).json({ error: colorPreferencesError.message });
    }

    return res.status(200).json({ success: true });
  } else {
    return res.status(405).end(); // Method Not Allowed
  }
}
