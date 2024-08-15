import * as Icons from 'lucide-react';

export const iconMap: { [key: string]: React.ElementType } = {
  'user': Icons.User,
  'users': Icons.Users,
  'heart': Icons.Heart,
  'star': Icons.Star,
  'home': Icons.Home,
  'settings': Icons.Settings,
  'message': Icons.MessageSquare,
  'book': Icons.Book,
  'music': Icons.Music,
  'camera': Icons.Camera,
  'film': Icons.Film,
  'map': Icons.Map,
  'calendar': Icons.Calendar,
  'award': Icons.Award,
  'gift': Icons.Gift,
  'coffee': Icons.Coffee,
  'ice-cream': Icons.Dices,
  'baby': Icons.Baby,
  'null': Icons.SquareDashedMousePointerIcon
};

export const getIconComponent = (iconName: string | null) => {
  return iconName !== null ? iconMap[iconName] || Icons.HelpCircle : Icons.HelpCircle; // Default to HelpCircle if icon not found
};