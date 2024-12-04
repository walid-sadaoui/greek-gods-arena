import React from 'react';
import Button from 'components/common/Button';
import Modal from 'components/common/Modal';
import Input from 'components/common/Input';

const CreateUniverseModal: React.FC<{
  onValidate: () => void;
  hide: () => void;
  isShowing: boolean;
}> = ({ onValidate, isShowing, hide }) => {
  return (
    <Modal
      isShowing={isShowing}
      hide={hide}
      title={`Enter your Universe Name !`}
    >
      <Input
        id='create-universe-name'
        type='text'
        placeholder='Universe Name'
        name='create-universe-input'
      />
      <Button value='Create' onClick={onValidate} />
    </Modal>
  );
};

export default CreateUniverseModal;
