'use client';

import { useState, useRef } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
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

export default function ContactForm() {
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
      // Focus on first error field
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = formRef.current?.querySelector(`[name="${firstErrorField}"]`) as HTMLElement;
      errorElement?.focus();
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Submit to API
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

      // Success
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        message: ''
      });

      // Focus on success message for screen readers
      setTimeout(() => {
        const successMessage = document.getElementById('success-message');
        successMessage?.focus();
      }, 100);

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

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const inputClasses = "w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none placeholder:text-muted-foreground";
  const errorInputClasses = "border-destructive focus:ring-destructive";

  return (
    <div className="bg-card border border-border rounded-xl p-8 shadow-sm max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Send us a Message
        </h3>
        <p className="text-muted-foreground">
          Tell us about your project and we'll get back to you within 2 hours.
        </p>
      </div>

      {/* Success Message */}
      {submitStatus === 'success' && (
        <div
          id="success-message"
          tabIndex={-1}
          className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3"
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
          className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3"
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

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Name and Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
              Full Name <span className="text-destructive" aria-label="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`${inputClasses} ${errors.name ? errorInputClasses : ''}`}
              placeholder="Enter your full name"
              required
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p id="name-error" className="mt-2 text-sm text-destructive" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
              Email Address <span className="text-destructive" aria-label="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${inputClasses} ${errors.email ? errorInputClasses : ''}`}
              placeholder="your@email.com"
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-2 text-sm text-destructive" role="alert">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Company and Phone Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-2 text-foreground">
              Company Name
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Your company name"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2 text-foreground">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputClasses}
              placeholder="+91 12345 67890"
            />
          </div>
        </div>

        {/* Service Selection */}
        <div>
          <label htmlFor="service" className="block text-sm font-medium mb-2 text-foreground">
            Service Interest
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
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
          <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
            Message <span className="text-destructive" aria-label="required">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={`${inputClasses} resize-none ${errors.message ? errorInputClasses : ''}`}
            placeholder="Tell us about your project, requirements, or any questions you have..."
            required
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : "message-hint"}
          />
          {!errors.message && (
            <p id="message-hint" className="mt-2 text-xs text-muted-foreground">
              Minimum 10 characters. Be specific about your requirements for better assistance.
            </p>
          )}
          {errors.message && (
            <p id="message-error" className="mt-2 text-sm text-destructive" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            size="lg"
            className="w-full md:w-auto min-w-[200px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </>
            )}
          </Button>

          <p className="mt-4 text-xs text-muted-foreground">
            We respect your privacy. Your information will never be shared with third parties.
          </p>
        </div>
      </form>
    </div>
  );
}
