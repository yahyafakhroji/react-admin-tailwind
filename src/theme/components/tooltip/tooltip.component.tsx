import * as PopperJS from '@popperjs/core';
import TooltipArrow from '@theme/components/tooltip/tooltip-arrow.component';
import classNames from 'classnames';
import { Popper, Reference, Manager } from 'react-popper';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Portal } from 'react-portal';

interface Props {
  title?: React.ReactNode | undefined;
  placement?: PopperJS.Placement;
  isOpen?: boolean;
  wrapperClass?: string;
  children?: React.ReactNode | undefined;
  forceUpdate?: () => void;
}

const PopperElement: React.FC<{ title: React.ReactNode; forceUpdate: () => void; open: boolean }> = ({
  title,
  forceUpdate,
  open,
}) => {
  useEffect(() => {
    if (open && typeof forceUpdate !== 'undefined') {
      forceUpdate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return <span>{title}</span>;
};

const Tooltip: React.FC<Props> = ({ title, placement, isOpen, wrapperClass, children, ...rest }) => {
  const [tooltipOpen, setTooltipOpen] = useState(isOpen);
  const tooltipNode = useRef();

  const defaultTooltipClass = `tooltip bg-gray-800 dark:bg-black`;

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
        <>
          <Portal>
            <Popper
              placement={placement}
              innerRef={(node) => {
                tooltipNode.current = node;

                return node;
              }}
              modifiers={[
                { name: 'arrow', options: { element: TooltipArrow as any } },
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
                    <TooltipArrow placement={placement} />
                  </motion.div>
                </AnimatePresence>
              )}
            </Popper>
          </Portal>
        </>
      )}
    </Manager>
  );
};

Tooltip.defaultProps = {
  title: '',
  placement: 'top',
  isOpen: false,
  wrapperClass: '',
  children: undefined,
  forceUpdate: () => 0,
};

export default Tooltip;
