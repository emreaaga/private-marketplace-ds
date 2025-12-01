import { DataTable } from "./_components/data-table";
import data from "./_components/data.json";
import { SectionCards } from "./_components/section-cards";

export default function MainPage() {
  return (
    // <div className="@container/main flex flex-col gap-4 md:gap-6">
    //   <SectionCards />
    //   <DataTable data={data} />
    //   Здесь будет ваша панель управления.
    // </div>
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h2 className="text-2xl font-semibold">Раздел в разработке</h2>
      <p className="text-muted-foreground mt-2 max-w-md">Здесь появится ваша панель управления. Идет уже разработка.</p>
    </div>
  );
}
