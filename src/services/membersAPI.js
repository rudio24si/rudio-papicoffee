import { supabase } from "../lib/supabase";

export const membersAPI = {
  getAll: async () => {
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  // Fetch satu member langsung by id — selalu data terbaru
  getById: async (id) => {
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  create: async (payload) => {
    const { data, error } = await supabase
      .from("members")
      .insert(payload)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Pakai RPC — POST request, tidak kena CORS PATCH block
  update: async (id, payload) => {
    const { error } = await supabase.rpc("update_member", {
      row_id: id,
      payload: payload,
    });
    if (error) throw error;
  },

  delete: async (id) => {
    const { error } = await supabase.from("members").delete().eq("id", id);
    if (error) throw error;
  },
};
