'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './layout.module.css';

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className={styles.adminContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <span>📚</span> অ্যাডমিন
        </div>
        <nav className={styles.sidebarNav}>
          <Link href="/admin" className={`${styles.navLink} ${pathname === '/admin' ? styles.navActive : ''}`}>
            📊 ড্যাশবোর্ড
          </Link>
          <Link href="/admin/books" className={`${styles.navLink} ${pathname.includes('/books') ? styles.navActive : ''}`}>
            📖 বই ম্যানেজমেন্ট
          </Link>
          <Link href="/admin/categories" className={`${styles.navLink} ${pathname.includes('/categories') ? styles.navActive : ''}`}>
            📂 ক্যাটাগরি ম্যানেজমেন্ট
          </Link>
          <Link href="/admin/hero" className={`${styles.navLink} ${pathname.includes('/hero') ? styles.navActive : ''}`}>
            🖼️ হিরো স্লাইডার
          </Link>
          <Link href="/admin/orders" className={`${styles.navLink} ${pathname.includes('/orders') ? styles.navActive : ''}`}>
            📦 অর্ডার ম্যানেজমেন্ট
          </Link>
          <Link href="/admin/settings" className={`${styles.navLink} ${pathname.includes('/settings') ? styles.navActive : ''}`}>
            ⚙️ সাইট সেটিংস
          </Link>
        </nav>
        <Link href="/" className={styles.backLink}>← ওয়েবসাইটে ফিরুন</Link>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
