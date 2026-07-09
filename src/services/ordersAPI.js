import { supabase } from "../lib/supabase";

export const ordersAPI = {
  getAll: async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  getByPhone: async (phone) => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("member_phone", phone)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  // Buat order SEKALIGUS otomatis tambah ke antrian queue + update poin member
  create: async (payload) => {
    const { data: newOrder, error: orderError } = await supabase
      .from("orders")
      .insert(payload)
      .select()
      .single();
    if (orderError) throw orderError;

    // Otomatis insert ke tabel queue
    const { error: queueError } = await supabase.from("queue").insert({
      order_id: newOrder.id,
      order_number: newOrder.order_number,
      items: newOrder.items,
      table_number: newOrder.table_number || null,
      priority: "Normal",
      status: "In Progress",
      pickup_code: null,
    });
    if (queueError) throw queueError;

    // Update poin & kunjungan member jika order dari member (ada member_id & points_earned)
    if (newOrder.member_id && newOrder.points_earned > 0) {
      await supabase.rpc("add_member_points", {
        member_id: newOrder.member_id,
        points_to_add: newOrder.points_earned,
      });
      // Tidak throw kalau gagal — order tetap tersimpan, poin bisa dikoreksi manual
    }

    return newOrder;
  },

  // Pakai RPC — POST request, tidak kena CORS PATCH block
  update: async (id, payload) => {
    const { error } = await supabase.rpc("update_order", {
      row_id: id,
      payload: payload,
    });
    if (error) throw error;
  },

  delete: async (id) => {
    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (error) throw error;
  },
};
