import useMergedRef from '@theme/hooks/useMergedRef';
import classNames from 'classnames';
import React, { CSSProperties, forwardRef, Ref, useEffect, useRef, useState } from 'react';

import styles from './avatar.module.scss';

interface Props {
  shape?: 'rounded' | 'square' | 'circle';
  size?: number | 'sm' | 'md' | 'lg';
  icon?: React.ReactNode | string | undefined;
  src?: string | undefined;
  srcSet?: string;
  alt?: string;
  className?: string;
  style?: CSSProperties | undefined;
  children?: React.ReactNode | undefined;
}

const Avatar = forwardRef(
  ({ shape, size, icon, src, srcSet, alt, className, children, style, ...rest }: Props, ref: Ref<HTMLElement>) => {
    const [scale, setScale] = useState(1);

    const avatarChildren = useRef<HTMLElement>();
    const avatarNode = useRef<HTMLElement>();

    const avatarMergeRef = useMergedRef(ref, avatarNode);

    const innerScale = () => {
      if (!avatarChildren.current || !avatarNode.current) {
        return;
      }

      const avatarChildrenWidth = avatarChildren.current?.offsetWidth;
      const avatarNodeWidth = avatarNode.current?.offsetWidth;
      if (avatarChildrenWidth === 0 || avatarNodeWidth === 0) {
        return;
      }

      setScale(avatarNodeWidth - 8 < avatarChildrenWidth ? (avatarNodeWidth - 8) / avatarChildrenWidth : 1);
    };

    useEffect(() => {
      innerScale();
    }, [scale, children]);

    const sizeStyle =
      typeof size === 'number'
        ? {
            width: size,
            height: size,
            minWidth: size,
            lineHeight: `${size}px`,
            fontSize: icon ? size / 2 : 12,
          }
        : {};

    const shapeClass =
      shape === 'rounded' ? styles.avatarRounded : shape === 'square' ? styles.avatarSquare : styles.avatarCircle;

    const sizeClass = size === 'sm' ? styles.avatarSm : size === 'lg' ? styles.avatarLg : styles.avatarMd;

    const classes = classNames(styles.avatar, shapeClass, typeof size === 'string' ? sizeClass : '', className);

    let child;
    if (src) {
      child = (
        <img className={classNames(styles.avatarImg, shapeClass)} src={src} srcSet={srcSet} alt={alt} loading="lazy" />
      );
    } else if (icon) {
      const sizeIconClass = size === 'sm' ? styles.avatarIconSm : size === 'lg' ? styles.avatarIconLg : styles.avatarIconMd;

      child = <span className={classNames(styles.avatarIcon, sizeIconClass)}>{icon}</span>;
    } else {
      const childrenSizeStyle = typeof size === 'number' ? { lineHeight: `${size}px` } : {};
      const stringCentralized = {
        transform: `translateX(-50%) scale(${scale})`,
      };

      child = (
        <span
          className={`avatar-string ${typeof size === 'number' ? '' : `avatar-inner-${size}`}`}
          style={{
            ...childrenSizeStyle,
            ...stringCentralized,
            ...(typeof size === 'number' ? { height: size } : {}),
          }}
          ref={(node: any) => {
            avatarChildren.current = node as any;
          }}
        >
          {children}
        </span>
      );
    }

    return (
      <span className={classes} style={{ ...sizeStyle, ...style }} ref={avatarMergeRef} {...rest}>
        {child}
      </span>
    );
  }
);

Avatar.defaultProps = {
  shape: 'rounded',
  size: 'md',
  icon: undefined,
  src: undefined,
  srcSet: '',
  alt: '',
  className: '',
  style: {},
  children: undefined,
};

export default Avatar;
