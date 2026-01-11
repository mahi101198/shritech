import { NextRequest, NextResponse } from 'next/server';
import { supabase, ContactSubmission, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: 'Database not configured. Please check environment variables.' },
        { status: 503 }
      );
    }

    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create submission object
    const submissionData: Omit<ContactSubmission, 'id' | 'created_at' | 'updated_at'> = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      company: body.company?.trim() || null,
      phone: body.phone?.trim() || null,
      service: body.service || 'Not specified',
      message: body.message.trim(),
      status: 'new',
      submitted_at: new Date().toISOString(),
    };

    // Save to Supabase database
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([submissionData])
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase error:', error);
      throw new Error(error.message);
    }

    // Log submission
    console.log('📩 New Contact Form Submission:', {
      id: data.id,
      name: data.name,
      email: data.email,
      service: data.service,
      timestamp: data.submitted_at,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your inquiry! We will get back to you soon.',
        submissionId: data.id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('❌ Error processing contact form:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process your request. Please try again.' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve submissions (admin only)
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check here
    // const isAdmin = await checkAdminAuth(request);
    // if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');

    // Build query
    let query = supabase
      .from('contact_submissions')
      .select('*')
      .order('submitted_at', { ascending: false })
      .limit(limit);

    // Filter by status if provided
    if (status && ['new', 'read', 'contacted', 'closed'].includes(status)) {
      query = query.eq('status', status);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('❌ Supabase error:', error);
      throw new Error(error.message);
    }

    return NextResponse.json({
      total: data?.length || 0,
      submissions: data || [],
    });
  } catch (error: any) {
    console.error('❌ Error retrieving submissions:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to retrieve submissions' },
      { status: 500 }
    );
  }
}

// PATCH endpoint to update submission status
export async function PATCH(request: NextRequest) {
  try {
    // TODO: Add authentication check here
    // const isAdmin = await checkAdminAuth(request);
    // if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'ID and status are required' },
        { status: 400 }
      );
    }

    if (!['new', 'read', 'contacted', 'closed'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('contact_submissions')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase error:', error);
      throw new Error(error.message);
    }

    return NextResponse.json({
      success: true,
      submission: data,
    });
  } catch (error: any) {
    console.error('❌ Error updating submission:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update submission' },
      { status: 500 }
    );
  }
}
