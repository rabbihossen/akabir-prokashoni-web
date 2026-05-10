'use client';
import styles from './page.module.css';

export default function AdminDashboard() {
  const recentOrders = [
    { id: 'AKB-0123', date: 'আজ, ১০:৩০ AM', amount: 1250, status: 'pending', statusText: 'অপেক্ষমাণ' },
    { id: 'AKB-0122', date: 'গতকাল, ০৪:১৫ PM', amount: 850, status: 'confirmed', statusText: 'নিশ্চিতকৃত' },
    { id: 'AKB-0121', date: 'গতকাল, ১১:০০ AM', amount: 2100, status: 'shipped', statusText: 'শিপড' },
    { id: 'AKB-0120', date: '০৮ মে, ২০২৬', amount: 450, status: 'confirmed', statusText: 'নিশ্চিতকৃত' },
  ];

  const getStatusClass = (status) => {
    switch(status) {
      case 'pending': return styles.statusPending;
      case 'confirmed': return styles.statusConfirmed;
      case 'shipped': return styles.statusShipped;
      default: return '';
    }
  };

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>📊 ড্যাশবোর্ড ওভারভিউ</h1>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>💰</div>
          <div className={styles.statInfo}>
            <span className={styles.statNum}>৳ ২৪,৫০০</span>
            <span className={styles.statLabel}>আজকের সেলস</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📦</div>
          <div className={styles.statInfo}>
            <span className={styles.statNum}>১২</span>
            <span className={styles.statLabel}>নতুন অর্ডার</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🚚</div>
          <div className={styles.statInfo}>
            <span className={styles.statNum}>৪৫</span>
            <span className={styles.statLabel}>ডেলিভারি বাকি</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>👥</div>
          <div className={styles.statInfo}>
            <span className={styles.statNum}>৮৫০</span>
            <span className={styles.statLabel}>মোট গ্রাহক</span>
          </div>
        </div>
      </div>

      {/* Main Sections */}
      <div className={styles.sectionsGrid}>
        {/* Recent Orders */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>সাম্প্রতিক অর্ডারসমূহ</h2>
          <div className={styles.orderList}>
            {recentOrders.map(order => (
              <div key={order.id} className={styles.orderItem}>
                <div>
                  <div className={styles.orderId}>{order.id}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>{order.date}</div>
                </div>
                <div style={{ fontWeight: '700' }}>৳{order.amount}</div>
                <div className={`${styles.orderStatus} ${getStatusClass(order.status)}`}>
                  {order.statusText}
                </div>
              </div>
            ))}
          </div>
          <a href="/admin/orders" className="btn btn-outline" style={{ width: '100%', marginTop: 'var(--space-4)' }}>
            সব অর্ডার দেখুন →
          </a>
        </div>

        {/* Quick Actions / Notifications */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>নোটিফিকেশন</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div style={{ padding: 'var(--space-3)', background: '#FEF2F2', borderLeft: '4px solid #EF4444', borderRadius: '4px' }}>
              <strong style={{ display: 'block', color: '#991B1B' }}>⚠️ লো স্টক অ্যালার্ট</strong>
              <span style={{ fontSize: 'var(--text-sm)', color: '#7F1D1D' }}>'প্যারাডক্সিক্যাল সাজিদ' এর স্টক ৫ এর নিচে।</span>
            </div>
            <div style={{ padding: 'var(--space-3)', background: '#ECFCCB', borderLeft: '4px solid #84CC16', borderRadius: '4px' }}>
              <strong style={{ display: 'block', color: '#3F6212' }}>🎉 নতুন মাইলফলক</strong>
              <span style={{ fontSize: 'var(--text-sm)', color: '#4D7C0F' }}>আজকের সেলস টার্গেট পূর্ণ হয়েছে!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
