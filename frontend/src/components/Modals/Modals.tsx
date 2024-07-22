import React from 'react';

import StyledModal from '../../shared/StyledModal/StyledModal';
import { ModalsProps } from '../../types/ModalsProps';
import { ModalType } from '../../types/ModalType';
import AddItemContent from '../AddItemContent/AddItemContent';
import DeleteItemModal from '../DeleteItemModal/DeleteItemModal';
import EditItemContent from '../EditItemContent/EditItemContent';

/**
 * Modals component to handle ALL modals in the ShoppingList component.
 *
 * @param {ModalsProps} props - The props object.
 * @param {ModalType|null} props.modalType - The current modal type.
 * @param {Item|null} props.selectedItem - The currently selected item.
 * @param {Function} props.handleCloseModal - The function to close the modal.
 * @param {Function} props.handleAddItem - The function to add an item.
 * @param {Function} props.handleEditItem - The function to edit an item.
 * @param {Function} props.handleDeleteItem - The function to delete an item.
 *
 * @returns {JSX.Element} The rendered modals.
 */
const Modals: React.FC<ModalsProps> = ({
  modalType,
  selectedItem,
  handleCloseModal,
  handleAddItem,
  handleEditItem,
  handleDeleteItem,
}) => {
  const renderModalContent = () => {
    switch (modalType) {
      case ModalType.ADD:
        return (
          <StyledModal open={true} handleCancel={handleCloseModal}>
            <AddItemContent
              handleAddItem={handleAddItem}
              handleCancel={handleCloseModal}
            />
          </StyledModal>
        );
      case ModalType.EDIT:
        return (
          selectedItem && (
            <StyledModal open={true} handleCancel={handleCloseModal}>
              <EditItemContent
                item={selectedItem}
                handleEditItem={(id, updatedItem) =>
                  handleEditItem(id, updatedItem)
                }
                handleCancel={handleCloseModal}
              />
            </StyledModal>
          )
        );
      case ModalType.DELETE:
        return (
          selectedItem && (
            <DeleteItemModal
              open={true}
              handleClose={handleCloseModal}
              onDelete={() => handleDeleteItem(selectedItem.id)}
            />
          )
        );
      default:
        return null;
    }
  };

  return <>{renderModalContent()}</>;
};

export default Modals;
