import { AlertTriangle, X } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
  onClose?: () => void;
}

export default function ErrorAlert({ message, onClose }: ErrorAlertProps) {
  return (
    <div className="m-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
      <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-medium text-red-800">Error</p>
        <p className="text-sm text-red-700 mt-1">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-3 text-red-400 hover:text-red-600 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
