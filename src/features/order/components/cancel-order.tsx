import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LoadingIcon } from "@/components/ui/loading";
import { useCancelOrder } from "@/features/order/api/order";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDetail } from "@/features/order/components/order-detail-context";

function CancelOrder() {
  const { _id, number } = useDetail();
  const { cancel, loading } = useCancelOrder();
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="flex-auto px-0 md:h-12 md:flex-none md:px-8"
        >
          Захиалга цуцлах
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Та {number} дугаартай энэ захиалгыг цуцлахдаа итгэлтэй байна уу?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Энэхүү захиалга бүр мөсөн устах бөгөөд дахин сэргээх боломжгүй болно
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Буцах</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              cancel({
                variables: { _id },
                onCompleted() {
                  toast.success(
                    `${number} дугаартай захиалга амжилттай цуцлагдлаа`,
                  );
                  router.replace("/primart-history");
                },
              })
            }
            disabled={loading}
          >
            {loading && <LoadingIcon />}
            Захиалга цуцлах
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default CancelOrder;
