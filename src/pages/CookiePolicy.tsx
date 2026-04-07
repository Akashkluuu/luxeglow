import { motion } from 'motion/react';

export default function CookiePolicy() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 p-8 md:p-12 rounded-[2rem]"
      >
        <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-slate-400">
          <p>Last Updated: April 7, 2026</p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. What Are Cookies</h2>
            <p>As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Cookies</h2>
            <p>We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. The Cookies We Set</h2>
            <ul className="list-disc pl-6 space-y-4">
              <li>
                <strong>Account related cookies:</strong> If you create an account with us then we will use cookies for the management of the signup process and general administration.
              </li>
              <li>
                <strong>Login related cookies:</strong> We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page.
              </li>
              <li>
                <strong>Orders processing related cookies:</strong> This site offers e-commerce or payment facilities and some cookies are essential to ensure that your order is remembered between pages so that we can process it properly.
              </li>
              <li>
                <strong>Site preferences cookies:</strong> In order to provide you with a great experience on this site we provide the functionality to set your preferences for how this site runs when you use it.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Third Party Cookies</h2>
            <p>In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.</p>
            <p>This site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Disabling Cookies</h2>
            <p>You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit.</p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
