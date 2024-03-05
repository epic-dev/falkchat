import { initialProfile } from '@/entities/profile';
import { InitialModal } from './initial-modal';
import { redirect } from 'next/navigation';
import { getFirstServer } from '@/entities/member';

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
