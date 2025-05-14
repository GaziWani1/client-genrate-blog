import { PlusCircle, GalleryHorizontal, Receipt } from 'lucide-react';

export const SideBarItems = [
  {
    title: 'Create',
    link: '/dashboard',
    icon: PlusCircle,
  },
  {
    title: 'Your Blogs',
    link: '/dashboard/user/blogs',
    icon: GalleryHorizontal,
  },
  {
    title: 'Billing',
    link: '/dashboard/billing',
    icon: Receipt,
  },
];
