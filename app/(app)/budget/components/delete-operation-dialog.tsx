import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Trash2Icon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

// export const DeleteOperationDialog = () => <AlertDialog></AlertDialog>;
export const DeleteOperationDialog = ({
  open,
  setOpen,
  operationIdentifier,
  operationId,
  refresh,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  operationIdentifier: string;
  operationId: number;
  refresh: () => Promise<void>;
}) => {
  const handleDelete = async () => {
    try {
      await fetch(`/api/finance/operations/${operationId}`, { method: "DELETE" });
      toast.success("Usunięto", { richColors: true });
      await refresh();
    } catch (error) {
      console.error(error);
      toast.error("Wystąpił błąd usuwania", { richColors: true, duration: 10 * 1000 });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Czy na pewno usunąć?</AlertDialogTitle>
          <AlertDialogDescription>{`${operationIdentifier}`}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Anuluj</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} variant="destructive">
            Usuń
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
