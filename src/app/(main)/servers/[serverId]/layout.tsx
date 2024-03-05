import { currentProfile } from '@/entities/profile';
import { ServerSidebar } from '@/widgets/sidebar';
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { getUniqueServer } from '@/entities/member';

const ServerIdLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { serverId: string };
}) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const server = await getUniqueServer({
    serverId: params.serverId,
    profileId: profile.id,
  });

  if (!server) {
    return redirect('/');
  }
  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-20 hidden h-full w-60 flex-col md:flex">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default ServerIdLayout;
