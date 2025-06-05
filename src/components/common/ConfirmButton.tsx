import * as React from "react";
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
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

type ConfirmButtonProps = {
  onConfirm: () => void;
  children: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  title?: string;
  description?: string;
  confirmVariant?: "default" | "destructive" | "outline" | "secondary";
};

export function ConfirmButton({
  onConfirm,
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
  title = "Are you absolutely sure?",
  description = "This action cannot be undone.",
  confirmVariant = "destructive",
}: ConfirmButtonProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:text-secondary cursor-pointer">
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              type="button"
              className="bg-error text-black hover:bg-black hover:text-error border-error border-1 cursor-pointer"
              onClick={() => {
                onConfirm();
                setOpen(false);
              }}
              variant={confirmVariant}
            >
              {confirmText}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
