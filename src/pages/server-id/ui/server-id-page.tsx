import { currentProfile } from '@/entities/profile';
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { getServer } from '@/entities/server';

interface props {
    params: {
        serverId: string;
    };
}

export const ServerIdPage = async ({ params }: props) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }

    const { server } = await getServer({ serverId: params.serverId, profileId: profile.id });

    const generalChannel = server?.channels[0];

    if (generalChannel?.name !== 'general') {
        return null;
    }

    return redirect(`/servers/${server?.id}/channels/${generalChannel?.id}`);
};
