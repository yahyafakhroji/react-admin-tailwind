import { atomic } from '@libraries/state';

export const NavCollapseAtom = atomic<boolean>(false);

export const ThemeModeAtom = atomic<'dark' | 'light' | 'transparent'>('transparent');
