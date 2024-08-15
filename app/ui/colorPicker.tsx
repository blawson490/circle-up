import React from 'react';
import { getTailwindColor } from '@/utils/colorMap';

const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'indigo', 'gray', 'orange', 'teal'];

interface ColorPickerProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

export function ColorPicker({ selectedColor, onColorSelect }: ColorPickerProps) {
  return (
    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 border rounded">
      {colors.map((color) => (
        <button
          key={color}
          className={`w-8 h-8 rounded-full ${
            selectedColor === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
          }`}
          style={{ backgroundColor: getTailwindColor(color) }}
          onClick={() => onColorSelect(color)}
        />
      ))}
    </div>
  );
}