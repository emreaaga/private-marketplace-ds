import { LayoutGrid } from "lucide-react";

export default function CategoriesPage() {
  return (
    <div className="border-muted bg-muted/20 flex min-h-100 flex-col items-center justify-center space-y-4 rounded-xl border-2 border-dashed p-8 text-center">
      <div className="bg-muted rounded-full p-4">
        <LayoutGrid className="text-muted-foreground h-8 w-8 opacity-50" />
      </div>

      <div className="max-w-105 space-y-2">
        <h2 className="text-foreground text-xl font-semibold tracking-tight">Типы категорий</h2>
        <p className="text-muted-foreground text-sm">Этот раздел находится в разработке.</p>
      </div>
    </div>
  );
}
