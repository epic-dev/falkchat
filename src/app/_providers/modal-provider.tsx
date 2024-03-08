'use client';

import {
  CreateChannelModal,
  DeleteChannelModal,
} from '@/features/update-channel';
import {
  InviteModal,
  LeaveServerModal,
  ManageUsersModal,
} from '@/features/update-members';
import {
  DeleteMessageModal,
  MessageAttachmentModal,
} from '@/features/update-message';
import {
  CreateServerModal,
  DeleteServerModal,
  EditServerModal,
} from '@/features/update-server';
import { useEffect, useState } from 'react';

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
