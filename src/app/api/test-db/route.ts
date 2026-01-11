import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        configured: false,
        error: 'Supabase environment variables not set',
        message: 'Please ensure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are in .env.local'
      }, { status: 503 });
    }

    // Try to query the contact_submissions table
    const { data, error, count } = await supabase
      .from('contact_submissions')
      .select('*', { count: 'exact', head: true });

    if (error) {
      return NextResponse.json({
        configured: true,
        tableExists: false,
        error: error.message,
        message: 'Database table not found. Please run the SQL setup script in Supabase.'
      }, { status: 500 });
    }

    return NextResponse.json({
      configured: true,
      tableExists: true,
      recordCount: count || 0,
      message: 'Database is properly configured and ready!'
    });

  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      message: 'Error checking database configuration'
    }, { status: 500 });
  }
}
