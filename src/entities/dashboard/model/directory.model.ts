export type DirectoryEntity = {
  id: string;
  label: string;
  category: "user" | "company";
  iconKey: string;
  count: number;
};
