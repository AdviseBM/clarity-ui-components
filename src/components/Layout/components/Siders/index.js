import React, { useEffect, useState } from 'react';
import useLayout from '../../hooks/useLayout';
import { AnimatePresence, motion } from 'framer-motion';
import { Sheet } from 'react-modal-sheet';
import useControls from '../../hooks';

const snapPoints = [-50, 0.5, 200, 0];
const initialSnap = 2;

function ModelSheetContainer({ sheet, children }) {
  const { siders, popSider } = useControls();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (siders.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [siders]);

  if (!sheet) {
    return children;
  }

  return (
    <>
      <Sheet
        isOpen={open}
        onClose={() => {
          popSider(0);
        }}
        snapPoints={snapPoints}
        initialSnap={initialSnap}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>{children}</Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </>
  );
}

const Siders = ({ children }) => {
  const { siders } = useLayout();

  const transition = {
    duration: 0.1,
  };

  return (
    <>
      {children}
      <AnimatePresence>
        {siders.map((sider, siderIndex) => {
          const containsPrevious = sider.length > 1;

          const previous = containsPrevious
            ? sider[sider.length - 2](siderIndex)
            : null;

          const currentOptions = sider[sider.length - 1].options;
          const current = sider[sider.length - 1].value(siderIndex);

          return (
            <ModelSheetContainer sheet={currentOptions.sheet}>
              <motion.div
                key={`${siderIndex}`}
                transition={{ ...transition, ease: 'easeIn' }}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                style={{ position: 'relative' }}
              >
                {/* These code here ensures that when stacking, the stacked element
            kindof fadein overlaying the previous element. But these doesnt happens
            when adding a siderbar, only when stacking on the sidebar */}
                {previous}

                <motion.div
                  key={`${sider.length - 1}`}
                  transition={
                    containsPrevious
                      ? { ...transition, duration: 0.1 }
                      : transition
                  }
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={
                    containsPrevious
                      ? {
                          height: '100%',
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          zIndex: 9,
                        }
                      : { height: '100%', zIndex: 9 }
                  }
                >
                  {current}
                </motion.div>
              </motion.div>
            </ModelSheetContainer>
          );
        })}
      </AnimatePresence>
    </>
  );
};

export default Siders;
