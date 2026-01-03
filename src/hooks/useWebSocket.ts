'use client';

import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/stores/authStore';
import { useDashboardStore } from '@/stores/dashboardStore';
import { WebSocketMessage, Message } from '@/types/dashboard';

const WS_BASE = process.env.NEXT_PUBLIC_WS_BASE || 'ws://localhost:8000';

export function useWebSocket() {
  const socketRef = useRef<WebSocket | null>(null);
  const { isAuthenticated, user } = useAuthStore();
  const { addMessage, updateBulkStatus } = useDashboardStore();

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    // Connect to WebSocket
    const wsUrl = `${WS_BASE}/dashboard/ws/chat?client_id=${user.username}`;
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        
        switch (data.type) {
          case 'new_message':
            if (data.customer_id && data.message) {
              addMessage(data.customer_id, data.message);
            }
            break;
            
          case 'bulk_status':
            if (data.data) {
              updateBulkStatus(data.data);
            }
            break;
            
          case 'error':
            console.error('WebSocket error:', data);
            break;
            
          default:
            console.log('Unknown WebSocket message type:', data.type);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    socketRef.current = socket;

    // Cleanup on unmount or auth change
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [isAuthenticated, user, addMessage, updateBulkStatus]);

  // Send message through WebSocket
  const sendWebSocketMessage = (message: any) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    }
  };

  return {
    isConnected: socketRef.current?.readyState === WebSocket.OPEN,
    sendMessage: sendWebSocketMessage
  };
}
