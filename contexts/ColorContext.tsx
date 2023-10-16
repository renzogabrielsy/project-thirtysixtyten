import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import supabase from "@/lib/supabaseClient";
import { useToast } from "@/components/ui/use-toast";
import { fetchColorSets } from "@/pages/api/colorSets/fetchColorSet";

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

interface ColorContextType {
  sixty: string;
  setSixty: React.Dispatch<React.SetStateAction<string>>;
  thirty: string;
  setThirty: React.Dispatch<React.SetStateAction<string>>;
  ten: string;
  setTen: React.Dispatch<React.SetStateAction<string>>;
  createColorSet: (userId: string, setName: string) => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
  editColorSet: (setName: string, updatedSetSixty: string, updatedSetThirty: string, updatedSetTen: string, setId: number)  => Promise<boolean>;
  updateLoggedColors: () => Promise<void>;
  updateLoggedColorsOnLogin: (email: string, password: string) => Promise<void>;
  applyColorSet: (colorSet: {
    sixty: string | null;
    thirty: string | null;
    ten: string | null;
  }) => void;
  colorSets: ColorSets[];
  fetchColorSets: (userId: string) => Promise<void>;
  currentSetName: string | null;
}

interface colorSet {
  sixty: string | null;
  thirty: string | null;
  ten: string | null;
}

const ColorContext = createContext<ColorContextType | null>(null);

export const useColor = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColor must be used within a ColorProvider");
  }
  return context;
};

export const ColorProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentSetName, setCurrentSetName] = useState<string | null>(
    "Unsaved Color Set"
  );
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const [colorSets, setColorSets] = useState<ColorSets[]>([]);
  const [sixty, setSixty] = useState("");
  const [thirty, setThirty] = useState("");
  const [ten, setTen] = useState("");
  const { user } = useContext(UserContext) ?? {};
  const userID = user?.id;
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const findMatchingSetName = (
    newSixty: string,
    newThirty: string,
    newTen: string
  ) => {
    console.log("Finding match for:", { newSixty, newThirty, newTen });
    console.log("Available color sets:", colorSets);
    const matchingSet = colorSets.find((set) => {
      const colorPref = set.colorpreferences[0]; // Assuming each set has only one color preference
      return (
        colorPref.sixty === newSixty &&
        colorPref.thirty === newThirty &&
        colorPref.ten === newTen
      );
    });
    console.log("Matching set found:", matchingSet);
    setCurrentSetName(matchingSet ? matchingSet.name : "Unsaved Color Set");
  };

  const fetchLoggedColors = async (user_id: any) => {
    const setDefaults = () => {
      setSixty("#FFFFFF");
      setThirty("#000000");
      setTen("#0000FF");
    };
    if (!user_id) {
      console.warn("User ID is undefined. Using default colors.");
      setDefaults();
      setIsLoading(false);
      return;
    }
    try {
      const res = await axios.get(
        `/api/colorSets/fetchLoggedColors?user_id=${user_id}`
      );
      if (res.data.data && res.data.data.length > 0) {
        const { loggedsixty, loggedthirty, loggedten } = res.data.data[0];
        if (loggedsixty && loggedthirty && loggedten) {
          setSixty(loggedsixty);
          setThirty(loggedthirty);
          setTen(loggedten);
          findMatchingSetName(loggedsixty, loggedthirty, loggedten);
        } else {
          toast({
            variant: "default",
            title: "Logged colors not found",
            description: "Using default colors.",
            duration: 2000,
          });
          setDefaults();
        }
      } else {
        toast({
          variant: "default",
          title: "Logged colors not found",
          description: "Using default colors.",
          duration: 2000,
        });
        setDefaults();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "An error occured",
        description:
          "There was an error fetching your logged colors. Please try again or contact the developer.",
        duration: 2000,
      });
    }
    setIsLoading(false);
  };
  

  useEffect(() => {
    if (!isLoading) {
      const elements = document.querySelectorAll(
        ":not(.hero-root) :not(.hero-root *)"
      );
      elements.forEach((element) => {
        const htmlElement = element as HTMLElement; // Debugging line
        htmlElement.style.transition =
          "background-color 0.3s ease-in-out, color 0.3s ease-in-out";
      });
    }
  }, [isLoading, sixty, thirty, ten]);

  // New function to fetch color sets
  const fetchColorSetsWrapper = async (userId: string) => {
    await fetchColorSets(userId, setColorSets);
    console.log("Fetched color sets:", colorSets); // 👈 Added this line for debugging
  };

  // useEffect(() => {
  //   findMatchingSetName(sixty, thirty, ten);
  // }, [sixty, thirty, ten, findMatchingSetName]);

  const applyColorSet = async (colorSet: colorSet) => {
    const newSixty = colorSet.sixty || sixty;
    const newThirty = colorSet.thirty || thirty;
    const newTen = colorSet.ten || ten;

    setSixty(newSixty);
    setThirty(newThirty);
    setTen(newTen);

    findMatchingSetName(newSixty, newThirty, newTen);

    try {
      await updateLoggedColors(newSixty, newThirty, newTen);
    } catch (error) {
      console.error("Error updating colors:", error);
      setSixty(sixty);
      setThirty(thirty);
      setTen(ten);
    }
  };

  const updateLoggedColors = async (
    newSixty: string = sixty,
    newThirty: string = thirty,
    newTen: string = ten
  ) => {
    console.log("Updating logged colors...");
    try {
      if (!userID) {
        toast({
          variant: "destructive",
          title: "User is not logged in",
          description: "Please log in to save your colors",
          duration: 2000,
        });
        return;
      }

      const colors = {
        loggedsixty: newSixty,
        loggedthirty: newThirty,
        loggedten: newTen,
        user_id: userID,
      };

      const { data: upsertData, error } = await supabase
        .from("logged_colors")
        .upsert([colors], { onConflict: "user_id" });

      if (error) {
        toast({
          variant: "destructive",
          title: "An error occured",
          description:
            "There was an error in applying your colors. Please try again or contact the developer.",
          duration: 2000,
        });
      } else {
        toast({
          variant: "default",
          title: "Colors applied!",
          description: "Your colors have been applied!",
          duration: 2000,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "An error occured",
        description:
          "There was an error in applying your colors. Please try again or contact the developer.",
        duration: 2000,
      });
    }
  };

  const updateLoggedColorsOnLogin = async (email: string, password: string) => {
    try {
      // Authenticate the user to get the user ID
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (authError) {
        toast({
          variant: "destructive",
          title: "Authentication failed",
          description: "Please check your credentials and try again.",
          duration: 2000,
        });
        throw new Error("Authentication failed");
      }

      if (!authData?.user) {
        toast({
          variant: "destructive",
          title: "Authentication failed",
          description: "Please check your credentials and try again.",
          duration: 2000,
        });
        throw new Error("No user data found");
      }

      const userID = authData.user.id;

      const colors = {
        loggedsixty: sixty,
        loggedthirty: thirty,
        loggedten: ten,
        user_id: userID,
      };

      const { data: upsertData, error: upsertError } = await supabase
        .from("logged_colors")
        .upsert([colors], { onConflict: "user_id" });

      if (upsertError) {
        console.error("Error updating logged colors:", upsertError);
        throw new Error("Error updating logged colors");
      }

      console.log("Successfully updated logged colors:", upsertData);
    } catch (error) {
      console.error("Error in updateLoggedColorsOnLogin:", error);
      throw error;
    }
  };

  const createColorSet = async (user_id: string, name: string) => {
    const colors = [sixty, thirty, ten];

    console.log("Sending request with payload:", { user_id, name, colors });

    try {
      const response = await axios.post(
        "/api/colorSets/createColorSet",
        { user_id, name, colors },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Success:", response.data);

      await updateLoggedColors();
      fetchColorSetsWrapper(user_id);
    } catch (error: any) {
      console.log("Error:", JSON.stringify(error, null, 2));

      if (error.response) {
        console.log("Data:", error.response.data);
        console.log("Status:", error.response.status);
        console.log("Headers:", error.response.headers);
      } else if (error.request) {
        console.log(
          "Request was made but no response was received",
          error.request
        );
      } else {
        console.log("Something happened setting up the request", error.message);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await axios.delete(`/api/colorSets/${id}`);

      if (res.data.success) {
      } else {
        console.error("Failed to delete color set");
      }
    } catch (error) {
      console.error("Axios error:", error);
    }
  };

  const editColorSet = async (setName: string, updatedSetSixty: string, updatedSetThirty: string, updatedSetTen: string, setId: number) => {
    try {
      const updatedColors = {
        sixty: updatedSetSixty,
        thirty: updatedSetThirty,
        ten: updatedSetTen,
      };
  
      const response = await axios.put(`/api/colorSets/${setId}`, {
        name: setName,
        colors: updatedColors,
      });
  
      if (response.data.success) {
        console.log("Successfully updated color set");
  
        // Update logged colors
        await updateLoggedColors();
  
        // Check if the edited set is the current set in use
        if (setName === currentSetName) {
          // Apply the edited color set
          applyColorSet(updatedColors);
        }
  
        return true;
      } else {
        console.error("Failed to update color set");
        return false;
      }
    } catch (error) {
      console.error("Axios error:", error);
      return false;
    }
  };
  
  
  useEffect(() => {
    const fetchDataAndUpdateSetName = async () => {
      console.log("Fetching logged colors useEffect running...");
      await fetchLoggedColors(userID); // Fetch colors first
  
      if (colorSets.length > 0) {
        // Check if colorSets is populated
        findMatchingSetName(sixty, thirty, ten); // Then find matching set name
      } else {
        console.log("colorSets is empty. Skipping findMatchingSetName.");
      }
  
      console.log("Current set name after fetch:", currentSetName);
    };
  
    fetchDataAndUpdateSetName();
  }, [userID, colorSets, currentSetName, applyColorSet]);

  const value = {
    sixty,
    setSixty,
    thirty,
    setThirty,
    ten,
    setTen,
    createColorSet,
    handleDelete,
    updateLoggedColors,
    updateLoggedColorsOnLogin,
    applyColorSet,
    colorSets,
    fetchColorSets: fetchColorSetsWrapper,
    currentSetName,
    editColorSet
  };

  return (
    <ColorContext.Provider value={value}>
      {!isLoading && children}
    </ColorContext.Provider>
  );
};
