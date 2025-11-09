import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative min-h-[420px] w-full overflow-hidden bg-slate-900">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 py-16 text-center">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">Holographic Profile • Futuristic</span>
        <h1 className="text-4xl font-bold leading-tight text-white drop-shadow md:text-6xl">
          Create a Rounded, Cropped Profile Avatar
        </h1>
        <p className="mt-4 max-w-xl text-base text-white/80 md:text-lg">
          Upload an image, fine-tune zoom and position, and export a clean circular avatar. Perfect for modern profiles.
        </p>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-900/80" />
    </section>
  );
}
