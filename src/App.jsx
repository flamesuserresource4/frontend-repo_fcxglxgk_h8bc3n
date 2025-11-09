import React, { useState } from 'react';
import Hero from './components/Hero';
import ProfileUploader from './components/ProfileUploader';
import PreviewCard from './components/PreviewCard';
import Footer from './components/Footer';

export default function App() {
  const [exported, setExported] = useState(
    'data:image/svg+xml;utf8,' +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 280">
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#38bdf8"/>
              <stop offset="50%" stop-color="#818cf8"/>
              <stop offset="100%" stop-color="#e879f9"/>
            </linearGradient>
          </defs>
          <circle cx="140" cy="140" r="138" fill="#0b1220"/>
          <circle cx="140" cy="140" r="120" fill="url(#g)" opacity="0.2"/>
          <text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" fill="#cbd5e1" font-family="Inter, system-ui" font-size="20">Avatar Preview</text>
        </svg>`
      )
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Hero />

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Upload and Customize Your Rounded Crop
          </h2>
          <p className="mt-2 text-white/70">
            Precise circular cropping with drag and zoom. Export as PNG and use anywhere.
          </p>
        </div>

        <ProfileUploader onExport={setExported} />

        <div className="mt-12">
          <PreviewCard image={exported} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
