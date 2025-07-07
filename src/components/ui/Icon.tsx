import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 20, className = '' }: IconProps) {
  // Convert kebab-case to PascalCase
  const iconName = name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('') as keyof typeof LucideIcons;

  const IconComponent = LucideIcons[iconName] as React.ComponentType<{
    size?: number;
    className?: string;
  }>;

  if (!IconComponent) {
    // Fallback to FileText icon if the specified icon doesn't exist
    const FallbackIcon = LucideIcons.FileText;
    return <FallbackIcon size={size} className={className} />;
  }

  return <IconComponent size={size} className={className} />;
}