import { usePostFetch } from "@/utils/fetch";

export const getList = () =>
  usePostFetch("/api/v1/query/vehicle_can_periods", {});
