import { PackageSearch } from "lucide-react";

interface EmptyShipmentsStateProps {
  onClick: () => void;
}

export function EmptyShipmentsState({ onClick }: EmptyShipmentsStateProps) {
  return (
    <div className="group flex cursor-pointer flex-col items-center justify-center py-12" onClick={onClick}>
      <PackageSearch className="mb-2 h-5 w-5 text-zinc-300" />
      <p className="text-center text-[11px] text-zinc-400">Нет выбранных отправок</p>
    </div>
  );
}
