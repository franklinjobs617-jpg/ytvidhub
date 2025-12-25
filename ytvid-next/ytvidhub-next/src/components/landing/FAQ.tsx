import React from 'react';

export default function FAQ() {
  const faqs = [
    {
      question: "Is this YouTube subtitle downloader completely free?",
      answer: (
        <>
          YTVidHub is free for single downloads and includes 5 daily credits for bulk operations. Professional plans are available for high-volume data needs.
        </>
      ),
    },
    {
      question: "What URL formats are supported?",
      answer: (
        <>
          We support standard YouTube video URLs, playlist URLs, and channel page URLs. For bulk processing via file upload, ensure each URL is on a new line in a simple <code>.txt</code> or <code>.csv</code> file. The system automatically filters out invalid or duplicate links.
        </>
      ),
    },
    {
      question: "What language are subtitles in?",
      answer: (
        <>
          YTVidHub supports ALL languages available on YouTube. This includes manually uploaded captions by the creator (highest quality) and auto-generated subtitles for languages like Chinese (Mandarin), Spanish, German, and more.
          <br /><br />
          <strong>IMPORTANT:</strong> The accuracy of non-English auto-generated captions can be low. For reliable data in all languages, we recommend our Pro AI Transcription service.
        </>
      ),
    },
    {
      question: "Why do some videos show \"No Subtitles\"?",
      answer: (
        <>
          Our tool prioritizes downloading <strong>manually uploaded</strong> captions. Videos that only have YouTube's auto-generated captions might be filtered out in strict mode to ensure the highest quality data for LLM training. You can enable "Include Auto-Generated" in settings if needed.
        </>
      ),
    },
    {
      question: "Why are my subtitles not appearing?",
      answer: (
        <ul className="list-decimal list-inside space-y-2 mt-2">
          <li><strong>Missing/Delayed Track:</strong> The video might only have auto-generated CC which is still processing.</li>
          <li><strong>Browser Extensions:</strong> Ad-blockers sometimes interfere with the YouTube player API.</li>
          <li><strong>Incorrect Player Setting:</strong> Ensure the external player language setting matches the downloaded track.</li>
        </ul>
      ),
    },
    {
      question: "How do I fix out-of-sync subtitles?",
      answer: (
        <>
          Desynchronization means the source time codes are flawed. You must edit the source file. Download the SRT/VTT, and use software like Subtitle Edit to fine-tune the alignment, then re-upload if you are the creator.
        </>
      ),
    },
    {
      question: "Why is my downloaded file format wrong?",
      answer: (
        <>
          If you selected <strong>TXT</strong> output, video editors won't recognize it because it lacks timestamps. Always choose <strong>SRT or VTT</strong> for video editing software.
        </>
      ),
    },
  ];

  return (
    <section className="py-24 bg-white" id="faq">
      <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
        <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center">
          Technical Q&A & Troubleshooting
        </h2>
        
        <div className="space-y-4">
          {faqs.map((item, index) => (
            <details
              key={index}
              className="group p-6 bg-white rounded-xl border border-slate-200 shadow-sm cursor-pointer transition-all duration-200 hover:border-blue-400 hover:shadow-md open:bg-slate-50/50"
            >
              <summary className="flex justify-between items-center font-semibold text-lg text-slate-800 focus:outline-none list-none select-none">
                <span>{item.question}</span>
                {/* 箭头图标：利用 group-open 实现旋转 */}
                <svg
                  className="w-5 h-5 text-slate-400 transition-transform duration-300 transform group-open:rotate-180 group-open:text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              
              <div className="mt-4 pt-4 border-t border-slate-100 text-slate-600 leading-relaxed text-base">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}