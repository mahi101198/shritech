import { Clock, Zap, MapPin, Award, MessageCircle, Phone, Mail, ArrowRight } from 'lucide-react';
import ContactCard from './ContactCard';
import ContactForm from './ContactForm';
import { contactInfo as contact, generateWhatsAppLink, generateEmailLink, generatePhoneLink } from '@/config/contactInfo';
import { Button } from '@/components/ui/button';

export default function ContactSection() {
  const contactCards = [
    {
      icon: Clock,
      title: "Availability",
      description: [contact.businessHours.weekdays, "Full Weekends"]
    },
    {
      icon: Zap,
      title: "Response Time",
      description: ["Within 2 hours", "(Usually faster)"]
    },
    {
      icon: MapPin,
      title: "Service Areas",
      description: ["All India", "Remote worldwide"]
    },
    {
      icon: Award,
      title: "Success Rate",
      description: ["98% Project Success", "100% Client Satisfaction"]
    }
  ];

  return (
    <section id="contact" className="py-24 bg-background transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Ready to Transform Your Business with Technology?
          </h2>

          <p className="text-lg text-muted-foreground mb-12">
            Get your WhatsApp Business API and AI technology solutions today, implemented by experts. Start with a free consultation and see how we can help your business grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactCards.map((card) => (
            <ContactCard key={card.title} {...card} />
          ))}
        </div>

        {/* Quick Contact Buttons */}
        <div className="text-center mb-20">
          <h3 className="mb-8 text-2xl font-bold text-foreground">
            Get in Touch Instantly
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all"
            >
              <a
                href={generateWhatsAppLink(contact.whatsappMessages.consultation)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat on WhatsApp
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 shadow-lg hover:shadow-xl transition-all"
            >
              <a href={generatePhoneLink()}>
                <Phone className="mr-2 h-5 w-5" />
                Call: {contact.phone.replace('+91-', '')}
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="secondary"
              className="shadow-lg hover:shadow-xl transition-all"
            >
              <a href={generateEmailLink()}>
                <Mail className="mr-2 h-5 w-5" />
                Email Us
              </a>
            </Button>
          </div>
        </div>

        {/* Contact Form and Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-8">
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
              <h4 className="mb-6 text-xl font-bold text-foreground">
                Why Choose Us?
              </h4>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Expert Team:</strong> Certified developers with 5+ years of experience in WhatsApp API and AI solutions.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Proven Results:</strong> Successfully delivered 200+ projects with 98% client satisfaction rate.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">24/7 Support:</strong> Round-the-clock technical support and maintenance for all solutions.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Cost Effective:</strong> Competitive pricing with flexible payment options and transparent billing.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
              <h4 className="mb-6 text-xl font-bold text-foreground">
                Business Hours
              </h4>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span className="text-foreground font-medium">{contact.businessHours.weekdays}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Saturday - Sunday</span>
                  <span className="text-foreground font-medium">{contact.businessHours.weekends}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Emergency Support</span>
                  <span className="text-green-500 font-medium font-bold">24/7 Available</span>
                </div>
                <hr className="border-border my-4" />
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Response guaranteed within 2 hours during business hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}