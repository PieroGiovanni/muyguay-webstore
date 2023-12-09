"use server";

import { revalidatePath } from "next/cache";

export const RevalidateData = async () => {
  revalidatePath("/", "layout");
};
