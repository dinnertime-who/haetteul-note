"use client";

import { ChangeEvent, useRef } from "react";
import { nanoid } from "nanoid";

export function useInputSingleFile(options?: { newName: boolean }) {
  const isLoading = useRef(false);

  function handleChange(
    cb: (file: File, event: ChangeEvent<HTMLInputElement>) => Promise<void>
  ) {
    return async function (event: ChangeEvent<HTMLInputElement>) {
      isLoading.current = true;

      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      try {
        const file = event.target.files[0];
        const newFile = new File(
          [file],
          options?.newName
            ? `${nanoid()}.${file.name.split(".").pop()}`
            : file.name
        );

        await cb(newFile, event);
      } catch (error) {
        throw error;
      } finally {
        event.target.value = "";
        isLoading.current = false;
      }
    };
  }

  return {
    isLoading,
    handleChange,
  };
}
