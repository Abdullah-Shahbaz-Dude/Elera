import React from 'react';
import { Link } from 'react-router-dom';

type ComingSoonProps = {
  title: string;
};

const ComingSoon: React.FC<ComingSoonProps> = ({ title }) => {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 md:px-6 py-20 mt-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{title}</h1>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed">
            Coming Soon
          </p>

          <div className="mt-10">
            <Link
              to="/home-2"
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-semibold text-white shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                boxShadow: '0 8px 32px rgba(96, 165, 250, 0.35)',
              }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ComingSoon;
