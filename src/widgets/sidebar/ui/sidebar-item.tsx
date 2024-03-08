'use client';

import { ActionTooltip } from '@/shared/ui/action-tooltip';
import { cn } from '@/shared/lib/tailwind-merge';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

interface props {
  id: string;
  imageUrl: string;
  name: string;
}

export const SidebarItem = ({ id, name, imageUrl }: props) => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button
        onClick={onClick}
        className="group relative flex items-center outline-none">
        <div
          className={cn(
            'rounder-r-full absolute left-0 w-[4px] rounded-r-md bg-primary transition-all',
            params?.serverId !== id && 'group-hover:h-[20px]',
            params?.serverId === id ? 'h-[34px]' : 'h-[8px]',
          )}
        />
        <div
          className={cn(
            'group relative mx-3 flex h-[48px] w-[48px] overflow-hidden rounded-[24px] transition-all group-hover:rounded-[16px]',
            params?.server === id &&
              'rounded-[16px] bg-primary/10 text-primary',
          )}>
          <Image
            fill
            src={imageUrl}
            placeholder="blur"
            alt="Channel"
            blurDataURL={imageUrl}
            sizes="48px"
            priority
          />
        </div>
      </button>
    </ActionTooltip>
  );
};
