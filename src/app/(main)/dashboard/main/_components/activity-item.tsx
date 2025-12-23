import { ChevronRight } from "lucide-react";

import { Badge } from "@/shared/ui/atoms/badge";
import { Item, ItemContent, ItemTitle, ItemDescription, ItemActions } from "@/shared/ui/atoms/item";

type ActivityTone = "default" | "warning" | "danger";

export interface ActivityItemProps {
  title: string;
  description: string;
  badge: string;
  tone?: ActivityTone;
  icon: React.ComponentType<{ className?: string }>;
}

const TONE_STYLES: Record<ActivityTone, string> = {
  default: "bg-muted text-muted-foreground",
  warning: "bg-warning/15 text-warning",
  danger: "bg-destructive/15 text-destructive",
};

export default function ActivityItem({ title, description, badge, tone = "default", icon: Icon }: ActivityItemProps) {
  return (
    <Item variant="outline" size="sm" className="hover:bg-muted/40 cursor-pointer transition">
      <div className="flex items-start gap-3">
        <div className="bg-muted text-muted-foreground mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg">
          <Icon className="h-4 w-4" />
        </div>

        <ItemContent>
          <ItemTitle>{title}</ItemTitle>
          <ItemDescription>{description}</ItemDescription>
        </ItemContent>
      </div>

      <ItemActions>
        <Badge variant="secondary" className={TONE_STYLES[tone]}>
          {badge}
        </Badge>
        <ChevronRight className="text-muted-foreground h-4 w-4" />
      </ItemActions>
    </Item>
  );
}
