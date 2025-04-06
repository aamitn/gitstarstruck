'use client';

import Modal from '@/components/common/Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicyModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Privacy Policy">
      <div className="space-y-4 text-sm leading-6 text-gray-700 dark:text-gray-300">
        <p>
          GitStarStruck respects your privacy and is committed to protecting
          your personal data. We do not sell, rent, or share your GitHub-related
          information or any other user data with third parties.
        </p>

        <p>
          GitStarStruck only uses your data to authenticate with GitHub and
          display publicly available information, such as your GitHub stars,
          repositories, and profile details. All data is processed in real-time
          and is not stored on our servers unless explicitly required for
          features like leaderboard rankings or profile enhancements.
        </p>

        <p>
          We do not collect or track sensitive personal information. Any usage
          analytics are anonymized and used strictly to improve user experience
          and application performance.
        </p>

        <p>
          By using GitStarStruck, you agree to this privacy policy. If you have
          any concerns or would like to request data deletion or clarification,
          you may contact us at any time via our Matrix channel:
          <br />
          <a
            href="https://matrix.to/#/@bigwiz:synapse.bitmutex.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            @bigwiz:synapse.bitmutex.com
          </a>
        </p>
      </div>
    </Modal>
  );
}
