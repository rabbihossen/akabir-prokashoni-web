'use client';
import { useState } from 'react';
import { orderStatuses } from '@/lib/data';
import styles from './page.module.css';
import { trackOrder } from '@/lib/api';

export default function TrackPage() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOrder(null);
    try {
      const data = await trackOrder(orderId);
      if (data) {
        setOrder(data);
      } else {
        setError('অর্ডার আইডি ভুল অথবা পাওয়া যায়নি।');
      }
    } catch (err) {
      setError('সার্ভার থেকে ডেটা আনতে সমস্যা হচ্ছে।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container section">
      <h1 className={styles.pageTitle}>📦 অর্ডার ট্র্যাক করুন</h1>

      <div className={styles.searchBox}>
        <form onSubmit={handleTrack} className={styles.searchForm}>
          <input
            type="text"
            required
            placeholder="অর্ডার আইডি লিখুন (যেমন: AKB-2026-001234)"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
            {loading ? 'খোঁজা হচ্ছে...' : 'ট্র্যাক করুন'}
          </button>
        </form>
        {error && <p style={{ color: 'var(--color-error)', marginTop: '1rem', textAlign: 'center' }}>{error}</p>}
      </div>

      {order && (
        <div className={styles.resultCard}>
          <div className={styles.orderHeader}>
            <div>
              <h2 className={styles.orderId}>অর্ডার #{order.order_id}</h2>
              <p className={styles.orderDate}>তারিখ: {new Date(order.created_at).toLocaleDateString('bn-BD')}</p>
            </div>
            <span className={styles.statusBadge}>
              {order.steadfast_status ? `🚚 SteadFast: ${order.steadfast_status}` : `📌 ${order.status_display}`}
            </span>
          </div>

          {/* SteadFast Details if sent */}
          {order.steadfast_consignment_id && (
            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem', border: '1px solid #cbd5e1' }}>
              <h3 style={{ color: '#0369a1', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>🚀</span> স্টেটফাস্ট ডেলিভারি ট্র্যাকিং
              </h3>
              <p><strong>কনসাইনমেন্ট আইডি:</strong> {order.steadfast_consignment_id}</p>
              {order.steadfast_tracking_code && <p><strong>ট্র্যাকিং কোড:</strong> {order.steadfast_tracking_code}</p>}
              <p><strong>সর্বশেষ অবস্থা:</strong> {order.steadfast_status || 'অপেক্ষমাণ'}</p>
              <a href={`https://steadfast.com.bd/t/${order.steadfast_consignment_id}`} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ marginTop: '0.5rem', display: 'inline-block' }}>
                স্টেটফাস্ট ওয়েবসাইটে বিস্তারিত দেখুন
              </a>
            </div>
          )}

          {/* Order Items */}
          <div className={styles.orderItems}>
            <h3>অর্ডারকৃত বই</h3>
            {order.items.map((item, i) => (
              <div key={i} className={styles.orderItem}>
                <span className={styles.orderItemIcon}>📖</span>
                <div className={styles.orderItemInfo}>
                  <strong>{item.book_title}</strong>
                  <span>পরিমাণ: {item.quantity}</span>
                </div>
                <span className={styles.orderItemPrice}>৳{item.price}</span>
              </div>
            ))}
            <div className={styles.orderTotal}>
              <span>ডেলিভারি চার্জ:</span>
              <strong>৳{order.delivery_charge}</strong>
            </div>
            <div className={styles.orderTotal} style={{ borderTop: 'none', paddingTop: 0 }}>
              <span>সর্বমোট:</span>
              <strong>৳{order.total}</strong>
            </div>
          </div>

          <div className={styles.deliveryInfo}>
            <h3>📍 ডেলিভারি ঠিকানা</h3>
            <p><strong>নাম:</strong> {order.customer_name}</p>
            <p><strong>মোবাইল:</strong> {order.phone}</p>
            <p><strong>জেলা:</strong> {order.district}</p>
            <p><strong>ঠিকানা:</strong> {order.address}</p>
            <p><strong>পেমেন্ট:</strong> {order.payment_display}</p>
          </div>
        </div>
      )}
    </div>
  );
}
