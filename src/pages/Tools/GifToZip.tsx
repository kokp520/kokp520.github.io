import React, { useState } from 'react';
import JSZip from 'jszip';
import omggif from 'omggif';

export const GifToZip: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [frameCount, setFrameCount] = useState<number>(100);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>('');
  const [result, setResult] = useState<{ thumb: string; zipUrl: string; fileName: string } | null>(null);

  const handleFileChange = (file: File) => {
    if (file.type !== 'image/gif') {
      alert('請選擇 GIF 檔案！');
      return;
    }
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null);
    setStatusText('');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const processGif = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setResult(null);
    setStatusText('讀取 GIF 中... (這可能需要幾秒鐘)');

    await new Promise((r) => setTimeout(r, 50));

    try {
      const buffer = await selectedFile.arrayBuffer();
      const byteArray = new Uint8Array(buffer);
      const reader = new omggif.GifReader(byteArray);

      const totalFrames = reader.numFrames();
      const width = reader.width;
      const height = reader.height;

      setStatusText(`解析成功！原始影格：${totalFrames} 幀，準備提取...`);
      await new Promise((r) => setTimeout(r, 50));

      const extractedFrames: HTMLCanvasElement[] = [];
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas Context 未能建立');

      const imageData = ctx.createImageData(width, height);
      let previousImageData: Uint8ClampedArray | null = null;

      for (let i = 0; i < totalFrames; i++) {
        const frameInfo = reader.frameInfo(i);

        if (frameInfo.disposal === 3) {
          previousImageData = new Uint8ClampedArray(imageData.data);
        }

        reader.decodeAndBlitFrameRGBA(i, imageData.data);

        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = width;
        tempCanvas.height = height;
        const tempCtx = tempCanvas.getContext('2d');
        if (tempCtx) {
          tempCtx.putImageData(imageData, 0, 0);
          extractedFrames.push(tempCanvas);
        }

        if (frameInfo.disposal === 2) {
          for (let y = frameInfo.y; y < frameInfo.y + frameInfo.height; y++) {
            for (let x = frameInfo.x; x < frameInfo.x + frameInfo.width; x++) {
              const idx = (y * width + x) * 4;
              imageData.data[idx] = 0;
              imageData.data[idx + 1] = 0;
              imageData.data[idx + 2] = 0;
              imageData.data[idx + 3] = 0;
            }
          }
        } else if (frameInfo.disposal === 3 && previousImageData) {
          imageData.data.set(previousImageData);
        }

        if (i % 5 === 0) {
          setStatusText(`正在提取影格... (${i + 1}/${totalFrames})`);
          await new Promise((r) => setTimeout(r, 10));
        }
      }

      const targetCount = frameCount || 100;
      setStatusText(`打包中... 生成 ${targetCount} 張 PNG`);
      await new Promise((r) => setTimeout(r, 50));

      const zip = new JSZip();
      let firstFrameThumb = '';

      for (let i = 0; i < targetCount; i++) {
        const frameCanvas = extractedFrames[i % totalFrames];

        if (i === 0) {
          firstFrameThumb = frameCanvas.toDataURL('image/png');
        }

        const blob = await new Promise<Blob | null>((resolve) => frameCanvas.toBlob(resolve, 'image/png'));
        if (blob) {
          const fileName = `frame_${String(i + 1).padStart(3, '0')}.png`;
          zip.file(fileName, blob);
        }

        if (i % 10 === 0) {
          setStatusText(`加入壓縮包... (${i + 1}/${targetCount})`);
          await new Promise((r) => setTimeout(r, 10));
        }
      }

      setStatusText('正在壓縮成 ZIP 檔...');
      await new Promise((r) => setTimeout(r, 50));

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const zipUrl = URL.createObjectURL(zipBlob);
      const baseName = selectedFile.name.replace(/\.[^/.]+$/, '');

      setResult({
        thumb: firstFrameThumb,
        zipUrl,
        fileName: `${baseName}_${targetCount}pngs.zip`
      });
      setStatusText('');
    } catch (err: any) {
      console.error(err);
      setStatusText('❌ 轉換失敗：' + (err.message || '未知錯誤'));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{
      fontFamily: "'Outfit', system-ui, -apple-system, sans-serif",
      background: '#0b0f19',
      backgroundImage: `
        radial-gradient(at 0% 0%, rgba(139, 92, 246, 0.15) 0px, transparent 50%),
        radial-gradient(at 100% 100%, rgba(236, 72, 153, 0.15) 0px, transparent 50%)
      `,
      color: '#f8fafc',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        background: 'rgba(22, 27, 43, 0.65)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '40px',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        maxWidth: '540px',
        width: '100%',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 700,
          marginBottom: '8px',
          background: 'linear-gradient(135deg, #e879f9, #8b5cf6, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          GIF to ZIP
        </h1>

        <p style={{ color: '#94a3b8', fontSize: '1rem', fontWeight: 300, marginBottom: '32px' }}>
          將 GIF 動畫轉換為高品質 PNG 序列並打包下載
        </p>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => document.getElementById('fileInput')?.click()}
          style={{
            border: '2px dashed rgba(139, 92, 246, 0.4)',
            borderRadius: '16px',
            padding: '40px 20px',
            cursor: 'pointer',
            background: 'rgba(139, 92, 246, 0.03)',
            marginBottom: '24px'
          }}
        >
          <div style={{ fontWeight: 500, color: '#cbd5e1', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '2rem' }}>{selectedFile ? '📁' : '✨'}</span>
            <span>{selectedFile ? `已選擇：${selectedFile.name}` : '點擊選擇或拖曳 GIF 檔案至此'}</span>
          </div>
          <input
            type="file"
            id="fileInput"
            accept="image/gif"
            style={{ display: 'none' }}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleFileChange(e.target.files[0]);
              }
            }}
          />
        </div>

        {previewUrl && (
          <div style={{ margin: '24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <label style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', fontWeight: 600 }}>
              GIF 預覽
            </label>
            <img src={previewUrl} alt="GIF 預覽" style={{ maxWidth: '100%', maxHeight: '220px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }} />
          </div>
        )}

        <div style={{
          margin: '28px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(15, 23, 42, 0.5)',
          padding: '16px 20px',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <label style={{ fontSize: '1rem', color: '#cbd5e1' }}>目標影格數：</label>
          <input
            type="number"
            value={frameCount}
            min={1}
            max={500}
            onChange={(e) => setFrameCount(parseInt(e.target.value) || 100)}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              width: '90px',
              fontSize: '1rem',
              textAlign: 'center'
            }}
          />
        </div>

        <button
          onClick={processGif}
          disabled={!selectedFile || isProcessing}
          style={{
            background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
            color: 'white',
            border: 'none',
            padding: '16px 32px',
            borderRadius: '12px',
            fontSize: '1.1rem',
            fontWeight: 600,
            cursor: !selectedFile || isProcessing ? 'not-allowed' : 'pointer',
            width: '100%',
            opacity: !selectedFile || isProcessing ? 0.5 : 1
          }}
        >
          {isProcessing ? '處理中...' : '開始轉換'}
        </button>

        {statusText && (
          <div style={{ marginTop: '20px', fontSize: '0.95rem', color: '#38bdf8', fontWeight: 500 }}>
            {statusText}
          </div>
        )}

        {result && (
          <div style={{
            marginTop: '32px',
            padding: '24px',
            background: 'rgba(16, 185, 129, 0.05)',
            borderRadius: '16px',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}>
            <label style={{ color: '#10b981', fontWeight: 600, fontSize: '1.1rem' }}>
              轉換完成！
            </label>
            <img src={result.thumb} alt="轉換結果縮圖" style={{ maxWidth: '100%', maxHeight: '180px', borderRadius: '12px', border: '2px solid #10b981' }} />
            <a
              href={result.zipUrl}
              download={result.fileName}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: '#10b981',
                color: 'white',
                textDecoration: 'none',
                padding: '14px 28px',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '1.05rem',
                width: '100%'
              }}
            >
              下載 ZIP 壓縮包
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
