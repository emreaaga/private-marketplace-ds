import { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">{title}</h1>

        {description && <p className="text-muted-foreground hidden text-sm md:block">{description}</p>}
      </div>

      {action}
    </div>
  );
}
