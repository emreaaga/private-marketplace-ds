import { ColumnDef, Row } from "@tanstack/react-table";

import { TableBadge } from "@/shared/ui/molecules/table-badge";

import { HeaderWithIcon } from "./header-icon";
import { type Order } from "./orders.type";
import { stageIcons } from "./stage-icons";

type CellValue = string | ((row: Row<Order>) => string | React.ReactNode);

interface FinanceStat {
  value: string;
  unit: string;
  highlight?: boolean;
}

interface StageRowConfig {
  text: CellValue;
  tooltip?: string;
  stats?: FinanceStat[];
}

const MiniStat = ({ value, unit, highlight }: FinanceStat) => {
  const [int, dec] = value.split(".");
  return (
    <span
      className={`flex items-baseline text-[8px] font-bold tabular-nums ${
        highlight ? "text-blue-600" : "text-slate-500"
      }`}
    >
      {int}
      {dec && <span className="text-[6px]">.{dec}</span>}
      <span className="ml-0.5 font-medium text-slate-400">{unit}</span>
    </span>
  );
};

const createStackedColumn = (
  id: string,
  config: {
    icon: keyof typeof stageIcons;
    label: string;
    top: StageRowConfig;
    bottom: StageRowConfig;
  },
): ColumnDef<Order> => ({
  accessorKey: id,
  header: () => <HeaderWithIcon icon={stageIcons[config.icon]} label={config.label} />,
  cell: ({ row }) => {
    const renderRow = (rowConfig: StageRowConfig) => {
      const text = typeof rowConfig.text === "function" ? rowConfig.text(row) : rowConfig.text;

      return (
        <TableBadge innerBadge="" tooltip={rowConfig.tooltip}>
          <div className="flex items-center gap-1.5">
            <span className="shrink-0">{text}</span>

            {rowConfig.stats && rowConfig.stats.length > 0 && (
              <div className="ml-0.5 flex items-center gap-1 border-slate-200 pl-1.5">
                {rowConfig.stats.map((stat, idx) => (
                  <MiniStat key={idx} {...stat} />
                ))}
              </div>
            )}
          </div>
        </TableBadge>
      );
    };

    return (
      <div className="flex flex-col gap-1 py-1">
        {renderRow(config.top)}

        {renderRow(config.bottom)}
      </div>
    );
  },
});

export const getSellersOrdersColumns = (): ColumnDef<Order>[] => [
  createStackedColumn("col_id", {
    icon: "client",
    label: "ID",
    top: { text: (row) => `${row.original.id}` },
    bottom: { text: "" },
  }),

  createStackedColumn("col1", {
    icon: "client",
    label: "Клиент",
    top: { text: "Клнт. 1", stats: [{ value: "50.45", unit: "$" }] },
    bottom: { text: "Клнт. 2" },
  }),

  createStackedColumn("col2", {
    icon: "courier",
    label: "Курьер",
    top: { text: "Отп курьер", stats: [{ value: "32.45", unit: "$" }] },
    bottom: { text: "Пол курьер", stats: [{ value: "32.45", unit: "$" }] },
  }),

  createStackedColumn("col3", {
    icon: "point",
    label: "Пункт 1",
    top: { text: "Пункт 1", stats: [{ value: "6.45", unit: "кг/$" }] },
    bottom: { text: "Пункт 2", stats: [{ value: "1434.45", unit: "кг" }] },
  }),

  createStackedColumn("col4", {
    icon: "customs",
    label: "Таможня",
    top: { text: "Отп тамж" },
    bottom: { text: "Пол тамж" },
  }),

  createStackedColumn("col5", {
    icon: "flight",
    label: "Самолет",
    top: { text: "TR-IST" },
    bottom: { text: "UZ-SKD" },
  }),
];
