'use client';

import { useModal } from '@/shared/model/modal-store';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import axios from 'axios';
import qs from 'query-string';
import { useState } from 'react';

export const DeleteMessageModal = ({}) => {
  const { isOpen, type, onClose, data } = useModal();

  const { apiUrl, query } = data;

  const [loading, setLoading] = useState<boolean>(false);

  const isModalOpen = isOpen && type == 'deleteMessage';

  const onCancel = () => {
    onClose();
  };

  const onConfirm = async () => {
    try {
      setLoading(true);

      const url = qs.stringifyUrl({
        url: apiUrl || '',
        query: query,
      });

      await axios.delete(url);

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Delete Message
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500 ">
            Do you really want to do this? The message will be permanently
            deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex w-full items-center justify-between">
            <Button
              disabled={loading}
              onClick={onCancel}
              variant="ghost"
              className="outline-none">
              Cancel
            </Button>
            <Button
              disabled={loading}
              onClick={onConfirm}
              variant="destructive">
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
