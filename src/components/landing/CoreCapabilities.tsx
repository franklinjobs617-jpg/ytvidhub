import React from "react";

export default function CoreCapabilities() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-sm font-bold uppercase text-blue-600 tracking-wider">
            Core Capabilities
          </span>
          <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mt-3">
            Engineered for Your Workflow
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Discover a suite of features designed to handle any task, from a
            single video to an entire content library.
          </p>
        </div>

        <div className="space-y-24">
          {/* Feature Block 1: Video Demo */}
          <div className="grid lg:grid-cols-2 items-center gap-12">
            <div className="p-2 bg-white rounded-xl shadow-lg border border-slate-200">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto rounded-lg"
              >
                <source
                  src="/image/5ed5628e-810f-48c8-a171-35c94fbb7e57-ezgif.com-gif-to-webm-converter.webm"
                  type="video/webm"
                />
              </video>
            </div>
            <div className="text-left">
              <span className="text-blue-600 font-bold text-sm tracking-wide">
                SEE IT IN ACTION
              </span>
              <h3 className="mt-2 text-3xl font-bold text-slate-900 tracking-tight">
                From Complexity to Simplicity
              </h3>
              <p className="mt-4 text-lg text-slate-500 leading-relaxed">
                Whether it's an entire YouTube playlist or a text file with
                hundreds of links, just paste it in. Our tool intelligently
                parses, processes, and prepares everything for you, turning
                hours of manual work into seconds of waiting.
              </p>
            </div>
          </div>

          {/* Feature Block 2: Adaptive Output (SVG) */}
          <div className="grid lg:grid-cols-2 items-center gap-12">
            <div className="lg:order-last px-6 flex justify-center">
              <svg
                viewBox="0 0 200 150"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full max-w-md"
              >
                <circle
                  cx="60"
                  cy="75"
                  r="20"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="3"
                />
                <path d="M 55 68 L 70 75 L 55 82 Z" fill="#3B82F6" />
                <path
                  d="M 80 75 L 120 40"
                  fill="none"
                  stroke="#93C5FD"
                  strokeWidth="2"
                  strokeDasharray="5 3"
                />
                <path
                  d="M 80 75 L 120 75"
                  fill="none"
                  stroke="#93C5FD"
                  strokeWidth="2"
                  strokeDasharray="5 3"
                />
                <path
                  d="M 80 75 L 120 110"
                  fill="none"
                  stroke="#93C5FD"
                  strokeWidth="2"
                  strokeDasharray="5 3"
                />

                <rect
                  x="130"
                  y="25"
                  width="50"
                  height="30"
                  rx="5"
                  fill="#EFF6FF"
                  stroke="#BFDBFE"
                  strokeWidth="2"
                />
                <text
                  x="141"
                  y="44"
                  fontFamily="monospace"
                  fontSize="10"
                  fill="#3B82F6"
                >
                  .SRT
                </text>

                <rect
                  x="130"
                  y="60"
                  width="50"
                  height="30"
                  rx="5"
                  fill="#EFF6FF"
                  stroke="#BFDBFE"
                  strokeWidth="2"
                />
                <text
                  x="141"
                  y="79"
                  fontFamily="monospace"
                  fontSize="10"
                  fill="#3B82F6"
                >
                  .VTT
                </text>

                <rect
                  x="130"
                  y="95"
                  width="50"
                  height="30"
                  rx="5"
                  fill="#EFF6FF"
                  stroke="#BFDBFE"
                  strokeWidth="2"
                />
                <text
                  x="141"
                  y="114"
                  fontFamily="monospace"
                  fontSize="10"
                  fill="#3B82F6"
                >
                  .TXT
                </text>
              </svg>
            </div>
            <div className="text-left">
              <span className="text-blue-600 font-bold text-sm tracking-wide">
                ADAPTIVE OUTPUT
              </span>
              <h3 className="mt-2 text-3xl font-bold text-slate-900 tracking-tight">
                For Your Workflow, Not Against It
              </h3>
              <p className="mt-4 text-lg text-slate-500 leading-relaxed">
                Need timed captions for video editing? Choose SRT. Building an
                accessible web player? VTT is ready. Just need a transcript for
                analysis? Export as plain TXT. The choice is yours, for every
                single file.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
