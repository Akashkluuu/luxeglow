import { motion } from 'motion/react';

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 p-8 md:p-12 rounded-[2rem]"
      >
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-slate-400">
          <p>Last Updated: April 7, 2026</p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
            <p>By accessing or using LuxeGlow, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on LuxeGlow's website for personal, non-commercial transitory viewing only.</p>
            <p>This license shall automatically terminate if you violate any of these restrictions and may be terminated by LuxeGlow at any time.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Disclaimer</h2>
            <p>The materials on LuxeGlow's website are provided on an 'as is' basis. LuxeGlow makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Limitations</h2>
            <p>In no event shall LuxeGlow or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on LuxeGlow's website.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Accuracy of Materials</h2>
            <p>The materials appearing on LuxeGlow's website could include technical, typographical, or photographic errors. LuxeGlow does not warrant that any of the materials on its website are accurate, complete or current. LuxeGlow may make changes to the materials contained on its website at any time without notice.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Governing Law</h2>
            <p>These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.</p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
