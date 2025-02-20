import { cards } from "../constant";

export const HistoryCards = () => {
  return (
    <div className="grid w-full gap-4 pb-16 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ icon: Icon, ...item }, index) => (
        <div
          className="min-h-[160px] space-y-3 rounded-[16px] border border-gray-300 p-4"
          key={index}
        >
          <div className="flex items-center gap-x-3">
            <Icon className="size-6 text-primary" />
            <p className="text-xl font-medium">{item.title}</p>
          </div>

          <div
            className="text-[14px] text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        </div>
      ))}
    </div>
  );
};
