interface ApiReturn<T> {
  code: number;
  message: string;
  data: Required<T>;
}

declare enum ResponseDataTypes {
  json = "json",
  text = "text",
  blob = "blob",
  arrayBuffer = "arrayBuffer",
  formData = "formData",
}
