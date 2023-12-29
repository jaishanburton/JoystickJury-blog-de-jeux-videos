import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kliieqiyiyicawnuqxnv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsaWllcWl5aXlpY2F3bnVxeG52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDExMjMwMjksImV4cCI6MjAxNjY5OTAyOX0.d-lbQph0sF5PYHHVQfgqF9GDY5VfcBKKki82oHOb8J4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
