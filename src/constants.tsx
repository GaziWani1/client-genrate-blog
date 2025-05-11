import { PlusCircle, GalleryHorizontal, Paperclip } from 'lucide-react';

export const SideBarItems = [
  {
    title: 'Create',
    link: '/dashboard',
    icon: PlusCircle,
  },
  {
    title: 'Your Stories',
    link: '/dashboard/stories',
    icon: GalleryHorizontal,
  },
  {
    title: 'Billing',
    link: '/dashboard/billing',
    icon: Paperclip,
  },
];
