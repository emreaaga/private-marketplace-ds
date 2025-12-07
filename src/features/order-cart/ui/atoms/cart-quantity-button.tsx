import { Button } from "@/shared/ui/atoms/button";

export function CartQuantityButton({ children, onClick }: any) {
  return (
    <Button
      variant="outline"
      size="icon"
      className="hover:bg-accent hover:text-accent-foreground h-9 w-9 rounded-lg shadow-sm md:h-10 md:w-10"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
