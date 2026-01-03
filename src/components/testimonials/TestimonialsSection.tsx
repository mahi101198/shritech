import { Star, Quote, Building2, TrendingUp, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  metric: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Arjun Mehta",
    role: "CTO",
    company: "FinTech Innovations",
    content: "Shriram Tech delivered an enterprise-grade NLP solution that reduced our customer support latency by 60%. Their understanding of financial compliance and data security was impressive.",
    metric: "60% Faster Support",
  },
  {
    name: "Sarah Jenkins",
    role: "Director of Product",
    company: "Global Retail Co",
    content: "The custom computer vision model for our inventory management is a game changer. It's accurate, fast, and seamlessly integrated with our existing SAP infrastructure.",
    metric: "99.8% Accuracy",
  },
  {
    name: "Vikram Singh",
    role: "Founder",
    company: "HealthAI Systems",
    content: "We needed a partner who understood both healthcare regulations and cutting-edge RAG architectures. Shriram Tech built a secure document retrieval system that our doctors love.",
    metric: "40 Hrs/Week Saved",
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-background relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how our AI & Software solutions drive measurable business impact.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-card/50 backdrop-blur-sm border border-border/50 p-6 rounded-2xl hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group"
            >
              <div className="flex items-center justify-between mb-6">
                <Quote className="w-8 h-8 text-primary/40 group-hover:text-primary transition-colors duration-300" />
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
              </div>

              <p className="text-foreground/90 mb-6 leading-relaxed text-lg">
                "{t.content}"
              </p>

              <div className="flex items-center justify-between mt-auto">
                <div>
                  <h4 className="font-semibold text-foreground">{t.name}</h4>
                  <p className="text-sm text-muted-foreground">{t.role}, {t.company}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/50 flex items-center text-sm font-medium text-emerald-500">
                <TrendingUp className="w-4 h-4 mr-2" />
                {t.metric}
              </div>
            </div>
          ))}
        </div>

        {/* Minimal Footer / Final CTA */}
        <div className="text-center border-t border-border pt-12">
          <p className="text-muted-foreground mb-6">Ready to transform your business?</p>
          <Button size="lg" className="rounded-full px-8 font-semibold text-lg hover:scale-105 transition-transform">
            Start Your Project
          </Button>
        </div>
      </div>
    </section>
  );
}
