// import React, { useState } from 'react';
// import { AnimatePresence, motion } from 'framer-motion';
// import MusicPlayer from './components/MusicPlayer';
// import LandingPage from './components/LandingPage';
// import ColorThrowPage from './components/ColorThrowPage';
// import GiftSelectionPage from './components/GiftSelectionPage';
// import UnoCardsPage from './components/UnoCardsPage';
// import FinalMessagePage from './components/FinalMessagePage';

// type Stage =
//   | 'landing'
//   | 'colorThrow'
//   | 'giftSelection'
//   | 'unoCards'
//   | 'finalMessage';

// const pageVariants = {
//   initial: { opacity: 0 },
//   animate: { opacity: 1 },
//   exit: { opacity: 0 },
// };

// const pageTransition = {
//   duration: 0.5,
//   ease: 'easeInOut',
// };
// function App() {
//   const [stage, setStage] = useState<Stage>('landing');

//   return (
//     <>
//       {/* Render MusicPlayer only if not on the landing page */}
//       {stage !== 'landing' && <MusicPlayer />}
//       <AnimatePresence exitBeforeEnter>
//         {stage === 'landing' && (
//           <motion.div
//             key="landing"
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             variants={pageVariants}
//             transition={pageTransition}
//           >
//             <LandingPage onContinue={() => setStage('colorThrow')} />
//           </motion.div>
//         )}
//         {stage === 'colorThrow' && (
//           <motion.div
//             key="colorThrow"
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             variants={pageVariants}
//             transition={pageTransition}
//           >
//             <ColorThrowPage onContinue={() => setStage('giftSelection')} />
//           </motion.div>
//         )}
//         {stage === 'giftSelection' && (
//           <motion.div
//             key="giftSelection"
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             variants={pageVariants}
//             transition={pageTransition}
//           >
//             <GiftSelectionPage onContinue={() => setStage('unoCards')} />
//           </motion.div>
//         )}
//         {stage === 'unoCards' && (
//           <motion.div
//             key="unoCards"
//             initial="initial"
//             animate="animate" 
//             exit="exit"
//             variants={pageVariants}
//             transition={pageTransition}
//           >
//             <UnoCardsPage onContinue={() => setStage('finalMessage')} />
//           </motion.div>
//         )}
//         {stage === 'finalMessage' && (
//           <motion.div
//             key="finalMessage"
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             variants={pageVariants}
//             transition={pageTransition}
//           >
//             <FinalMessagePage />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }


// export default App;


import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MusicPlayer from './components/MusicPlayer';
import LandingPage from './components/LandingPage';
import ColorThrowPage from './components/ColorThrowPage';
import GiftSelectionPage from './components/GiftSelectionPage';
import UnoCardsPage from './components/UnoCardsPage';
import FinalMessagePage from './components/FinalMessagePage';

type Stage =
  | 'landing'
  | 'colorThrow'
  | 'giftSelection'
  | 'unoCards'
  | 'finalMessage';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const pageTransition = {
  duration: 0.5,
  ease: 'easeInOut',
};

function App() {
  const [stage, setStage] = useState<Stage>('landing');

  return (
    <>
      {stage !== 'landing' && <MusicPlayer />}
      <AnimatePresence exitBeforeEnter>
        {stage === 'landing' && (
          <motion.div
            key="landing"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <LandingPage onContinue={() => setStage('colorThrow')} />
          </motion.div>
        )}
        {stage === 'colorThrow' && (
          <motion.div
            key="colorThrow"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <ColorThrowPage onContinue={() => setStage('giftSelection')} />
          </motion.div>
        )}
        {stage === 'giftSelection' && (
          <motion.div
            key="giftSelection"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <GiftSelectionPage onContinue={() => setStage('unoCards')} />
          </motion.div>
        )}
        {stage === 'unoCards' && (
          <motion.div
            key="unoCards"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            {/* Holi background applied here */}
            <div className="holi-bg min-h-screen">
              <UnoCardsPage onContinue={() => setStage('finalMessage')} />
            </div>
          </motion.div>
        )}
        {stage === 'finalMessage' && (
          <motion.div
            key="finalMessage"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <FinalMessagePage />
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx>{`
        .holi-bg {
          background: linear-gradient(-45deg, #ff416c, #ff4b2b, #ffd200, #6dd5fa, #2980b9);
          background-size: 400% 400%;
          animation: gradientAnimation 15s ease infinite;
        }
        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </>
  );
}

export default App;


