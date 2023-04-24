import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://nwvlsfvtgrtqtfqgygvr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53dmxzZnZ0Z3J0cXRmcWd5Z3ZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5ODA1OTMsImV4cCI6MTk5NzU1NjU5M30.RcMm2_fQP9dCxYbpJy-T5FiUeK2bFh2kGgmISXeg9_g"
);

export default supabase
