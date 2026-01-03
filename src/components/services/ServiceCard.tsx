import type { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
  onDemoClick: (demo: string) => void;
}

export default function ServiceCard({ service, onDemoClick }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <div className="group cursor-pointer bg-background border border-border hover:border-primary/50 rounded-2xl p-6 transition-all duration-300" onClick={() => onDemoClick(service.demo)}>
      {/* Icon */}
      <div className="mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 text-white shadow-md">
          <Icon className="w-6 h-6" />
        </div>

        {/* Tech badge */}
        <div className="inline-block px-3 py-1 text-xs bg-muted text-muted-foreground rounded-full border border-border font-medium">
          {service.tech}
        </div>
      </div>

      <h3 className="mb-2 text-xl font-bold text-foreground">
        {service.title}
      </h3>

      <p className="mb-6 text-muted-foreground leading-relaxed text-sm">
        {service.description} Our expert team ensures implementation aligned with your business goals.
      </p>

      {/* Demo button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDemoClick(service.demo);
        }}
        className="text-primary font-medium hover:text-primary/80 transition-colors flex items-center gap-2 text-sm"
      >
        Try Live Demo →
      </button>
    </div>
  );
}
