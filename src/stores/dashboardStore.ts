import { create } from 'zustand';
import { 
  Conversation, 
  Message, 
  Template, 
  BulkMessageStatus,
  SendMessageRequest,
  BulkMessageRequest,
  CreateTemplateRequest 
} from '@/types/dashboard';
import { useAuthStore } from './authStore';

interface DashboardState {
  // Data
  conversations: Conversation[];
  messages: { [customerId: number]: Message[] };
  templates: Template[];
  bulkMessages: BulkMessageStatus[];
  
  // UI State
  selectedConversation: Conversation | null;
  activeSection: 'chat' | 'templates' | 'bulk';
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setActiveSection: (section: 'chat' | 'templates' | 'bulk') => void;
  setSelectedConversation: (conversation: Conversation | null) => void;
  
  // API Actions
  fetchConversations: () => Promise<void>;
  fetchMessages: (customerId: number) => Promise<void>;
  sendMessage: (request: SendMessageRequest) => Promise<boolean>;
  
  fetchTemplates: () => Promise<void>;
  createTemplate: (template: CreateTemplateRequest) => Promise<boolean>;
  sendTemplate: (templateId: number, phone: string) => Promise<boolean>;
  
  createBulkMessage: (request: BulkMessageRequest) => Promise<number | null>;
  fetchBulkStatus: (bulkId: number) => Promise<void>;
  
  // WebSocket
  addMessage: (customerId: number, message: Message) => void;
  updateBulkStatus: (bulkStatus: BulkMessageStatus) => void;
  
  // Utilities
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';

// Helper function to get auth token
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    const authData = localStorage.getItem('auth-storage');
    if (authData) {
      const parsedData = JSON.parse(authData);
      return parsedData.state?.token || null;
    }
  } catch (error) {
    console.error('Error accessing auth token:', error);
  }
  return null;
};

export const useDashboardStore = create<DashboardState>()((set, get) => ({
  // Initial State
  conversations: [],
  messages: {},
  templates: [],
  bulkMessages: [],
  selectedConversation: null,
  activeSection: 'chat',
  isLoading: false,
  error: null,

  // UI Actions
  setActiveSection: (section) => set({ activeSection: section }),
  
  setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
  
  // API Helper - removed from store

  // Conversation Actions
  fetchConversations: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE}/dashboard/conversations`, {
        headers: {
          'Authorization': `Bearer ${token || ''}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch conversations');
      }

      const conversations: Conversation[] = await response.json();
      set({ conversations, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch conversations', isLoading: false });
    }
  },

  fetchMessages: async (customerId: number) => {
    set({ isLoading: true, error: null });
    
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE}/dashboard/messages/${customerId}`, {
        headers: {
          'Authorization': `Bearer ${token || ''}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const messages: Message[] = await response.json();
      set(state => ({
        messages: { ...state.messages, [customerId]: messages },
        isLoading: false
      }));
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch messages', isLoading: false });
    }
  },

  sendMessage: async (request: SendMessageRequest) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE}/dashboard/send_message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || ''}`,
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }

      return true;
    } catch (error: any) {
      set({ error: error.message || 'Failed to send message' });
      return false;
    }
  },

  // Template Actions
  fetchTemplates: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE}/dashboard/templates`, {
        headers: {
          'Authorization': `Bearer ${token || ''}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch templates');
      }

      const templates: Template[] = await response.json();
      set({ templates, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch templates', isLoading: false });
    }
  },

  createTemplate: async (template: CreateTemplateRequest) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE}/dashboard/templates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || ''}`,
        },
        body: JSON.stringify(template),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create template');
      }

      const newTemplate: Template = await response.json();
      set(state => ({ 
        templates: [...state.templates, newTemplate] 
      }));
      
      return true;
    } catch (error: any) {
      set({ error: error.message || 'Failed to create template' });
      return false;
    }
  },

  sendTemplate: async (templateId: number, phone: string) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE}/dashboard/send_template?template_id=${templateId}&phone=${phone}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token || ''}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send template');
      }

      return true;
    } catch (error: any) {
      set({ error: error.message || 'Failed to send template' });
      return false;
    }
  },

  // Bulk Message Actions
  createBulkMessage: async (request: BulkMessageRequest) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE}/dashboard/bulk_send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || ''}`,
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create bulk message');
      }

      const bulkStatus: BulkMessageStatus = await response.json();
      set(state => ({ 
        bulkMessages: [...state.bulkMessages, bulkStatus] 
      }));
      
      return bulkStatus.id;
    } catch (error: any) {
      set({ error: error.message || 'Failed to create bulk message' });
      return null;
    }
  },

  fetchBulkStatus: async (bulkId: number) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE}/dashboard/bulk_status/${bulkId}`, {
        headers: {
          'Authorization': `Bearer ${token || ''}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch bulk status');
      }

      const bulkStatus: BulkMessageStatus = await response.json();
      set(state => ({
        bulkMessages: state.bulkMessages.map(bm => 
          bm.id === bulkId ? bulkStatus : bm
        )
      }));
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch bulk status' });
    }
  },

  // WebSocket Actions
  addMessage: (customerId: number, message: Message) => {
    set(state => ({
      messages: {
        ...state.messages,
        [customerId]: [...(state.messages[customerId] || []), message]
      }
    }));
  },

  updateBulkStatus: (bulkStatus: BulkMessageStatus) => {
    set(state => ({
      bulkMessages: state.bulkMessages.map(bm => 
        bm.id === bulkStatus.id ? bulkStatus : bm
      )
    }));
  },

  // Utilities
  clearError: () => set({ error: null }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
}));
