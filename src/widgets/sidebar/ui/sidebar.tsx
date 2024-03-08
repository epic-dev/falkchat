import { currentProfile } from '@/entities/profile';
import { db } from '@/shared/api';
import { ModeToggle } from '@/shared/ui/mode-toggle';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Separator } from '@/shared/ui/separator';
import { redirect } from 'next/navigation';
import { CreateServerButton } from './sidebar-create-server';
import { SidebarItem } from './sidebar-item';

export const Sidebar = async ({}) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect('/');
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-between space-y-4 bg-[#E3E5E8] py-3 text-primary dark:bg-[#1E1F22]">
      <div className="flex flex-col gap-3">
        <ScrollArea className="w-full flex-1">
          {servers.map((server) => {
            return (
              <div key={server.id} className="mb-4">
                <SidebarItem
                  name={server.name}
                  imageUrl={server.imageUrl}
                  id={server.id}
                />
              </div>
            );
          })}
        </ScrollArea>
        <Separator className="mx-auto h-[2px] w-10 rounded-md bg-zinc-300 dark:bg-zinc-700" />
        <CreateServerButton />
      </div>

      <div className="z-50 mt-auto flex flex-col items-center gap-y-4 pb-3">
        <ModeToggle />
      </div>
    </div>
  );
};
