'use client';
import { useModal } from '@/shared/model/modal-store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { ServerWithMembersWithProfiles } from '@/shared/types';
import { MemberRole } from '@prisma/client';
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus2,
  Users,
} from 'lucide-react';

interface props {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

export const ServerHeader = ({ server, role }: props) => {
  const { onOpen } = useModal();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none" asChild>
          <button className="text-md flex h-12 w-full items-center border-b-2 border-neutral-200 px-3 transition  hover:bg-zinc-700/10 dark:border-neutral-800 dark:hover:bg-zinc-700/50">
            {server.name}
            <ChevronDown className="ml-auto hidden h-5 w-5 md:block" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="font-md w-56 space-y-[2px] text-xs text-black dark:text-neutral-400">
          {isModerator && (
            <DropdownMenuItem
              onClick={() => onOpen('invite', { server })}
              className="flex cursor-pointer justify-between px-3  py-2 text-indigo-600 dark:text-indigo-400">
              Invite People
              <UserPlus2 className="h-6 w-6" />
            </DropdownMenuItem>
          )}
          {isModerator && <DropdownMenuSeparator />}
          {isAdmin && (
            <DropdownMenuItem
              className="flex cursor-pointer justify-between px-3 py-2 dark:text-white"
              onClick={() => onOpen('editServer', { server })}>
              Server Settings
              <Settings className="h-6 w-6" />
            </DropdownMenuItem>
          )}
          {isModerator && (
            <DropdownMenuItem
              className="flex cursor-pointer justify-between px-3 py-2 dark:text-white"
              onClick={() => onOpen('users', { server })}>
              Manage Users
              <Users className="h-6 w-6" />
            </DropdownMenuItem>
          )}
          {isModerator && (
            <DropdownMenuItem
              className="flex cursor-pointer justify-between px-3 py-2 dark:text-white"
              onClick={() => onOpen('createChannel')}>
              Create Channel
              <PlusCircle className="h-6 w-6" />
            </DropdownMenuItem>
          )}
          {isModerator && <DropdownMenuSeparator />}
          {isAdmin && (
            <DropdownMenuItem
              className="flex cursor-pointer justify-between px-3 py-2 text-rose-500"
              onClick={() => onOpen('deleteServer', { server })}>
              Delete Server
              <Trash className="h-6 w-6" />
            </DropdownMenuItem>
          )}
          {!isAdmin && (
            <DropdownMenuItem
              className="flex cursor-pointer justify-between  px-3 py-2 text-rose-500"
              onClick={() => onOpen('leaveServer', { server })}>
              Leave Server
              <LogOut className="h-6 w-6" />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
