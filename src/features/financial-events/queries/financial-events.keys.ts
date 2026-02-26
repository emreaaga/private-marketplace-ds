export const financialEventsKeys = {
  all: ["financial-events"] as const,
  lists: () => [...financialEventsKeys.all, "list"] as const,

  list: (params: { order_id?: number; page?: number }) => [...financialEventsKeys.lists(), params] as const,

  detail: (id: number) => [...financialEventsKeys.all, "detail", id] as const,
};
