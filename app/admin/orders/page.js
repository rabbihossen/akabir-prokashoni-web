'use client';
import { useState } from 'react';
import styles from './page.module.css';

const initialOrders = [
  { id: 'AKB-0123', customerName: 'রাকিবুল ইসলাম', phone: '01711XXXXXX', address: 'মিরপুর, ঢাকা', items: 'ঘুরে দাঁড়াও (১), প্যারাডক্সিক্যাল সাজিদ (২)', total: 1250, status: 'pending', date: '১০ মে, ২০২৬' },
  { id: 'AKB-0122', customerName: 'শামিম হুসাইন', phone: '01822XXXXXX', address: 'খুলনা সদর', items: 'এক নজরে কুরআন (১)', total: 1590, status: 'confirmed', date: '০৯ মে, ২০২৬' },
  { id: 'AKB-0121', customerName: 'তানভীর আহমেদ', phone: '01933XXXXXX', address: 'সিলেট', items: 'হিউম্যান বিয়িং (৩)', total: 2100, status: 'shipped', date: '০৯ মে, ২০২৬' },
  { id: 'AKB-0120', customerName: 'আরিফ ফয়সাল', phone: '01544XXXXXX', address: 'রাজশাহী', items: 'আদর্শ মুসলিম (১)', total: 450, status: 'delivered', date: '০৮ মে, ২০২৬' },
  { id: 'AKB-0119', customerName: 'জাকির হোসেন', phone: '01655XXXXXX', address: 'উত্তরা, ঢাকা', items: 'ডাবল স্ট্যান্ডার্ড (১)', total: 290, status: 'cancelled', date: '০৭ মে, ২০২৬' },
];

const statusOptions = [
  { value: 'all', label: 'সকল অর্ডার' },
  { value: 'pending', label: 'অপেক্ষমাণ' },
  { value: 'confirmed', label: 'নিশ্চিতকৃত' },
  { value: 'packaging', label: 'প্যাকেজিং চলছে' },
  { value: 'shipped', label: 'শিপড' },
  { value: 'delivered', label: 'ডেলিভারড' },
  { value: 'cancelled', label: 'বাতিল' },
];

export default function AdminOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState('all');

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  const handleStatusChange = (id, newStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const getStatusLabel = (statusValue) => {
    return statusOptions.find(o => o.value === statusValue)?.label || statusValue;
  };

  return (
    <div className={styles.ordersPage}>
      <div className={styles.topBar}>
        <h1 className={styles.title}>📦 অর্ডার ম্যানেজমেন্ট</h1>
      </div>

      <div className={styles.filters}>
        <select className={styles.filterSelect} value={filter} onChange={(e) => setFilter(e.target.value)}>
          {statusOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <input type="text" className="input" placeholder="অর্ডার আইডি বা নাম দিয়ে খুঁজুন..." style={{ maxWidth: '300px' }} />
      </div>

      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>অর্ডার আইডি ও তারিখ</th>
              <th>গ্রাহকের তথ্য</th>
              <th>বইসমূহ</th>
              <th>মোট বিল</th>
              <th>বর্তমান স্ট্যাটাস</th>
              <th>স্ট্যাটাস আপডেট</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? filteredOrders.map(order => (
              <tr key={order.id}>
                <td>
                  <div style={{ fontWeight: '700', color: 'var(--color-primary)' }}>{order.id}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>{order.date}</div>
                </td>
                <td>
                  <div className={styles.customerInfo}>
                    <span className={styles.customerName}>{order.customerName}</span>
                    <span className={styles.customerPhone}>{order.phone}</span>
                    <span style={{ fontSize: 'var(--text-xs)' }}>{order.address}</span>
                  </div>
                </td>
                <td>
                  <div className={styles.orderItems} title={order.items}>
                    {order.items.length > 30 ? order.items.substring(0, 30) + '...' : order.items}
                  </div>
                </td>
                <td style={{ fontWeight: '700' }}>৳{order.total}</td>
                <td>
                  <span className={`${styles.orderStatus} ${styles[`status-${order.status}`]}`}>
                    {getStatusLabel(order.status)}
                  </span>
                </td>
                <td>
                  <select 
                    className={styles.actionSelect}
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    {statusOptions.filter(o => o.value !== 'all').map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: 'var(--space-8)' }}>কোনো অর্ডার পাওয়া যায়নি।</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
