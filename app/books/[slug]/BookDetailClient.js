'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/CartContext';
import BookCard from '@/components/BookCard';
import styles from './page.module.css';

export default function BookDetailClient({ book, relatedBooks }) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addedToCart, setAddedToCart] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  if (!book) return null;

  // Normalize API fields
  const title = book.title || '';
  const price = Number(book.price) || 0;
  const originalPrice = Number(book.original_price) || 0;
  const coverImage = book.cover || book.cover_image || null;
  const authorName = book.author?.name || book.author_name || '';
  const authorSlug = book.author?.slug || '';
  const categoryName = book.category?.name || book.category_name || '';
  const categorySlug = book.category?.slug || '';
  const stock = book.stock || 0;
  const discount = originalPrice > price
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  // Ensure image URL is absolute and uses correct host
  const getFileUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    const base = process.env.NEXT_PUBLIC_API_URL 
      ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '')
      : 'http://127.0.0.1:8000';
    return `${base}${url.startsWith('/') ? '' : '/'}${url}`;
  };
  const finalCoverImage = getFileUrl(coverImage);
  const samplePdfUrl = getFileUrl(book.sample_pdf);

  // Check if sample is PDF or image
  const isPdf = samplePdfUrl && samplePdfUrl.toLowerCase().match(/\.pdf($|\?)/);

  const handleAddToCart = () => {
    addToCart({
      id: book.id,
      title: title,
      price: price,
      coverImage: finalCoverImage,
      author: authorName,
      slug: book.slug
    }, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart({
      id: book.id,
      title: title,
      price: price,
      coverImage: finalCoverImage,
      author: authorName,
      slug: book.slug
    }, quantity);
    router.push('/checkout');
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <div className="container">
          <Link href="/">হোম</Link>
          <span className={styles.separator}>/</span>
          <Link href="/books">সকল বই</Link>
          {categoryName && (
            <>
              <span className={styles.separator}>/</span>
              <Link href={`/books?category=${categorySlug}`}>{categoryName}</Link>
            </>
          )}
          <span className={styles.separator}>/</span>
          <span className={styles.breadcrumbCurrent}>{title}</span>
        </div>
      </nav>

      <div className="container">
        <div className={styles.detailGrid}>
          {/* Left: Book Cover */}
          <div className={styles.imageSection}>
            <div className={styles.mainImage}>
              {discount > 0 && <span className={styles.discountBadge}>{discount}% ছাড়</span>}
              {finalCoverImage ? (
                <img
                  src={finalCoverImage}
                  alt={title}
                  className={styles.bookCover}
                />
              ) : (
                <div className={styles.imagePlaceholder}>
                  <span className={styles.placeholderTitle}>{title}</span>
                </div>
              )}
            </div>

            {/* "একটু পড়ে দেখুন" Button */}
            {samplePdfUrl && (
              <button
                className={styles.previewBtn}
                onClick={() => setShowPreview(true)}
              >
                📖 একটু পড়ে দেখুন
              </button>
            )}
          </div>

          {/* Right: Book Info */}
          <div className={styles.infoSection}>
            <h1 className={styles.bookTitle}>{title}</h1>

            {authorName && (
              <Link href={`/books?author=${authorSlug}`} className={styles.authorLink}>
                {authorName}
              </Link>
            )}

            {/* Price Block */}
            <div className={styles.priceBlock}>
              <span className={styles.currentPrice}>৳{price.toLocaleString()}</span>
              {originalPrice > price && (
                <>
                  <span className={styles.originalPrice}>৳{originalPrice.toLocaleString()}</span>
                  <span className={styles.saveBadge}>৳{(originalPrice - price).toLocaleString()} সাশ্রয়</span>
                </>
              )}
            </div>

            {/* Stock */}
            <div className={styles.stockInfo}>
              {stock > 0 ? (
                <span className={styles.inStock}>স্টকে আছে ({stock} পিস)</span>
              ) : (
                <span className={styles.outOfStock}>স্টক শেষ</span>
              )}
            </div>

            {/* Quantity + Buttons */}
            <div className={styles.actionArea}>
              <div className={styles.quantityRow}>
                <span className={styles.qtyLabel}>পরিমাণ:</span>
                <div className={styles.qtyControl}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>
              <button
                className={styles.cartBtn}
                onClick={handleAddToCart}
                disabled={stock <= 0}
              >
                {addedToCart ? 'যোগ করা হয়েছে' : 'কার্টে যোগ করুন'}
              </button>
              <button
                className={styles.buyBtn}
                onClick={handleBuyNow}
                disabled={stock <= 0}
              >
                এখনই কিনুন
              </button>
            </div>

            {/* Book Specs */}
            <div className={styles.specsTable}>
              <h3 className={styles.specsTitle}>বইয়ের তথ্য</h3>
              <table>
                <tbody>
                  {authorName && <tr><td>লেখক</td><td>{authorName}</td></tr>}
                  {categoryName && <tr><td>বিষয়</td><td>{categoryName}</td></tr>}
                  {book.pages && <tr><td>পৃষ্ঠা</td><td>{book.pages}</td></tr>}
                  {book.edition && <tr><td>সংস্করণ</td><td>{book.edition}</td></tr>}
                  <tr><td>ভাষা</td><td>{book.language || 'বাংলা'}</td></tr>
                  {book.isbn && <tr><td>ISBN</td><td>{book.isbn}</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Description Tabs */}
        <div className={styles.descSection}>
          <div className={styles.tabBar}>
            <button
              className={`${styles.tab} ${activeTab === 'description' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('description')}
            >Summary</button>
            <button
              className={`${styles.tab} ${activeTab === 'specification' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('specification')}
            >Specification</button>
            <button
              className={`${styles.tab} ${activeTab === 'author' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('author')}
            >Author</button>
          </div>
          <div className={styles.tabContent}>
            {activeTab === 'description' && (
              <div className={styles.descriptionText}>
                <h3 className={styles.contentTitle}>বইটির সংক্ষিপ্ত বিবরণ</h3>
                <p>{book.description || 'বিবরণ পাওয়া যায়নি।'}</p>
              </div>
            )}
            
            {activeTab === 'specification' && (
              <div className={styles.specificationTable}>
                <h3 className={styles.contentTitle}>বইটির বিস্তারিত তথ্য</h3>
                <table className={styles.specTable}>
                  <tbody>
                    <tr>
                      <td className={styles.specLabel}>Title</td>
                      <td className={styles.specValue}>{title}</td>
                    </tr>
                    <tr>
                      <td className={styles.specLabel}>Author</td>
                      <td className={styles.specValue}>
                        <Link href={`/books?author=${authorSlug}`} className={styles.specLink}>
                          {authorName}
                        </Link>
                      </td>
                    </tr>
                    {book.translator && (
                      <tr>
                        <td className={styles.specLabel}>Translator</td>
                        <td className={styles.specValue}>{book.translator}</td>
                      </tr>
                    )}
                    {book.editor && (
                      <tr>
                        <td className={styles.specLabel}>Editor</td>
                        <td className={styles.specValue}>{book.editor}</td>
                      </tr>
                    )}
                    {book.publisher && (
                      <tr>
                        <td className={styles.specLabel}>Publisher</td>
                        <td className={styles.specValue}>{book.publisher}</td>
                      </tr>
                    )}
                    {book.isbn && (
                      <tr>
                        <td className={styles.specLabel}>ISBN</td>
                        <td className={styles.specValue}>{book.isbn}</td>
                      </tr>
                    )}
                    {book.edition && (
                      <tr>
                        <td className={styles.specLabel}>Edition</td>
                        <td className={styles.specValue}>{book.edition}</td>
                      </tr>
                    )}
                    {book.pages > 0 && (
                      <tr>
                        <td className={styles.specLabel}>Number of Pages</td>
                        <td className={styles.specValue}>{book.pages}</td>
                      </tr>
                    )}
                    <tr>
                      <td className={styles.specLabel}>Country</td>
                      <td className={styles.specValue}>বাংলাদেশ</td>
                    </tr>
                    <tr>
                      <td className={styles.specLabel}>Language</td>
                      <td className={styles.specValue}>{book.language === 'bangla' ? 'বাংলা' : book.language}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'author' && (
              <div className={styles.authorContent}>
                <h3 className={styles.contentTitle}>{authorName}</h3>
                <p>{book.author?.bio || 'লেখকের তথ্য পাওয়া যায়নি।'}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Books */}
      {relatedBooks?.length > 0 && (
        <section style={{ marginTop: '48px', padding: '48px 0', background: '#f1f5f9' }}>
          <div className="container">
            <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '24px' }}>সম্পর্কিত বই</h2>
            <div className="grid grid-5">
              {relatedBooks.map(b => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Preview Modal */}
      {showPreview && samplePdfUrl && (
        <div className={styles.modalOverlay} onClick={() => setShowPreview(false)}>
          <div className={styles.previewModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>📖 একটু পড়ে দেখুন — {title}</h3>
              <button className={styles.modalClose} onClick={() => setShowPreview(false)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              {isPdf ? (
                <iframe
                  src={samplePdfUrl}
                  className={styles.modalPdfViewer}
                  title="বইয়ের স্যাম্পল"
                />
              ) : (
                <div className={styles.modalImageWrap}>
                  <img
                    src={samplePdfUrl}
                    alt={`${title} - একটু পড়ে দেখুন`}
                    className={styles.modalImage}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
