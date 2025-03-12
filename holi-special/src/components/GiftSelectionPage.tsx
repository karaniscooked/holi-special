// import React, { useState, useEffect } from 'react';

// interface GiftOption {
//   id: number;
//   title: string;
//   emoji: string;
//   color: string;
// }

// interface GiftSelectionPageProps {
//   onContinue: () => void;
// }

// const giftOptions: GiftOption[] = [
//   { id: 1, title: "Colorful Chocolates", emoji: "🍫", color: "#8B4513" },
//   { id: 2, title: "Floral Bouquet", emoji: "💐", color: "#FF69B4" },
//   { id: 3, title: "Surprise Gift Box", emoji: "🎁", color: "#1E90FF" },
// ];

// const colorOptions = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#33FFF5"];

// const GiftSelectionPage: React.FC<GiftSelectionPageProps> = ({ onContinue }) => {
//   const [selectedGift, setSelectedGift] = useState<number | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [gameWon, setGameWon] = useState(false);
//   const [colorToMatch, setColorToMatch] = useState('');
//   const [displayColors, setDisplayColors] = useState<string[]>([]);
//   const [score, setScore] = useState(0);
//   const [timeLeft, setTimeLeft] = useState(30);
//   const [showConfetti, setShowConfetti] = useState(false);
//   const [shake, setShake] = useState(false);

//   // Initialize the color matching game
//   const startGame = () => {
//     if (!selectedGift) return;
//     setIsPlaying(true);
//     setScore(0);
//     setTimeLeft(30);
//     setGameWon(false);
//     nextRound();
//   };

//   // Set up the next round of colors
//   const nextRound = () => {
//     // Randomly select a color to match
//     const targetColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
//     setColorToMatch(targetColor);
    
//     // Create an array of colors with the target color in a random position
//     const colors = [...colorOptions].sort(() => Math.random() - 0.5).slice(0, 4);
//     if (!colors.includes(targetColor)) {
//       colors[Math.floor(Math.random() * colors.length)] = targetColor;
//     }
//     setDisplayColors(colors);
//   };

//   // Handle color selection
//   const handleColorClick = (color: string) => {
//     if (color === colorToMatch) {
//       setScore(prev => prev + 1);
//       if (score + 1 >= 5) {
//         setGameWon(true);
//         setIsPlaying(false);
//         setShowConfetti(true);
//         setTimeout(() => setShowConfetti(false), 3000);
//       } else {
//         nextRound();
//       }
//     } else {
//       setShake(true);
//       setTimeout(() => setShake(false), 500);
//     }
//   };

//   // Game timer
//   useEffect(() => {
//     if (!isPlaying) return;
    
//     const timer = setInterval(() => {
//       setTimeLeft(prev => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           setIsPlaying(false);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
    
//     return () => clearInterval(timer);
//   }, [isPlaying]);

//   // Confetti effect
//   const renderConfetti = () => {
//     if (!showConfetti) return null;
    
//     return (
//       <div className="absolute inset-0 pointer-events-none overflow-hidden">
//         {[...Array(50)].map((_, i) => {
//           const size = Math.random() * 10 + 5;
//           const left = Math.random() * 100;
//           const animationDuration = Math.random() * 3 + 2;
//           const delay = Math.random() * 1;
//           const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
          
//           return (
//             <div
//               key={i}
//               className="absolute top-0 rounded-full"
//               style={{
//                 left: `${left}%`,
//                 width: `${size}px`,
//                 height: `${size}px`,
//                 backgroundColor: color,
//                 animation: `fall ${animationDuration}s linear ${delay}s`,
//               }}
//             />
//           );
//         })}
//       </div>
//     );
//   };

//   return (
//     <div className="gift-selection-page relative w-full h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-200 to-yellow-200 overflow-hidden">
//       {/* Floating colors background */}
//       <div className="absolute inset-0 overflow-hidden">
//         {[...Array(15)].map((_, i) => {
//           const size = Math.random() * 100 + 50;
//           const left = Math.random() * 100;
//           const top = Math.random() * 100;
//           const animationDuration = Math.random() * 20 + 10;
//           const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
          
//           return (
//             <div
//               key={i}
//               className="absolute rounded-full opacity-20"
//               style={{
//                 left: `${left}%`,
//                 top: `${top}%`,
//                 width: `${size}px`,
//                 height: `${size}px`,
//                 backgroundColor: color,
//                 animation: `float ${animationDuration}s infinite ease-in-out`,
//               }}
//             />
//           );
//         })}
//       </div>

//       {/* Confetti effect */}
//       {renderConfetti()}

//       {/* Main Content */}
//       <h1 className="text-4xl font-bold mb-8 text-center relative z-10 text-purple-800">
//         Select Your Holi Gift
//       </h1>
      
//       {/* Gift Selection */}
//       {!isPlaying && !gameWon && (
//         <div className="gift-options flex flex-wrap justify-center gap-8 mb-8">
//           {giftOptions.map((gift) => (
//             <div
//               key={gift.id}
//               onClick={() => setSelectedGift(gift.id)}
//               className={`gift-card cursor-pointer p-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 ${
//                 selectedGift === gift.id ? 'border-4 border-green-500 scale-105' : 'border border-transparent'
//               }`}
//               style={{ 
//                 background: 'rgba(255, 255, 255, 0.8)',
//                 maxWidth: '200px',
//               }}
//             >
//               <div className="text-7xl text-center mb-2">{gift.emoji}</div>
//               <h2 className="mt-4 text-xl font-semibold text-center">{gift.title}</h2>
              
//               {selectedGift === gift.id && (
//                 <div className="mt-4 flex justify-center">
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       startGame();
//                     }}
//                     className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors"
//                   >
//                     Play To Win
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Color Matching Game */}
//       {isPlaying && (
//         <div className="game-container bg-white p-6 rounded-xl shadow-lg max-w-lg w-full">
//           <h2 className="text-2xl font-bold mb-4 text-center">Match the Color!</h2>
//           <div className="flex justify-between mb-4">
//             <div className="score text-lg font-medium">Score: {score}/5</div>
//             <div className="timer text-lg font-medium">Time: {timeLeft}s</div>
//           </div>
          
//           <div className="target-color mb-6">
//             <p className="text-center mb-2">Find this color:</p>
//             <div 
//               className="w-full h-12 rounded-md"
//               style={{ backgroundColor: colorToMatch }}
//             />
//           </div>
          
//           <div className={`color-options grid grid-cols-2 gap-4 ${shake ? 'animate-shake' : ''}`}>
//             {displayColors.map((color, index) => (
//               <button
//                 key={index}
//                 className="h-16 rounded-md transform transition-transform hover:scale-105 active:scale-95"
//                 style={{ backgroundColor: color }}
//                 onClick={() => handleColorClick(color)}
//               />
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Game Won Message */}
//       {gameWon && (
//         <div className="game-won text-center mb-8 p-6 bg-white rounded-xl shadow-lg max-w-md">
//           <h2 className="text-2xl font-bold mb-2 text-green-600">Congratulations!</h2>
//           <p className="mb-4">You've won the game and unlocked your gift!</p>
//           <div className="text-8xl mb-4 animate-bounce">
//             {selectedGift && giftOptions.find(g => g.id === selectedGift)?.emoji}
//           </div>
//           <button
//             onClick={onContinue}
//             className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors"
//           >
//             Continue to Your Gift
//           </button>
//         </div>
//       )}

//       {/* Continue Button - Only shown at start and not during game */}
//       {!isPlaying && !gameWon && (
//         <div className="flex flex-col items-center">
//           <button
//             onClick={onContinue}
//             disabled={!selectedGift}
//             className={`bg-white px-8 py-3 rounded-full shadow-lg transition-all duration-300 ${
//               selectedGift ? 'hover:bg-gray-200 animate-pulse' : 'opacity-50 cursor-not-allowed'
//             }`}
//           >
//             {selectedGift ? 'Skip Game & Continue' : 'Select a Gift First'}
//           </button>
          
//           {!selectedGift && (
//             <p className="mt-4 text-sm text-purple-800">Select a gift to continue</p>
//           )}
//         </div>
//       )}

//       {/* Animations and styles */}
//       <style>{`
//         .gift-selection-page {
//           font-family: 'Poppins', sans-serif;
//         }
        
//         @keyframes float {
//           0%, 100% { transform: translateY(0) rotate(0deg); }
//           50% { transform: translateY(-20px) rotate(10deg); }
//         }
        
//         @keyframes fall {
//           0% { transform: translateY(-100px); }
//           100% { transform: translateY(100vh); }
//         }
        
//         .animate-shake {
//           animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
//         }
        
//         @keyframes shake {
//           0%, 100% { transform: translateX(0); }
//           10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
//           20%, 40%, 60%, 80% { transform: translateX(5px); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default GiftSelectionPage;

import React, { useState, useEffect } from 'react';

interface GiftOption {
  id: number;
  title: string;
  emoji: string;
  color: string;
}

interface GiftSelectionPageProps {
  onContinue: () => void;
}

const giftOptions: GiftOption[] = [
  { id: 1, title: "Colorful Chocolates", emoji: "🍫", color: "#8B4513" },
  { id: 2, title: "Floral Bouquet", emoji: "💐", color: "#FF69B4" },
  { id: 3, title: "Surprise Gift Box", emoji: "🎁", color: "#1E90FF" },
];

const colorOptions = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#33FFF5"];

const GiftSelectionPage: React.FC<GiftSelectionPageProps> = ({ onContinue }) => {
  const [selectedGift, setSelectedGift] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [colorToMatch, setColorToMatch] = useState('');
  const [displayColors, setDisplayColors] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showConfetti, setShowConfetti] = useState(false);
  const [shake, setShake] = useState(false);

  // Initialize the color matching game
  const startGame = () => {
    if (!selectedGift) return;
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(30);
    setGameWon(false);
    nextRound();
  };

  // Set up the next round of colors
  const nextRound = () => {
    const targetColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    setColorToMatch(targetColor);
    
    // Create an array with target color in a random position
    const colors = [...colorOptions].sort(() => Math.random() - 0.5).slice(0, 4);
    if (!colors.includes(targetColor)) {
      colors[Math.floor(Math.random() * colors.length)] = targetColor;
    }
    setDisplayColors(colors);
  };

  // Handle color selection
  const handleColorClick = (color: string) => {
    if (color === colorToMatch) {
      setScore(prev => prev + 1);
      if (score + 1 >= 5) {
        setGameWon(true);
        setIsPlaying(false);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      } else {
        nextRound();
      }
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  // Game timer
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsPlaying(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Confetti effect
  const renderConfetti = () => {
    if (!showConfetti) return null;
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(50)].map((_, i) => {
          const size = Math.random() * 10 + 5;
          const left = Math.random() * 100;
          const animationDuration = Math.random() * 3 + 2;
          const delay = Math.random() * 1;
          const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
          return (
            <div
              key={i}
              className="absolute top-0 rounded-full"
              style={{
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
                animation: `fall ${animationDuration}s linear ${delay}s forwards`,
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="gift-selection-page relative w-full h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-200 to-yellow-200 overflow-hidden">
      {/* Smooth Floating Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => {
          const size = Math.random() * 100 + 50;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const animationDuration = Math.random() * 15 + 10;
          const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
          return (
            <div
              key={i}
              className="absolute rounded-full opacity-20"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
                animation: `floatSmooth ${animationDuration}s infinite ease-in-out`,
              }}
            />
          );
        })}
      </div>

      {/* Confetti effect */}
      {renderConfetti()}

      {/* Main Content */}
      <h1 className="text-4xl font-bold mb-8 text-center relative z-10 text-purple-800">
        Select Your Holi Gift
      </h1>
      
      {/* Gift Options and Game Start */}
      {!isPlaying && !gameWon && (
        <div className="gift-options flex flex-wrap justify-center gap-8 mb-8 relative z-10">
          {giftOptions.map((gift) => (
            <div
              key={gift.id}
              onClick={() => setSelectedGift(gift.id)}
              className={`gift-card cursor-pointer p-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 ${
                selectedGift === gift.id ? 'border-4 border-green-500 scale-105' : 'border border-transparent'
              }`}
              style={{ 
                background: 'rgba(255, 255, 255, 0.8)',
                maxWidth: '200px',
              }}
            >
              <div className="text-7xl text-center mb-2">{gift.emoji}</div>
              <h2 className="mt-4 text-xl font-semibold text-center">{gift.title}</h2>
              
              {selectedGift === gift.id && (
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startGame();
                    }}
                    className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors"
                  >
                    Play To Win
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Color Matching Game */}
      {isPlaying && (
        <div className="game-container relative z-10 bg-white p-6 rounded-xl shadow-lg max-w-lg w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">Match the Color!</h2>
          <div className="flex justify-between mb-4">
            <div className="score text-lg font-medium">Score: {score}/5</div>
            <div className="timer text-lg font-medium">Time: {timeLeft}s</div>
          </div>
          
          <div className="target-color mb-6">
            <p className="text-center mb-2">Find this color:</p>
            <div 
              className="w-full h-12 rounded-md"
              style={{ backgroundColor: colorToMatch }}
            />
          </div>
          
          <div className={`color-options grid grid-cols-2 gap-4 ${shake ? 'animate-shake' : ''}`}>
            {displayColors.map((color, index) => (
              <button
                key={index}
                className="h-16 rounded-md transform transition-transform hover:scale-105 active:scale-95"
                style={{ backgroundColor: color }}
                onClick={() => handleColorClick(color)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Game Won Message */}
      {gameWon && (
        <div className="game-won relative z-10 text-center mb-8 p-6 bg-white rounded-xl shadow-lg max-w-md">
          <h2 className="text-2xl font-bold mb-2 text-green-600">Congratulations!</h2>
          <p className="mb-4">You've won the game and unlocked your gift!</p>
          <div className="text-8xl mb-4 animate-bounce">
            {selectedGift && giftOptions.find(g => g.id === selectedGift)?.emoji}
          </div>
          <button
            onClick={onContinue}
            className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors"
          >
            Continue to Your Gift
          </button>
        </div>
      )}

      {/* Continue Button (Skip Game) */}
      {!isPlaying && !gameWon && (
        <div className="flex flex-col items-center relative z-10">
          <button
            onClick={onContinue}
            disabled={!selectedGift}
            className={`bg-white px-8 py-3 rounded-full shadow-lg transition-all duration-300 ${
              selectedGift ? 'hover:bg-gray-200 animate-pulse' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            {selectedGift ? 'Skip Game & Continue' : 'Select a Gift First'}
          </button>
          {!selectedGift && (
            <p className="mt-4 text-sm text-purple-800">Select a gift to continue</p>
          )}
        </div>
      )}

      {/* Inline Styles and Keyframes */}
      <style>{`
        .gift-selection-page {
          font-family: 'Poppins', sans-serif;
        }
        @keyframes floatSmooth {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(-20px) rotate(5deg); opacity: 0.8; }
          100% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
        }
        @keyframes fall {
          0% { transform: translateY(-100px); opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
};

export default GiftSelectionPage;
