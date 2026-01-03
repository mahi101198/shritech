'use client';

import { useEffect, useState, useRef } from 'react';
import { 
  Send, 
  Phone, 
  MoreVertical, 
  Search,
  User,
  CheckCheck,
  Clock,
  Paperclip,
  MessageCircle
} from 'lucide-react';

import { useDashboardStore } from '@/stores/dashboardStore';
import { Conversation, Message, SendMessageRequest } from '@/types/dashboard';
import { formatDate, formatTime } from '@/lib/utils';
import LoadingSpinner from './LoadingSpinner';

export default function LiveChat() {
  const {
    conversations,
    messages,
    selectedConversation,
    isLoading,
    fetchConversations,
    fetchMessages,
    sendMessage,
    setSelectedConversation,
    addMessage
  } = useDashboardStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.customer_id);
    }
  }, [selectedConversation, fetchMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedConversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || isSending) return;

    const messageRequest: SendMessageRequest = {
      phone: selectedConversation.phone,
      message: newMessage.trim()
    };

    setIsSending(true);
    const success = await sendMessage(messageRequest);
    
    if (success) {
      // Add the message to local state immediately for better UX
      const newMsg: Message = {
        id: Date.now(), // temporary ID
        content: newMessage.trim(),
        timestamp: new Date().toISOString(),
        message_type: 'outgoing',
        is_read: true
      };
      
      addMessage(selectedConversation.customer_id, newMsg);
      setNewMessage('');
      
      // Refresh conversations to update last message
      fetchConversations();
    }
    
    setIsSending(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.phone.includes(searchTerm)
  );

  const currentMessages = selectedConversation 
    ? messages[selectedConversation.customer_id] || [] 
    : [];

  return (
    <div className="h-full flex">
      {/* Conversations List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Search */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="p-4">
              <LoadingSpinner message="Loading conversations..." />
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              {searchTerm ? 'No conversations found' : 'No conversations yet'}
            </div>
          ) : (
            <div className="space-y-1">
              {filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => handleSelectConversation(conversation)}
                  className={`w-full p-4 text-left hover:bg-gray-50 border-l-4 transition-colors ${
                    selectedConversation?.id === conversation.id
                      ? 'bg-blue-50 border-blue-500'
                      : 'border-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="flex-shrink-0">
                        <User className="h-10 w-10 text-gray-400 bg-gray-100 rounded-full p-2" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-sm font-semibold text-gray-900 truncate">
                            {conversation.customer_name}
                          </h3>
                          {conversation.unread_count > 0 && (
                            <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                              {conversation.unread_count}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mb-1 flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {conversation.phone}
                        </p>
                        <p className="text-sm text-gray-600 truncate">
                          {conversation.last_message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatDate(conversation.last_message_time)}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <User className="h-10 w-10 text-gray-400 bg-gray-100 rounded-full p-2" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {selectedConversation.customer_name}
                  </h2>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Phone className="h-3 w-3 mr-1" />
                    {selectedConversation.phone}
                  </p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MoreVertical className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentMessages.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <User className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <p>No messages yet. Start the conversation!</p>
                </div>
              ) : (
                currentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.message_type === 'outgoing' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.message_type === 'outgoing'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <div className={`text-xs mt-1 flex items-center ${
                        message.message_type === 'outgoing' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        <span className="mr-1">{formatTime(message.timestamp)}</span>
                        {message.message_type === 'outgoing' && (
                          <CheckCheck className="h-3 w-3" />
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white border-t px-4 py-4">
              <div className="flex items-end space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Paperclip className="h-5 w-5" />
                </button>
                <div className="flex-1">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={1}
                    style={{ minHeight: '44px' }}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || isSending}
                  className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSending ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-500">
                Choose a conversation from the sidebar to start chatting
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
