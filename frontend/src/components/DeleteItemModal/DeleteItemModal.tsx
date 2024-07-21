import React, { useCallback } from 'react';
import {Box, Modal, Typography, Button} from '@mui/material';
import { DeleteItemModalProps } from '../../types/DeleteItemModalProps';
import './DeleteItemModal.scss';

/**
 * DeleteItemModal component provides a confirmation dialog for deleting an item from the shopping list.
 * It prompts the user to confirm the deletion, and calls the onDelete function if confirmed.
 *
 * @param {Object} props - The props object.
 * @param {boolean} props.open - The state to control the modal's open/close status.
 * @param {Function} props.handleClose - The function to close the modal.
 * @param {Function} props.onDelete - The function to delete the item.
 *
 * @returns {JSX.Element} The rendered delete item modal component.
 */
const DeleteItemModal: React.FC<DeleteItemModalProps> = ({
  open,
  handleClose,
  onDelete,
}) => {
  const handleDelete = useCallback(() => {
    onDelete();
    handleClose();
  }, [onDelete, handleClose]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="delete-modal-box">
        <Typography variant="h6" className="delete-modal-title">
          Delete Item?
        </Typography>
        <Typography className="delete-modal-subtitle">
          Are you sure you want to delete this item? This cannot be undone.
        </Typography>
        <Box className="delete-modal-actions">
          <Button onClick={handleClose} className="delete-modal-actions-button">
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="primary"
            className="delete-modal-actions-button"
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default React.memo(DeleteItemModal);
