import { motion } from 'motion/react';

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 p-8 md:p-12 rounded-[2rem]"
      >
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-slate-400">
          <p>Last Updated: April 7, 2026</p>
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p>Welcome to LuxeGlow. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. The Data We Collect</h2>
            <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
              <li><strong>Financial Data:</strong> includes bank account and payment card details (processed securely via Stripe).</li>
              <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
              <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Data</h2>
            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To register you as a new customer.</li>
              <li>To process and deliver your order.</li>
              <li>To manage our relationship with you.</li>
              <li>To enable you to partake in a prize draw, competition or complete a survey.</li>
              <li>To improve our website, products/services, marketing or customer relationships.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
            <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Your Legal Rights</h2>
            <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, and the right to withdraw consent.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Contact Us</h2>
            <p>If you have any questions about this privacy policy or our privacy practices, please contact us at: <strong>privacy@luxeglow.in</strong></p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
