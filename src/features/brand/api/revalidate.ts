"use server";

import { revalidatePath } from "next/cache";

export const revalidate = () => {
  revalidatePath("/brand", "page");
};
