import { supabase } from "../lib/supabase";

export const loyaltyAPI = {
  getAllRewards: async () => {
    const { data, error } = await supabase
      .from("loyalty_rewards")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  createReward: async (payload) => {
    const { data, error } = await supabase
      .from("loyalty_rewards")
      .insert(payload)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Pakai RPC — POST request, tidak kena CORS PATCH block
  updateReward: async (id, payload) => {
    const { error } = await supabase.rpc("update_loyalty_reward", {
      row_id: id,
      payload: payload,
    });
    if (error) throw error;
  },

  deleteReward: async (id) => {
    const { error } = await supabase.from("loyalty_rewards").delete().eq("id", id);
    if (error) throw error;
  },

  getAllRedemptions: async () => {
    const { data, error } = await supabase
      .from("loyalty_redemptions")
      .select("*")
      .order("redeemed_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  createRedemption: async (payload) => {
    const { data, error } = await supabase
      .from("loyalty_redemptions")
      .insert(payload)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};
