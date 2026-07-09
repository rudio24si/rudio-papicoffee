import { supabase } from "../lib/supabase";

export const queueAPI = {
  getAll: async () => {
    const { data, error } = await supabase
      .from("queue")
      .select("*")
      .neq("status", "Completed")
      .order("created_at", { ascending: true });
    if (error) throw error;
    return data;
  },

  create: async (payload) => {
    const { data, error } = await supabase
      .from("queue")
      .insert(payload)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Pakai RPC function — POST request, tidak kena CORS PATCH block
  updateStatus: async (id, status) => {
    const { error } = await supabase.rpc("update_queue_status", {
      row_id: id,
      new_status: status,
    });
    if (error) throw error;
  },

  delete: async (id) => {
    const { error } = await supabase.from("queue").delete().eq("id", id);
    if (error) throw error;
  },
};
