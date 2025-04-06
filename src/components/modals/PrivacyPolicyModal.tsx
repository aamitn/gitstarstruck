'use client';

import Modal from '@/components/common/Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicyModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Privacy Policy">
      <p>
        This is a sample privacy policy. Your data is yours. We do not share,
        sell, or misuse any user data collected via GitStarStruck. You can
        contact us anytime for more details.
      </p>
      <p className="mt-4">By using our services, you agree to this policy.</p>
    </Modal>
  );
}
