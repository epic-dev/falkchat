'use client';

import { ActionTooltip } from '@/shared/ui/action-tooltip';
import { useModal } from '@/shared/model/modal-store';
import { Plus } from 'lucide-react';

export const CreateServerButton = ({}) => {
  const { onOpen } = useModal();

  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add a server">
        <button
          className="group flex items-center outline-none "
          onClick={() => {
            onOpen('createServer');
          }}>
          <div className="m-3 flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-[24px] bg-background transition-all group-hover:rounded-[16px] group-hover:bg-blue-500 dark:bg-neutral-700">
            <Plus
              className="text-blue-500 transition group-hover:text-white"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};
