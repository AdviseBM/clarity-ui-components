import React, { useState } from 'react';

const SiderItems = ({ children, besides, ...rest }) => {
  const [active, setActive] = useState(null);

  return (
    <div {...rest} style={{ marginTop: 8 }}>
      {React.Children.map(children, (child) => {
        if (child && child.props && child.props.id) {
          const handleOnClick = () => {
            setActive(child.props.id);

            if (child.props.onClick) {
              child.props.onClick();
            }
          };
          const obj = {
            onClick: handleOnClick,
            onTouchStart: handleOnClick,
            active: child.props.id && child.props.id === active,
          };

          return React.cloneElement(child, obj);
        }

        return child;
      })}
    </div>
  );
};

export default SiderItems;
