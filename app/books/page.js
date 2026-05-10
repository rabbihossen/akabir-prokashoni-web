import Link from 'next/link';
import BookCard from '@/components/BookCard';
import InfiniteBookList from '@/components/InfiniteBookList';
import { getBooks, getCategories } from '@/lib/api';
import styles from './page.module.css';

export default async function BooksPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const selectedCat = resolvedParams.category || 'all';
  const sortBy = resolvedParams.sort || 'popular';
  const viewMode = resolvedParams.view || 'grid';
  const filter = resolvedParams.filter || ''; // new, preorder, offer

  // Fetch categories for sidebar
  const categoriesResult = await getCategories().catch(() => ({ results: [] }));
  const categories = Array.isArray(categoriesResult?.results) ? categoriesResult.results : (Array.isArray(categoriesResult) ? categoriesResult : []);

  // Build params for API
  const apiParams = {};
  if (selectedCat !== 'all') apiParams.category = selectedCat;
  if (sortBy === 'new') apiParams.new_release = 'true';
  // Note: API doesn't support 'price-low' sort natively yet, this is basic mapping
  if (filter === 'new') apiParams.new_release = 'true';
  if (filter === 'preorder') apiParams.preorder = 'true';

  // Fetch books
  const booksResult = await getBooks(apiParams).catch(() => ({ results: [] }));
  let sortedBooks = Array.isArray(booksResult?.results) ? booksResult.results : (Array.isArray(booksResult) ? booksResult : []);
  let nextUrl = booksResult?.next || null;

  // Manual sorting if API doesn't support it fully
  if (sortBy === 'price-low') sortedBooks.sort((a, b) => a.price - b.price);
  if (sortBy === 'price-high') sortedBooks.sort((a, b) => b.price - a.price);

  // Helper for generating URLs
  const getUrl = (updates) => {
    const params = new URLSearchParams(resolvedParams);
    for (const [key, value] of Object.entries(updates)) {
      if (value === null) params.delete(key);
      else params.set(key, value);
    }
    return `?${params.toString()}`;
  };

  return (
    <div className="container section">
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>সকল বই</h1>
        <p className={styles.resultCount}>({sortedBooks.length})</p>
      </div>

      <div className={styles.pageGrid}>
        {/* Sidebar Filters */}
        <aside className={styles.sidebar}>
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>বিষয়</h3>
            <Link
              href={getUrl({ category: 'all' })}
              className={`${styles.filterBtn} ${selectedCat === 'all' ? styles.filterActive : ''}`}
            >
              সকল বিষয়
            </Link>
            {categories.map(cat => (
              <Link
                key={cat.slug}
                href={getUrl({ category: cat.slug })}
                className={`${styles.filterBtn} ${selectedCat === cat.slug ? styles.filterActive : ''}`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </aside>

        {/* Books */}
        <div className={styles.booksSection}>
          <div className={styles.toolbar}>
            <div className={styles.sortGroup}>
              <label>সাজান:</label>
              <div className={styles.sortLinks}>
                <Link href={getUrl({ sort: 'popular' })} className={sortBy === 'popular' ? styles.sortActive : ''}>জনপ্রিয়</Link>
                <Link href={getUrl({ sort: 'new' })} className={sortBy === 'new' ? styles.sortActive : ''}>নতুন</Link>
                <Link href={getUrl({ sort: 'price-low' })} className={sortBy === 'price-low' ? styles.sortActive : ''}>মূল্য কম</Link>
                <Link href={getUrl({ sort: 'price-high' })} className={sortBy === 'price-high' ? styles.sortActive : ''}>মূল্য বেশি</Link>
              </div>
            </div>
            <div className={styles.viewToggle}>
              <Link href={getUrl({ view: 'grid' })} className={viewMode === 'grid' ? styles.viewActive : ''}>▦</Link>
              <Link href={getUrl({ view: 'list' })} className={viewMode === 'list' ? styles.viewActive : ''}>☰</Link>
            </div>
          </div>

          <InfiniteBookList initialBooks={sortedBooks} initialNextUrl={nextUrl} viewMode={viewMode} />

          {sortedBooks.length === 0 && (
            <div className={styles.noResults}>
              <p>এই বিষয়ে কোনো বই পাওয়া যায়নি</p>
              <Link href="/books" className="btn btn-outline">সকল বই দেখুন</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
