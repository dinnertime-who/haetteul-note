"use client";
import { Input } from "@/components/ui/input";
import { useInputSingleFile } from "@/hooks/use-input-file-change";
import { ComponentProps } from "react";

export function UploadFileInput({
  ...rest
}: Omit<ComponentProps<"input">, "type" | "onChange">) {
  const { handleChange, isLoading } = useInputSingleFile();

  const onChangeHandler = handleChange(async () => {});

  return (
    <Input
      disabled={isLoading.current}
      {...rest}
      type="file"
      onChange={onChangeHandler}
    />
  );
}
