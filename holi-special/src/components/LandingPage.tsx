import React, { useRef, useEffect } from 'react';
import Video from '../video/Video.mp4';
import Musicc from '../music/music.mp3';

const lyricsData = [
  { time: 2, text: "BAS MERE LIYE,"},
  { time: 3, text: "TU KHILKE KABHI,"},
  { time: 6, text: "MUSKURA DE NA..."}
];

interface LandingPageProps {
  onContinue: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onContinue }) => {
  // Refs for DOM elements
  const audioRef = useRef<HTMLAudioElement>(null);
  const lyricsContainerRef = useRef<HTMLDivElement>(null);
  const balloonContainerRef = useRef<HTMLDivElement>(null);

  // Mutable variables stored in refs
  const currentLyricIndexRef = useRef(0);
  const currentGroupCountRef = useRef(0);
  const pendingLyricRef = useRef<null | { time: number; text: string }>(null);
  const isFadingOutRef = useRef(false);
  const currentFloatDurationRef = useRef(8.0);
  const balloonIntervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start button handler: resets variables, starts audio and balloon spawning.
  const handleStartButtonClick = () => {
    currentLyricIndexRef.current = 0;
    currentGroupCountRef.current = 0;
    pendingLyricRef.current = null;
    isFadingOutRef.current = false;
    if (lyricsContainerRef.current) {
      lyricsContainerRef.current.innerHTML = "";
    }
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => console.error("Audio playback failed:", err));
    }
    if (balloonIntervalIdRef.current) {
      clearInterval(balloonIntervalIdRef.current);
    }
    balloonIntervalIdRef.current = setInterval(createBalloon, 2000);
  };

  // Process and display a lyric when audio currentTime reaches its time.
  const processLyric = (lyricObj: { time: number; text: string }) => {
    if (currentGroupCountRef.current < 3) {
      appendLyric(lyricObj);
      currentGroupCountRef.current++;
      currentLyricIndexRef.current++;
    } else {
      if (!isFadingOutRef.current) {
        pendingLyricRef.current = lyricObj;
        isFadingOutRef.current = true;
        fadeOutCurrentGroup(() => {
          if (lyricsContainerRef.current) {
            lyricsContainerRef.current.innerHTML = "";
          }
          currentGroupCountRef.current = 0;
          isFadingOutRef.current = false;
          if (pendingLyricRef.current) {
            appendLyric(pendingLyricRef.current);
            currentGroupCountRef.current++;
            pendingLyricRef.current = null;
            currentLyricIndexRef.current++;
          }
        });
      }
    }
  };

  const appendLyric = (lyricObj: { time: number; text: string }) => {
    displayFadeLyric(lyricObj.text);
  };

  const fadeOutCurrentGroup = (callback: () => void) => {
    if (lyricsContainerRef.current) {
      const children = Array.from(lyricsContainerRef.current.children);
      children.forEach(child => child.classList.add('fade-out'));
      setTimeout(callback, 800);
    }
  };

  const displayFadeLyric = (text: string) => {
    if (lyricsContainerRef.current) {
      const newEl = document.createElement('div');
      newEl.className = 'lyric-line';
      newEl.innerHTML = text.split('\n').join('<br>');
      newEl.style.animation = 'fadeIn 0.8s ease forwards';
      lyricsContainerRef.current.appendChild(newEl);
    }
  };

  // Balloon creation and effects
  const createBalloon = () => {
    if (!balloonContainerRef.current) return;
    const balloonWrapper = document.createElement('div');
    balloonWrapper.className = 'balloon';
    balloonWrapper.style.animationDuration = currentFloatDurationRef.current + 's';

    const balloonShape = document.createElement('div');
    balloonShape.className = 'balloon-shape';

    const balloonString = document.createElement('div');
    balloonString.className = 'balloon-string';

    const randomHue = Math.floor(Math.random() * 360);
    const randomSaturation = 80 + Math.floor(Math.random() * 20);
    const randomLightness = 40 + Math.floor(Math.random() * 20);
    const balloonColor = `hsl(${randomHue}, ${randomSaturation}%, ${randomLightness}%)`;

    balloonWrapper.setAttribute('data-color', balloonColor);
    balloonShape.style.background = `radial-gradient(circle at 30% 30%, #fff, ${balloonColor})`;
    balloonWrapper.style.left = Math.floor(Math.random() * 90) + '%';

    balloonWrapper.appendChild(balloonShape);
    balloonWrapper.appendChild(balloonString);
    balloonContainerRef.current.appendChild(balloonWrapper);

    const popTime = Math.random() * 2000 + 1000;
    const autoPopTimer = setTimeout(() => popBalloon(balloonWrapper), popTime);

    balloonShape.addEventListener('click', () => {
      clearTimeout(autoPopTimer);
      popBalloon(balloonWrapper);
    });
  };

  const popBalloon = (balloonWrapper: HTMLElement) => {
    if (!balloonWrapper.parentNode) return;
    const rect = balloonWrapper.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    balloonWrapper.remove();

    const splash = document.createElement('div');
    splash.className = 'splash';
    splash.style.left = x + 'px';
    splash.style.top = y + 'px';

    const color = balloonWrapper.getAttribute('data-color') || '#00f';
    splash.style.background = `radial-gradient(circle, ${color} 20%, transparent 70%)`;
    const randomAngle = Math.floor(Math.random() * 360);
    splash.style.transform = `translate(-50%, -50%) rotate(${randomAngle}deg)`;
    if (balloonContainerRef.current) {
      balloonContainerRef.current.appendChild(splash);
      splash.addEventListener('animationend', () => splash.remove());
    }
    triggerConfetti(x, y);
  };

  const adjustBalloonSpeed = (currentTime: number) => {
    const startTime = 0;
    const endTime = 10;
    if (currentTime < startTime) {
      currentFloatDurationRef.current = 8.0;
      return;
    }
    if (currentTime > endTime) {
      currentFloatDurationRef.current = 4.0;
      return;
    }
    const progress = (currentTime - startTime) / (endTime - startTime);
    currentFloatDurationRef.current = 8.0 - 4.0 * progress;
  };

  const triggerConfetti = (x: number, y: number) => {
    if (!balloonContainerRef.current) return;
    for (let i = 0; i < 20; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      const hue = Math.floor(Math.random() * 360);
      confetti.style.backgroundColor = `hsl(${hue}, 80%, 60%)`;
      confetti.style.left = (x + (Math.random() * 50 - 25)) + 'px';
      confetti.style.top = (y + (Math.random() * 50 - 25)) + 'px';
      confetti.style.animationDelay = Math.random() * 0.5 + 's';
      balloonContainerRef.current.appendChild(confetti);
      confetti.addEventListener('animationend', () => confetti.remove());
    }
  };

  // Audio timeupdate handler: process lyrics and adjust balloon speed.
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      if (currentLyricIndexRef.current < lyricsData.length) {
        const nextLyric = lyricsData[currentLyricIndexRef.current];
        if (currentTime >= nextLyric.time) {
          processLyric(nextLyric);
        }
      }
      adjustBalloonSpeed(currentTime);
    }
  };

  // When the audio ends, fade out all lyrics.
  const handleAudioEnded = () => {
    if (lyricsContainerRef.current) {
      const children = Array.from(lyricsContainerRef.current.children);
      children.forEach(child => child.classList.add('fade-out'));
      setTimeout(() => {
        if (lyricsContainerRef.current) {
          lyricsContainerRef.current.innerHTML = "";
        }
      }, 800);
    }
  };

  useEffect(() => {
    const audioEl = audioRef.current;
    if (audioEl) {
      audioEl.addEventListener('timeupdate', handleTimeUpdate);
      audioEl.addEventListener('ended', handleAudioEnded);
    }
    return () => {
      if (audioEl) {
        audioEl.removeEventListener('timeupdate', handleTimeUpdate);
        audioEl.removeEventListener('ended', handleAudioEnded);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (balloonIntervalIdRef.current) clearInterval(balloonIntervalIdRef.current);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video autoPlay muted loop id="bgVideo" className="absolute w-full h-full object-cover">
        <source src={Video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Glassmorphism Music Icon Button */}
      <button
        id="startButton"
        onClick={handleStartButtonClick}
        title="Play Music"
        className="absolute top-4 right-4 z-20 p-4 bg-white/60 rounded-full shadow-lg"
      >
        <span role="img" aria-label="music">🎵</span>
      </button>

      {/* Hidden Audio */}
      <audio id="audio" ref={audioRef} src={Musicc} />

      {/* Lyrics Container */}
      <div id="lyricsContainer" ref={lyricsContainerRef} className="lyrics-container absolute top-0 left-0 w-full p-4 z-20" />

      {/* Glassmorphism Message Card */}
      <div
        id="messageCard"
        className="glass-card absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 p-6 bg-white/70 rounded-xl shadow-xl max-w-md text-center"
      >
        <p>
          Hii Madam Jii, <br /><br />
          I don't know what you're doing now but anyways stay happpy as always.
          Happy Holi! May your day be filled with vibrant colors, joy, and love. <br /><br />
          Let’s celebrate this festival together!
        </p>
      </div>

      {/* Balloon Container */}
      <div id="balloonsContainer" ref={balloonContainerRef} className="balloons-container absolute inset-0 z-10" />

      {/* Continue Button */}
      <button
        id="continueButton"
        onClick={onContinue}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 bg-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-300"
      >
        See what i have prepared for you
      </button>

      {/* Inline styles and keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        .fade-out {
          animation: fadeOut 0.8s ease forwards;
        }
        .lyric-line {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 3rem;
          color: white;
          margin-bottom: 4px;
        }
        .balloon {
          position: absolute;
          bottom: -100px;
          animation: floatUp linear forwards;
        }
        .balloon-shape {
          width: 40px;
          height: 50px;
          border-radius: 50%;
          background: red;
        }
        .balloon-string {
          width: 2px;
          height: 40px;
          background: #fff;
          margin: 0 auto;
        }
        .splash {
          position: absolute;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          animation: fadeIn 0.8s ease forwards;
        }
        .confetti {
          position: absolute;
          width: 8px;
          height: 8px;
          animation: fadeIn 1s ease forwards;
        }
        @keyframes floatUp {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(-120vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;

