import React, { createContext, useContext, useRef } from 'react';

const ClickSoundContext = createContext(() => {});

const clickSound = '/assets/sound-effects/click/base-click.mov';

// why? 全域狀態管理
// 避免prop drilling, 避免重複的props

// audio 的 ref 是全域狀態管理 避免重複創建
// 封裝音效

// provideer包裝 preload 確保快速播放

// hook: export function useclicksound...

export function ClickSoundProvider({ children }) {
  const audioRef = useRef(null);
  const audioInitialized = useRef(false);
  
  const initializeAudio = () => {
    if (!audioInitialized.current && audioRef.current) {
      // Safari needs user interaction to initialize audio
      audioRef.current.muted = true;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          audioRef.current.muted = false;
          audioInitialized.current = true;
        }).catch(() => {
          // If muted autoplay fails, we'll try on next user interaction
        });
      }
    }
  };
  
  const playClick = () => {
    try {
      if (audioRef.current) {
        // Initialize audio on first user interaction for Safari
        if (!audioInitialized.current) {
          initializeAudio();
        }
        
        audioRef.current.currentTime = 0;
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(e => {
            // 靜默處理音頻播放錯誤，避免觸發 React 錯誤邊界
            console.warn('Sound Play Error (handled):', e.message);
          });
        }
      }
    } catch (error) {
      // 捕獲同步錯誤
      console.warn('Sound Play Sync Error (handled):', error.message);
    }
  };
  return (
    <ClickSoundContext.Provider value={playClick}>
      <audio 
        ref={audioRef} 
        src={clickSound} 
        preload="auto" 
        onError={(e) => console.warn('Audio load error (handled):', e)}
      />
      {children}
    </ClickSoundContext.Provider>
  );
}

// hook 提供api給外部組件使用
// example: const playClick = useClickSound();
export function useClickSound() {
  return useContext(ClickSoundContext);
} 

// ex:
// 1
// export function useSound() {
//   const context = useContext(SoundContext);
//   return (soundName) => context.playSound(soundName);
// }

// // 使用
// const playSound = useSound();
// playSound('click');  // 播放任意音效

// 2.
// 在組件中使用
// const { playClick, playHover, playSuccess } = useSound();

// // 按鈕點擊時
// <button onClick={() => { playClick(); handleClick(); }}>
//   點擊我
// </button>

const SoundContext = createContext(() => {});
const soundEffects = {
  cancel: '/assets/sound-effects/cancel.1.mp3',
};

export function SoundProvider({ children }) {
  const audioRefs = useRef({});

  const audioInitialized = useRef({});
  
  const initializeAudio = (soundName) => {
    if (!audioRefs.current[soundName]) {
      audioRefs.current[soundName] = new Audio(soundEffects[soundName]);
      audioRefs.current[soundName].preload = 'auto';
      audioInitialized.current[soundName] = false;
    }
  }

  const playSound = (soundName) => {
    try {
      initializeAudio(soundName);
      const a = audioRefs.current[soundName];
      if(a){
        // Safari audio initialization on first user interaction
        if (!audioInitialized.current[soundName]) {
          a.muted = true;
          const initPromise = a.play();
          if (initPromise !== undefined) {
            initPromise.then(() => {
              a.pause();
              a.currentTime = 0;
              a.muted = false;
              audioInitialized.current[soundName] = true;
              // Now play the actual sound
              a.currentTime = 0;
              const playPromise = a.play();
              if (playPromise !== undefined) {
                playPromise.catch(e => {
                  console.warn('Sound Play Error (handled):', e.message);
                });
              }
            }).catch(() => {
              // If muted autoplay fails, try direct play
              a.muted = false;
              a.currentTime = 0;
              const playPromise = a.play();
              if (playPromise !== undefined) {
                playPromise.catch(e => {
                  console.warn('Sound Play Error (handled):', e.message);
                });
              }
            });
          }
        } else {
          a.currentTime = 0;
          const playPromise = a.play();
          
          if (playPromise !== undefined) {
            playPromise.catch(e => {
              console.warn('Sound Play Error (handled):', e.message);
            });
          }
        }
      }
    } catch (error) {
      console.warn('Sound Play Sync Error (handled):', error.message);
    }
  }

  // action ... 追加
  const actions = {
    playCancel: () => playSound('cancel'),
  }

  return (
    <SoundContext.Provider value={actions}>
      {children}
    </SoundContext.Provider>
  )
}
  
export function useSound() {
  return useContext(SoundContext);
}