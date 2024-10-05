export interface ModalDrawerProps {
  isModalOpen: boolean;
  showModal: React.Dispatch<boolean>;
  modalTitle: string;
  handlePrimaryAction?: () => void;
  handleCloseModalAction?: () => void;
  primaryBtnText?: string;
  closeBtnText?: string;
  modalDescription?: string;
  customModalElement?: JSX.Element;
  isPrimaryBtnLoading?: boolean;
  isCloseBtnLoading?: boolean;
  imageUrl?: string;
  dialogWrapperClassName?: string;
  dialogFooterClassName?: string;
}
