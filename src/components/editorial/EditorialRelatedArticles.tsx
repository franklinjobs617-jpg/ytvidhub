import { Link } from "@/i18n/routing";

type RelatedItem = {
  href: string;
  title: string;
  desc: string;
};

type Props = {
  items: RelatedItem[];
  label?: string;
};

export default function EditorialRelatedArticles({
  items,
  label = "Related Article",
}: Props) {
  return (
    <article className="article-shell article-section">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 article-h2">
        Related Reading
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5"
          >
            <p className="text-xs font-semibold tracking-wide text-blue-600 uppercase">
              {label}
            </p>
            <h3 className="mt-2 text-base font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              {item.desc}
            </p>
            <span className="mt-3 inline-flex items-center text-sm font-medium text-blue-600 transition-transform group-hover:translate-x-1">
              Read more &rarr;
            </span>
          </Link>
        ))}
      </div>
    </article>
  );
}
