import { useQuery } from "@apollo/client";
import { queries } from "@/gql/deal";
import { queries as boardQL } from "@/gql/board";
import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ServiceItemProps {
  dealId: string;
}

interface ChecklistItem {
  __typename: string;
  _id: string;
  checklistId: string;
  isChecked: boolean | null;
  content: string;
}

interface Checklist {
  __typename: string;
  _id: string;
  contentType: string;
  contentTypeId: string;
  title: string;
  createdUserId: string;
  createdDate: string;
  items: ChecklistItem[];
}

interface ChecklistsData {
  checklists: Checklist[];
}

function convertUtcToUlaanbaatar(utcString: string): string {
  const date = new Date(utcString);
  const ulaanbaatarOffset = 0; // Adjust this offset as needed
  const ulaanbaatarDate = new Date(
    date.getTime() + ulaanbaatarOffset * 60 * 1000,
  );

  const year = ulaanbaatarDate.getFullYear();
  const month = String(ulaanbaatarDate.getMonth() + 1).padStart(2, "0");
  const day = String(ulaanbaatarDate.getDate()).padStart(2, "0");
  const hours = String(ulaanbaatarDate.getHours()).padStart(2, "0");
  const minutes = String(ulaanbaatarDate.getMinutes()).padStart(2, "0");
  return `${year} ${month}-${day} ${hours}:${minutes}`;
}

export const ServiceItem = ({ dealId }: ServiceItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: dataDetail, loading } = useQuery(queries.dealDetailLow, {
    variables: {
      id: dealId,
    },
    skip: !dealId,
  });

  const { data: checkListsData, loading: checkListsLoading } =
    useQuery<ChecklistsData>(queries.checkLists, {
      variables: {
        contentType: "deal",
        contentTypeId: dealId,
      },
    });

  const { data: dataBoard, loading: loadingBoard } = useQuery(
    boardQL.boardDetail,
    {
      variables: {
        _id: dataDetail?.dealDetail?.boardId,
      },
      skip: !dataDetail?.dealDetail?.boardId,
    },
  );

  const getDayDiff = useMemo(() => {
    if (!dataDetail?.dealDetail?.startDate) return "";
    const startDate = new Date(dataDetail.dealDetail.startDate);
    const currentDate = new Date();
    const timeDiff = startDate.getTime() - currentDate.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    if (daysDiff < 1) {
      return daysDiff < 0 ? "Өнгөрсөн" : "Өнөөдөр";
    } else if (daysDiff > 1 && daysDiff < 2) {
      return "Маргааш";
    }
    return `${Math.floor(daysDiff)} өдөр`;
  }, [dataDetail]);

  if (loading || loadingBoard || checkListsLoading) {
    return (
      <div className="flex w-full items-center justify-center rounded-lg bg-gray-100 py-7">
        <Loader2 className="size-5 animate-spin text-gray-500" />
      </div>
    );
  }

  const getPrice = (price: number) => {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "MNT",
      currencyDisplay: "narrowSymbol",
    }).format(price);
  };

  if (!dataDetail?.dealDetail) return null;

  const serviceItem =
    dataDetail.dealDetail.products?.[0]?.product?.type === "service" ? (
      <div className="grid w-full cursor-pointer grid-cols-4 items-center gap-x-4 gap-y-5 rounded-md bg-gray-100 p-4 transition-colors hover:bg-gray-200">
        <p className="col-span-2 shrink text-center font-medium text-gray-500 sm:col-span-1 lg:col-span-2 xl:col-span-1">
          {convertUtcToUlaanbaatar(
            dataDetail.dealDetail.startDate?.toString() || "",
          )}
        </p>
        <div className="col-span-2 flex items-center justify-center sm:col-span-1 lg:col-span-2 xl:col-span-1 2xl:justify-start">
          <div className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white">
            {getDayDiff}
          </div>
        </div>
        <p className="col-span-2 text-center font-medium text-gray-600 sm:col-span-1 lg:col-span-2 xl:col-span-1">
          {dataBoard?.salesBoardDetail?.name}
        </p>
        <p className="col-span-2 text-center font-medium text-gray-600 sm:col-span-1 lg:col-span-2 xl:col-span-1">
          {dataDetail.dealDetail.products?.[0]?.product?.name}
        </p>
      </div>
    ) : null;

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>{serviceItem}</DialogTrigger>
      <DialogContent className="rounded-xl sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Захиалгын мэдээлэл</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <p className="text-right font-medium">Үйлчилгээ:</p>
            <p>{dataDetail.dealDetail.products?.[0]?.product?.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-right font-medium">Хэзээ:</p>
            <p>{getDayDiff}</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-right font-medium">Салбар:</p>
            <p>{dataBoard?.boardDetail?.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-right font-medium">Үйлчилгээний төлбөр: </p>
            <p>
              {getPrice(
                dataDetail.dealDetail.products?.[0]?.product?.unitPrice || 0,
              )}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-right font-medium">Захиалгын огноо:</p>
            <p>
              {convertUtcToUlaanbaatar(
                dataDetail.dealDetail.startDate?.toString() || "",
              )}
            </p>
          </div>

          {checkListsData?.checklists &&
            checkListsData.checklists.length > 0 && (
              <Accordion type="single" collapsible className="w-full">
                {checkListsData.checklists.map((checklist) => {
                  const checkedItems = checklist.items.filter(
                    (item) => item.isChecked === true,
                  );
                  return (
                    <AccordionItem key={checklist._id} value={checklist._id}>
                      <AccordionTrigger>
                        {checklist.title.toUpperCase()}
                      </AccordionTrigger>
                      <AccordionContent>
                        {checkedItems.length > 0 ? (
                          <div className="list-inside space-y-2">
                            {checkedItems.map((item) => (
                              <div
                                key={item._id}
                                className="flex h-full items-center"
                              >
                                <FontAwesomeIcon
                                  icon={faExclamationTriangle}
                                  className="my-2 text-red-500"
                                />
                                <div className="m-2 text-sm">
                                  {item.content}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm italic text-gray-500">
                            Оношилгооны хариу хэвийн байна.
                          </p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            )}
        </div>
        <Button onClick={() => setIsModalOpen(false)}>Хаах</Button>
      </DialogContent>
    </Dialog>
  );
};
