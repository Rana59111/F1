
import React from 'react';
import { AlertCircle, AlertTriangle, Info, Clock, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type AlertSeverity = 'critical' | 'warning' | 'info';

interface AlertItemProps {
  id: string;
  title: string;
  description: string;
  location: string;
  timestamp: string;
  severity: AlertSeverity;
  className?: string;
  onRespond?: () => void;
}

const AlertItem: React.FC<AlertItemProps> = ({
  id,
  title,
  description,
  location,
  timestamp,
  severity,
  className,
  onRespond
}) => {
  const getSeverityIcon = () => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="w-5 h-5 text-security-alert" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-security-warning" />;
      case 'info':
        return <Info className="w-5 h-5 text-security-primary" />;
      default:
        return <Info className="w-5 h-5 text-security-primary" />;
    }
  };

  const getSeverityClass = () => {
    switch (severity) {
      case 'critical':
        return 'alert-badge-critical';
      case 'warning':
        return 'alert-badge-warning';
      case 'info':
        return 'alert-badge-info';
      default:
        return 'alert-badge-info';
    }
  };

  return (
    <div className={cn("alert-item", className)}>
      <div className="flex-shrink-0">
        {getSeverityIcon()}
      </div>
      <div className="flex-grow space-y-1">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm">{title}</h4>
          <span className={cn("alert-badge", getSeverityClass())}>
            {severity}
          </span>
        </div>
        <p className="text-xs text-security-foreground/70">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-security-foreground/60">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{timestamp}</span>
            </div>
          </div>
          {onRespond && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onRespond}
              className="h-7 px-2 text-xs"
            >
              Respond
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertItem;
