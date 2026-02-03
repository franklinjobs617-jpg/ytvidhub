"use client";

import { useState } from "react";
import { Play, Download, FileText, Clock } from "lucide-react";

const demoResults = {
  video: {
    title: "How to Build a React App - Complete Tutorial",
    duration: "15:42",
    thumbnail: "/image/demo-video-thumbnail.jpg",
    url: "https://www.youtube.com/watch?v=demo123"
  },
  subtitles: {
    srt: `1
00:00:01,000 --> 00:00:04,500
Welcome to this comprehensive React tutorial.

2
00:00:04,500 --> 00:00:08,200
Today we'll build a complete application from scratch.

3
00:00:08,200 --> 00:00:12,100
First, let's set up our development environment.`,
    vtt: `WEBVTT

00:01.000 --> 00:04.500
Welcome to this comprehensive React tutorial.

00:04.500 --> 00:08.200
Today we'll build a complete application from scratch.

00:08.200 --> 00:12.100
First, let's set up our development environment.`,
    txt: `Welcome to this comprehensive React tutorial. Today we'll build a complete application from scratch. First, let's set up our development environment.`
  }
};

export function InteractiveDemo() {
  const [selectedFormat, setSelectedFormat] = useState<'srt' | 'vtt' | 'txt'>('srt');
  const [showResult, setShowResult] = useState(false);

  const handleDemo = () => {
    setShowResult(true);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Play size={20} className="text-blue-600" />
          Interactive Demo - See Real Results
        </h3>
        <p className="text-sm text-slate-600 mt-1">Try our subtitle extraction with a sample video</p>
      </div>

      <div className="p-6">
        {!showResult ? (
          <div className="text-center space-y-6">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </div>
              <h4 className="font-bold text-slate-900 mb-2">{demoResults.video.title}</h4>
              <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {demoResults.video.duration}
                </span>
                <span>•</span>
                <span>English Subtitles Available</span>
              </div>
            </div>

            <div className="flex justify-center gap-2">
              {(['srt', 'vtt', 'txt'] as const).map((format) => (
                <button
                  key={format}
                  onClick={() => setSelectedFormat(format)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold uppercase transition-all ${
                    selectedFormat === format
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {format}
                </button>
              ))}
            </div>

            <button
              onClick={handleDemo}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all flex items-center gap-2 mx-auto"
            >
              <Download size={16} />
              Extract Subtitles ({selectedFormat.toUpperCase()})
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <FileText size={16} className="text-green-600" />
                Extracted Subtitles ({selectedFormat.toUpperCase()})
              </h4>
              <button
                onClick={() => setShowResult(false)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Try Another Format
              </button>
            </div>

            <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-green-400 max-h-64 overflow-y-auto">
              <pre className="whitespace-pre-wrap">{demoResults.subtitles[selectedFormat]}</pre>
            </div>

            <div className="flex items-center justify-between text-sm text-slate-600 bg-green-50 rounded-lg p-3">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Extraction completed in 2.3 seconds
              </span>
              <span className="font-medium">Ready for download</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}