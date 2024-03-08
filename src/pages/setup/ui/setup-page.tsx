import { getFirstServer } from '@/entities/member';
import { initialProfile } from '@/entities/profile';
import { redirect } from 'next/navigation';
import { InitialModal } from './initial-modal';

export const SetupPage = async ({}) => {
  const profile = await initialProfile();

  const server = await getFirstServer({ profileId: profile.id });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return (
    <>
      <InitialModal />
    </>
  );
};
