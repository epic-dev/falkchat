import { MessageInput } from '@/features/update-message';
import { createOrFindConversation } from '@/entities/server';
import { ChatHeader, ChatMessages } from '@/widgets/chat';
import { MediaRoom } from '@/widgets/media-room';
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { getCurrentMember } from '@/entities/member';
import { currentProfile } from '@/entities/profile';

interface MemberIdPageProps {
    params: {
        memberId: string;
        serverId: string;
    };
    searchParams: {
        video?: boolean;
    };
}

export const MemberIdPage = async ({ params, searchParams }: MemberIdPageProps) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }
    const currentMember = await getCurrentMember({
        serverId: params.serverId,
        profileId: profile.id,
    });

    if (!currentMember) {
        return redirect('/');
    }

    const conversation = await createOrFindConversation(currentMember.id, params.memberId);

    if (!conversation) {
        return redirect(`/servers/${params.serverId}`);
    }

    const { firstMember, secondMember } = conversation;

    const otherMember = firstMember.profileId === profile.id ? secondMember : firstMember;

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader
                imageUrl={otherMember.profile.imageUrl}
                name={otherMember.profile.name}
                serverId={params.serverId}
                type="conversation"
            />
            {searchParams.video && <MediaRoom chatId={conversation.id} video={true} audio={true} />}
            {!searchParams.video && (
                <>
                    <ChatMessages
                        member={currentMember}
                        name={otherMember.profile.name}
                        chatId={conversation.id}
                        type="conversation"
                        apiUrl="/api/direct-messages"
                        paramKey="conversationId"
                        paramValue={conversation.id}
                        socketUrl="/api/socket/direct-messages"
                        socketQuery={{
                            conversationId: conversation.id,
                        }}
                    />
                    <MessageInput
                        name={otherMember.profile.name}
                        type="conversation"
                        apiUrl="/api/socket/direct-messages"
                        query={{
                            conversationId: conversation.id,
                        }}
                    />
                </>
            )}
        </div>
    );
};
