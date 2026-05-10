import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={`container ${styles.footerGrid}`}>
          {/* Brand */}
          <div className={styles.footerBrand}>
            <div className={styles.brandLogo}>
              <span className={styles.brandIcon}>📚</span>
              <div>
                <h3 className={styles.brandName}>আকাবির প্রকাশনী</h3>
                <p className={styles.brandTagline}>জ্ঞানের আলোয় আলোকিত হোন</p>
              </div>
            </div>
            <p className={styles.brandDesc}>
              বাংলাদেশের বিশ্বস্ত অনলাইন বুকশপ। হাজারো বইয়ের বিশাল সংগ্রহ থেকে আপনার পছন্দের বই বেছে নিন।
            </p>
            <div className={styles.socialLinks}>
              <a href="#" aria-label="Facebook" className={styles.socialLink}>f</a>
              <a href="#" aria-label="YouTube" className={styles.socialLink}>▶</a>
              <a href="#" aria-label="Instagram" className={styles.socialLink}>✦</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.footerCol}>
            <h4 className={styles.colTitle}>দ্রুত লিংক</h4>
            <ul className={styles.colLinks}>
              <li><Link href="/books">সকল বই</Link></li>
              <li><Link href="/books?filter=new">নতুন প্রকাশিত</Link></li>
              <li><Link href="/books?filter=offer">আজকের অফার</Link></li>
              <li><Link href="/books?filter=preorder">প্রি-অর্ডার</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className={styles.footerCol}>
            <h4 className={styles.colTitle}>গ্রাহক সেবা</h4>
            <ul className={styles.colLinks}>
              <li><Link href="/track">অর্ডার ট্র্যাক</Link></li>
              <li><Link href="/shipping">শিপিং পলিসি</Link></li>
              <li><Link href="/return">রিটার্ন পলিসি</Link></li>
              <li><Link href="/faq">সাধারণ জিজ্ঞাসা</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.footerCol}>
            <h4 className={styles.colTitle}>যোগাযোগ</h4>
            <ul className={styles.colContact}>
              <li>📍 বাংলাবাজার, ঢাকা-১১০০</li>
              <li>📞 +880 1XXX-XXXXXX</li>
              <li>✉️ info@akabir.com</li>
              <li>🕐 সকাল ৯টা - রাত ১০টা</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment Partners */}
      <div className={styles.paymentBar}>
        <div className={`container ${styles.paymentInner}`}>
          <span className={styles.paymentLabel}>পেমেন্ট পার্টনার:</span>
          <div className={styles.paymentLogos}>
            <span className={styles.paymentBadge}>bKash</span>
            <span className={styles.paymentBadge}>Nagad</span>
            <span className={styles.paymentBadge}>VISA</span>
            <span className={styles.paymentBadge}>MasterCard</span>
            <span className={styles.paymentBadge}>COD</span>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className={styles.copyright}>
        <div className="container">
          <p>© {new Date().getFullYear()} আকাবির প্রকাশনী। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
}
