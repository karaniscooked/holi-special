// import React from 'react';
// import { motion, useReducedMotion } from 'framer-motion';
// import { Heart } from 'lucide-react';

// const FinalMessagePage: React.FC = () => {
//   const shouldReduceMotion = useReducedMotion();

//   // For reduced motion, skip the initial hidden state.
//   const textInitial = shouldReduceMotion ? {} : { opacity: 0, y: 10 };
//   const textAnimate = { opacity: 1, y: 0 };

//   // Minimal delays for subtle entrance effect.
//   const delays = {
//     heading: shouldReduceMotion ? 0 : 0.1,
//     paragraph: shouldReduceMotion ? 0 : 0.2,
//     footer: shouldReduceMotion ? 0 : 0.3,
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center p-8">
//       {/* The card is rendered immediately with no animation */}
//       <div className="max-w-2xl bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
//         <motion.div
//           animate={{ scale: [1, 1.2, 1] }}
//           transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
//           className="flex justify-center mb-6"
//         >
//           <Heart className="text-pink-500" size={48} fill="currentColor" />
//         </motion.div>

//         <motion.h1
//           className="text-4xl font-bold text-center text-pink-600 mb-6"
//           initial={textInitial}
//           animate={textAnimate}
//           transition={{ delay: delays.heading, duration: 0.3, ease: "easeOut" }}
//         >
//           Happy Holi, My Love! 🌸🎨
//         </motion.h1>

//         <motion.p
//           className="text-lg text-gray-700 leading-relaxed font-semibold text-center"
//           initial={textInitial}
//           animate={textAnimate}
//           transition={{ delay: delays.paragraph, duration: 0.3, ease: "easeOut" }}
//         >
//           Words Won't Be Enough. So, I'm Just Saying "I Love You".
//         </motion.p>

//         <motion.div
//           className="text-center mt-8 text-2xl text-purple-600 font-bold"
//           initial={textInitial}
//           animate={textAnimate}
//           transition={{ delay: delays.footer, duration: 0.3, ease: "easeOut" }}
//         >
//           With Love,<br /> Your KuchuPuchu Always ❤️
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default FinalMessagePage;


import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const FinalMessagePage: React.FC = () => {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="max-w-2xl bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.div
          className="flex justify-center mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Sparkles className="text-yellow-500" size={48} fill="currentColor" />
        </motion.div>
        <motion.h1
          className="text-3xl font-bold text-center text-pink-600 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Happy Holi, My Love! 🌸🎨
        </motion.h1>
        <motion.p
          className="text-center text-gray-700 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Life with you is as colorful and magical as Holi itself. You bring endless joy and love.
        </motion.p>
        <motion.div
          className="mt-4 text-center text-xl text-purple-600 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          I Love You Forever ❤️
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FinalMessagePage;
