"use server";

import { revalidateTag } from "next/cache";

const action = async () => {
  revalidateTag("products");
  revalidateTag("filteredProducts");
};

export default action;
