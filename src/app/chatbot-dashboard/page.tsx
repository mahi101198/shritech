'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  MessageCircle, 
  FileText, 
  Users, 
  Settings, 
  LogOut,
  Search,
  Bell,
  User,
  Activity
} from 'lucide-react';

import { useAuthStore } from '@/stores/authStore';
import { useDashboardStore } from '@/stores/dashboardStore';
import { cn } from '@/lib/utils';

// Components
import LoginForm from './components/LoginForm';
import LiveChat from './components/LiveChat';
import Templates from './components/Templates';
import BulkMessaging from './components/BulkMessaging';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorAlert from './components/ErrorAlert';
import { useWebSocket } from '@/hooks/useWebSocket';

const navigation = [
  {
    name: 'Live Chat',
    icon: MessageCircle,
    section: 'chat' as const,
    description: 'Manage customer conversations'
  },
  {
    name: 'Templates',
    icon: FileText,
    section: 'templates' as const,
    description: 'Message templates library'
  },
  {
    name: 'Bulk Messaging',
    icon: Users,
    section: 'bulk' as const,
    description: 'Send messages to multiple users'
  },
];

export default function ChatbotDashboard() {
  const router = useRouter();
  const { isAuthenticated, user, logout, isLoading: authLoading } = useAuthStore();
  const { 
    activeSection, 
    setActiveSection, 
    conversations,
    templates,
    bulkMessages,
    isLoading,
    error,
    clearError 
  } = useDashboardStore();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  
  // Initialize WebSocket connection
  const { isConnected } = useWebSocket();

  useEffect(() => {
    // Calculate total unread messages
    const total = conversations.reduce((sum, conv) => sum + conv.unread_count, 0);
    setUnreadCount(total);
  }, [conversations]);

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">WhatsApp Dashboard</h1>
            <p className="text-gray-600">Shriram Tech Solutions</p>
          </div>
          <LoginForm />
        </div>
      </div>
    );
  }

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'chat':
        return <LiveChat />;
      case 'templates':
        return <Templates />;
      case 'bulk':
        return <BulkMessaging />;
      default:
        return <LiveChat />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={cn(
        "flex flex-col bg-white shadow-lg transition-all duration-300",
        sidebarCollapsed ? "w-16" : "w-64"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {!sidebarCollapsed && (
            <h1 className="text-xl font-bold text-gray-900">WhatsApp Dashboard</h1>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          <ul className="space-y-2 px-2">
            {navigation.map((item) => {
              const isActive = activeSection === item.section;
              return (
                <li key={item.name}>
                  <button
                    onClick={() => setActiveSection(item.section)}
                    className={cn(
                      "w-full flex items-center px-3 py-2 rounded-lg transition-colors",
                      isActive 
                        ? "bg-blue-100 text-blue-700 border border-blue-200" 
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    )}
                  >
                    <item.icon className={cn(
                      "h-5 w-5",
                      sidebarCollapsed ? "mx-auto" : "mr-3"
                    )} />
                    {!sidebarCollapsed && (
                      <div className="text-left">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.description}</div>
                      </div>
                    )}
                    {!sidebarCollapsed && item.section === 'chat' && unreadCount > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <User className="h-8 w-8 text-gray-400 bg-gray-100 rounded-full p-1" />
            </div>
            {!sidebarCollapsed && (
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">{user?.full_name || user?.username}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className={cn(
                "p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors",
                sidebarCollapsed && "mx-auto"
              )}
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                {navigation.find(item => item.section === activeSection)?.name}
              </h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Activity className="h-4 w-4" />
                <span>Live Updates</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-gray-100">
                <Bell className="h-5 w-5 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Error Display */}
        {error && <ErrorAlert message={error} onClose={clearError} />}

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden">
          {isLoading && <LoadingSpinner />}
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
}
