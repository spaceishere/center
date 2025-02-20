import { ServiceItem } from "./service-item";

interface ServicesProps {
  title: string;
  items: { _id: string }[];
}

export const Services = ({ title, items }: ServicesProps) => {
  return (
    <div className="w-full space-y-4">
      <p>{title}</p>
      <div className="w-full space-y-2">
        {items.map((deal: any) => (
          <ServiceItem key={deal._id} dealId={deal._id} />
        ))}
        {items.length === 0 && (
          <p className="w-full rounded-lg bg-gray-100 py-8 text-center text-gray-700">
            Одоогоор мэдээлэл алга байна
          </p>
        )}
      </div>
    </div>
  );
};
