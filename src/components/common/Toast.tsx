import { CheckCircle, CircleAlert } from "lucide-react";
import { toast } from "sonner";

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    duration: 3000,
    style: {
      backgroundColor: "var(--color-black)",
      color: "var(--color-brand)",
      borderColor: "var(--color-brand)",
      fontSize: "11px",
      fontFamily: "var(--font-family)",
    },
    icon: <CheckCircle className="w-4 h-4" />,
  });
};

export const showWarningToast = (message: string) => {
  toast.warning(message, {
    duration: 3000,
    style: {
      backgroundColor: "var(--color-black)",
      color: "var(--color-error)",
      borderColor: "var(--color-error)",
      fontSize: "11px",
      fontFamily: "var(--font-family)",
    },
    icon: <CircleAlert className="w-4 h-4" />,
  });
};
