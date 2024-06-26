import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Container, SmallTile, Tile, Icon } from './styles';
import useControls from '../../hooks';

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const SiderItem = ({
  id,
  active,
  link,
  children,
  onClick,
  icon,
  size,
  smallTileStyle,
  bigTileStyle,
  shouldAnimateChildren = false,
  outstanding = false,
  ...rest
}) => {
  const { backup, setBackup, popSider, setLinks, links } = useControls();

  const handleOnClick = () => {
    if (link) {
      popSider(0);
      setLinks([id]);
    } else {
      if (links.length > 0) {
        setLinks([]);
      }
    }
    if (backup.length > 0) {
      setBackup([]);
    }
    onClick();
  };

  return (
    <Container
      id={id}
      onClick={() => {
        console.log('onclick');
        handleOnClick();
      }}
      onTouchStart={() => {
        console.log('ontouchstart');
        handleOnClick();
      }}
      {...rest}
    >
      {size == 'small' ? (
        <SmallTile
          active={active}
          outstanding={outstanding}
          style={smallTileStyle}
        >
          {icon && <Icon>{icon}</Icon>}
          {children}
        </SmallTile>
      ) : (
        <Tile active={active} style={bigTileStyle}>
          {icon && <Icon>{icon}</Icon>}
          {shouldAnimateChildren && (
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              {children}
            </motion.div>
          )}
          {!shouldAnimateChildren && children}
        </Tile>
      )}
    </Container>
  );
};

SiderItem.propTypes = {
  onClick: PropTypes.func,
  id: PropTypes.any,
  active: PropTypes.bool,
  link: PropTypes.bool,
  smallTileStyle: PropTypes.object,
  bigTileStyle: PropTypes.object,
};

export default SiderItem;
