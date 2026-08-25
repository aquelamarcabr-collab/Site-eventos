// Cliente Supabase compartilhado (backend do blog, orçamentos e painel admin)
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = 'https://dmigesybgcsjwibeaose.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtaWdlc3liZ2NzandpYmVhb3NlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2OTMwMjEsImV4cCI6MjEwMzI2OTAyMX0.L9kUSQJkrdpjkgEFdoFxbvyWznf7qoS9x5FwAj2QX8Q';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
