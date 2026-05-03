import { Clock, Calendar, User } from "lucide-react";

type Props = {
  readTime?: string;
  date?: string;
  author?: string;
};

export default function ArticleMeta({ readTime, date, author }: Props) {
  if (!readTime && !date && !author) return null;

  return (
    <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-slate-400">
      {author && (
        <span className="flex items-center gap-1.5">
          <User size={14} />
          {author}
        </span>
      )}
      {date && (
        <span className="flex items-center gap-1.5">
          <Calendar size={14} />
          {date}
        </span>
      )}
      {readTime && (
        <span className="flex items-center gap-1.5">
          <Clock size={14} />
          {readTime}
        </span>
      )}
    </div>
  );
}
