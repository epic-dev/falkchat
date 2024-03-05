import { db } from '@/shared/api';
import { ChannelType } from '@prisma/client';
import { redirect } from 'next/navigation';

interface props {
    serverId: string;
    profileId: string;
}

export const getServer = async ({ serverId, profileId }: props) => {
    const server = await db.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: 'asc',
                },
            },
            members: {
                include: {
                    profile: true,
                },
                orderBy: {
                    role: 'asc',
                },
            },
        },
    });

    const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT);
    const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO);
    const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO);
    const members = server?.members.filter((member) => member.profileId !== profileId);

    if (!server) {
        redirect('/');
    }

    return { server, textChannels, audioChannels, videoChannels, members };
};
