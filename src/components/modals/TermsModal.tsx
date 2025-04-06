'use client';

import Modal from '@/components/common/Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Terms of Service">
      <p>
        These terms govern your use of GitStarStruck. You agree not to misuse
        the platform or engage in activities that violate our community
        standards.
      </p>
      <p className="mt-4">By using our site, you accept these terms.</p>
    </Modal>
  );
}
