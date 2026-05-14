import styles from '../page.module.css';

export const metadata = {
  title: 'শিপিং পলিসি',
};

export default function ShippingPage() {
  return (
    <div className="container section" style={{ minHeight: '60vh', padding: '40px 0' }}>
      <h1 className="section-title" style={{ marginBottom: '24px' }}>শিপিং পলিসি</h1>
      <div style={{ background: '#fff', padding: '30px', borderRadius: '10px', boxShadow: 'var(--shadow-sm)', lineHeight: '1.8' }}>
        <p style={{ marginBottom: '16px' }}>
          আকাবির প্রকাশনী থেকে বই অর্ডার করার পর আমরা যত দ্রুত সম্ভব আপনার ঠিকানায় বই পৌঁছে দেওয়ার চেষ্টা করি।
        </p>
        <h3 style={{ marginTop: '24px', marginBottom: '12px', fontWeight: 'bold' }}>ডেলিভারি সময়</h3>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '16px' }}>
          <li>ঢাকার ভেতরে ডেলিভারি সময়: ২-৩ কার্যদিবস।</li>
          <li>ঢাকার বাইরে ডেলিভারি সময়: ৩-৫ কার্যদিবস।</li>
        </ul>
        <h3 style={{ marginTop: '24px', marginBottom: '12px', fontWeight: 'bold' }}>ডেলিভারি চার্জ</h3>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '16px' }}>
          <li>ঢাকার ভেতরে: ৬০ টাকা।</li>
          <li>ঢাকার বাইরে: ১০০ টাকা।</li>
        </ul>
        <p>
          বিশেষ অফার বা ক্যাম্পেইনের সময় শিপিং চার্জ পরিবর্তন হতে পারে, যা চেকআউট পেজে দেখতে পাবেন।
        </p>
      </div>
    </div>
  );
}
