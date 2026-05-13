import Link from 'next/link';
import BookCard from '@/components/BookCard';
import HeroSlider from '@/components/HeroSlider';
import { getCategories, getTrendingBooks, getNewReleases, getBooks, getHeroSlides } from '@/lib/api';
import styles from './page.module.css';

export default async function Home() {
  const [categoriesData, trendingBooksData, newBooksData, allBooksData, slidesData] = await Promise.all([
    getCategories().catch(() => ({ results: [] })),
    getTrendingBooks().catch(() => []),
    getNewReleases().catch(() => []),
    getBooks({ preorder: 'true' }).catch(() => ({ results: [] })),
    getHeroSlides().catch(() => ({ results: [] }))
  ]);

  const categories = Array.isArray(categoriesData?.results) ? categoriesData.results : (Array.isArray(categoriesData) ? categoriesData : []);
  let trendingBooks = Array.isArray(trendingBooksData?.results) ? trendingBooksData.results : (Array.isArray(trendingBooksData) ? trendingBooksData : []);
  const newBooks = Array.isArray(newBooksData?.results) ? newBooksData.results : (Array.isArray(newBooksData) ? newBooksData : []);
  const preorderBooks = Array.isArray(allBooksData?.results) ? allBooksData.results : (Array.isArray(allBooksData) ? allBooksData : []);
  
  // Filter active slides and sort by order
  let heroSlides = Array.isArray(slidesData?.results) ? slidesData.results : (Array.isArray(slidesData) ? slidesData : []);
  heroSlides = heroSlides.filter(s => s.is_active).sort((a, b) => a.order - b.order);
  
  // Pad trending books with new books if there aren't enough, to keep the UI looking full
  if (trendingBooks.length < 5 && newBooks.length > 0) {
    const existingIds = new Set(trendingBooks.map(b => b.id));
    const extraBooks = newBooks.filter(b => !existingIds.has(b.id));
    trendingBooks = [...trendingBooks, ...extraBooks].slice(0, 10);
  }
  
  // Removed popular authors mock data

  return (
    <>
      {/* Hero Banner */}
      <HeroSlider slides={heroSlides} />

      {/* Categories */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">বিষয় অনুযায়ী বই</h2>
            <Link href="/books" className="section-link">সকল বিষয় →</Link>
          </div>
          <div className={styles.catGrid}>
            {categories.map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/books?category=${cat.slug}`}
                className={styles.catCard}
                style={{ animationDelay: `${i * 0.05}s`, '--cat-color': cat.color || '#3B82F6' }}
              >
                <span className={styles.catIcon}>{cat.icon || '📚'}</span>
                <span className={styles.catName}>{cat.name}</span>
                <span className={styles.catCount}>{cat.count || 0} বই</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Books */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">🔥 ট্রেন্ডিং বই</h2>
            <Link href="/books?sort=trending" className="section-link">সব দেখুন →</Link>
          </div>
          <div className={`grid grid-5 ${styles.bookGrid}`}>
            {trendingBooks.map((book, i) => (
              <div key={book.id} style={{ animationDelay: `${i * 0.08}s` }} className="animate-fadeInUp">
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </div>
      </section>




      {/* New Releases */}
      {newBooks.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">✨ নতুন প্রকাশিত</h2>
              <Link href="/books?filter=new" className="section-link">সব দেখুন →</Link>
            </div>
            <div className={`grid grid-5 ${styles.bookGrid}`}>
              {newBooks.map((book, i) => (
                <div key={book.id} style={{ animationDelay: `${i * 0.08}s` }} className="animate-fadeInUp">
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}



      {/* Pre-Orders */}
      {preorderBooks.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">📦 প্রি-অর্ডার</h2>
              <Link href="/books?filter=preorder" className="section-link">সব দেখুন →</Link>
            </div>
            <div className={`grid grid-5 ${styles.bookGrid}`}>
              {preorderBooks.map((book, i) => (
                <div key={book.id} style={{ animationDelay: `${i * 0.08}s` }} className="animate-fadeInUp">
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* View All Books Button */}
      <section className="section" style={{ textAlign: 'center', paddingBottom: 'var(--space-12)' }}>
        <Link href="/books" className="btn btn-primary btn-lg" style={{ borderRadius: 'var(--radius-full)' }}>
          📚 সকল বই দেখুন
        </Link>
      </section>

    </>
  );
}
