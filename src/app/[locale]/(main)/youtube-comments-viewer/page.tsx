import { Link } from "@/i18n/routing";
import CommentsViewerSchema from "@/components/seo/CommentsViewerSchema";
import CommentsViewerWidget from "@/components/comments/CommentsViewerWidget";
import RelatedTools from "@/components/shared/RelatedTools";
import UnifiedFaqSection from "@/components/shared/UnifiedFaqSection";

const useCases = [
  ["Oldest comments first", "Load every comment on a video and read them chronologically, from the first day the video was published."],
  ["Most-liked comments", "Sort by likes to see the opinions other viewers agree with most, in either order."],
  ["Date-range filtering", "Narrow comments to a specific period, such as a product launch window or a controversial week."],
  ["Comment trends", "See when discussion peaked on an interactive graph aggregated by hour, day, month, or year."],
];

export default function YouTubeCommentsViewerPage() {
  return (
    <div className="bg-white min-h-screen text-slate-800 article-body">
      <CommentsViewerSchema />
      <main>
        <section className="bg-gradient-to-br from-blue-50 via-white to-slate-50 article-hero">
          <div className="article-shell px-6 py-16 text-center md:py-24">
            <p className="article-kicker">Comments Tool</p>
            <h1 className="article-h1 mx-auto max-w-4xl text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
              YouTube Comments Viewer
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
              View all comments on any YouTube video. Paste a link, load the
              comment history in the background, then sort by date or likes,
              filter by date range, browse replies, and chart the conversation
              over time. Free, no login required.
            </p>
            <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-blue-100 bg-white p-5 text-left shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">
                Quick Answer: What is a YouTube comments viewer?
              </h2>
              <p className="mt-3 leading-relaxed text-slate-600">
                A YouTube comments viewer loads the complete comment history of
                a video — not just the newest page — stores it temporarily, and
                lets you sort, filter, and analyze it. YouTube itself only shows
                comments newest-first, which makes finding the earliest or
                most-liked comments impractical on large videos.
              </p>
            </div>
            <div className="mt-10">
              <CommentsViewerWidget />
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto max-w-6xl px-6">
            <h2 className="article-h2 text-center text-3xl font-bold text-slate-900">
              Read Comments the Way You Need To
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {useCases.map(([title, desc]) => (
                <div key={title} className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white py-16">
          <div className="container mx-auto max-w-5xl px-6">
            <h2 className="article-h2 text-3xl font-bold text-slate-900">
              How It Works
            </h2>
            <div className="mt-6 space-y-5 text-slate-600">
              <p>
                Paste a YouTube video URL and the viewer fetches the video
                details and its comment count. Click &quot;Load all comments&quot;
                and the service retrieves the comment history in the background
                while a progress bar tracks the work.
              </p>
              <p>
                Once loaded, you can sort by date (oldest or newest first) or by
                likes, set a date range to focus on a specific period, expand
                replies, and open the statistics panel to chart comment activity
                over the video&apos;s lifetime.
              </p>
              <p>
                Looking for captions instead? Try the{" "}
                <Link href="/youtube-caption-downloader" className="font-semibold text-blue-600 hover:text-blue-700">
                  YouTube Caption Downloader
                </Link>{" "}
                or the{" "}
                <Link href="/youtube-transcript-generator" className="font-semibold text-blue-600 hover:text-blue-700">
                  YouTube Transcript Generator
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-16">
          <div className="container mx-auto max-w-5xl px-6">
            <h2 className="article-h2 text-3xl font-bold text-slate-900">
              YouTube&apos;s Built-in Comments vs. This Viewer
            </h2>
            <p className="mt-4 text-slate-600">
              YouTube shows the newest comments first and pages them 20 at a
              time. Finding the oldest comments, the most-liked opinions, or the
              discussion around a specific date takes endless scrolling. The
              comments viewer loads the full history once and lets you sort,
              filter, and chart it.
            </p>
            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-white text-slate-900">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Capability</th>
                    <th className="px-4 py-3 font-semibold">YouTube app</th>
                    <th className="px-4 py-3 font-semibold">Comments Viewer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-900">See all comments on a video</td>
                    <td className="px-4 py-3">Newest first, 20 per page</td>
                    <td className="px-4 py-3">Full history loaded in the background</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-900">Oldest comments first</td>
                    <td className="px-4 py-3">Not available</td>
                    <td className="px-4 py-3">One click, chronological order</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-900">Sort by likes</td>
                    <td className="px-4 py-3">Top comments only</td>
                    <td className="px-4 py-3">Every comment, either direction</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-900">Filter by date range</td>
                    <td className="px-4 py-3">Not available</td>
                    <td className="px-4 py-3">From/To date pickers</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-900">Comment trend graph</td>
                    <td className="px-4 py-3">Not available</td>
                    <td className="px-4 py-3">Hour/day/month/year aggregation</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-900">Login required</td>
                    <td className="px-4 py-3">No</td>
                    <td className="px-4 py-3">No — free and open</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <UnifiedFaqSection
          title="YouTube Comments Viewer FAQ"
          items={[
            {
              q: "How can I see the oldest comments on a YouTube video?",
              a: "Paste the video URL into the YouTube Comments Viewer, click Load all comments, and choose \"Date (oldest first)\" to read the comment history chronologically from the day the video was published. YouTube itself only shows the newest comments first.",
            },
            {
              q: "Can I sort YouTube comments by likes?",
              a: "Yes. The comments viewer loads the complete comment history and lets you sort by likes, most-liked first or least-liked first, so you can find the opinions other viewers agree with.",
            },
            {
              q: "Can I filter YouTube comments by date?",
              a: "Yes. Set a From and To date to narrow the list to comments posted during a specific period, such as a product launch or a news event.",
            },
            {
              q: "Do I need to create an account to view YouTube comments?",
              a: "No. The YouTube Comments Viewer is free and works without login. Paste a video link and load the comments.",
            },
            {
              q: "How long does it take to load comments on a large video?",
              a: "The service retrieves the full comment history page by page in the background. A progress bar shows how many comments have been indexed, and you can start browsing as soon as loading completes.",
            },
            {
              q: "Can I read replies to YouTube comments?",
              a: "Yes. Any comment with replies shows the reply count. Click it to expand and read every reply.",
            },
            {
              q: "What does the comment trend graph show?",
              a: "The graph charts how many comments were posted over the video's lifetime, aggregated by hour, day, month, or year. Drag to zoom into a period and double-click to reset.",
            },
          ]}
        />

        <div className="mx-auto max-w-6xl px-6">
          <RelatedTools currentPath="/youtube-comments-viewer" />
        </div>
      </main>
    </div>
  );
}
