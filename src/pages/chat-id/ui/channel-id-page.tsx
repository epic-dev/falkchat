import { MessageInput } from '@/features/update-message';
import { currentProfile } from '@/entities/profile';
import { ChatHeader, ChatMessages } from '@/widgets/chat';
import { MediaRoom } from '@/widgets/media-room';
import { redirectToSignIn } from '@clerk/nextjs';
import { ChannelType } from '@prisma/client';
import { redirect } from 'next/navigation';
import { getCurrentMember } from '@/entities/member';
import { getChannel } from '@/entities/channel';

interface props {
    params: {
        serverId: string;
        channelId: string;
    };
}

export const ChannelIdPage = async ({ params }: props) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }

    const channel = await getChannel({ channelId: params.channelId });

    const currentMember = await getCurrentMember({
        serverId: params.serverId,
        profileId: profile.id,
    });

    if (!channel || !currentMember) {
        redirect('/');
    }

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader name={channel.name} serverId={channel.serverId} type="channel" />
            {channel.type === ChannelType.TEXT && (
                <>
                    <ChatMessages
                        member={currentMember}
                        name={channel.name}
                        chatId={channel.id}
                        type="channel"
                        apiUrl="/api/messages"
                        socketUrl="/api/socket/messages"
                        socketQuery={{
                            channelId: channel.id,
                            serverId: channel.serverId,
                        }}
                        paramKey="channelId"
                        paramValue={channel.id}
                    />
                    <MessageInput
                        name={channel.name}
                        type="channel"
                        apiUrl="/api/socket/messages"
                        query={{
                            channelId: channel.id,
                            serverId: channel.serverId,
                        }}
                    />
                </>
            )}
            {channel.type === ChannelType.AUDIO && (
                <MediaRoom chatId={channel.id} video={false} audio={true} />
            )}
            {channel.type === ChannelType.VIDEO && (
                <MediaRoom chatId={channel.id} video={true} audio={true} />
            )}
        </div>
    );
};
