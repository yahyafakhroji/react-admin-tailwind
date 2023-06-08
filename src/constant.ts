export const ThemeColor = 'indigo';

export const PrimaryColorLevel = '600';

export enum ControlSizes {
  xs = 7,
  sm = 9,
  md = 11,
  lg = 14,
}

export enum FormLayout {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
  INLINE = 'inline',
}

export type Sizes = 'xs' | 'sm' | 'md' | 'lg';

export type Triggers = 'click' | 'hover' | 'context';

export type ButtonShapes = 'round' | 'circle' | 'none';

export type ButtonVariants = 'solid' | 'twoTone' | 'plain' | 'default';

export type NavTypes = 'item' | 'collapse' | 'title';

export type DropdownPlacements =
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end'
  | 'middle-start-top'
  | 'middle-start-bottom'
  | 'middle-end-top'
  | 'middle-end-bottom';

export type DropdownVariants = 'default' | 'divider' | 'header' | 'custom';

export type TooltipPlacements =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'left'
  | 'left-start'
  | 'left-end';
