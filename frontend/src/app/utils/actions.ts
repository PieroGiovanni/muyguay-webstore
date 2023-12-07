"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export const RevalidateData = async () => {
  revalidatePath("/");
  revalidatePath("/admin/productos");
};
