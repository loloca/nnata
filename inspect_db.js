import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envText = fs.readFileSync('.env', 'utf-8');
const env = {};
envText.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
    env[key] = val;
  }
});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function run() {
  console.log("Checking for process_number column...");
  const { data, error } = await supabase.from('students').select('process_number').limit(1);
  if (error) {
    console.log("Error querying process_number:", error.message, "Code:", error.code);
  } else {
    console.log("Column process_number exists! Result:", data);
  }
}
run();
