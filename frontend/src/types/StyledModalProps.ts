import { ReactNode } from 'react';

/**
 * Props for the StyledModal component
 */
export interface StyledModalProps {
  open: boolean;
  handleCancel: () => void;
  children: ReactNode;
}
