import { DrawerHeader, DrawerTitle, DrawerDescription } from "@/shared/ui/atoms/drawer";

export function ProductHeader({ name, category }: { name: string; category: string }) {
  return (
    <DrawerHeader className="px-5 pt-5 pb-3">
      <DrawerTitle className="text-xl font-semibold text-gray-900">{name}</DrawerTitle>
      <DrawerDescription className="mt-1 text-sm text-gray-500">{category}</DrawerDescription>
    </DrawerHeader>
  );
}
