// import React, { useRef, useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { v4 as uuidv4 } from 'uuid';
// import BurstS from './burst.mp3';

// interface Particle {
//   initialX: number;
//   initialY: number;
//   vx: number;
//   vy: number;
//   color: string;
//   r: number;
// }

// interface Explosion {
//   id: string;
//   particles: Particle[];
//   startTime: number;
//   duration: number;
//   multiplier: number;
// }

// interface StaticParticle {
//   x: number;
//   y: number;
//   color: string;
//   r: number;
// }

// interface Balloon {
//   id: string;
//   x: number;
//   y: number;
//   size: number;
//   color: string;
//   rotation: number;
//   sway: number;
// }

// interface ColorThrowPageProps {
//   onContinue: () => void;
// }

// // Explosion settings
// const NORMAL_PARTICLE_COUNT = 150;
// const BALLOON_PARTICLE_COUNT = 300;
// const EXPLOSION_DURATION = 600; // in ms
// const EXPLOSION_MULTIPLIER = 50; // base spread distance in pixels

// // Colors for explosions
// const EXPLOSION_COLORS = [
//   '#ff4949',
//   '#ffb347',
//   '#ffff66',
//   '#77dd77',
//   '#84b6f4',
//   '#c38cff',
// ];

// const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);

// /**
//  * Creates an explosion of particles at (x, y).
//  */
// const createExplosion = (
//   x: number,
//   y: number,
//   particleCount: number = NORMAL_PARTICLE_COUNT,
//   multiplier: number = EXPLOSION_MULTIPLIER
// ): Explosion => {
//   const particles: Particle[] = [];
//   for (let i = 0; i < particleCount; i++) {
//     const angle = Math.random() * 2 * Math.PI;
//     const speed = Math.random() * 2.5 + 1.5;
//     const color = EXPLOSION_COLORS[Math.floor(Math.random() * EXPLOSION_COLORS.length)];
//     const r = Math.random() * 4 + 2; // radius between 2 and 6
//     particles.push({
//       initialX: x,
//       initialY: y,
//       vx: Math.cos(angle) * speed,
//       vy: Math.sin(angle) * speed,
//       color,
//       r,
//     });
//   }
//   return {
//     id: uuidv4(),
//     particles,
//     startTime: performance.now(),
//     duration: EXPLOSION_DURATION,
//     multiplier,
//   };
// };

// const ColorThrowPage: React.FC<ColorThrowPageProps> = ({ onContinue }) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   // Active explosions that are animating
//   const activeExplosionsRef = useRef<Explosion[]>([]);
//   // Static splashes that remain on screen after explosions finish
//   const staticSplashesRef = useRef<StaticParticle[]>([]);
//   const [throwCount, setThrowCount] = useState(0);
//   const [balloons, setBalloons] = useState<Balloon[]>([]);
//   const [burstCount, setBurstCount] = useState(0);

//   // Canvas animation loop: draw active explosions and static splashes
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     const render = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       const now = performance.now();

//       // Draw static splashes
//       staticSplashesRef.current.forEach((p) => {
//         ctx.save();
//         ctx.fillStyle = p.color;
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
//         ctx.fill();
//         ctx.restore();
//       });

//       // Animate active explosions
//       activeExplosionsRef.current = activeExplosionsRef.current.filter((explosion) => {
//         const elapsed = now - explosion.startTime;
//         const progress = Math.min(1, easeOutQuad(elapsed / explosion.duration));

//         explosion.particles.forEach((p) => {
//           const x = p.initialX + p.vx * explosion.multiplier * progress;
//           const y = p.initialY + p.vy * explosion.multiplier * progress;
//           ctx.save();
//           ctx.fillStyle = p.color;
//           ctx.beginPath();
//           ctx.arc(x, y, p.r, 0, 2 * Math.PI);
//           ctx.fill();
//           ctx.restore();
//         });

//         if (elapsed >= explosion.duration) {
//           // Compute and store the final positions of particles
//           explosion.particles.forEach((p) => {
//             const finalX = p.initialX + p.vx * explosion.multiplier;
//             const finalY = p.initialY + p.vy * explosion.multiplier;
//             staticSplashesRef.current.push({
//               x: finalX,
//               y: finalY,
//               color: p.color,
//               r: p.r,
//             });
//           });
//           return false; // Remove finished explosion
//         }
//         return true;
//       });

//       requestAnimationFrame(render);
//     };

//     requestAnimationFrame(render);
//   }, []);

//   // Handle canvas clicks to trigger a normal explosion
//   const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     if (!canvasRef.current) return;
//     const rect = canvasRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     activeExplosionsRef.current.push(createExplosion(x, y));
//     setThrowCount((prev) => prev + 1);
//   };

//   // Spawn new balloons every second
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newBalloon: Balloon = {
//         id: `balloon-${Date.now()}`,
//         x: Math.random() * window.innerWidth,
//         y: window.innerHeight + 100,
//         size: Math.random() * 40 + 60,
//         color: `hsl(${Math.random() * 360}, 100%, 75%)`,
//         rotation: Math.random() * 360,
//         sway: Math.random() * 20 - 10,
//       };
//       setBalloons((prev) => [...prev, newBalloon]);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   // Animate balloons flying upward and swaying
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setBalloons((prevBalloons) =>
//         prevBalloons
//           .map((balloon) => ({
//             ...balloon,
//             y: balloon.y - 2,
//             x: balloon.x + Math.sin(balloon.sway) * 0.5,
//             sway: balloon.sway + 0.05,
//           }))
//           .filter((balloon) => balloon.y > -100)
//       );
//     }, 16);
//     return () => clearInterval(interval);
//   }, []);

//   // Play burst sound when a balloon is clicked
//   const playBurstSound = () => {
//     const burstSound = new Audio(BurstS);
//     burstSound.play();
//   };

//   // Handle balloon click: remove balloon, play sound, trigger a larger explosion
//   const handleBalloonClick = (balloon: Balloon, e: React.MouseEvent<HTMLDivElement>) => {
//     e.stopPropagation();
//     playBurstSound();
//     setBalloons((prev) => prev.filter((b) => b.id !== balloon.id));
//     const centerX = balloon.x + balloon.size / 2;
//     const centerY = balloon.y + (balloon.size * 1.2) / 2;
//     activeExplosionsRef.current.push(
//       createExplosion(centerX, centerY, BALLOON_PARTICLE_COUNT, EXPLOSION_MULTIPLIER * 1.4)
//     );
//     setThrowCount((prev) => prev + 1);
//     setBurstCount((prev) => prev + 1);
//   };

//   return (
//     <div className="relative w-full h-screen bg-white overflow-hidden">
//       <h2 className="absolute top-5 left-1/2 transform -translate-x-1/2 text-2xl font-bold text-gray-800">
//         Tap to throw colors!
//       </h2>
//       <canvas
//         ref={canvasRef}
//         onClick={handleCanvasClick}
//         width={window.innerWidth}
//         height={window.innerHeight}
//         className="block"
//       />
//       {/* Render flying balloons */}
//       {balloons.map((balloon) => (
//         <motion.div
//           key={balloon.id}
//           className="absolute cursor-pointer select-none text-4xl"
//           style={{
//             left: balloon.x,
//             top: balloon.y,
//             width: balloon.size,
//             height: balloon.size * 1.2,
//             transform: `rotate(${balloon.rotation}deg)`,
//             backgroundColor: balloon.color,
//             borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
//           }}
//           initial={{ scale: 0, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           whileHover={{ scale: 1.1 }}
//           onClick={(e) => handleBalloonClick(balloon, e)}
//         >
//           <div
//             style={{
//               position: 'absolute',
//               bottom: '-50%',
//               left: '50%',
//               width: '2px',
//               height: '50%',
//               backgroundColor: '#666',
//               transform: 'translateX(-50%)',
//             }}
//           />
//         </motion.div>
//       ))}
//       {/* Continue button appears after sufficient throws or bursts */}
//       {(throwCount >= 5 || burstCount >= 6) && (
//         <button
//           onClick={onContinue}
//           className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white py-3 px-6 rounded-full shadow-lg text-lg font-bold hover:bg-pink-400 transition"
//         >
//           Continue
//         </button>
//       )}
//       {/* Balloon Flight Animation Keyframes */}
//       <style>{`
//         @keyframes balloonFlight {
//           0% { left: -100px; opacity: 1; transform: translateY(0); }
//           100% { left: 110%; opacity: 1; transform: translateY(-20px); }
//         }
//         .flying-balloon {
//           animation-name: balloonFlight;
//           animation-timing-function: linear;
//           animation-iteration-count: 1;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ColorThrowPage;

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import BurstS from './burst.mp3';
import MusicPlayer from './MusicPlayer'; // Import your MusicPlayer component

interface Particle {
  initialX: number;
  initialY: number;
  vx: number;
  vy: number;
  color: string;
  r: number;
}

interface Explosion {
  id: string;
  particles: Particle[];
  startTime: number;
  duration: number;
  multiplier: number;
}

interface StaticParticle {
  x: number;
  y: number;
  color: string;
  r: number;
}

interface Balloon {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  sway: number;
}

interface ColorThrowPageProps {
  onContinue: () => void;
}

// Explosion settings
const NORMAL_PARTICLE_COUNT = 150;
const BALLOON_PARTICLE_COUNT = 300;
const EXPLOSION_DURATION = 600; // in ms
const EXPLOSION_MULTIPLIER = 50; // base spread distance in pixels

// Colors for explosions
const EXPLOSION_COLORS = [
  '#ff4949',
  '#ffb347',
  '#ffff66',
  '#77dd77',
  '#84b6f4',
  '#c38cff',
];

const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);

/**
 * Creates an explosion of particles at (x, y).
 */
const createExplosion = (
  x: number,
  y: number,
  particleCount: number = NORMAL_PARTICLE_COUNT,
  multiplier: number = EXPLOSION_MULTIPLIER
): Explosion => {
  const particles: Particle[] = [];
  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const speed = Math.random() * 2.5 + 1.5;
    const color = EXPLOSION_COLORS[Math.floor(Math.random() * EXPLOSION_COLORS.length)];
    const r = Math.random() * 4 + 2; // radius between 2 and 6
    particles.push({
      initialX: x,
      initialY: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color,
      r,
    });
  }
  return {
    id: uuidv4(),
    particles,
    startTime: performance.now(),
    duration: EXPLOSION_DURATION,
    multiplier,
  };
};

const ColorThrowPage: React.FC<ColorThrowPageProps> = ({ onContinue }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Active explosions that are animating
  const activeExplosionsRef = useRef<Explosion[]>([]);
  // Static splashes that remain on screen after explosions finish
  const staticSplashesRef = useRef<StaticParticle[]>([]);
  const [throwCount, setThrowCount] = useState(0);
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [burstCount, setBurstCount] = useState(0);

  // Canvas animation loop: draw active explosions and static splashes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = performance.now();

      // Draw static splashes
      staticSplashesRef.current.forEach((p) => {
        ctx.save();
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
      });

      // Animate active explosions
      activeExplosionsRef.current = activeExplosionsRef.current.filter((explosion) => {
        const elapsed = now - explosion.startTime;
        const progress = Math.min(1, easeOutQuad(elapsed / explosion.duration));

        explosion.particles.forEach((p) => {
          const x = p.initialX + p.vx * explosion.multiplier * progress;
          const y = p.initialY + p.vy * explosion.multiplier * progress;
          ctx.save();
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(x, y, p.r, 0, 2 * Math.PI);
          ctx.fill();
          ctx.restore();
        });

        if (elapsed >= explosion.duration) {
          // Compute and store the final positions of particles
          explosion.particles.forEach((p) => {
            const finalX = p.initialX + p.vx * explosion.multiplier;
            const finalY = p.initialY + p.vy * explosion.multiplier;
            staticSplashesRef.current.push({
              x: finalX,
              y: finalY,
              color: p.color,
              r: p.r,
            });
          });
          return false; // Remove finished explosion
        }
        return true;
      });

      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
  }, []);

  // Handle canvas clicks to trigger a normal explosion
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    activeExplosionsRef.current.push(createExplosion(x, y));
    setThrowCount((prev) => prev + 1);
  };

  // Spawn new balloons every second
  useEffect(() => {
    const interval = setInterval(() => {
      const newBalloon: Balloon = {
        id: `balloon-${Date.now()}`,
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 100,
        size: Math.random() * 40 + 60,
        color: `hsl(${Math.random() * 360}, 100%, 75%)`,
        rotation: Math.random() * 360,
        sway: Math.random() * 20 - 10,
      };
      setBalloons((prev) => [...prev, newBalloon]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Animate balloons flying upward and swaying
  useEffect(() => {
    const interval = setInterval(() => {
      setBalloons((prevBalloons) =>
        prevBalloons
          .map((balloon) => ({
            ...balloon,
            y: balloon.y - 2,
            x: balloon.x + Math.sin(balloon.sway) * 0.5,
            sway: balloon.sway + 0.05,
          }))
          .filter((balloon) => balloon.y > -100)
      );
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // Play burst sound when a balloon is clicked
  const playBurstSound = () => {
    const burstSound = new Audio(BurstS);
    burstSound.play();
  };

  // Handle balloon click: remove balloon, play sound, trigger a larger explosion
  const handleBalloonClick = (balloon: Balloon, e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    playBurstSound();
    setBalloons((prev) => prev.filter((b) => b.id !== balloon.id));
    const centerX = balloon.x + balloon.size / 2;
    const centerY = balloon.y + (balloon.size * 1.2) / 2;
    activeExplosionsRef.current.push(
      createExplosion(centerX, centerY, BALLOON_PARTICLE_COUNT, EXPLOSION_MULTIPLIER * 1.4)
    );
    setThrowCount((prev) => prev + 1);
    setBurstCount((prev) => prev + 1);
  };

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      {/* Music Player (fixed in the top-right corner) */}
      <div className="absolute top-4 right-4 z-20">
        <MusicPlayer />
      </div>

      <h2 className="absolute top-5 left-1/2 transform -translate-x-1/2 text-2xl font-bold text-gray-800">
        Tap to throw colors!
      </h2>
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        width={window.innerWidth}
        height={window.innerHeight}
        className="block"
      />
      {/* Render flying balloons */}
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          className="absolute cursor-pointer select-none text-4xl"
          style={{
            left: balloon.x,
            top: balloon.y,
            width: balloon.size,
            height: balloon.size * 1.2,
            transform: `rotate(${balloon.rotation}deg)`,
            backgroundColor: balloon.color,
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={(e) => handleBalloonClick(balloon, e)}
        >
          <div
            style={{
              position: 'absolute',
              bottom: '-50%',
              left: '50%',
              width: '2px',
              height: '50%',
              backgroundColor: '#666',
              transform: 'translateX(-50%)',
            }}
          />
        </motion.div>
      ))}
      {/* Continue button appears after sufficient throws or bursts */}
      {(throwCount >= 5 || burstCount >= 6) && (
        <button
          onClick={onContinue}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white py-3 px-6 rounded-full shadow-lg text-lg font-bold hover:bg-pink-400 transition"
        >
          Continue
        </button>
      )}
      {/* Balloon Flight Animation Keyframes */}
      <style>{`
        @keyframes balloonFlight {
          0% { left: -100px; opacity: 1; transform: translateY(0); }
          100% { left: 110%; opacity: 1; transform: translateY(-20px); }
        }
        .flying-balloon {
          animation-name: balloonFlight;
          animation-timing-function: linear;
          animation-iteration-count: 1;
        }
      `}</style>
    </div>
  );
};

export default ColorThrowPage;
