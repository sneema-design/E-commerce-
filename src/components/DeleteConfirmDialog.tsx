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
import { Spinner } from "@/components/ui/spinner";

type DeleteConfirmDialogProps = {
  triggerLabel?: string; 
  title?: string;        
  description?: string;  
  itemName?: string;     
  onConfirm: () => void | Promise<void>; 
  isLoading?: boolean;   
  triggerClassName?: string; 
};

export default function DeleteConfirmDialog({
  triggerLabel = "Delete",
  title = "Delete item?",
  description,
  itemName,
  onConfirm,
  isLoading = false,
  triggerClassName,
}: DeleteConfirmDialogProps) {
  return (
    <AlertDialog>
      {/* Trigger Button */}
      <AlertDialogTrigger asChild>
        <Button
          disabled={isLoading}
          className={
            triggerClassName ??
            "px-3 py-1 rounded bg-red-500 text-white text-sm hover:bg-red-600 disabled:opacity-50"
          }
        >
          {triggerLabel}
        </Button>
      </AlertDialogTrigger>

      {/* Dialog Content */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description ??
              (
                <>
                  This action cannot be undone.
                  {itemName && (
                    <> This will permanently delete <strong>{itemName}</strong>.</>
                  )}
                </>
              )
            }
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex gap-2 justify-end">
          <AlertDialogCancel asChild>
            <Button variant="outline" size="sm">
              Cancel
            </Button>
          </AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              size="sm"
              disabled={isLoading}
              className="flex items-center gap-2"
              onClick={onConfirm}
            >
              {isLoading && <Spinner/>}
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
