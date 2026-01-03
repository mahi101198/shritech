import { Metadata } from 'next'
import Layout from '@/components/layout/Layout'
import { Trash2, Shield, Lock, MessageCircle, Phone, Mail, Clock, UserCheck, CheckCircle, AlertTriangle, Database, Globe } from 'lucide-react'
import { contactInfo, generateWhatsAppLink, generatePhoneLink, generateEmailLink } from '@/config/contactInfo'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'User Data Deletion Policy | Shriram Tech Solutions',
  description: 'Comprehensive data deletion policy for Shriram Tech Solutions. Learn how to request deletion of your personal data in compliance with GDPR, CCPA, and IT Act regulations.',
}

export default function DataDeletionPolicyPage() {
  const lastUpdated = "August 31, 2025"

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-background transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Trash2 className="w-16 h-16 text-destructive" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              User Data Deletion Policy
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Your right to data deletion is fundamental to our commitment to privacy. This comprehensive policy explains
              how to request deletion of your personal data in compliance with GDPR, CCPA, IT Act, and Meta/WhatsApp data policies.
            </p>
            <div className="bg-card border border-border rounded-lg p-6 inline-block shadow-sm">
              <p className="text-sm text-foreground">
                <strong className="text-destructive">Last Updated:</strong> {lastUpdated} |
                <strong className="ml-2 text-destructive">Effective Date:</strong> August 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-muted/30 transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <p className="text-muted-foreground leading-relaxed text-lg">
            Shriram Tech Solutions ("ShriRam Tech," "we," "our," or "us") is committed to protecting your privacy
            and respecting your data rights. We understand that circumstances may arise where you need to delete
            your personal information from our systems. This Data Deletion Policy outlines our commitment to
            user privacy, compliance with international data protection regulations including the General Data
            Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and India's Information Technology Act,
            2000, as well as our adherence to Meta/WhatsApp Business API data policies.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-2xl p-8 mb-12 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Our Data Deletion Commitment</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-destructive/20 transition-colors">
                  <Shield className="w-8 h-8 text-destructive" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-lg">Legal Compliance</h3>
                <p className="text-sm text-muted-foreground">Full compliance with GDPR, CCPA, IT Act, and international data protection laws</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/20 transition-colors">
                  <UserCheck className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-lg">User Rights</h3>
                <p className="text-sm text-muted-foreground">Your right to deletion is respected and processed efficiently</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/20 transition-colors">
                  <Lock className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-lg">Secure Process</h3>
                <p className="text-sm text-muted-foreground">Secure verification and deletion procedures protect your identity</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Data Can Be Deleted Section */}
      <section className="py-20 bg-background transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-12">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
              <Database className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">What Data Can Be Deleted</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl border border-border p-8 hover:border-primary/50 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-foreground mb-4">Personal & Contact Information</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We can delete all personal details you've shared with us during our business relationship:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-foreground">Contact Details:</strong> Name, email addresses, phone numbers, business addresses, job titles, and company information</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-foreground">Account Information:</strong> User profiles, account preferences, login credentials, and authentication data</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-foreground">Communication Records:</strong> Email exchanges, chat logs, project discussions, and consultation notes</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-foreground">Payment Information:</strong> Billing addresses, payment history, and financial transaction records (subject to legal retention requirements)</span>
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-xl border border-border p-8 hover:border-primary/50 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-foreground mb-4">WhatsApp & AI Service Data</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Data related to our AI/ML services and WhatsApp Business API integrations:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-foreground">WhatsApp Metadata:</strong> Message delivery status, timestamps, and interaction analytics (message content is not stored unnecessarily per Meta policies)</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-foreground">Chatbot Interactions:</strong> Stored conversations, training data derived from your interactions, and response patterns</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-foreground">Project Files:</strong> Documents, datasets, AI model training data, and technical specifications you've provided</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-foreground">Usage Analytics:</strong> Service usage patterns, API call logs, and performance metrics associated with your account</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-green-500/10 border border-green-500/20 rounded-xl p-8">
            <h3 className="text-lg font-semibold text-green-600 mb-4">Meta/WhatsApp Data Compliance</h3>
            <p className="text-green-700 dark:text-green-300 mb-4">
              <strong>Important:</strong> ShriRam Tech respects Meta's WhatsApp Business API policies and does not store user message content unnecessarily.
              We only retain metadata required for service functionality and business operations. Any WhatsApp-related data we process
              is handled in strict compliance with Meta's data policies and can be deleted upon request.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-green-600 mb-2">Message Content</h4>
                <p className="text-green-700 dark:text-green-300">Not stored beyond operational requirements</p>
              </div>
              <div>
                <h4 className="font-semibold text-green-600 mb-2">Metadata</h4>
                <p className="text-green-700 dark:text-green-300">Delivery status and interaction analytics only</p>
              </div>
              <div>
                <h4 className="font-semibold text-green-600 mb-2">Business Data</h4>
                <p className="text-green-700 dark:text-green-300">Processed securely per Meta's guidelines</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Request Deletion Section */}
      <section className="py-20 bg-muted/30 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-12">
            <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mr-4">
              <Mail className="w-6 h-6 text-destructive" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">How to Request Data Deletion</h2>
          </div>

          <div className="bg-card rounded-xl shadow-sm p-8 border border-border mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-8">Step-by-Step Deletion Request Process</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center group">
                <div className="bg-destructive/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-destructive/20 transition-colors">
                  <span className="text-2xl font-bold text-destructive">1</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Send Email Request</h4>
                <p className="text-muted-foreground text-sm">Email us at support@shritech.digital with the subject line "Data Deletion Request"</p>
              </div>
              <div className="text-center group">
                <div className="bg-orange-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500/20 transition-colors">
                  <span className="text-2xl font-bold text-orange-500">2</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Identity Verification</h4>
                <p className="text-muted-foreground text-sm">We'll verify your identity to ensure data security and prevent unauthorized deletions</p>
              </div>
              <div className="text-center group">
                <div className="bg-green-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/20 transition-colors">
                  <span className="text-2xl font-bold text-green-500">3</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Deletion Completed</h4>
                <p className="text-muted-foreground text-sm">Receive confirmation once your data has been securely deleted from our systems</p>
              </div>
            </div>

            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
              <h4 className="font-semibold text-destructive mb-3">Required Information for Deletion Request</h4>
              <p className="text-destructive/80 mb-4">To process your deletion request efficiently, please include:</p>
              <ul className="space-y-2 text-destructive/80 text-sm">
                <li>• <strong>Full Name:</strong> As registered with our services</li>
                <li>• <strong>Email Address:</strong> Associated with your account or communications</li>
                <li>• <strong>Phone Number:</strong> If used for WhatsApp Business API services</li>
                <li>• <strong>Company Name:</strong> If applicable to business services</li>
                <li>• <strong>Specific Data:</strong> Describe what data you want deleted (or request complete deletion)</li>
                <li>• <strong>Reason:</strong> Brief explanation for the deletion request (optional but helpful)</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl border border-destructive/20 p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-foreground mb-4">Primary Contact Method</h3>
              <div className="bg-muted rounded-lg p-4 border border-border">
                <div className="flex items-center mb-3">
                  <Mail className="w-6 h-6 text-destructive mr-3" />
                  <div>
                    <h4 className="font-semibold text-foreground">Email</h4>
                    <p className="text-muted-foreground">support@shritech.digital</p>
                  </div>
                </div>
                <div className="mb-3">
                  <h5 className="font-semibold text-foreground text-sm mb-1">Subject Line (Required):</h5>
                  <p className="text-sm bg-background px-3 py-2 rounded border border-border">"Data Deletion Request"</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  This specific subject line ensures your request is processed by our privacy team immediately.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-foreground mb-4">Alternative Contact Methods</h3>
              <div className="space-y-4">
                <div className="bg-muted rounded-lg p-4 border border-border">
                  <div className="flex items-center">
                    <MessageCircle className="w-6 h-6 text-green-500 mr-3" />
                    <div>
                      <h4 className="font-semibold text-foreground">WhatsApp</h4>
                      <p className="text-muted-foreground">{contactInfo.phone}</p>
                      <p className="text-sm text-muted-foreground/80">Message: "I want to request data deletion"</p>
                    </div>
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-4 border border-border">
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-purple-500 mr-3" />
                    <div>
                      <h4 className="font-semibold text-foreground">Phone</h4>
                      <p className="text-muted-foreground">{contactInfo.phone}</p>
                      <p className="text-sm text-muted-foreground/80">For urgent deletion requests</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verification Process Section */}
      <section className="py-20 bg-background transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-12">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
              <UserCheck className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Identity Verification Process</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl border border-border p-8 hover:border-primary/50 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-foreground mb-4">Why We Verify Identity</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Identity verification is a crucial security measure that protects your data from unauthorized deletion requests.
                This process ensures that only you can request deletion of your personal information.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <Shield className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-foreground">Data Security:</strong> Prevents malicious or fraudulent deletion requests</span>
                </li>
                <li className="flex items-start">
                  <Shield className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-foreground">Legal Compliance:</strong> Meets regulatory requirements for data protection</span>
                </li>
                <li className="flex items-start">
                  <Shield className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-foreground">Account Protection:</strong> Ensures only legitimate account owners make requests</span>
                </li>
                <li className="flex items-start">
                  <Shield className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-foreground">Audit Trail:</strong> Maintains proper documentation for compliance purposes</span>
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-xl border border-border p-8 hover:border-primary/50 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-foreground mb-4">Verification Methods</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We use multiple verification methods to confirm your identity before processing deletion requests:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-foreground">Email Verification:</strong> Confirmation sent to your registered email address</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-foreground">Phone Verification:</strong> SMS or call verification to your registered phone number</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-foreground">Account Details:</strong> Verification of specific account information or service history</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-foreground">Security Questions:</strong> Answers to security questions or project-specific details</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-colors duration-200">
            <h3 className="text-lg font-semibold text-primary mb-6">Verification Timeline</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
              <div className="text-center group">
                <Clock className="w-8 h-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-foreground mb-1">Request Received</h4>
                <p className="text-muted-foreground">Immediate acknowledgment</p>
              </div>
              <div className="text-center group">
                <UserCheck className="w-8 h-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-foreground mb-1">Identity Check</h4>
                <p className="text-muted-foreground">Within 24-48 hours</p>
              </div>
              <div className="text-center group">
                <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-foreground mb-1">Verification Complete</h4>
                <p className="text-muted-foreground">2-3 business days</p>
              </div>
              <div className="text-center group">
                <Trash2 className="w-8 h-8 text-destructive mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-foreground mb-1">Deletion Process</h4>
                <p className="text-muted-foreground">7-30 working days</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-muted/30 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-12">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Deletion Timeline</h2>
          </div>

          <div className="bg-card rounded-xl shadow-sm p-8 border border-border mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-6">Processing Timeframes</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We are committed to processing your data deletion request within the legal requirements of applicable
              data protection laws. Our timeline ensures thorough verification while respecting your right to timely deletion.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-foreground mb-4">Standard Processing Timeline</h4>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                      <span className="text-sm font-bold text-primary">1</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-foreground">Initial Response</h5>
                      <p className="text-sm text-muted-foreground">Within 24 hours of request</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                      <span className="text-sm font-bold text-primary">7</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-foreground">Simple Deletions</h5>
                      <p className="text-sm text-muted-foreground">Basic personal data (within 7 working days)</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                      <span className="text-sm font-bold text-primary">15</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-foreground">Complex Deletions</h5>
                      <p className="text-sm text-muted-foreground">Integrated systems and WhatsApp data (within 15 working days)</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                      <span className="text-sm font-bold text-primary">30</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-foreground">Maximum Timeline</h5>
                      <p className="text-sm text-muted-foreground">All deletions completed (within 30 working days)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-4">Legal Compliance Timeframes</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <Globe className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">GDPR (EU):</strong> Within 30 days as per Article 17 requirements</span>
                  </li>
                  <li className="flex items-start">
                    <Globe className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">CCPA (California):</strong> Within 30 days of verified request</span>
                  </li>
                  <li className="flex items-start">
                    <Globe className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">IT Act (India):</strong> Within 30 days as per data protection guidelines</span>
                  </li>
                  <li className="flex items-start">
                    <Globe className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">Meta Policies:</strong> WhatsApp data handled per Meta's data retention policies</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Factors Affecting Processing Time</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-primary mb-2">Data Complexity</h4>
                <p className="text-muted-foreground">Amount and type of data to be deleted across multiple systems</p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">Verification Requirements</h4>
                <p className="text-muted-foreground">Time needed for identity confirmation and ownership verification</p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">System Dependencies</h4>
                <p className="text-muted-foreground">Integration with third-party services and backup systems</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exceptions Section */}
      <section className="py-20 bg-background transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-12">
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mr-4">
              <AlertTriangle className="w-6 h-6 text-warning-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Data Retention Exceptions</h2>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-8 mb-8">
            <h3 className="text-xl font-semibold text-orange-600 mb-4">Legal Requirements for Data Retention</h3>
            <p className="text-orange-700 dark:text-orange-300 mb-6">
              While we respect your right to data deletion, certain data must be retained by law for specific periods.
              These exceptions are clearly defined and limited to legal, regulatory, and safety requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl border border-border p-8 hover:border-primary/50 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-foreground mb-4">Legal & Regulatory Retention</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-destructive rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-foreground">Financial Records:</strong> Tax documents, invoices, and payment records (7 years per Indian tax laws)</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-destructive rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-foreground">Business Compliance:</strong> Contract records, service agreements, and legal documents (7 years)</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-destructive rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-foreground">Audit Requirements:</strong> Data required for regulatory audits and compliance verification</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-destructive rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-foreground">Legal Proceedings:</strong> Data subject to ongoing litigation or legal disputes</span>
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-xl border border-border p-8 hover:border-primary/50 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-foreground mb-4">Security & Fraud Prevention</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-foreground">Fraud Prevention:</strong> Transaction records and security logs for fraud detection and prevention</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-foreground">Security Incidents:</strong> Data related to security breaches or incident investigations</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-foreground">System Security:</strong> Access logs and authentication records for system security</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-foreground">Risk Management:</strong> Data necessary for ongoing risk assessment and mitigation</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-green-600 mb-4">WhatsApp/Meta Data Policies</h3>
              <p className="text-green-700 dark:text-green-300 mb-3">
                Our WhatsApp Business API integration follows Meta's data policies:
              </p>
              <ul className="space-y-2 text-green-700 dark:text-green-300 text-sm">
                <li>• <strong>Message Content:</strong> Not stored beyond operational requirements</li>
                <li>• <strong>Metadata:</strong> Retained only for service functionality</li>
                <li>• <strong>Business Communications:</strong> Subject to Meta's business data policies</li>
                <li>• <strong>Compliance:</strong> Full alignment with Meta's privacy standards</li>
              </ul>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Anonymization Alternative</h3>
              <p className="text-muted-foreground mb-3">
                When deletion is not possible due to legal requirements, we offer anonymization:
              </p>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• <strong>Personal Identifiers:</strong> Removed or pseudonymized</li>
                <li>• <strong>Contact Information:</strong> Deleted where legally permissible</li>
                <li>• <strong>Aggregate Data:</strong> Combined with other data for statistical purposes only</li>
                <li>• <strong>No Re-identification:</strong> Cannot be linked back to you personally</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Confirmation Section */}
      <section className="py-20 bg-muted/30 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-12">
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mr-4">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Deletion Confirmation</h2>
          </div>

          <div className="bg-card rounded-xl shadow-sm p-8 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-6">What Happens After Deletion</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Once your data deletion request has been processed, we ensure complete transparency about what has been
              deleted and provide you with comprehensive confirmation of the actions taken.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-foreground mb-4">Confirmation Process</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">Email Confirmation:</strong> Detailed report sent to your registered email address</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">Deletion Summary:</strong> List of all data types and records that were deleted</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">Retention Summary:</strong> Information about any data retained due to legal requirements</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">Reference Number:</strong> Unique deletion confirmation ID for your records</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-4">Post-Deletion Impact</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span><strong className="text-foreground">Service Access:</strong> Your access to personalized services will be discontinued</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span><strong className="text-foreground">Account Closure:</strong> Associated accounts and profiles will be deactivated</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span><strong className="text-foreground">Communication:</strong> You will be removed from marketing and communication lists</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span><strong className="text-foreground">Re-engagement:</strong> You can always restart services with new consent and data</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-green-500/10 border border-green-500/20 rounded-lg p-6">
              <h4 className="font-semibold text-green-600 mb-3">Confirmation Details Include</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-green-700 dark:text-green-300">
                <div>
                  <h5 className="font-semibold mb-1">Deletion Date & Time</h5>
                  <p>Exact timestamp of data deletion</p>
                </div>
                <div>
                  <h5 className="font-semibold mb-1">Data Categories</h5>
                  <p>Specific types of data removed</p>
                </div>
                <div>
                  <h5 className="font-semibold mb-1">Systems Affected</h5>
                  <p>All platforms and databases updated</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 bg-background transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-12">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Contact Information</h2>
          </div>

          <div className="bg-card rounded-xl shadow-sm p-8 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-6">Data Deletion Support Team</h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our dedicated data privacy team is available to assist you with deletion requests and answer any questions
              about your data rights. We provide multiple channels for your convenience and ensure prompt responses.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center bg-destructive/10 rounded-lg p-6 border border-destructive/20 hover:bg-destructive/15 transition-colors">
                <Mail className="w-12 h-12 text-destructive mx-auto mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Primary Email</h4>
                <p className="text-muted-foreground font-medium mb-1">support@shritech.digital</p>
                <p className="text-sm text-muted-foreground/80">Subject: "Data Deletion Request"</p>
                <p className="text-xs text-muted-foreground/60 mt-2">Response within 24 hours</p>
              </div>

              <div className="text-center bg-green-500/10 rounded-lg p-6 border border-green-500/20 hover:bg-green-500/15 transition-colors">
                <MessageCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h4 className="font-semibold text-foreground mb-2">WhatsApp</h4>
                <p className="text-muted-foreground font-medium mb-1">{contactInfo.phone}</p>
                <p className="text-sm text-muted-foreground/80">Message: "Data Deletion Request"</p>
                <p className="text-xs text-muted-foreground/60 mt-2">Quick response for urgent requests</p>
              </div>

              <div className="text-center bg-blue-500/10 rounded-lg p-6 border border-blue-500/20 hover:bg-blue-500/15 transition-colors">
                <Phone className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Phone Support</h4>
                <p className="text-muted-foreground font-medium mb-1">{contactInfo.phone}</p>
                <p className="text-sm text-muted-foreground/80">For urgent deletion requests</p>
                <p className="text-xs text-muted-foreground/60 mt-2">Business hours: 9 AM - 6 PM IST</p>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h4 className="font-semibold text-primary mb-3">Support Commitments</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-primary mr-2" />
                  <span>24-hour initial response</span>
                </div>
                <div className="flex items-center">
                  <UserCheck className="w-5 h-5 text-primary mr-2" />
                  <span>Dedicated privacy officer</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-primary mr-2" />
                  <span>Secure handling process</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-background transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Need to Delete Your Data?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Exercise your right to data deletion with confidence. Our team is ready to assist you through
            the secure and compliant deletion process.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <a href={`mailto:${contactInfo.email}?subject=Data Deletion Request&body=I would like to request deletion of my personal data from ShriRam Tech Solutions systems.`}>
                <Mail className="mr-2 w-5 h-5" />
                Send Deletion Request
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <a href={generateWhatsAppLink("Hi! I would like to request deletion of my personal data from your systems.")}>
                <MessageCircle className="mr-2 w-5 h-5" />
                WhatsApp Support
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary/10"
            >
              <a href={generatePhoneLink()}>
                <Phone className="mr-2 w-5 h-5" />
                Call: {contactInfo.phone}
              </a>
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground opacity-80">
              This Data Deletion Policy is governed by Indian data protection laws including the Information
              Technology Act, 2000, and complies with international standards including GDPR, CCPA, and Meta/WhatsApp data policies.
              We are committed to protecting your privacy rights and ensuring secure data handling.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}
