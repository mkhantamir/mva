import { toast } from "react-toastify";

export const errorHandler = (error: any) => {
  if (error.response && error.response.data && error.response.data.message) {
    toast.error(error.response.data.message);
  } else {
    toast.error(error.message);
  }
};
