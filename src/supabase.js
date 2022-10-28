import {createClient} from "@supabase/supabase-js";
import {supabase_api_key, supabase_base_url} from "./consts.js";

export const supabase = createClient(supabase_base_url, supabase_api_key)
