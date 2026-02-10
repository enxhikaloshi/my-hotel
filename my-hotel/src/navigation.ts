
import {createNavigation} from 'next-intl/navigation';
import {routing} from '../routing'; // Adjust path based on your structure
 
export const {Link, redirect, usePathname, useRouter} = 
  createNavigation(routing);