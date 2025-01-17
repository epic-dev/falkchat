import { db } from '@/shared/api/db';
import { currentUser, redirectToSignIn } from '@clerk/nextjs';

export const initialProfile = async () => {
  const user = await currentUser();
  console.log('dkskdwkdw');

  if (!user) {
    return redirectToSignIn();
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) {
    return profile;
  }

  return db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });
};
