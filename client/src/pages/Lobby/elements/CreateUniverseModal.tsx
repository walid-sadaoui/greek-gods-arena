import React, { useState } from "react";
import Button from "components/common/Button";
import Modal from "components/common/Modal";
import Input from "components/common/Input";

const CreateUniverseModal: React.FC<{
  onValidate: (universeName: string) => void;
  hide: () => void;
  isShowing: boolean;
}> = ({ onValidate, isShowing, hide }) => {
  const [universeName, setUniverseName] = useState<string>("");
  return (
    <Modal
      isShowing={isShowing}
      hide={hide}
      title={`Enter your Universe Name !`}
    >
      <div className="flex flex-col gap-4 p-4">
        <Input
          id="create-universe-name"
          type="text"
          placeholder="Universe Name"
          name="create-universe-input"
          className="px-2 py-1 border-2 border-black focus:border-black"
          onChange={(event) => {
            setUniverseName(event.target.value);
          }}
        />
        <Button
          value="Create"
          disabled={universeName === ""}
          onClick={() => onValidate(universeName)}
        />
      </div>
    </Modal>
  );
};

export default CreateUniverseModal;
