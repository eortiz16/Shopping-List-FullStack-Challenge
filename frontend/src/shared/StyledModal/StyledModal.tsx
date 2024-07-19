import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { StyledModalProps } from '../../types/StyledModalProps';
import ModalAppBar from '../ModalAppBar/ModalAppBar';
import './StyledModal.scss';

const StyledModal: React.FC<StyledModalProps> = ({ open, handleCancel, children }) => {
  return (
    <Modal open={open} onClose={handleCancel}>
      <Box className="styled-modal-box">
        <ModalAppBar />
        <Box className="styled-modal-content">
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

export default StyledModal;
