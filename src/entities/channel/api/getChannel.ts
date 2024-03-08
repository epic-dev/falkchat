import { db } from '@/shared/api';

interface props {
  channelId: string;
}

export const getChannel = async ({ channelId }: props) => {
  return db.channel.findUnique({
    where: {
      id: channelId,
    },
  });
};
