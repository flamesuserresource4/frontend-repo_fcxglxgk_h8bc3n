import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function PreviewCard({ image }) {
  return (
    <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
      <div className="flex items-center justify-center">
        <div className="relative inline-flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-tr from-sky-400/30 via-violet-400/30 to-fuchsia-400/30 p-1 ring-1 ring-white/10">
          <div className="relative h-full w-full rounded-full bg-slate-900 p-1">
            <img
              src={image}
              alt="Preview avatar"
              className="h-full w-full rounded-full object-cover"
            />
            <div className="absolute -bottom-1 -right-1 rounded-full bg-sky-500 p-1.5 shadow-lg ring-2 ring-slate-900">
              <CheckCircle2 className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5 text-white/80 shadow-lg backdrop-blur">
        <h3 className="text-lg font-semibold text-white">Profile Card</h3>
        <p className="mt-2 text-sm">
          Your circular avatar will look crisp across the product. The iridescent ring and
          verified badge echo the holographic aesthetic.
        </p>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm">
          <li>High-resolution PNG export</li>
          <li>Drag to position, slider/wheel to zoom</li>
          <li>Perfect circle crop, no CSS hacks</li>
        </ul>
      </div>
    </div>
  );
}
