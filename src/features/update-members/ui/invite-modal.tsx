'use client';

import { useModal } from '@/shared/model/modal-store';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import axios from 'axios';
import { Check, Copy, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { useOrigin } from '../lib/use-origin';

export const InviteModal = ({}) => {
  const { isOpen, type, onClose, data, onOpen } = useModal();
  const origin = useOrigin();

  const { server } = data;

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const [copied, setCopied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`,
      );

      onOpen('invite', { server: response.data });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const isModalOpen = isOpen && type == 'invite';

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Invite friends
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Invite your friends to your server!
          </DialogDescription>
        </DialogHeader>
        <div className="p-6 ">
          <Label className="text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70">
            server invite link
          </Label>
          <div className="mt-2 flex items-center gap-x-2">
            <Input
              disabled={loading}
              readOnly
              className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
              value={inviteUrl}
            />
            <Button disabled={loading} size="icon" onClick={onCopy}>
              {copied ? (
                <Check className="h-6 w-6" />
              ) : (
                <Copy className="h-6 w-6" />
              )}
            </Button>
          </div>
          <Button
            onClick={onNew}
            disabled={loading}
            variant="link"
            size="sm"
            className="mt-4 text-xs text-zinc-500">
            Generate a new link
            <RefreshCw className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
