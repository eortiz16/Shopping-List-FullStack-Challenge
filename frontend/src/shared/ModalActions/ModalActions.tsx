import React from 'react';
import { Box, Button } from '@mui/material';
import { ModalActionsProps } from '../../types/ModalActionsProps';
import { ModalType } from '../../types/ModalType';
import './ModalActions.scss';

/**
 * ModalActions component renders action buttons for a modal dialog.
 * It displays a "Cancel" button and a context-sensitive button whose text changes based on the `mode` prop.
 *
 * @param {Object} props - Component props.
 * @param {Function} props.handleCancel - Function to call when the cancel button is clicked.
 * @param {Function} props.handleSubmit - Function to call when the submit button is clicked.
 * @param {ModalType} props.mode - Mode indicating the type of action (e.g., ADD or EDIT).
 *
 * @return {React.ReactElement} - A React element representing the modal action buttons.
 */
const ModalActions: React.FC<ModalActionsProps> = ({
  handleCancel,
  handleSubmit,
  mode,
}) => {
  const buttonText = mode === ModalType.ADD ? 'Add Task' : 'Save Item';

  return (
    <Box className="modal-actions">
      <Button onClick={handleCancel} className="modal-actions-button">
        Cancel
      </Button>
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        className="modal-actions-button"
      >
        {buttonText}
      </Button>
    </Box>
  );
};

export default ModalActions;
