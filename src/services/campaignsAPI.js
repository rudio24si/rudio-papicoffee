import { supabase } from "../lib/supabase";

export const campaignsAPI = {
  getAll: async () => {
    const { data, error } = await supabase
      .from("campaigns")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  create: async (payload) => {
    const { data, error } = await supabase
      .from("campaigns")
      .insert(payload)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Pakai RPC — POST request, tidak kena CORS PATCH block
  update: async (id, payload) => {
    const { error } = await supabase.rpc("update_campaign", {
      row_id: id,
      payload: payload,
    });
    if (error) throw error;
  },

  delete: async (id) => {
    const { error } = await supabase.from("campaigns").delete().eq("id", id);
    if (error) throw error;
  },
};
