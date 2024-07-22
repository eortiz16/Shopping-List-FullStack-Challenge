import React from 'react';

import { Box, Modal } from '@mui/material';

import { StyledModalProps } from '../../types/StyledModalProps';
import ModalAppBar from '../ModalAppBar/ModalAppBar';

import './StyledModal.scss';

/**
 * StyledModal is a shared component that provides a styled modal with an app bar and content area.
 * It wraps its children content inside a MUI Modal component with custom styling.
 *
 * @param {Object} props - The props object.
 * @param {boolean} props.open - The state to control the modal's open/close status.
 * @param {Function} props.handleCancel - The function to close the modal.
 * @param {React.ReactNode} props.children - The children elements to be rendered inside the modal.
 *
 * @returns {JSX.Element} The rendered styled modal component.
 */
const StyledModal: React.FC<StyledModalProps> = ({
  open,
  handleCancel,
  children,
}) => {
  return (
    <Modal open={open} onClose={handleCancel}>
      <Box className="styled-modal-box">
        <ModalAppBar />
        <Box className="styled-modal-content">{children}</Box>
      </Box>
    </Modal>
  );
};

export default StyledModal;
