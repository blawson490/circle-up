// src/utils/colorMap.ts
export const colorMap: { [key: string]: string } = {
    'red': 'rose',
    'blue': 'blue',
    'green': 'green',
    'yellow': 'yellow',
    'purple': 'purple',
    'pink': 'pink',
    'indigo': 'indigo',
    'gray': 'gray',
    'orange': 'orange',
    'teal': 'teal',
  };

  export const getTailwindColor = (color: string | null) => {
    return color !== null ? colorMap[color] || 'gray' : 'gray'; // Default to gray if color not found
  };