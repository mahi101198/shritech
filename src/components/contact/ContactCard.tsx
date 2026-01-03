import { LucideIcon } from 'lucide-react';

interface ContactCardProps {
  icon: LucideIcon;
  title: string;
  description: string[];
}

export default function ContactCard({ icon: Icon, title, description }: ContactCardProps) {
  return (
    <div className="group bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors duration-300 shadow-sm" tabIndex={0} role="article" aria-labelledby={`contact-card-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      {/* Icon */}
      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
        <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
      </div>

      <h3 id={`contact-card-${title.toLowerCase().replace(/\s+/g, '-')}`} className="mb-3 font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>

      <div className="text-sm text-muted-foreground space-y-1">
        {description.map((line, idx) => (
          <div key={idx} className="leading-relaxed">
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}
