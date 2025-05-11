import { toast as sonnerToast } from "sonner";

type ToastProps = {
  title?: string;
  description?: string;
};

export const toast = {
  success: ({ title, description }: ToastProps) => {
    return sonnerToast.success(title, {
      description,
    });
  },
  error: ({ title, description }: ToastProps) => {
    return sonnerToast.error(title, {
      description,
    });
  },
  info: ({ title, description }: ToastProps) => {
    return sonnerToast.info(title, {
      description,
    });
  },
  warning: ({ title, description }: ToastProps) => {
    return sonnerToast.warning(title, {
      description,
    });
  },
  loading: ({ title, description }: ToastProps) => {
    return sonnerToast.loading(title, {
      description,
    });
  },
};
