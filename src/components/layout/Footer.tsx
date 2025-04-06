'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import PrivacyPolicyModal from '@/components/modals/PrivacyPolicyModal';
import TermsModal from '@/components/modals/TermsModal';

const Footer = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <>
      <motion.footer
        className="mt-32 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-600 dark:text-gray-400 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="font-medium text-gray-800 dark:text-gray-200">
                © {new Date().getFullYear()} GitStarStruck
              </p>
              <p className="text-xs">
                Built with ❤️ using{' '}
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Next.js
                </a>{' '}
                by{' '}
                <a
                  href="https://bitmutex.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Bitmutex Technologies
                </a>
                .
              </p>
            </div>

            <div className="flex gap-4 text-xs">
              <button
                onClick={() => setShowPrivacy(true)}
                className="hover:text-blue-600 dark:hover:text-blue-400 underline"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setShowTerms(true)}
                className="hover:text-blue-600 dark:hover:text-blue-400 underline"
              >
                Terms of Service
              </button>
              <a
                href="mailto:support@gitstarstruck.com"
                className="hover:text-blue-600 dark:hover:text-blue-400 underline"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </motion.footer>

      {/* Modals */}
      <PrivacyPolicyModal
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
      />
      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
    </>
  );
};

export default Footer;
