// import React, { useState } from 'react';
// import { Music, Music as MusicOff } from 'lucide-react';
// import Musicc from '../music/music.mp3';

// const MusicPlayer: React.FC = () => {
//   const [isPlaying, setIsPlaying] = useState(false);

//   const toggleMusic = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.stopPropagation();
//     const audio = document.getElementById('bgMusic') as HTMLAudioElement;
//     if (isPlaying) {
//       audio.pause();
//     } else {
//       audio.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   return (
//     <>
//       <audio id="bgMusic" loop>
//         <source src={Musicc} type="audio/mpeg" />
//       </audio>
//       <div className="fixed top-4 right-4 flex flex-col items-end gap-2">
//         <p className="text-sm font-comic text-gray-600 bg-white px-4 py-2 rounded-full shadow-md animate-pulse">
//           Click the music icon to play! 🎵
//         </p>
//         <button onClick={toggleMusic} className="p-3 bg-white rounded-full shadow-lg hover:bg-blue-100 transition-colors">
//           {isPlaying ? (
//             <MusicOff className="w-6 h-6 text-blue-600" />
//           ) : (
//             <Music className="w-6 h-6 text-blue-600" />
//           )}
//         </button>
//       </div>
//     </>
//   );
// };

// export default MusicPlayer;



import React, { useState, useRef } from 'react';
import { Music, Pause } from 'lucide-react';
import Musicc from '../music/music.mp3';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} id="bgMusic" loop>
        <source src={Musicc} type="audio/mpeg" />
      </audio>
      <div className="fixed top-4 right-4 flex flex-col items-end gap-2 z-50">
        <p className="text-sm font-comic text-gray-600 bg-white px-4 py-2 rounded-full shadow-md animate-pulse">
          Click the music icon to play! 🎵
        </p>
        <button
          onClick={toggleMusic}
          className="p-3 bg-white rounded-full shadow-lg hover:bg-blue-100 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-blue-600" />
          ) : (
            <Music className="w-6 h-6 text-blue-600" />
          )}
        </button>
      </div>
    </>
  );
};

export default MusicPlayer;
