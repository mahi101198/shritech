'use client';

import { useEffect, useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Send,
  MessageSquare,
  FileText,
  Image,
  Tag,
  Phone,
  MoreVertical
} from 'lucide-react';

import { useDashboardStore } from '@/stores/dashboardStore';
import { Template, CreateTemplateRequest } from '@/types/dashboard';
import { truncateText } from '@/lib/utils';
import LoadingSpinner from './LoadingSpinner';

export default function Templates() {
  const {
    templates,
    isLoading,
    fetchTemplates,
    createTemplate,
    sendTemplate
  } = useDashboardStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState<Template | null>(null);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(templates.map(t => t.category).filter(Boolean))];

  const getTemplateIcon = (type: string) => {
    switch (type) {
      case 'media':
        return <Image className="h-5 w-5 text-purple-600" />;
      case 'interactive':
        return <MessageSquare className="h-5 w-5 text-green-600" />;
      default:
        return <FileText className="h-5 w-5 text-blue-600" />;
    }
  };

  const getCategoryColor = (category: string | undefined) => {
    const colors: Record<string, string> = {
      greeting: 'bg-green-100 text-green-800',
      services: 'bg-blue-100 text-blue-800',
      pricing: 'bg-purple-100 text-purple-800',
      followup: 'bg-orange-100 text-orange-800',
      support: 'bg-red-100 text-red-800',
    };
    return colors[category || ''] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold text-gray-900">Message Templates</h1>
            <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
              {filteredTemplates.length} templates
            </span>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category?.charAt(0).toUpperCase() + category?.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        {isLoading ? (
          <LoadingSpinner message="Loading templates..." />
        ) : filteredTemplates.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || selectedCategory ? 'No templates found' : 'No templates yet'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || selectedCategory 
                ? 'Try adjusting your search or filter criteria' 
                : 'Create your first message template to get started'
              }
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Template
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                {/* Template Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getTemplateIcon(template.template_type)}
                    <div>
                      <h3 className="font-semibold text-gray-900">{template.title}</h3>
                      <p className="text-xs text-gray-500">{template.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Category Badge */}
                {template.category && (
                  <div className="mb-4">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(template.category)}`}>
                      <Tag className="h-3 w-3 mr-1" />
                      {template.category}
                    </span>
                  </div>
                )}

                {/* Template Content */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 line-clamp-4">
                    {truncateText(template.content, 120)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowSendModal(template)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <MoreVertical className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Template Modal */}
      {showCreateModal && (
        <CreateTemplateModal
          onClose={() => setShowCreateModal(false)}
          onCreate={async (template) => {
            const success = await createTemplate(template);
            if (success) {
              setShowCreateModal(false);
            }
            return success;
          }}
        />
      )}

      {/* Send Template Modal */}
      {showSendModal && (
        <SendTemplateModal
          template={showSendModal}
          onClose={() => setShowSendModal(null)}
          onSend={async (phone) => {
            const success = await sendTemplate(showSendModal.id, phone);
            if (success) {
              setShowSendModal(null);
            }
            return success;
          }}
        />
      )}
    </div>
  );
}

// Create Template Modal Component
function CreateTemplateModal({ 
  onClose, 
  onCreate 
}: { 
  onClose: () => void;
  onCreate: (template: CreateTemplateRequest) => Promise<boolean>;
}) {
  const [template, setTemplate] = useState<CreateTemplateRequest>({
    name: '',
    title: '',
    content: '',
    category: '',
    template_type: 'text'
  });
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!template.name || !template.title || !template.content) return;

    setIsCreating(true);
    const success = await onCreate(template);
    setIsCreating(false);
  };

  const handleInputChange = (field: keyof CreateTemplateRequest, value: string) => {
    setTemplate(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Create New Template</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
              <input
                type="text"
                value={template.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., welcome_message"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={template.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Welcome Message"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <input
                type="text"
                value={template.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., greeting, services"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={template.template_type}
                onChange={(e) => handleInputChange('template_type', e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="text">Text</option>
                <option value="media">Media</option>
                <option value="interactive">Interactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea
              value={template.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
              placeholder="Enter your template message content..."
              required
            />
          </div>

          {template.template_type === 'media' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Media URL</label>
              <input
                type="url"
                value={template.media_url || ''}
                onChange={(e) => handleInputChange('media_url', e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreating || !template.name || !template.title || !template.content}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center"
            >
              {isCreating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                'Create Template'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Send Template Modal Component
function SendTemplateModal({
  template,
  onClose,
  onSend
}: {
  template: Template;
  onClose: () => void;
  onSend: (phone: string) => Promise<boolean>;
}) {
  const [phone, setPhone] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    setIsSending(true);
    const success = await onSend(phone.trim());
    setIsSending(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Send Template</h2>
        
        {/* Template Preview */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">{template.title}</h3>
          <p className="text-sm text-gray-600 whitespace-pre-wrap line-clamp-4">
            {template.content}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="+1234567890"
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Include country code (e.g., +1 for US, +91 for India)
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSending || !phone.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center"
            >
              {isSending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Template
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
