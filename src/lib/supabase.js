import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://tukwmveevfnhflsdbtsf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1a3dtdmVldmZuaGZsc2RidHNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyOTY4OTksImV4cCI6MjA5Nzg3Mjg5OX0.xB6-sY8W5wUFnxHHk6JH3bO9jG9_D_0w0GFJPZjYqgM";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
