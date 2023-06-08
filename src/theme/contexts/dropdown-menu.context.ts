import { createContext, useState, useRef, useCallback } from 'react';
import { isNil } from 'lodash';

const DropdownMenuContext = createContext<any>(null);

export const DropdownMenuContextProvider = DropdownMenuContext.Provider;

export const DropdownMenuContextConsumer = DropdownMenuContext.Consumer;

export function useDropdownMenuContext(menuRef: any) {
  const [open, setOpen] = useState<boolean>(false);

  const [items, setItems] = useState<any[]>([]);
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const previousActiveElementRef = useRef<any>(null);

  const registerItem = useCallback((element: any, props: any) => {
    setItems((items: any[]) => [...items, { element, props }]);
  }, []);

  const unregisterItem = useCallback((id: number | string) => {
    setItems((items) => items.filter((item) => item.element.id !== id));
  }, []);

  const focusSelf = useCallback(() => {
    requestAnimationFrame(() => {
      if (document.activeElement !== menuRef.current) {
        previousActiveElementRef.current = document.activeElement;
        menuRef.current?.focus();
      }
    });
  }, [menuRef]);

  const focusItem = useCallback(
    (item: any) => {
      const itemIndex = items.indexOf(item);
      if (itemIndex !== -1) {
        setActiveItemIndex(itemIndex);
        focusSelf();
      }
    },
    [items, focusSelf]
  );

  const lookupNextActiveItemIndex = useCallback(
    (start: number, direction: number) => {
      for (let i = start; i > -1 && i < items.length; i += direction) {
        if (!items[i].props?.disabled) {
          return i;
        }
      }

      return null;
    },
    [items]
  );

  const focusItemAt = useCallback(
    (index: number) => {
      if (isNil(index)) {
        setActiveItemIndex(null);
        focusSelf();
      } else {
        let activeItemIndex;
        if (index === 0) {
          activeItemIndex = lookupNextActiveItemIndex(0, 1);
        } else if (index === -1) {
          activeItemIndex = lookupNextActiveItemIndex(items.length - 1, -1);
        }

        if (!isNil(activeItemIndex)) {
          focusItem(items[activeItemIndex]);
        }
      }
    },
    [items, focusItem, focusSelf, lookupNextActiveItemIndex]
  );

  const openMenu = useCallback(() => {
    setOpen(true);
    focusSelf();
  }, [focusSelf]);

  const closeMenu = useCallback(() => {
    setOpen(false);
    setActiveItemIndex(null);
    requestAnimationFrame(() => {
      previousActiveElementRef.current?.focus();
    });
  }, []);

  return {
    open,
    items,
    activeItemIndex,
    registerItem,
    unregisterItem,
    focusItemAt,
    openMenu,
    closeMenu,
  };
}

export default DropdownMenuContext;
