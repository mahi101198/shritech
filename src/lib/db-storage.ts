// Simple file-based storage for development
// In production, replace with PostgreSQL, MongoDB, or other database

import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'contact-submissions.json');

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'read' | 'contacted' | 'closed';
}

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Read all submissions
export function getAllSubmissions(): ContactSubmission[] {
  try {
    ensureDataDir();
    if (!fs.existsSync(DB_FILE)) {
      return [];
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading submissions:', error);
    return [];
  }
}

// Save a new submission
export function saveSubmission(submission: Omit<ContactSubmission, 'id' | 'status'>): ContactSubmission {
  try {
    ensureDataDir();
    const submissions = getAllSubmissions();
    const newId = submissions.length > 0 ? Math.max(...submissions.map(s => s.id)) + 1 : 1;
    
    const newSubmission: ContactSubmission = {
      id: newId,
      ...submission,
      status: 'new',
    };
    
    submissions.push(newSubmission);
    fs.writeFileSync(DB_FILE, JSON.stringify(submissions, null, 2));
    
    return newSubmission;
  } catch (error) {
    console.error('Error saving submission:', error);
    throw new Error('Failed to save submission');
  }
}

// Update submission status
export function updateSubmissionStatus(id: number, status: ContactSubmission['status']): boolean {
  try {
    const submissions = getAllSubmissions();
    const index = submissions.findIndex(s => s.id === id);
    
    if (index === -1) {
      return false;
    }
    
    submissions[index].status = status;
    fs.writeFileSync(DB_FILE, JSON.stringify(submissions, null, 2));
    
    return true;
  } catch (error) {
    console.error('Error updating submission:', error);
    return false;
  }
}

// Get submissions by status
export function getSubmissionsByStatus(status: ContactSubmission['status']): ContactSubmission[] {
  return getAllSubmissions().filter(s => s.status === status);
}

// Get submission by ID
export function getSubmissionById(id: number): ContactSubmission | null {
  const submissions = getAllSubmissions();
  return submissions.find(s => s.id === id) || null;
}
