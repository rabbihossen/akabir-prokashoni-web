import styles from '../page.module.css';

export const metadata = {
  title: 'রিটার্ন পলিসি',
};

export default function ReturnPage() {
  return (
    <div className="container section" style={{ minHeight: '60vh', padding: '40px 0' }}>
      <h1 className="section-title" style={{ marginBottom: '24px' }}>রিটার্ন পলিসি</h1>
      <div style={{ background: '#fff', padding: '30px', borderRadius: '10px', boxShadow: 'var(--shadow-sm)', lineHeight: '1.8' }}>
        <p style={{ marginBottom: '16px' }}>
          আকাবির প্রকাশনী সবসময় গ্রাহকের সন্তুষ্টিকে সর্বোচ্চ অগ্রাধিকার দেয়। তবে কোনো কারণে যদি আপনি আমাদের পাঠানো বই নিয়ে সন্তুষ্ট না হন, তবে নির্দিষ্ট শর্ত সাপেক্ষে আপনি তা রিটার্ন বা পরিবর্তন করতে পারবেন।
        </p>
        <h3 style={{ marginTop: '24px', marginBottom: '12px', fontWeight: 'bold' }}>রিটার্ন বা পরিবর্তনের শর্তাবলি:</h3>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '16px' }}>
          <li style={{ marginBottom: '8px' }}>বই রিসিভ করার সময় যদি ছেঁড়া, ভুল বই, বা কোনো পাতা মিসিং থাকে, তবে আপনি বইটি রিটার্ন করতে পারবেন।</li>
          <li style={{ marginBottom: '8px' }}>সমস্যা থাকলে ডেলিভারি পাওয়ার ৩ দিনের মধ্যে আমাদের কাস্টমার কেয়ারে যোগাযোগ করতে হবে।</li>
          <li style={{ marginBottom: '8px' }}>রিটার্ন করা বইটি অবশ্যই পড়ার দাগ বা কোনো কালির দাগ মুক্ত থাকতে হবে এবং নতুনের মতো অবস্থায় থাকতে হবে।</li>
        </ul>
        <p>
          যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন: <strong>akabirprokashoni@gmail.com</strong> অথবা <strong>+880 1718763978</strong>
        </p>
      </div>
    </div>
  );
}
