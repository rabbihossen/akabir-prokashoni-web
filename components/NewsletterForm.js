'use client';

import styles from '../app/page.module.css';

export default function NewsletterForm() {
  return (
    <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="আপনার ইমেইল ঠিকানা"
        className={styles.newsletterInput}
      />
      <button type="submit" className="btn btn-accent">
        সাবস্ক্রাইব
      </button>
    </form>
  );
}
