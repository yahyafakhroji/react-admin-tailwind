import TooltipArrow from '@components/ui/tooltip/tooltip-arrow.component';
import classNames from 'classnames';
import { Popper, Reference, Manager } from 'react-popper';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Portal } from 'react-portal';

const PopperElement: React.FC<any> = ({ title, forceUpdate, open }) => {
  useEffect(() => {
    if (open) {
      forceUpdate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return <span>{title}</span>;
};

const Tooltip: React.FC<any> = ({ title, placement, isOpen, wrapperClass, children, ...rest }) => {
  const [tooltipOpen, setTooltipOpen] = useState(isOpen);
  const tooltipNode = useRef();

  const tooltipBackground = 'gray-800';
  const tooltipDarkBackground = 'black';

  const defaultTooltipClass = `tooltip bg-${tooltipBackground} dark:bg-${tooltipDarkBackground}`;

  const toggleTooltip = useCallback(
    (bool: boolean) => {
      if (!isOpen) {
        setTooltipOpen(bool);
      }
    },
    [isOpen]
  );

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <span
            className={classNames('tooltip-wrapper', wrapperClass)}
            ref={ref}
            onMouseEnter={() => toggleTooltip(true)}
            onMouseLeave={() => toggleTooltip(false)}
          >
            {children}
          </span>
        )}
      </Reference>

      {tooltipOpen && (
        <Portal>
          <Popper
            placement={placement}
            innerRef={(node) => {
              if (tooltipNode) {
                tooltipNode.current = node;
              }

              return node;
            }}
            modifiers={[
              { name: 'arrow', options: { element: TooltipArrow } },
              { name: 'offset', options: { offset: [0, 7] } },
            ]}
            strategy="fixed"
          >
            {({ ref, style, ...popperProps }) => (
              <AnimatePresence>
                <motion.div
                  className={defaultTooltipClass}
                  ref={ref}
                  style={style}
                  initial={{
                    opacity: 0,
                    visibility: 'hidden',
                  }}
                  animate={
                    tooltipOpen
                      ? {
                          opacity: 1,
                          visibility: 'visible',
                        }
                      : {
                          opacity: 0,
                          visibility: 'hidden',
                        }
                  }
                  transition={{
                    duration: 0.15,
                    type: 'tween',
                  }}
                >
                  <PopperElement open={tooltipOpen} title={title} {...rest} {...popperProps} />
                  <TooltipArrow placement={placement} color={tooltipBackground} colorDark={tooltipDarkBackground} />
                </motion.div>
              </AnimatePresence>
            )}
          </Popper>
        </Portal>
      )}
    </Manager>
  );
};

export default Tooltip;
