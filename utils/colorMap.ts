// src/utils/colorMap.ts

export const colorMap: { [key: string]: string } = {
  // Original colors
  'red': 'red',
  'blue': 'blue',
  'green': 'green',
  'yellow': 'yellow',
  'purple': 'purple',
  'pink': 'pink',
  'indigo': 'indigo',
  'gray': 'gray',
  'orange': 'orange',
  'teal': 'teal',
  
  'slate': 'slate',
  'zinc': 'zinc',
  'neutral': 'neutral',
  'stone': 'stone',
  'emerald': 'emerald',
  'cyan': 'cyan',
  'sky': 'sky',
  'violet': 'violet',
  'fuchsia': 'fuchsia',
  'rose': 'rose',
  
  'lightblue': 'sky',
  'darkblue': 'indigo',
  'darkgreen': 'emerald',
  'darkyellow': 'yellow',
  'lightpurple': 'violet',
  'darkpurple': 'purple',
  'lightpink': 'pink',
  'darkpink': 'fuchsia',
  'lightgray': 'slate',
  'darkgray': 'zinc',
};

export const getTailwindColor = (color: string | null) => {
  if (color === null) return 'gray';
  const normalizedColor = color.toLowerCase();
  return colorMap[normalizedColor] || 'gray'; // Default to gray if color not found
};