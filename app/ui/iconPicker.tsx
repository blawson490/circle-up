import React from 'react';
import { iconMap } from '@/utils/iconMap';

interface IconPickerProps {
  selectedIcon: string;
  onIconSelect: (icon: string) => void;
}

export function IconPicker({ selectedIcon, onIconSelect }: IconPickerProps) {
  return (
    <div className="grid grid-cols-5 gap-2 max-h-40 overflow-y-auto p-2 border rounded">
      {Object.entries(iconMap).map(([name, Icon]) => (
        <button
          key={name}
          className={`p-2 rounded hover:bg-gray-100 ${
            selectedIcon === name ? 'bg-blue-100' : ''
          }`}
          onClick={() => onIconSelect(name)}
        >
          <Icon className="w-6 h-6" />
        </button>
      ))}
    </div>
  );
}