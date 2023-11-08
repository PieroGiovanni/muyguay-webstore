"use server";

import { revalidateTag } from "next/cache";

const action = async () => {
  revalidateTag("products");
};

export default action;
