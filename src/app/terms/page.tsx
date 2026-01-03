import { Metadata } from 'next'
import Layout from '@/components/layout/Layout'
import { FileText, Shield, Users, Code, Globe, AlertTriangle, CheckCircle, Clock, UserCheck, Lock, MessageCircle, Phone, Mail } from 'lucide-react'
import { contactInfo, generateWhatsAppLink, generatePhoneLink, generateEmailLink } from '@/config/contactInfo'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Terms of Service | Shriram Tech Solutions',
  description: 'Terms of Service for Shriram Tech Solutions. Comprehensive terms governing AI/ML services, WhatsApp Business API, and digital solutions.',
}

export default function TermsOfServicePage() {
  const lastUpdated = "January 2025"

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-background transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <FileText className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              These terms govern your use of our AI/ML development services, WhatsApp Business API solutions, and digital
              technology services. Please read carefully before engaging with our services.
            </p>
            <div className="bg-card border border-border rounded-lg p-6 inline-block shadow-sm">
              <p className="text-sm text-foreground">
                <strong className="text-primary">Last Updated:</strong> {lastUpdated} |
                <strong className="ml-2 text-primary">Effective Date:</strong> January 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-muted/30 transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <p className="text-muted-foreground leading-relaxed text-lg">
            These Terms of Service ("Terms") constitute a legally binding agreement between Shriram Tech Solutions
            ("Shritech Digital," "we," "our," or "us") and you ("Client," "you," or "your") regarding the use of our
            AI/ML development services, WhatsApp Business API integration, chatbot solutions, and related digital
            technology services. By accessing our website, using our services, or engaging with our team, you agree
            to be bound by these Terms.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-2xl p-8 mb-12 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Key Terms Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-lg">Legal Protection</h3>
                <p className="text-sm text-muted-foreground">Clear terms protect both parties in our business relationship</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-lg">User Rights</h3>
                <p className="text-sm text-muted-foreground">Your rights and responsibilities clearly defined</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Code className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-lg">Service Scope</h3>
                <p className="text-sm text-muted-foreground">Comprehensive coverage of all our services</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Introduction & Agreement Section */}
      <section className="py-20 bg-background transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">1. Introduction & Agreement</h2>
          </div>

          <div className="bg-card rounded-xl border border-border p-8 hover:border-primary/50 transition-colors duration-200 shadow-sm">
            <h3 className="text-xl font-semibold text-foreground mb-4">Agreement to Terms</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              By accessing our website at <strong className="text-foreground">shritech.digital</strong>, using our services, or engaging with our
              team through any communication channel, you acknowledge that you have read, understood, and agree to be
              bound by these Terms of Service. If you do not agree to these terms, you must not use our services.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-4">Modifications to Terms</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting
              on our website. Your continued use of our services after any modifications constitutes acceptance of the
              updated Terms. We will notify you of significant changes via email or through our website.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-4">Contact Information</h3>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms, please contact us at <strong className="text-foreground">support@shritech.digital</strong> or through
              our contact channels listed on our website.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Services Provided Section */}
      <section className="py-20 bg-muted/30 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-12">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
              <Code className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">2. Services Provided</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl border border-border p-8 hover:border-primary/50 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-foreground mb-6">AI/ML Development Services</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span>Custom AI/ML model development and deployment</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span>Natural Language Processing (NLP) solutions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span>Computer vision and image processing systems</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span>Predictive analytics and data science solutions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span>Machine learning model optimization and maintenance</span>
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-xl border border-border p-8 hover:border-primary/50 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-foreground mb-6">WhatsApp Business API Solutions</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span>WhatsApp Business API integration and setup</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span>Intelligent chatbot development and deployment</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span>Automated messaging and customer service solutions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span>Compliance with Meta's WhatsApp Business API policies</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span>Ongoing support and maintenance services</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-colors duration-200">
            <h3 className="text-xl font-semibold text-foreground mb-6">Additional Digital Solutions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Web Development</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Next.js and React applications</li>
                  <li>• FastAPI backend development</li>
                  <li>• Full-stack web solutions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">Business Automation</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Process automation systems</li>
                  <li>• Document processing AI</li>
                  <li>• Workflow optimization</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">Consulting Services</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• AI strategy consulting</li>
                  <li>• Technical architecture design</li>
                  <li>• Implementation planning</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Eligibility & User Responsibilities Section */}
      <section className="py-20 bg-background transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-12">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
              <UserCheck className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">3. Eligibility & User Responsibilities</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl border border-border p-8 hover:border-primary/50 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-foreground mb-6">Eligibility Requirements</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-foreground">Age Requirement:</strong> You must be at least 18 years old to use our services</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-foreground">Legal Capacity:</strong> You must have the legal capacity to enter into binding agreements</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-foreground">Business Purpose:</strong> Services are intended for legitimate business purposes only</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-foreground">Compliance:</strong> Must comply with all applicable laws and regulations</span>
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-xl border border-border p-8 hover:border-primary/50 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-foreground mb-6">User Responsibilities</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-foreground">Accurate Information:</strong> Provide accurate and complete information for service delivery</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-foreground">Timely Communication:</strong> Respond promptly to project-related communications</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-foreground">Payment Obligations:</strong> Pay all agreed fees and charges in a timely manner</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong className="text-foreground">Cooperation:</strong> Provide necessary access and resources for project completion</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Acceptable Use Policy Section */}
      <section className="py-20 bg-muted/30 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-12">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">4. Acceptable Use Policy</h2>
          </div>

          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-8 mb-8">
            <h3 className="text-xl font-semibold text-destructive mb-4">Prohibited Activities</h3>
            <p className="text-destructive/80 mb-6">
              You agree not to use our services for any illegal, harmful, or unauthorized purposes. The following activities are strictly prohibited:
            </p>
            <ul className="space-y-3 text-destructive/80">
              <li className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-destructive mr-3 mt-0.5 flex-shrink-0" />
                <span>Any illegal activities or violations of applicable laws and regulations</span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-destructive mr-3 mt-0.5 flex-shrink-0" />
                <span>Spam, phishing, or other fraudulent activities</span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-destructive mr-3 mt-0.5 flex-shrink-0" />
                <span>Violation of WhatsApp Business API policies or Meta's terms of service</span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-destructive mr-3 mt-0.5 flex-shrink-0" />
                <span>Harassment, discrimination, or hate speech</span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-destructive mr-3 mt-0.5 flex-shrink-0" />
                <span>Attempting to gain unauthorized access to our systems or data</span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-destructive mr-3 mt-0.5 flex-shrink-0" />
                <span>Reverse engineering or attempting to copy our proprietary technology</span>
              </li>
            </ul>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-primary mb-4">Permitted Uses</h3>
            <p className="text-muted-foreground mb-6">
              Our services are intended for legitimate business purposes, including:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span>Legitimate business automation and customer service</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span>Compliant marketing and communication campaigns</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span>Data analysis and business intelligence applications</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span>Process optimization and efficiency improvements</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Intellectual Property Section */}
      <section className="py-20 bg-background transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-12">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">5. Intellectual Property</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl border border-border p-8 hover:border-primary/50 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-foreground mb-4">Our Intellectual Property</h3>
              <p className="text-muted-foreground mb-6">
                Shriram Tech Solutions retains all rights, title, and interest in and to our intellectual property, including:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Our website, branding, and marketing materials</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Proprietary AI/ML algorithms and frameworks</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Software code, APIs, and technical documentation</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Trade secrets, know-how, and proprietary methodologies</span>
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-xl border border-border p-8 hover:border-primary/50 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-foreground mb-4">Client Intellectual Property</h3>
              <p className="text-muted-foreground mb-6">
                Subject to our intellectual property rights, you retain ownership of:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Your business data and content provided to us</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Custom deliverables created specifically for your project</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Your branding and marketing materials</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Pre-existing intellectual property you own</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-colors duration-200">
            <h3 className="text-xl font-semibold text-primary mb-4">License and Usage Rights</h3>
            <p className="text-muted-foreground mb-6">
              We grant you a limited, non-exclusive, non-transferable license to use our services for your business
              purposes. This license does not include the right to:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Resell, sublicense, or distribute our services to third parties</li>
              <li>• Reverse engineer or attempt to copy our proprietary technology</li>
              <li>• Use our services for competitive analysis or development</li>
              <li>• Remove or modify any proprietary notices or branding</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Disclaimers & Limitation of Liability Section */}
      <section className="py-20 bg-muted/30 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-12">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
              <AlertTriangle className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">6. Disclaimers & Limitation of Liability</h2>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-8 mb-8">
            <h3 className="text-xl font-semibold text-orange-600 mb-4">Service Disclaimers</h3>
            <ul className="space-y-3 text-orange-700 dark:text-orange-300">
              <li className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                <span><strong className="">As-Is Basis:</strong> Services are provided "as-is" without warranties of any kind</span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                <span><strong className="">Third-Party Dependencies:</strong> We are not responsible for third-party service disruptions</span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                <span><strong className="">Data Accuracy:</strong> We do not guarantee the accuracy of AI-generated outputs</span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                <span><strong className="">Uptime:</strong> We strive for high availability but do not guarantee 100% uptime</span>
              </li>
            </ul>
          </div>

          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-destructive mb-4">Limitation of Liability</h3>
            <p className="text-destructive/80 mb-6">
              To the maximum extent permitted by law, our liability is limited as follows:
            </p>
            <ul className="space-y-3 text-destructive/80">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-destructive rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span><strong className="">Maximum Liability:</strong> Our total liability shall not exceed the amount paid by you for the specific service</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-destructive rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span><strong className="">Excluded Damages:</strong> We are not liable for indirect, incidental, or consequential damages</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-destructive rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span><strong className="">Force Majeure:</strong> We are not liable for events beyond our reasonable control</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-destructive rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span><strong className="">Data Loss:</strong> You are responsible for backing up your data and content</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Termination of Services Section */}
      <section className="py-20 bg-background transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-12">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">7. Termination of Services</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl border border-border p-8 hover:border-primary/50 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-foreground mb-6">Termination by You</h3>
              <p className="text-muted-foreground mb-4">
                You may terminate our services at any time by providing written notice. Upon termination:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>You must pay for all services rendered up to the termination date</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>We will provide you with a copy of your data and deliverables</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Your access to our services will be discontinued</span>
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-xl border border-border p-8 hover:border-primary/50 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-foreground mb-6">Termination by Us</h3>
              <p className="text-muted-foreground mb-4">
                We may terminate services immediately if:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-destructive rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>You violate these Terms or acceptable use policies</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-destructive rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>You fail to pay fees when due</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-destructive rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>You engage in illegal or harmful activities</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>We are required to do so by law or regulation</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-colors duration-200">
            <h3 className="text-xl font-semibold text-foreground mb-4">Post-Termination Obligations</h3>
            <p className="text-muted-foreground mb-6">
              After termination, both parties must:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Return or destroy confidential information</li>
              <li>• Cease using each other's intellectual property</li>
              <li>• Settle any outstanding financial obligations</li>
              <li>• Maintain confidentiality of proprietary information</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 8. Governing Law & Jurisdiction Section */}
      <section className="py-20 bg-muted/30 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-12">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
              <Globe className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">8. Governing Law & Jurisdiction</h2>
          </div>

          <div className="bg-card rounded-xl shadow-sm p-8 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-4">Applicable Law</h3>
            <p className="text-muted-foreground mb-6">
              These Terms are governed by and construed in accordance with the laws of India. Any disputes arising
              from these Terms or our services shall be subject to the exclusive jurisdiction of the courts in India.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-4">International Clients</h3>
            <p className="text-muted-foreground mb-6">
              While we serve clients globally, these Terms are governed by Indian law. International clients agree
              to submit to the jurisdiction of Indian courts for any disputes. We comply with applicable international
              laws and regulations, including data protection requirements for our global clientele.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-4">Dispute Resolution</h3>
            <p className="text-muted-foreground mb-4">
              In the event of any dispute, we encourage resolution through:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Direct communication and negotiation between parties</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Mediation or alternative dispute resolution methods</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Legal proceedings in Indian courts as a last resort</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 9. Modifications to Terms Section */}
      <section className="py-20 bg-background transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-12">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">9. Modifications to Terms</h2>
          </div>

          <div className="bg-card rounded-xl shadow-sm p-8 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-4">Right to Modify</h3>
            <p className="text-muted-foreground mb-6">
              We reserve the right to modify these Terms at any time to reflect changes in our services, legal
              requirements, or business practices. Modifications will be effective immediately upon posting on our website.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-4">Notification of Changes</h3>
            <p className="text-muted-foreground mb-6">
              We will notify you of significant changes to these Terms through:
            </p>
            <ul className="space-y-3 text-muted-foreground mb-6">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Email notification to your registered email address</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Prominent notice on our website homepage</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Direct communication for active clients</span>
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-4">Acceptance of Changes</h3>
            <p className="text-muted-foreground">
              Your continued use of our services after any modifications constitutes acceptance of the updated Terms.
              If you do not agree to the modified Terms, you must discontinue use of our services and contact us
              to terminate your account.
            </p>
          </div>
        </div>
      </section>

      {/* 10. Contact Information Section */}
      <section className="py-20 bg-muted/30 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-12">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">10. Contact Information</h2>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-colors duration-200">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Get in Touch</h3>
            <p className="text-muted-foreground mb-8 text-center">
              For questions about these Terms of Service, technical support, or general inquiries, please contact us through any of the following channels:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Email Support</h4>
                <p className="text-muted-foreground mb-2">support@shritech.digital</p>
                <p className="text-sm text-muted-foreground/80">For general inquiries and support</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <MessageCircle className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">WhatsApp</h4>
                <p className="text-muted-foreground mb-2">{contactInfo.phone}</p>
                <p className="text-sm text-muted-foreground/80">Quick responses and consultations</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Phone</h4>
                <p className="text-muted-foreground mb-2">{contactInfo.phone}</p>
                <p className="text-sm text-muted-foreground/80">Direct communication for urgent matters</p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <a href={generateWhatsAppLink("Hi! I have a question about your Terms of Service.")}>
                    <MessageCircle className="mr-2 w-5 h-5" />
                    Contact via WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                >
                  <a href={generatePhoneLink()}>
                    <Phone className="mr-2 w-5 h-5" />
                    Call Us
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                >
                  <a href={generateEmailLink("Terms of Service Inquiry", "I have a question about your Terms of Service.")}>
                    <Mail className="mr-2 w-5 h-5" />
                    Email Us
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-background transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your AI/ML development needs, WhatsApp Business API integration,
            or any other digital solutions for your business.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <a href={generateWhatsAppLink(contactInfo.whatsappMessages.consultation)}>
                <MessageCircle className="mr-2 w-5 h-5" />
                Start Your Project
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
            >
              <a href={generatePhoneLink()}>
                <Phone className="mr-2 w-5 h-5" />
                Call: {contactInfo.phone}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
            >
              <a href={generateEmailLink()}>
                <Mail className="mr-2 w-5 h-5" />
                Email Us
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  )
}
