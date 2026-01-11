'use client';

import { useState, useRef } from 'react';
import { X, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const services = [
    'AI Agents',
    'Chatbots',
    'NLP & RAG',
    'OCR Doc Extraction',
    'Website Development',
    'Mobile Apps',
    'Machine Learning',
    'Model Training',
    'MCP Servers',
    'Workflow Automation',
    'WhatsApp Business API',
    'Consulting',
    'Other'
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = formRef.current?.querySelector(`[name="${firstErrorField}"]`) as HTMLElement;
      errorElement?.focus();
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('API Error Response:', data);
        throw new Error(data.error || 'Failed to submit form');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        message: ''
      });

      // Auto-close after 2 seconds on success
      setTimeout(() => {
        onClose();
        setSubmitStatus('idle');
      }, 2000);

    } catch (error: any) {
      console.error('Form submission error:', error);
      console.error('Error message:', error.message);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      // Reset form after closing
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          service: '',
          message: ''
        });
        setErrors({});
        setSubmitStatus('idle');
      }, 300);
    }
  };

  if (!isOpen) return null;

  const inputClasses = "w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none placeholder:text-muted-foreground";
  const errorInputClasses = "border-destructive focus:ring-destructive";

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between z-10">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Get Started</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Tell us about your project and we'll get back to you within 2 hours
              </p>
            </div>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-lg disabled:opacity-50"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Success Message */}
            {submitStatus === 'success' && (
              <div
                className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3 animate-in slide-in-from-top duration-300"
                role="status"
                aria-live="polite"
              >
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <div>
                  <h4 className="text-green-500 font-medium mb-1">Message Sent Successfully!</h4>
                  <p className="text-green-600/80 text-sm">
                    We've received your message and will respond within 2 hours.
                  </p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div
                className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3 animate-in slide-in-from-top duration-300"
                role="alert"
              >
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                <div>
                  <h4 className="text-destructive font-medium mb-1">Submission Failed</h4>
                  <p className="text-destructive/80 text-sm">
                    There was an error sending your message. Please try again or contact us directly.
                  </p>
                </div>
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="modal-name" className="block text-sm font-medium mb-2 text-foreground">
                    Full Name <span className="text-destructive" aria-label="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="modal-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`${inputClasses} ${errors.name ? errorInputClasses : ''}`}
                    placeholder="John Doe"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'modal-name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="modal-name-error" className="mt-1 text-sm text-destructive" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="modal-email" className="block text-sm font-medium mb-2 text-foreground">
                    Email Address <span className="text-destructive" aria-label="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="modal-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`${inputClasses} ${errors.email ? errorInputClasses : ''}`}
                    placeholder="john@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'modal-email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="modal-email-error" className="mt-1 text-sm text-destructive" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Company and Phone Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="modal-company" className="block text-sm font-medium mb-2 text-foreground">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="modal-company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={inputClasses}
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label htmlFor="modal-phone" className="block text-sm font-medium mb-2 text-foreground">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="modal-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={inputClasses}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label htmlFor="modal-service" className="block text-sm font-medium mb-2 text-foreground">
                  Service Interested In
                </label>
                <select
                  id="modal-service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={inputClasses}
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="modal-message" className="block text-sm font-medium mb-2 text-foreground">
                  Message <span className="text-destructive" aria-label="required">*</span>
                </label>
                <textarea
                  id="modal-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  rows={4}
                  className={`${inputClasses} resize-none ${errors.message ? errorInputClasses : ''}`}
                  placeholder="Tell us about your project requirements..."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'modal-message-error' : undefined}
                />
                {errors.message && (
                  <p id="modal-message-error" className="mt-1 text-sm text-destructive" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
