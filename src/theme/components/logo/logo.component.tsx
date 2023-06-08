import classNames from 'classnames';
import React from 'react';

interface Props {
  src?: string;
  className?: string;
  imgClass?: string;
  width?: string | number;
}

const Logo: React.FC<Props> = ({ className, imgClass, width, src }) => {
  return (
    <div className={classNames('logo', className)} style={{ width }}>
      <img className={imgClass} src={src} alt="Logo" />
    </div>
  );
};

Logo.defaultProps = {
  className: '',
  imgClass: '',
  width: 'auto',
  src: '/dummies/logo/logo-light-full.png',
};

export default Logo;
