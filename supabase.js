
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cmqdytribbmemqtzwisd.supabase.co'
//const supabaseKey = process.env.SUPABASE_KEY
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtcWR5dHJpYmJtZW1xdHp3aXNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU2NTQ5MzUsImV4cCI6MjAyMTIzMDkzNX0.kM4lA99pieN8sMHCRuijnFMEOVxcNpbHC6OYWiL1zKY'

export const supabase = createClient(supabaseUrl, supabaseKey)