'use client';

import Modal from '@/components/common/Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Terms of Service">
      <div className="space-y-4 text-sm leading-6 text-gray-700 dark:text-gray-300">
        <p>
          By accessing or using GitStarStruck, you agree to be bound by these
          Terms of Service. These terms apply to all users, visitors, and others
          who access or use the platform.
        </p>

        <p>
          You agree to use GitStarStruck solely for lawful purposes and in a
          manner that does not infringe the rights of, restrict, or inhibit
          anyone else’s use of the service. You must not misuse the platform,
          interfere with its normal operation, or attempt to gain unauthorized
          access to any part of the service.
        </p>

        <p>
          GitStarStruck integrates with GitHub using public APIs. While we
          enhance and visualize your GitHub profile data, you retain full
          ownership of your GitHub content. We do not alter or manipulate this
          data in any way beyond display purposes.
        </p>

        <p>
          We reserve the right to modify or discontinue the service at any time,
          with or without notice. Continued use of GitStarStruck following any
          updates constitutes your acceptance of the new terms.
        </p>

        <p>
          If you do not agree to these terms, please do not use the platform.
          For any questions, concerns, or feedback regarding these terms, please
          contact us via our Matrix channel:
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
