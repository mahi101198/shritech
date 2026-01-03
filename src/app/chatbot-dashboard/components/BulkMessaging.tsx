'use client';

import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  Upload, 
  Send, 
  FileText, 
  Users, 
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Trash2,
  RefreshCw
} from 'lucide-react';

import { useDashboardStore } from '@/stores/dashboardStore';
import { BulkMessageRequest, BulkMessageStatus } from '@/types/dashboard';
import { formatDate, parseCSV, validatePhoneNumber } from '@/lib/utils';
import LoadingSpinner from './LoadingSpinner';

export default function BulkMessaging() {
  const {
    templates,
    bulkMessages,
    isLoading,
    fetchTemplates,
    createBulkMessage,
    fetchBulkStatus
  } = useDashboardStore();

  const [step, setStep] = useState<'upload' | 'compose' | 'review'>('upload');
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([]);
  const [campaignName, setCampaignName] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);
  const [activePolling, setActivePolling] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  // Poll for active bulk message statuses
  useEffect(() => {
    if (activePolling.size === 0) return;

    const interval = setInterval(() => {
      activePolling.forEach(bulkId => {
        fetchBulkStatus(bulkId);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [activePolling, fetchBulkStatus]);

  // Auto-poll for pending/sending bulk messages
  useEffect(() => {
    const pendingIds = bulkMessages
      .filter(bm => bm.status === 'pending' || bm.status === 'sending')
      .map(bm => bm.id);
    
    setActivePolling(new Set(pendingIds));
  }, [bulkMessages]);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvText = e.target?.result as string;
        const numbers = parseCSV(csvText);
        
        if (numbers.length === 0) {
          alert('No valid phone numbers found in the CSV file. Please check the format.');
          return;
        }

        setPhoneNumbers(numbers);
        setStep('compose');
      };
      reader.readAsText(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    maxFiles: 1,
  });

  const handleTemplateSelect = (templateId: number) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplateId(templateId);
      setMessageContent(template.content);
    }
  };

  const handleSendBulkMessage = async () => {
    if (!campaignName.trim() || !messageContent.trim() || phoneNumbers.length === 0) {
      return;
    }

    const request: BulkMessageRequest = {
      campaign_name: campaignName,
      message_content: messageContent,
      phone_numbers: phoneNumbers,
      template_id: selectedTemplateId || undefined
    };

    const bulkId = await createBulkMessage(request);
    if (bulkId) {
      // Reset form
      setStep('upload');
      setPhoneNumbers([]);
      setCampaignName('');
      setMessageContent('');
      setSelectedTemplateId(null);
      
      // Start polling for this bulk message
      setActivePolling(prev => new Set([...prev, bulkId]));
    }
  };

  const getStatusIcon = (status: BulkMessageStatus['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'sending':
        return <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: BulkMessageStatus['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'sending':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const downloadSampleCSV = () => {
    const csvContent = "phone\n+1234567890\n+0987654321\n+1122334455";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample-phone-numbers.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Step Indicator */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center space-x-8">
            {[
              { key: 'upload', label: 'Upload Recipients', icon: Upload },
              { key: 'compose', label: 'Compose Message', icon: FileText },
              { key: 'review', label: 'Review & Send', icon: Send },
            ].map((stepItem, index) => {
              const isActive = step === stepItem.key;
              const isCompleted = 
                (stepItem.key === 'upload' && phoneNumbers.length > 0) ||
                (stepItem.key === 'compose' && phoneNumbers.length > 0 && messageContent.trim());

              return (
                <div key={stepItem.key} className="flex items-center">
                  <div className={`flex items-center space-x-2 ${
                    isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                      isActive ? 'border-blue-600 bg-blue-50' : 
                      isCompleted ? 'border-green-600 bg-green-50' : 
                      'border-gray-300'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <stepItem.icon className="h-4 w-4" />
                      )}
                    </div>
                    <span className="font-medium">{stepItem.label}</span>
                  </div>
                  {index < 2 && (
                    <div className={`w-12 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 'upload' && (
            <UploadStep
              phoneNumbers={phoneNumbers}
              setPhoneNumbers={setPhoneNumbers}
              setStep={setStep}
              getRootProps={getRootProps}
              getInputProps={getInputProps}
              isDragActive={isDragActive}
              downloadSampleCSV={downloadSampleCSV}
            />
          )}

          {step === 'compose' && (
            <ComposeStep
              campaignName={campaignName}
              setCampaignName={setCampaignName}
              messageContent={messageContent}
              setMessageContent={setMessageContent}
              selectedTemplateId={selectedTemplateId}
              templates={templates}
              onTemplateSelect={handleTemplateSelect}
              setStep={setStep}
              phoneNumbers={phoneNumbers}
            />
          )}

          {step === 'review' && (
            <ReviewStep
              campaignName={campaignName}
              messageContent={messageContent}
              phoneNumbers={phoneNumbers}
              onSend={handleSendBulkMessage}
              setStep={setStep}
            />
          )}
        </div>
      </div>

      {/* Campaign History Sidebar */}
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Campaign History</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {bulkMessages.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No campaigns yet
            </div>
          ) : (
            <div className="space-y-4 p-4">
              {bulkMessages
                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                .map((bulk) => (
                <div key={bulk.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900">{bulk.campaign_name}</h3>
                      <p className="text-xs text-gray-500">{formatDate(bulk.created_at)}</p>
                    </div>
                    {getStatusIcon(bulk.status)}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bulk.status)}`}>
                        {bulk.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total:</span>
                      <span>{bulk.total_recipients}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Sent:</span>
                      <span className="text-green-600">{bulk.sent_count}</span>
                    </div>
                    {bulk.failed_count > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Failed:</span>
                        <span className="text-red-600">{bulk.failed_count}</span>
                      </div>
                    )}
                  </div>
                  
                  {bulk.status === 'sending' && (
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${(bulk.sent_count + bulk.failed_count) / bulk.total_recipients * 100}%`
                          }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1 text-center">
                        {bulk.sent_count + bulk.failed_count} / {bulk.total_recipients}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Upload Step Component
function UploadStep({
  phoneNumbers,
  setPhoneNumbers,
  setStep,
  getRootProps,
  getInputProps,
  isDragActive,
  downloadSampleCSV
}: any) {
  const [manualNumbers, setManualNumbers] = useState('');

  const handleManualUpload = () => {
    const numbers = manualNumbers
      .split('\n')
      .map(line => line.trim())
      .filter(line => line)
      .map(phone => {
        const cleaned = phone.replace(/[^\d+]/g, '');
        return cleaned.startsWith('+') ? cleaned : '+' + cleaned;
      })
      .filter(validatePhoneNumber);

    if (numbers.length === 0) {
      alert('No valid phone numbers found. Please check the format.');
      return;
    }

    setPhoneNumbers(numbers);
    setStep('compose');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Upload Recipients</h1>
        <p className="text-gray-600">Upload a CSV file or enter phone numbers manually</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* CSV Upload */}
        <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-8">
          <div {...getRootProps()} className={`text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-blue-400 bg-blue-50' : 'hover:border-gray-400'
          }`}>
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload CSV File</h3>
            <p className="text-gray-600 mb-4">
              {isDragActive ? 'Drop the file here...' : 'Drag and drop your CSV file here, or click to browse'}
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Choose File
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <button
              onClick={downloadSampleCSV}
              className="text-blue-600 hover:text-blue-700 text-sm flex items-center mx-auto"
            >
              <Download className="h-4 w-4 mr-1" />
              Download Sample CSV
            </button>
          </div>
        </div>

        {/* Manual Entry */}
        <div className="bg-white rounded-xl border border-gray-300 p-8">
          <div className="text-center mb-6">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Manual Entry</h3>
            <p className="text-gray-600">Enter phone numbers (one per line)</p>
          </div>
          
          <textarea
            value={manualNumbers}
            onChange={(e) => setManualNumbers(e.target.value)}
            placeholder="+1234567890&#10;+0987654321&#10;+1122334455"
            className="w-full h-40 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          />
          
          <button
            onClick={handleManualUpload}
            disabled={!manualNumbers.trim()}
            className="w-full mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            Process Numbers
          </button>
        </div>
      </div>

      {phoneNumbers.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-green-800">
            <strong>{phoneNumbers.length}</strong> phone numbers loaded successfully!
          </p>
          <button
            onClick={() => setStep('compose')}
            className="mt-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Continue to Compose
          </button>
        </div>
      )}
    </div>
  );
}

// Compose Step Component
function ComposeStep({
  campaignName,
  setCampaignName,
  messageContent,
  setMessageContent,
  selectedTemplateId,
  templates,
  onTemplateSelect,
  setStep,
  phoneNumbers
}: any) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Compose Message</h1>
        <p className="text-gray-600">Create your bulk message content</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="space-y-6">
          {/* Campaign Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Campaign Name
            </label>
            <input
              type="text"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Monthly Newsletter, Product Launch"
              required
            />
          </div>

          {/* Template Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Template (Optional)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => onTemplateSelect(template.id)}
                  className={`p-4 border rounded-lg text-left hover:bg-gray-50 transition-colors ${
                    selectedTemplateId === template.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <h4 className="font-medium text-gray-900 mb-1">{template.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {template.content.substring(0, 80)}...
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Message Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message Content
            </label>
            <textarea
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              className="w-full h-40 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your message content..."
              required
            />
            <p className="text-sm text-gray-500 mt-2">
              Character count: {messageContent.length} / 1000
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-between">
            <button
              onClick={() => setStep('upload')}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => setStep('review')}
              disabled={!campaignName.trim() || !messageContent.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              Review & Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Review Step Component
function ReviewStep({
  campaignName,
  messageContent,
  phoneNumbers,
  onSend,
  setStep
}: any) {
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    setIsSending(true);
    await onSend();
    setIsSending(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Review & Send</h1>
        <p className="text-gray-600">Review your bulk message before sending</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="space-y-6">
          {/* Campaign Summary */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{phoneNumbers.length}</p>
              <p className="text-sm text-gray-600">Recipients</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{messageContent.length}</p>
              <p className="text-sm text-gray-600">Characters</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Send className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">Ready</p>
              <p className="text-sm text-gray-600">To Send</p>
            </div>
          </div>

          {/* Campaign Details */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Campaign Details</h3>
            <div className="space-y-3">
              <div className="flex">
                <span className="w-32 text-sm text-gray-600">Campaign Name:</span>
                <span className="text-sm font-medium text-gray-900">{campaignName}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-sm text-gray-600">Recipients:</span>
                <span className="text-sm font-medium text-gray-900">{phoneNumbers.length} numbers</span>
              </div>
            </div>
          </div>

          {/* Message Preview */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Message Preview</h3>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-900 whitespace-pre-wrap">{messageContent}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between">
            <button
              onClick={() => setStep('compose')}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back to Edit
            </button>
            <button
              onClick={handleSend}
              disabled={isSending}
              className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center"
            >
              {isSending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Send to {phoneNumbers.length} Recipients
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
