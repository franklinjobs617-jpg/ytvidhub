"use client";

import { Play, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const exampleVideos = [
  {
    id: "dQw4w9WgXcQ",
    title: "Rick Astley - Never Gonna Give You Up",
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    duration: "3:33",
    views: "1.4B views",
  },
  {
    id: "kJQP7kiw5Fk",
    title: "Luis Fonsi - Despacito ft. Daddy Yankee",
    thumbnail: "https://i.ytimg.com/vi/kJQP7kiw5Fk/mqdefault.jpg",
    url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
    duration: "4:42",
    views: "8.4B views",
  },
  {
    id: "OPf0YbXqDm0",
    title: "Mark Ronson - Uptown Funk ft. Bruno Mars",
    thumbnail: "https://i.ytimg.com/vi/OPf0YbXqDm0/mqdefault.jpg",
    url: "https://www.youtube.com/watch?v=OPf0YbXqDm0",
    duration: "4:30",
    views: "5.1B views",
  },
];

export default function ExampleVideos() {
  const router = useRouter();
  const tExamples = useTranslations("hero.examples");

  const handleVideoClick = (url: string) => {
    router.push(`/workspace?urls=${encodeURIComponent(url)}&from=home&mode=download`);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-slate-800">{tExamples("popularTitle")}</h3>
        <p className="text-sm text-slate-500">{tExamples("popularDescription")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {exampleVideos.map((video) => (
          <button
            key={video.id}
            onClick={() => handleVideoClick(video.url)}
            className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all text-left"
          >
            {/* 缩略图容器 */}
            <div className="relative aspect-video bg-slate-900 overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />

              {/* 播放按钮 */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                  <Play size={20} className="text-white ml-0.5" fill="white" />
                </div>
              </div>

              {/* 时长标签 */}
              <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-white text-xs font-semibold rounded">
                {video.duration}
              </div>
            </div>

            {/* 信息区域 */}
            <div className="p-3">
              <h4 className="text-sm font-medium text-slate-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {video.title}
              </h4>
              <p className="text-xs text-slate-500 mt-1">{video.views}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
