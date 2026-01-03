// Dashboard specific types
export interface User {
  username: string;
  email?: string;
  full_name?: string;
  disabled: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface Conversation {
  id: number;
  customer_id: number;
  customer_name: string;
  phone: string;
  last_message: string;
  last_message_time: string;
  unread_count: number;
}

export interface Message {
  id: number;
  content: string;
  timestamp: string;
  message_type: 'incoming' | 'outgoing';
  is_read: boolean;
  media_url?: string;
  media_type?: string;
}

export interface SendMessageRequest {
  phone: string;
  message: string;
  media_url?: string;
}

export interface Template {
  id: number;
  name: string;
  title: string;
  content: string;
  category?: string;
  template_type: string;
  media_url?: string;
  status: string;
}

export interface CreateTemplateRequest {
  name: string;
  title: string;
  content: string;
  category?: string;
  template_type?: string;
  media_url?: string;
}

export interface BulkMessageRequest {
  campaign_name: string;
  message_content: string;
  phone_numbers: string[];
  template_id?: number;
}

export interface BulkMessageStatus {
  id: number;
  campaign_name: string;
  status: 'pending' | 'sending' | 'completed' | 'failed';
  total_recipients: number;
  sent_count: number;
  failed_count: number;
  created_at: string;
  completed_at?: string;
}

export interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface WebSocketMessage {
  type: 'new_message' | 'bulk_status' | 'error';
  customer_id?: number;
  message?: Message;
  bulk_id?: number;
  data?: any;
}
