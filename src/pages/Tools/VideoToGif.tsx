import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Rnd } from 'react-rnd';
import GIF from 'gif.js';

export const VideoToGif: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);

  // Video properties
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoDim, setVideoDim] = useState({ width: 0, height: 0, naturalWidth: 0, naturalHeight: 0 });
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(3);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [fps, setFps] = useState<number>(10);

  // Crop box properties
  const [cropBox, setCropBox] = useState({ x: 0, y: 0, width: 200, height: 200 });

  const duration = Math.max(0.1, endTime - startTime);

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('video/')) {
      alert('Please select a valid video file!');
      return;
    }
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setResult(null);
    setStatusText('');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleVideoLoaded = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.currentTarget;
    const rect = video.getBoundingClientRect();
    const dur = video.duration || 10;
    setVideoDuration(dur);
    setStartTime(0);
    setEndTime(Math.min(3, dur));
    setVideoDim({
      width: rect.width,
      height: rect.height,
      naturalWidth: video.videoWidth,
      naturalHeight: video.videoHeight,
    });
    setCropBox({
      x: (rect.width - 200) / 2,
      y: (rect.height - 200) / 2,
      width: 200,
      height: 200,
    });
  };

  const processVideo = async () => {
    if (!videoRef.current || !selectedFile) return;

    setIsProcessing(true);
    setResult(null);
    setStatusText('Initializing GIF encoder...');

    const video = videoRef.current;
    
    // Calculate scale factor from rendered video to natural video
    const scaleX = videoDim.naturalWidth / videoDim.width;
    const scaleY = videoDim.naturalHeight / videoDim.height;

    const sourceX = cropBox.x * scaleX;
    const sourceY = cropBox.y * scaleY;
    const sourceW = cropBox.width * scaleX;
    const sourceH = cropBox.height * scaleY;

    // Use a fixed output size to avoid massive GIFs, or use the sourceW/sourceH if small enough
    const outputSize = 300; 

    const gif = new GIF({
      workers: 2,
      quality: 10,
      workerScript: '/gif.worker.js',
      width: outputSize,
      height: outputSize,
    });

    const canvas = document.createElement('canvas');
    canvas.width = outputSize;
    canvas.height = outputSize;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) {
      setStatusText('Failed to get canvas context');
      setIsProcessing(false);
      return;
    }

    const delay = 1000 / fps;
    const totalFrames = Math.floor(duration * fps);
    let currentFrame = 0;

    gif.on('progress', (p: number) => {
      setStatusText(`Encoding GIF... ${Math.round(p * 100)}%`);
    });

    gif.on('finished', (blob: Blob) => {
      const url = URL.createObjectURL(blob);
      setResult(url);
      setStatusText('Done!');
      setIsProcessing(false);
    });

    // Pause video to manually seek
    video.pause();
    
    setStatusText('Extracting frames...');

    for (let i = 0; i < totalFrames; i++) {
      const time = startTime + (i / fps);
      video.currentTime = time;
      
      // Wait for seeked event
      await new Promise<void>((resolve) => {
        const onSeeked = () => {
          video.removeEventListener('seeked', onSeeked);
          resolve();
        };
        video.addEventListener('seeked', onSeeked);
      });

      ctx.clearRect(0, 0, outputSize, outputSize);
      ctx.drawImage(
        video,
        sourceX, sourceY, sourceW, sourceH,
        0, 0, outputSize, outputSize
      );

      gif.addFrame(ctx, { copy: true, delay });
      currentFrame++;
      setStatusText(`Extracting frames... ${currentFrame}/${totalFrames}`);
    }

    setStatusText('Rendering GIF...');
    gif.render();
  };

  return (
    <div style={{
      fontFamily: "'VT323', 'DotGothic16', monospace",
      background: '#0F0E17',
      color: '#FFFFFE',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '60px 24px',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Helmet>
        <title>Video to GIF | adi's Toolbox</title>
        <meta name="description" content="Crop a square from a video and convert it to a GIF." />
      </Helmet>

      {/* Main Container */}
      <div style={{
        maxWidth: '800px',
        width: '100%',
        zIndex: 1
      }}>
        {/* Back Link */}
        <div style={{ marginBottom: '24px' }}>
          <Link 
            to="/tools" 
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.75rem',
              color: '#FF8E3C',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#2A2A3B',
              padding: '8px 16px',
              border: '3px solid #000000',
              boxShadow: '3px 3px 0px #000000',
              imageRendering: 'pixelated'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#FF8E3C';
              e.currentTarget.style.color = '#0F0E17';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#2A2A3B';
              e.currentTarget.style.color = '#FF8E3C';
            }}
          >
            ◄ BACK TO TOOLBOX
          </Link>
        </div>

        {/* Retro Card */}
        <div style={{
          background: '#16161A',
          padding: '40px 32px',
          border: '4px solid #000000',
          boxShadow: '8px 8px 0px #000000, inset -3px -3px 0px #242629, inset 3px 3px 0px #383A3F',
          imageRendering: 'pixelated'
        }}>
          {/* Header */}
          <div style={{ marginBottom: '32px', borderBottom: '3px dashed #383A3F', paddingBottom: '20px' }}>
            <div 
              className="game-blink"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.65rem',
                letterSpacing: '1px',
                marginBottom: '8px'
              }}
            >
              ★ SYSTEM UTILITY // CONVERTER ★
            </div>
            <h1 
              className="game-color-shift"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '1.6rem',
                margin: '0 0 12px 0',
                lineHeight: 1.3
              }}
            >
              VIDEO TO GIF CROPPER
            </h1>
            <p style={{ color: '#A7A9BE', fontSize: '1.2rem', margin: 0 }}>
              Select a square region from your video and export it as a GIF.
            </p>
          </div>

          {/* Upload Dropzone */}
          {!videoUrl && (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.style.background = '#2A2A3B';
                e.currentTarget.style.borderColor = '#FF8E3C';
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.currentTarget.style.background = '#0F0E17';
                e.currentTarget.style.borderColor = '#383A3F';
              }}
              onDrop={(e) => {
                handleDrop(e);
                e.currentTarget.style.background = '#0F0E17';
                e.currentTarget.style.borderColor = '#383A3F';
              }}
              onClick={() => document.getElementById('fileInput')?.click()}
              style={{
                border: '3px dashed #383A3F',
                padding: '36px 20px',
                cursor: 'pointer',
                background: '#0F0E17',
                marginBottom: '28px',
                transition: 'all 0.1s step-end',
                textAlign: 'center'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  fontFamily: "'Press Start 2P', monospace",
                  width: '48px', 
                  height: '48px', 
                  border: '3px solid #000000', 
                  boxShadow: '3px 3px 0px #000000',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  background: '#FF8E3C',
                  color: '#0F0E17'
                }}>
                  +
                </div>
                <span style={{ fontSize: '1.2rem', color: '#FFFFFE' }}>
                  Drag & drop video file here, or click to browse
                </span>
              </div>
              <input
                type="file"
                id="fileInput"
                accept="video/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleFileChange(e.target.files[0]);
                  }
                }}
              />
            </div>
          )}

          {/* Video Preview & Cropper */}
          {videoUrl && (
            <div style={{ marginBottom: '28px' }}>
              <label style={{ 
                fontFamily: "'Press Start 2P', monospace", 
                fontSize: '0.7rem', 
                color: '#2CB67D',
                marginBottom: '8px',
                display: 'block'
              }}>
                PREVIEW & CROP AREA
              </label>
              {/* Custom Integrated Player with Built-in Timeline Controls */}
              <div style={{ 
                position: 'relative', 
                border: '4px solid #000000', 
                background: '#0F0E17',
                boxShadow: '6px 6px 0px #000000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '100%',
                overflow: 'hidden',
                borderRadius: '2px'
              }}>
                {/* Video Display Area */}
                <div style={{ 
                  position: 'relative', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  width: '100%',
                  background: '#050508',
                  minHeight: '260px'
                }}>
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    crossOrigin="anonymous"
                    onLoadedData={handleVideoLoaded}
                    onTimeUpdate={() => {
                      if (videoRef.current) {
                        setCurrentTime(videoRef.current.currentTime);
                        if (videoRef.current.currentTime >= endTime) {
                          videoRef.current.currentTime = startTime;
                        }
                      }
                    }}
                    style={{ display: 'block', maxWidth: '100%', maxHeight: '420px', objectFit: 'contain' }}
                  />
                  
                  {videoDim.width > 0 && (
                    <Rnd
                      bounds="parent"
                      position={{ x: cropBox.x, y: cropBox.y }}
                      size={{ width: cropBox.width, height: cropBox.height }}
                      onDragStop={(_e, d) => {
                        setCropBox(prev => ({ ...prev, x: d.x, y: d.y }));
                      }}
                      onResizeStop={(_e, _dir, ref, _delta, position) => {
                        const newSize = Math.max(50, Math.min(ref.offsetWidth, ref.offsetHeight));
                        setCropBox({
                          width: newSize,
                          height: newSize,
                          x: position.x,
                          y: position.y
                        });
                      }}
                      lockAspectRatio={true}
                      style={{
                        border: '3px dashed #2CB67D',
                        boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6)',
                        cursor: 'move',
                        zIndex: 10
                      }}
                    >
                      <div style={{
                        position: 'absolute',
                        top: '4px',
                        left: '4px',
                        background: '#2CB67D',
                        color: '#0F0E17',
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: '0.5rem',
                        padding: '2px 4px',
                        fontWeight: 'bold',
                        pointerEvents: 'none'
                      }}>
                        GIF CROP
                      </div>
                    </Rnd>
                  )}
                </div>

                {/* Sleek Player Control Bar */}
                <div style={{
                  width: '100%',
                  background: '#16161A',
                  borderTop: '3px solid #000000',
                  padding: '16px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  boxSizing: 'border-box'
                }}>
                  {/* Timeline Title & Time Indicators */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        width: '10px',
                        height: '10px',
                        background: '#2CB67D',
                        display: 'inline-block',
                        boxShadow: '0 0 6px #2CB67D'
                      }} />
                      <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.65rem', color: '#FFFFFE' }}>
                        TRIM TIMELINE
                      </span>
                    </div>

                    <div style={{ fontFamily: "'VT323', monospace", fontSize: '1.2rem', color: '#FF8E3C', display: 'flex', gap: '12px' }}>
                      <span>CUR: <strong style={{ color: '#2CB67D' }}>{currentTime.toFixed(1)}s</strong></span>
                      <span>RANGE: <strong>{startTime.toFixed(1)}s - {endTime.toFixed(1)}s</strong></span>
                      <span>DUR: <strong>{duration.toFixed(1)}s</strong></span>
                    </div>
                  </div>

                  {/* Multi-layer Interactive Timeline Track */}
                  <div style={{
                    position: 'relative',
                    height: '32px',
                    background: '#0F0E17',
                    border: '2px solid #383A3F',
                    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.8)',
                    borderRadius: '3px',
                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'visible'
                  }}>
                    {/* Selected Clip Highlight Area */}
                    <div style={{
                      position: 'absolute',
                      left: `${videoDuration ? (startTime / videoDuration) * 100 : 0}%`,
                      width: `${videoDuration ? ((endTime - startTime) / videoDuration) * 100 : 0}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, rgba(255, 142, 60, 0.2) 0%, rgba(255, 142, 60, 0.4) 50%, rgba(255, 142, 60, 0.2) 100%)',
                      borderLeft: '3px solid #FF8E3C',
                      borderRight: '3px solid #FF8E3C',
                      boxSizing: 'border-box'
                    }} />

                    {/* Current Playhead Indicator */}
                    <div style={{
                      position: 'absolute',
                      left: `${videoDuration ? (currentTime / videoDuration) * 100 : 0}%`,
                      width: '2px',
                      height: '100%',
                      background: '#2CB67D',
                      boxShadow: '0 0 8px #2CB67D',
                      zIndex: 3,
                      pointerEvents: 'none'
                    }} />

                    {/* Scrubber Range Input */}
                    <input
                      type="range"
                      min={0}
                      max={videoDuration || 10}
                      step={0.1}
                      value={currentTime}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 0;
                        setCurrentTime(val);
                        if (videoRef.current) {
                          videoRef.current.currentTime = val;
                        }
                      }}
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        margin: 0,
                        opacity: 0,
                        cursor: 'pointer',
                        zIndex: 5
                      }}
                    />

                    {/* Draggable Start Handle (開始槓槓) */}
                    <input
                      type="range"
                      min={0}
                      max={videoDuration || 10}
                      step={0.1}
                      value={startTime}
                      onChange={(e) => {
                        const val = Math.min(parseFloat(e.target.value) || 0, endTime - 0.1);
                        setStartTime(val);
                        if (videoRef.current) {
                          videoRef.current.currentTime = val;
                        }
                      }}
                      title={`Drag Start Marker: ${startTime.toFixed(1)}s`}
                      style={{
                        position: 'absolute',
                        left: `calc(${videoDuration ? (startTime / videoDuration) * 100 : 0}% - 10px)`,
                        width: '20px',
                        height: '100%',
                        margin: 0,
                        opacity: 0,
                        cursor: 'ew-resize',
                        zIndex: 6
                      }}
                    />
                    <div 
                      style={{
                        position: 'absolute',
                        left: `calc(${videoDuration ? (startTime / videoDuration) * 100 : 0}% - 6px)`,
                        width: '12px',
                        height: '100%',
                        background: '#FF8E3C',
                        border: '2px solid #000000',
                        boxShadow: '0 0 6px #FF8E3C',
                        zIndex: 2,
                        pointerEvents: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '8px',
                        fontWeight: 'bold',
                        color: '#0F0E17',
                        fontFamily: "'Press Start 2P', monospace"
                      }}
                    >
                      S
                    </div>

                    {/* Draggable End Handle (結束槓槓) */}
                    <input
                      type="range"
                      min={0}
                      max={videoDuration || 10}
                      step={0.1}
                      value={endTime}
                      onChange={(e) => {
                        const val = Math.max(parseFloat(e.target.value) || 0.1, startTime + 0.1);
                        setEndTime(val);
                        if (videoRef.current) {
                          videoRef.current.currentTime = val;
                        }
                      }}
                      title={`Drag End Marker: ${endTime.toFixed(1)}s`}
                      style={{
                        position: 'absolute',
                        left: `calc(${videoDuration ? (endTime / videoDuration) * 100 : 0}% - 10px)`,
                        width: '20px',
                        height: '100%',
                        margin: 0,
                        opacity: 0,
                        cursor: 'ew-resize',
                        zIndex: 7
                      }}
                    />
                    <div 
                      style={{
                        position: 'absolute',
                        left: `calc(${videoDuration ? (endTime / videoDuration) * 100 : 0}% - 6px)`,
                        width: '12px',
                        height: '100%',
                        background: '#FF8E3C',
                        border: '2px solid #000000',
                        boxShadow: '0 0 6px #FF8E3C',
                        zIndex: 2,
                        pointerEvents: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '8px',
                        fontWeight: 'bold',
                        color: '#0F0E17',
                        fontFamily: "'Press Start 2P', monospace"
                      }}
                    >
                      E
                    </div>
                  </div>

                  {/* Action Bar & Quick Setter Buttons */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginTop: '4px' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <button
                        type="button"
                        onClick={() => {
                          if (videoRef.current) {
                            if (videoRef.current.paused) {
                              if (videoRef.current.currentTime < startTime || videoRef.current.currentTime >= endTime) {
                                videoRef.current.currentTime = startTime;
                              }
                              const playPromise = videoRef.current.play();
                              if (playPromise !== undefined) {
                                playPromise.catch(() => {});
                              }
                            } else {
                              videoRef.current.pause();
                            }
                          }
                        }}
                        style={{
                          fontFamily: "'Press Start 2P', monospace",
                          fontSize: '0.65rem',
                          background: '#FF8E3C',
                          color: '#0F0E17',
                          border: '2px solid #000000',
                          padding: '8px 14px',
                          cursor: 'pointer',
                          boxShadow: '3px 3px 0px #000000'
                        }}
                      >
                        ▶ PLAY / PAUSE
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (videoRef.current) {
                            setStartTime(videoRef.current.currentTime);
                          }
                        }}
                        style={{
                          fontFamily: "'Press Start 2P', monospace",
                          fontSize: '0.6rem',
                          background: '#2A2A3B',
                          color: '#2CB67D',
                          border: '2px solid #000000',
                          padding: '8px 12px',
                          cursor: 'pointer',
                          boxShadow: '2px 2px 0px #000000'
                        }}
                      >
                        SET START [S]
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (videoRef.current && videoRef.current.currentTime > startTime) {
                            setEndTime(videoRef.current.currentTime);
                          }
                        }}
                        style={{
                          fontFamily: "'Press Start 2P', monospace",
                          fontSize: '0.6rem',
                          background: '#2A2A3B',
                          color: '#2CB67D',
                          border: '2px solid #000000',
                          padding: '8px 12px',
                          cursor: 'pointer',
                          boxShadow: '2px 2px 0px #000000'
                        }}
                      >
                        SET END [E]
                      </button>
                    </div>

                    <div style={{
                      fontFamily: "'VT323', monospace",
                      fontSize: '1.2rem',
                      color: '#A7A9BE'
                    }}>
                      TOTAL: {videoDuration.toFixed(1)}s
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings */}
          {videoUrl && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '28px'
            }}>
              <div style={{
                flex: 1,
                minWidth: '150px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                border: '3px solid #000000',
                padding: '16px',
                background: '#0F0E17',
                boxShadow: '4px 4px 0px #000000'
              }}>
                <label style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.65rem', color: '#FFFFFE' }}>
                  FPS
                </label>
                <input
                  type="number"
                  value={fps}
                  min={1}
                  max={30}
                  onChange={(e) => setFps(parseInt(e.target.value) || 10)}
                  style={{
                    fontFamily: "'VT323', monospace",
                    background: '#16161A',
                    border: '3px solid #000000',
                    color: '#FF8E3C',
                    padding: '8px',
                    fontSize: '1.2rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          )}

          {/* Action Button */}
          {videoUrl && (
            <button
              onClick={processVideo}
              disabled={isProcessing}
              style={{
                fontFamily: "'Press Start 2P', monospace",
                background: isProcessing ? '#383A3F' : '#2CB67D',
                color: isProcessing ? '#A7A9BE' : '#0F0E17',
                border: '3px solid #000000',
                padding: '18px',
                fontSize: '0.85rem',
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                width: '100%',
                boxShadow: isProcessing ? 'none' : '5px 5px 0px #000000',
                transition: 'all 0.1s step-end',
                imageRendering: 'pixelated'
              }}
              onMouseDown={(e) => {
                if (isProcessing) return;
                e.currentTarget.style.transform = 'translate(3px, 3px)';
                e.currentTarget.style.boxShadow = '2px 2px 0px #000000';
              }}
              onMouseUp={(e) => {
                if (isProcessing) return;
                e.currentTarget.style.transform = 'translate(0px, 0px)';
                e.currentTarget.style.boxShadow = '5px 5px 0px #000000';
              }}
            >
              {isProcessing ? 'PROCESSING...' : 'EXPORT GIF ►'}
            </button>
          )}

          {/* Status Output Terminal */}
          {statusText && (
            <div style={{ 
              marginTop: '24px', 
              padding: '16px', 
              border: '3px solid #000000', 
              background: '#0F0E17', 
              color: '#2CB67D', 
              fontFamily: "'VT323', monospace",
              fontSize: '1.2rem',
              boxShadow: '4px 4px 0px #000000'
            }}>
              {'>'} {statusText}
            </div>
          )}

          {/* Result Output */}
          {result && (
            <div style={{
              marginTop: '28px',
              padding: '24px',
              border: '3px solid #2CB67D',
              background: '#0F0E17',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              boxShadow: '5px 5px 0px #000000'
            }}>
              <div style={{ 
                fontFamily: "'Press Start 2P', monospace", 
                fontSize: '0.8rem', 
                color: '#2CB67D' 
              }}>
                ✓ CONVERSION COMPLETE
              </div>
              <div style={{ border: '3px solid #000000', padding: '8px', background: '#16161A' }}>
                <img src={result} alt="Generated GIF" style={{ maxWidth: '100%', maxHeight: '300px', display: 'block', imageRendering: 'pixelated' }} />
              </div>
              <a
                href={result}
                download={`${selectedFile?.name || 'video'}.gif`}
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  display: 'block',
                  background: '#FF8E3C',
                  color: '#0F0E17',
                  textDecoration: 'none',
                  padding: '16px 20px',
                  fontSize: '0.8rem',
                  width: '100%',
                  textAlign: 'center',
                  border: '3px solid #000000',
                  boxShadow: '4px 4px 0px #000000',
                  boxSizing: 'border-box'
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'translate(3px, 3px)';
                  e.currentTarget.style.boxShadow = '1px 1px 0px #000000';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'translate(0px, 0px)';
                  e.currentTarget.style.boxShadow = '4px 4px 0px #000000';
                }}
              >
                DOWNLOAD GIF (.GIF) ►
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
