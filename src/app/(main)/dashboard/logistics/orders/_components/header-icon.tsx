import { LucideIcon } from "lucide-react";

type HeaderWithIconProps = {
  icon: LucideIcon;
  label: string;
};

export const HeaderWithIcon = ({ icon: Icon, label }: HeaderWithIconProps) => (
  <div className="flex items-center gap-1 text-[11px] font-medium">
    <Icon className="text-muted-foreground h-3 w-3" />
    <span>{label}</span>
  </div>
);
