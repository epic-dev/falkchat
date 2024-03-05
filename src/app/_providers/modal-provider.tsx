'use client';

import { InitialModal } from '@/pages/setup/ui/initial-modal';
import {
  CreateChannelModal,
  DeleteChannelModal,
} from '@/features/update-channel';
import {
  CreateServerModal,
  DeleteServerModal,
  EditServerModal,
} from '@/features/update-server';
import { useEffect, useState } from 'react';
import {
  InviteModal,
  LeaveServerModal,
  ManageUsersModal,
} from '@/features/update-members';
import {
  DeleteMessageModal,
  MessageAttachmentModal,
} from '@/features/update-message';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <InviteModal />
      <InitialModal />
      <EditServerModal />
      <CreateServerModal />
      <CreateChannelModal />
      <DeleteChannelModal />
      <DeleteServerModal />
      <ManageUsersModal />
      <LeaveServerModal />
      <DeleteMessageModal />
      <MessageAttachmentModal />
    </>
  );
};
