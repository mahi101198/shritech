import { services } from '@/data/services';
import ServiceCard from './ServiceCard';
import SEOContent from '@/components/common/SEOContent';
import { Button } from '@/components/ui/button';

interface ServicesListProps {
  onDemoClick: (demo: string) => void;
}

export default function ServicesList({ onDemoClick }: ServicesListProps) {
  return (
    <section id="services" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-left mb-16 max-w-3xl">
          <h2 className="mb-6 text-4xl sm:text-5xl font-bold">
            AI/ML Technology Solutions
          </h2>

          <p className="text-lg text-muted-foreground mb-12">
            Experience our interactive demos and see how our AI technology solutions can transform your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`animate-fade-in-up animate-stagger-${Math.min(index + 1, 4)}`}
            >
              <ServiceCard
                service={service}
                onDemoClick={onDemoClick}
              />
            </div>
          ))}
        </div>



        <div className="text-left mt-16">
          <Button
            asChild
            size="lg"
            className="text-lg px-8 py-6 rounded-xl"
          >
            <a
              href="https://wa.me/917433000131?text=Hi! I'm interested in AI/ML solutions for my business."
              title="Get a custom AI/ML solution on WhatsApp"
            >
              Get Custom Solution
              <span className="ml-2">→</span>
            </a>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Free consultation • Custom development • WhatsApp integration
          </p>
        </div>

        {/* SEO Content for better text/code ratio */}
        <div className="mt-16">
          <SEOContent variant="services" className="max-w-5xl" />
        </div>
      </div>
    </section>
  );
}
