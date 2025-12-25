import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="border-b border-gray-700 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info Column */}
            <div className="md:col-span-1">
              <h3 className="text-xl font-bold text-blue-400">YTVidHub</h3>
              <p className="mt-3 text-gray-400 text-sm leading-relaxed">
                The essential toolkit for video content data extraction, built for
                speed and reliability.
              </p>
            </div>

            {/* Product Column */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/"
                    className="hover:text-blue-400 text-gray-400 transition"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/bulk-youtube-subtitle-downloader"
                    className="hover:text-blue-400 text-gray-400 transition"
                  >
                    Bulk Downloader
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="hover:text-blue-400 text-gray-400 transition"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/data-prep-guide"
                    className="hover:text-blue-400 text-gray-400 transition"
                  >
                    Data Preparation Guide
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guide/clean-transcript-no-timestamp"
                    className="hover:text-blue-400 text-gray-400 transition"
                  >
                    Clean Transcript Guide
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guide/playlist-subtitles-bulk"
                    className="hover:text-blue-400 text-gray-400 transition"
                  >
                    Bulk Playlist Guide
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guide/youtube-subtitles-api-free"
                    className="hover:text-blue-400 text-gray-400 transition"
                  >
                    YouTube API Alternative
                  </Link>
                </li>
                <li>
                  <Link
                    href="/how-to-use"
                    className="hover:text-blue-400 text-gray-400 transition"
                  >
                    How to Use
                  </Link>
                </li>
                <li>
                  <Link
                    href="/what-is-an-srt-file"
                    className="hover:text-blue-400 text-gray-400 transition"
                  >
                    What is an SRT file?
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="hover:text-blue-400 text-gray-400 transition"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company & Blog Column */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/blog/subtitle-accuracy-problem"
                    className="hover:text-blue-400 text-gray-400 transition"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-blue-400 text-gray-400 transition"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="hover:text-blue-400 text-gray-400 transition"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="hover:text-blue-400 text-gray-400 transition"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} YTVidHub Technologies. All Rights
            Reserved. Not affiliated with Google or YouTube.
          </p>
        </div>
      </div>
    </footer>
  );
}