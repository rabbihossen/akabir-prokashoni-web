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

  // Check if sample is image (jpg/png/webp), otherwise treat as PDF since field is sample_pdf
  const isImage = samplePdfUrl && samplePdfUrl.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp|svg)($|\?)/);
  const isPdf = samplePdfUrl && !isImage;

  // Convert Cloudinary PDF URL to image URL (renders specific page)
  const getPdfAsImageUrl = (url, page = 1) => {
    if (!url) return null;
    
    // If it's not a Cloudinary URL, we can't use this trick
    if (!url.includes('cloudinary.com')) return url;

    let imgUrl = url;
    // Ensure it's treated as an image upload, not raw
    imgUrl = imgUrl.replace('/raw/upload/', '/image/upload/');
    
    // Insert pg_{page} after /upload/
    if (imgUrl.includes('/upload/v')) {
      imgUrl = imgUrl.replace('/upload/v', `/upload/pg_${page}/v`);
    } else {
      imgUrl = imgUrl.replace('/upload/', `/upload/pg_${page}/`);
    }
    
    // Change extension to .jpg or append it if missing
    if (imgUrl.toLowerCase().includes('.pdf')) {
      imgUrl = imgUrl.replace(/\.pdf($|\?)/i, '.jpg$1');
    } else {
      // If there's no extension, append .jpg before query params if any
      if (imgUrl.includes('?')) {
        imgUrl = imgUrl.replace('?', '.jpg?');
      } else {
        imgUrl += '.jpg';
      }
    }
    
    return imgUrl;
  };

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
                একটু পড়ে দেখুন
              </button>
            )}
          </div>

          {/* Right: Book Info */}
          <div className={styles.infoSection}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '12px', color: '#1a1a1a', lineHeight: '1.3' }}>{title}</h1>

            <div style={{ fontSize: '16px', color: '#444', marginBottom: '6px' }}>
              <span style={{ color: '#555' }}>লেখক: </span>
              {authorName ? (
                <Link href={`/books?author=${authorSlug}`} style={{ color: '#d12027', textDecoration: 'none' }}>
                  {authorName}
                </Link>
              ) : 'অজানা'}
            </div>

            <div style={{ fontSize: '16px', color: '#444', marginBottom: '12px' }}>
              <span style={{ color: '#555' }}>বিষয়: </span>
              {categoryName ? (
                <Link href={`/books?category=${categorySlug}`} style={{ color: '#d12027', textDecoration: 'none' }}>
                  {categoryName}
                </Link>
              ) : 'সাধারণ'}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '20px' }}>
              <div style={{ color: '#f39c12', fontSize: '18px', letterSpacing: '2px' }}>
                ☆☆☆☆☆
              </div>
              <span style={{ color: '#777', fontSize: '14px' }}>({book.review_count || 0} review)</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '5px' }}>
              <span style={{ fontSize: '26px', fontWeight: 'bold', color: '#333' }}>
                {price.toLocaleString('bn-BD')} টাকা
              </span>
              {discount > 0 && (
                <span style={{ color: '#d12027', fontSize: '18px', fontWeight: 'bold' }}>
                  {discount}% ছাড়
                </span>
              )}
            </div>
            
            {originalPrice > price && (
              <div style={{ color: '#666', fontSize: '20px', textDecoration: 'line-through', marginBottom: '25px' }}>
                {originalPrice.toLocaleString('bn-BD')} টাকা
              </div>
            )}

            <div style={{ borderBottom: '1px dotted #ccc', margin: '25px 0' }}></div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {/* Quantity Control */}
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '4px', height: '44px', background: '#fff' }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: '40px', height: '100%', background: '#f8f8f8', border: 'none', borderRight: '1px solid #ddd', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', color: '#333', borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px' }}>−</button>
                <div style={{ width: '45px', textAlign: 'center', fontSize: '16px', color: '#333', fontWeight: '500' }}>{quantity}</div>
                <button onClick={() => setQuantity(quantity + 1)} style={{ width: '40px', height: '100%', background: '#f8f8f8', border: 'none', borderLeft: '1px solid #ddd', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', color: '#333', borderTopRightRadius: '4px', borderBottomRightRadius: '4px' }}>+</button>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleAddToCart}
                disabled={stock <= 0}
                style={{ background: '#e32636', color: '#fff', border: 'none', borderRadius: '4px', height: '44px', padding: '0 28px', fontSize: '16px', fontWeight: '600', cursor: stock > 0 ? 'pointer' : 'not-allowed', opacity: stock > 0 ? 1 : 0.6, transition: 'background 0.2s' }}
                onMouseOver={(e) => e.target.style.background = '#cc2230'}
                onMouseOut={(e) => e.target.style.background = '#e32636'}
              >
                {addedToCart ? '✓ যোগ করা হয়েছে' : 'কার্টে যোগ করুন'}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={stock <= 0}
                style={{ background: '#e32636', color: '#fff', border: 'none', borderRadius: '4px', height: '44px', padding: '0 28px', fontSize: '16px', fontWeight: '600', cursor: stock > 0 ? 'pointer' : 'not-allowed', opacity: stock > 0 ? 1 : 0.6, transition: 'background 0.2s' }}
                onMouseOver={(e) => e.target.style.background = '#cc2230'}
                onMouseOut={(e) => e.target.style.background = '#e32636'}
              >
                এখনই কিনুন
              </button>
            </div>

            {stock <= 0 && <div style={{ color: '#e32636', marginTop: '15px', fontWeight: 'bold' }}>দুঃখিত, বইটি বর্তমানে স্টকে নেই।</div>}

            <div style={{ borderBottom: '1px dotted #ccc', margin: '35px 0 20px 0' }}></div>

            {/* Social Share Icons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {['fb', 'twitter', 'linkedin', 'whatsapp', 'pinterest', 'email'].map((platform) => (
                <button key={platform} style={{ width: '42px', height: '42px', border: '1px solid #e0e0e0', borderRadius: '8px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }} onMouseOver={(e) => e.currentTarget.style.borderColor = '#ccc'} onMouseOut={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}>
                  {platform === 'fb' && <span style={{ color: '#1877F2', fontWeight: 'bold', fontSize: '18px', fontFamily: 'Arial' }}>f</span>}
                  {platform === 'twitter' && <span style={{ color: '#000', fontWeight: 'bold', fontSize: '18px', fontFamily: 'Arial' }}>𝕏</span>}
                  {platform === 'linkedin' && <span style={{ color: '#0A66C2', fontWeight: 'bold', fontSize: '16px', fontFamily: 'Arial' }}>in</span>}
                  {platform === 'whatsapp' && <span style={{ color: '#25D366', fontSize: '18px' }}>💬</span>}
                  {platform === 'pinterest' && <span style={{ color: '#E60023', fontWeight: 'bold', fontStyle: 'italic', fontSize: '18px', fontFamily: 'serif' }}>p</span>}
                  {platform === 'email' && <span style={{ color: '#D44638', fontSize: '18px' }}>✉</span>}
                </button>
              ))}
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
              <h3 className={styles.modalTitle}>একটু পড়ে দেখুন — {title}</h3>
              <button className={styles.modalClose} onClick={() => setShowPreview(false)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              {isPdf ? (
                <div className={styles.pdfPagesWrap}>
                  {[1, 2, 3, 4].map(page => (
                    <img
                      key={page}
                      src={getPdfAsImageUrl(samplePdfUrl, page)}
                      alt={`${title} - পৃষ্ঠা ${page}`}
                      className={styles.pdfPageImage}
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  ))}
                </div>
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
