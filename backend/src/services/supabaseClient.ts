import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oylmpnwfryhujmcawupo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95bG1wbndmcnlodWptY2F3dXBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1Njc4OTgsImV4cCI6MjA2NjE0Mzg5OH0.yJj6lOTQMYy_4_gvEK9W--T847czR1QJdLg0OvW0Oro';

export const supabase = createClient(supabaseUrl, supabaseKey); 