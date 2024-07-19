import { ModalType } from "./ModalType";

/**
 * Props for the ModalActionsProps component
 */
export interface ModalActionsProps {
  handleCancel: () => void;
  handleSubmit: () => void;
  mode: ModalType;
}
