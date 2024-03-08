import { currentProfile } from '@/entities/profile';
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { checkUserAlreadyInServer } from '@/entities/member';
import { addUser } from '@/entities/server';

interface props {
  params: {
    inviteCode: string;
  };
}

export const InvitePage = async ({ params }: props) => {
  const profile = await currentProfile();
  console.log(params.inviteCode);

  if (!profile) {
    return redirectToSignIn();
  }

  if (!params.inviteCode) {
    return redirect('/');
  }

  const userAlreadyInServer = await checkUserAlreadyInServer({
    inviteCode: params.inviteCode,
    profileId: profile.id,
  });

  if (userAlreadyInServer) {
    return redirect(`/servers/${userAlreadyInServer.id}`);
  }

  const server = await addUser({
    inviteCode: params.inviteCode,
    profileId: profile.id,
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }
};
