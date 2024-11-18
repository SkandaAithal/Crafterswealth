import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import LazyImage from "../ui/lazy-image";
import { useWindowWidth } from "@/lib/hooks/use-window-width";
import { ModalDrawerProps } from "@/lib/types/components/modal-drawer";
import { twMerge } from "tailwind-merge";

const ModalDrawer: React.FC<ModalDrawerProps> = ({
  isModalOpen,
  showModal,
  modalTitle,
  handlePrimaryAction,
  handleCloseModalAction,
  primaryBtnText,
  closeBtnText = "Cancel",
  modalDescription = "",
  customModalElement,
  isCloseBtnLoading = false,
  isPrimaryBtnLoading = false,
  imageUrl = "",
  dialogWrapperClassName = "",
  dialogFooterClassName = "",
}) => {
  const { isMobile } = useWindowWidth();

  const handlePrimaryBtnClick = () => {
    if (handlePrimaryAction) {
      handlePrimaryAction();
    }
  };

  const handleCloseModalBtnClick = async () => {
    if (handleCloseModalAction) {
      await handleCloseModalAction();
    }
    showModal(false);
  };

  return isMobile ? (
    <Drawer open={isModalOpen} onOpenChange={showModal}>
      <DrawerContent className="flex flex-col items-center justify-center text-center bg-card px-8">
        {imageUrl ? (
          <LazyImage
            src={imageUrl}
            alt="modal image"
            width={100}
            height={100}
            className=" object-cover mx-auto  mt-4"
            skeletonClassName="rounded-full w-[95px] h-[95px] mx-auto mt-2"
          />
        ) : null}
        <div className="grid gap-2">
          <DrawerHeader>
            <DrawerTitle className="text-center"> {modalTitle}</DrawerTitle>
            <DrawerDescription className="text-center">
              {modalDescription}
            </DrawerDescription>
          </DrawerHeader>
        </div>
        {customModalElement ? customModalElement : null}
        <DrawerFooter className="w-full">
          <div className="flex flex-col justify-center mx-auto mb-6 items-center gap-5 w-full">
            {primaryBtnText && handlePrimaryAction ? (
              <Button
                onClick={handlePrimaryBtnClick}
                className="w-full"
                type="button"
                disabled={isPrimaryBtnLoading}
                loading={isPrimaryBtnLoading}
                loaderTheme="light"
              >
                {primaryBtnText}
              </Button>
            ) : null}
            <Button
              onClick={handleCloseModalBtnClick}
              loading={isCloseBtnLoading}
              disabled={isPrimaryBtnLoading}
              className="w-full bg-destructive hover:bg-destructive/70"
            >
              {closeBtnText}
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={isModalOpen} onOpenChange={showModal}>
      <DialogContent
        className={twMerge(
          "flex flex-col items-center justify-center text-center space-y-4 pt-6 pb-10 bg-card w-[90vw] max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-[40vw]",
          dialogWrapperClassName
        )}
        hideClose
      >
        <div className="relative w-full h-full">
          {imageUrl ? (
            <div className="absolute -top-24 left-1/2 bg-white -translate-x-1/2 rounded-full overflow-hidden">
              <LazyImage
                src={imageUrl}
                alt="modal image"
                width={100}
                height={100}
                className=" w-24 h-24 object-contain"
              />
            </div>
          ) : null}

          <DialogTitle className="text-xl min-[400px]:text-2xl !m-0 md:text-3xl">
            {modalTitle}
          </DialogTitle>
          <DialogDescription className="text-base max-w-lg mx-auto">
            {modalDescription}
          </DialogDescription>
          <div className="space-y-4 mt-4">
            {customModalElement ? customModalElement : null}
            <DialogFooter
              className={twMerge("w-96 mx-auto", dialogFooterClassName)}
            >
              <div className="flex justify-center mx-auto items-center gap-5 w-full">
                <Button
                  onClick={handleCloseModalBtnClick}
                  loading={isCloseBtnLoading}
                  disabled={isPrimaryBtnLoading}
                  className="w-full px-6 bg-destructive hover:bg-destructive/90"
                >
                  {closeBtnText}
                </Button>
                {primaryBtnText && handlePrimaryAction ? (
                  <Button
                    onClick={handlePrimaryBtnClick}
                    className="w-full px-6"
                    type="button"
                    disabled={isPrimaryBtnLoading}
                    loading={isPrimaryBtnLoading}
                  >
                    {primaryBtnText}
                  </Button>
                ) : null}
              </div>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDrawer;
