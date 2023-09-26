import supabase from "@/lib/supabaseClient";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "@/contexts/UserContext";

type ColorPreferences = {
    sixty: string | null;
    thirty: string | null;
    ten: string | null;
  };

type ColorSets = {
    id: number;
    name: string | null;
    user_id: string | null;
    colorpreferences: ColorPreferences[]; // UUID is a string in JavaScript/TypeScript
};

export const useFetchColorSets = () => {
    const [colorSets, setColorSets] = useState<ColorSets[]>([]);
    const { user } = useContext(UserContext) ?? {};

    useEffect(() => {
        if (!user) return;
        const fetchColorSets = async () => {
            const { data, error } = await supabase
                .from('colorsets')
                .select(`
                  id,
                  name,
                  user_id,
                  colorpreferences (
                    sixty,
                    thirty,
                    ten
                  )
                `)
                .eq("user_id", user.id)
                .order("id", { ascending: true });

            if (error) {
                console.error("Error fetching color sets:", error);
            } else {
                setColorSets(data || []);
                console.log("Color Sets:", data);
            }
        };

        const channel = supabase.channel(`colorsets:${user.id}`).on('postgres_changes', {
            event: '*', schema: 'public', table: 'colorsets'
        }, (payload) => {
            console.log({ payload })
            fetchColorSets();
        }).subscribe()

        fetchColorSets();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user]);

    return colorSets;
};
