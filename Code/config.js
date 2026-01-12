// Supabase Configuration
// NOTE: 'process.env' does not work in the browser. You must paste the key string directly.
const supabaseUrl = "https://xovxxhnsezfnuioamhxu.supabase.co";

// TODO: Paste your 'anon' key here (It starts with "eyJ...")
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhvdnh4aG5zZXpmbnVpb2FtaHh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyMzk5MjEsImV4cCI6MjA4MzgxNTkyMX0.wktsf8krEL9b-X0uh4Ge64Nb5upUM3uAawKCcpkpueg";

// Make available to the app
window.supabaseUrl = supabaseUrl;
window.supabaseKey = supabaseKey;
