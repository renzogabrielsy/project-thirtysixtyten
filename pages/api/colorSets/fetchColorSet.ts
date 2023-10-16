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
    colorpreferences: ColorPreferences[];
};

// Extracted fetchColorSets function
export const fetchColorSets = async (userId: string, setColorSets: React.Dispatch<React.SetStateAction<ColorSets[]>>) => {
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
        .eq("user_id", userId)
        .order("id", { ascending: true });

    if (error) {
        console.error("Error fetching color sets:", error);
    } else {
        setColorSets(data || []);

    }
};

export const useFetchColorSets = () => {
    const [colorSets, setColorSets] = useState<ColorSets[]>([]);
    const { user } = useContext(UserContext) ?? {};

    useEffect(() => {
        if (!user) return;

        const channel = supabase.channel(`colorsets:${user.id}`).on('postgres_changes', {
            event: '*', schema: 'public', table: 'colorsets'
        }, (payload) => {
            console.log({ payload });
            fetchColorSets(user.id, setColorSets);
        }).subscribe();

        fetchColorSets(user.id, setColorSets);

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user]);

    return colorSets;
};
