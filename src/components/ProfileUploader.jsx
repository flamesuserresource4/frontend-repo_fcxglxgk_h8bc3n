import React, { useRef, useState, useEffect } from 'react';

// Utility to get a dataURL from a canvas
function canvasToDataURL(canvas) {
  return canvas.toDataURL('image/png');
}

export default function ProfileUploader({ onExport }) {
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const imgRef = useRef(new Image());

  const [imageLoaded, setImageLoaded] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageStart, setImageStart] = useState({ x: 0, y: 0 });

  const size = 280; // canvas size (square)

  // Draw function with circular mask
  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background checker for transparency feel
    const cell = 14;
    for (let y = 0; y < size; y += cell) {
      for (let x = 0; x < size; x += cell) {
        ctx.fillStyle = (x / cell + y / cell) % 2 === 0 ? '#1e293b' : '#0f172a';
        ctx.fillRect(x, y, cell, cell);
      }
    }

    // Circle clip
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // If image loaded, draw transformed
    if (imageLoaded) {
      const img = imgRef.current;
      const w = img.width * zoom;
      const h = img.height * zoom;
      const x = size / 2 - w / 2 + position.x;
      const y = size / 2 - h / 2 + position.y;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, x, y, w, h);
    }

    ctx.restore();

    // Circular border glow
    const gradient = ctx.createRadialGradient(size/2, size/2, size/3, size/2, size/2, size/2);
    gradient.addColorStop(0, 'rgba(56, 189, 248, 0.0)');
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0.7)');
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 1.5, 0, Math.PI * 2);
    ctx.stroke();

    // Outer glow ring
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 6, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  // Redraw when state changes
  useEffect(() => { draw(); }, [imageLoaded, zoom, position]);

  // Handle upload
  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = imgRef.current;
      img.onload = () => {
        setImageLoaded(true);
        // Center image initially
        setZoom(Math.min(size / img.width, size / img.height) * 1.2);
        setPosition({ x: 0, y: 0 });
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  // Drag controls
  const onPointerDown = (e) => {
    setDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setImageStart({ ...position });
  };
  const onPointerMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setPosition({ x: imageStart.x + dx, y: imageStart.y + dy });
  };
  const onPointerUp = () => setDragging(false);

  // Wheel to zoom
  const onWheel = (e) => {
    e.preventDefault();
    const delta = -e.deltaY;
    const factor = delta > 0 ? 1.06 : 0.94;
    setZoom((z) => Math.max(0.2, Math.min(8, z * factor)));
  };

  // Export current canvas as data URL
  const handleExport = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvasToDataURL(canvas);
    onExport?.(dataUrl);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-6 rounded-xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur">
        <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20"
          >
            Upload Image
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onSelectFile}
            className="hidden"
          />

          <div className="flex items-center gap-3">
            <label className="text-xs text-white/70">Zoom</label>
            <input
              type="range"
              min="0.2"
              max="8"
              step="0.01"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="h-1 w-40 cursor-pointer appearance-none rounded bg-white/10 accent-sky-400"
            />
          </div>

          <button
            onClick={handleExport}
            className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-sky-400"
          >
            Export PNG
          </button>
        </div>

        <div
          className="relative"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onWheel={onWheel}
        >
          <canvas
            ref={canvasRef}
            width={size}
            height={size}
            className="rounded-full shadow-2xl ring-1 ring-white/10"
          />
          {!imageLoaded && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-full bg-slate-800/60">
              <span className="text-sm text-white/70">Upload an image to start</span>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-white/60">
          Tip: Drag to reposition. Use the scroll wheel or the slider to zoom.
        </p>
      </div>
    </div>
  );
}
