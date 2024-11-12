import React from 'react';
import Button from 'components/common/Button';
import Modal from 'components/common/Modal';
import Input from 'components/common/Input';

const CreateUniverseModal: React.FC<{
  onYes: () => void;
  hide: () => void;
  isShowing: boolean;
}> = ({ onYes, isShowing, hide }) => {
  return (
    <Modal
      isShowing={isShowing}
      hide={hide}
      title={`Enter your Universe Name !`}
    >
      <p className='pb-4 font-sans'>
        You can re-hire your God later, but all the SkillPoints earned will be
        lost !
      </p>
      <Input />
      <Button value='Yes' onClick={onYes} />
    </Modal>
  );
};

export default CreateUniverseModal;
