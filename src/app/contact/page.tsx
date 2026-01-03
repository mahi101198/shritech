import { Metadata } from 'next'
import Layout from '@/components/layout/Layout'
import ContactSection from '@/components/contact/ContactSection'

export const metadata: Metadata = {
    title: 'Contact Us - AI/ML Development & WhatsApp API Solutions',
    description: 'Get in touch with Shriram Tech Solutions for expert AI/ML development and WhatsApp Business API services. Response within 2 hours.',
}

export default function ContactPage() {
    return (
        <Layout
            title="Contact Us | Shriram Tech Solutions"
            description="Connect with our expert team for AI/ML development and WhatsApp Business API solutions. We're here to help transform your business."
        >
            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-background transition-colors duration-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                            Get in <span className="text-primary">Touch</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                            Ready to transform your business? Our team of AI experts and consultants
                            is here to help you navigate your digital transformation journey.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Content */}
            <section className="bg-muted/30 transition-colors duration-200">
                <ContactSection />
            </section>
        </Layout>
    );
}
