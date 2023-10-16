// [id].ts
import supabase from "@/lib/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { query: { id }, method } = req;

    switch (method) {
        case "DELETE":
            // Step 1: Delete color preferences associated with the color set
            const { data: deletedPreferences, error: deletePrefError } = await supabase
                .from('colorpreferences')
                .delete()
                .eq('colorset_id', id);

            if (deletePrefError) {
                return res.status(400).json({ error: deletePrefError.message });
            }

            // Step 2: Delete the color set itself
            const { data: deletedSet, error: deleteSetError } = await supabase
                .from('colorsets')
                .delete()
                .eq('id', id);

            if (deleteSetError) {
                return res.status(400).json({ error: deleteSetError.message });
            }

            return res.status(200).json({ success: true, data: 'Deleted' });
            break;

        case "PUT":
            // Step 1: Validate the incoming data
            const { name, colors } = req.body;
            if (!name || !colors) {
                return res.status(400).json({ error: "Missing required fields" });
            }

            // Step 2: Update the color preferences first
            const { data: updatedPreferences, error: updatePrefError } = await supabase
                .from('colorpreferences')
                .update(colors)
                .eq('colorset_id', id);

            if (updatePrefError) {
                return res.status(400).json({ error: updatePrefError.message });
            }

            // Step 3: Update the color set name
            const { data: updatedSet, error: updateSetError } = await supabase
                .from('colorsets')
                .update({ name })
                .eq('id', id);

            if (updateSetError) {
                return res.status(400).json({ error: updateSetError.message });
            }

            return res.status(200).json({ success: true, data: updatedSet });
            break;


        default:
            res.setHeader("Allow", ["PUT", "DELETE"]);
            res.status(405).end(`Method ${method} Not Allowed`);

    }
}
