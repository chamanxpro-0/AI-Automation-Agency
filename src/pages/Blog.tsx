import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { siteConfig } from "@/config/site";

const categories = ["All", "Automation", "AI", "Tools", "Strategy", "Tutorial", "SaaS"];

function BlogCard({ post, featured = false }: { post: typeof siteConfig.blogPosts[0]; featured?: boolean }) {
  if (featured) {
    return (
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="card overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="tag">{post.category}</span>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>{post.readingTime}</span>
            </div>
            <h2 className="text-xl font-display font-semibold mb-3" style={{ color: "var(--text-primary)" }}>{post.title}</h2>
            <p className="text-sm mb-5" style={{ color: "var(--text-secondary)" }}>{post.excerpt}</p>
            <Link to={`/blog/${post.slug}`} className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Read article &rarr;</Link>
          </div>
          <div className="hidden md:flex items-center justify-center p-8" style={{ background: "var(--bg-primary)" }}>
            <span className="text-6xl opacity-20">&#9998;</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="card group">
      <div className="flex items-center gap-3 mb-3">
        <span className="tag text-[10px]">{post.category}</span>
        <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{post.readingTime}</span>
      </div>
      <h3 className="text-base font-display font-semibold mb-2 line-clamp-2" style={{ color: "var(--text-primary)" }}>{post.title}</h3>
      <p className="text-sm mb-4 line-clamp-2" style={{ color: "var(--text-secondary)" }}>{post.excerpt}</p>
      <Link to={`/blog/${post.slug}`} className="text-xs font-medium transition-opacity group-hover:opacity-70" style={{ color: "var(--text-primary)" }}>Read more &rarr;</Link>
    </motion.div>
  );
}

export function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category")?.replace(/^\w/, (c) => c.toUpperCase()) || "All");

  const posts = siteConfig.blogPosts;
  const featured = posts.find((p) => p.featured) || posts[0];
  const regular = posts.filter((p) => p.slug !== featured.slug);
  const filtered = activeCategory === "All" ? regular : regular.filter((p) => p.category === activeCategory);

  useEffect(() => {
    if (activeCategory === "All") setSearchParams({});
    else setSearchParams({ category: activeCategory.toLowerCase() });
  }, [activeCategory, setSearchParams]);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="pt-32 pb-16" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="font-display font-semibold mb-5" style={{ color: "var(--text-primary)", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>Insights</h1>
          <p className="text-base" style={{ color: "var(--text-secondary)" }}>Thoughts on automation, AI, and building systems that scale.</p>
        </div>
      </section>

      <section className="py-4" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-primary)", borderBottom: "1px solid var(--border-primary)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((c) => {
              const isActive = activeCategory === c;
              const btnStyle: React.CSSProperties = {
                background: isActive ? "var(--accent)" : "transparent",
                color: isActive ? "white" : "var(--text-tertiary)",
                border: isActive ? "1px solid var(--accent)" : "1px solid var(--border-primary)",
              };
              return (
                <button key={c} onClick={() => setActiveCategory(c)}
                  className="px-3 py-1.5 rounded-md text-xs font-medium transition-all"
                  style={btnStyle}
                >{c}</button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-sm" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <BlogCard post={featured} featured />
        </div>
      </section>

      <section className="section-sm" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div layout className="grid md:grid-cols-2 gap-5">
            {filtered.map((post, i) => (
              <motion.div key={post.slug} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.18, delay: i * 0.04 }}>
                <BlogCard post={post} />
              </motion.div>
            ))}
          </motion.div>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p style={{ color: "var(--text-secondary)" }}>No articles found.</p>
              <button onClick={() => setActiveCategory("All")} className="mt-3 text-sm" style={{ color: "var(--accent)" }}>View all</button>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}

export default Blog;
