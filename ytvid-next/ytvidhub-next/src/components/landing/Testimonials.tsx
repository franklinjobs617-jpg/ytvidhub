import React from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "This tool is an absolute game-changer. I used to spend hours manually downloading subtitles for my video analysis projects. Now, I can process an entire playlist in minutes. Incredible!",
      name: "Alex Chen",
      role: "Content Strategist",
      image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      alt: "Alex Chen avatar", 
    },
    {
      quote: "The best bulk subtitle downloader I've ever used. The interface is clean, the process is lightning-fast, and the ZIP file output is perfectly organized. It just works.",
      name: "Maria Garcia",
      role: "YouTube Creator",
      image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
      alt: "Maria Garcia avatar", 
    },
    {
      quote: "As a linguistic researcher, access to accurate transcripts is crucial. YTVidHub not only provides them in bulk but also in multiple formats. It has significantly accelerated my data collection process.",
      name: "Dr. Samuel Jones",
      role: "Linguistics Researcher",
      image: "https://i.pravatar.cc/150?u=a042581f4e29026707d",
      alt: "Dr. Samuel Jones avatar", 
    },
  ];

  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900">
            Trusted by Creators and Researchers
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            See why professionals choose YTVidHub to streamline their workflow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="flex flex-col h-full bg-slate-50 p-8 rounded-2xl border border-slate-100 transition-all duration-300 hover:shadow-lg hover:bg-white hover:border-slate-200"
            >
              <div className="mb-4 text-blue-200">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                </svg>
              </div>

              <blockquote className="flex-grow text-slate-600 italic leading-relaxed text-base">
                "{item.quote}"
              </blockquote>

              <footer className="mt-8 pt-6 border-t border-slate-200/60 flex items-center gap-4">
                <img
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                  src={item.image}
                  alt={item.alt} 
                />
                <div>
                  <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                  <p className="text-xs font-medium text-blue-600 uppercase tracking-wide mt-0.5">
                    {item.role}
                  </p>
                </div>
              </footer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}