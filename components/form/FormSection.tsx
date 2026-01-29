'use client';

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <div className="border border-gray-300 rounded-lg p-4">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      {description && (
        <p className="text-sm text-gray-600">{description}</p>
      )}
      <div className="space-y-2">{children}</div>
    </div>
  );
}
