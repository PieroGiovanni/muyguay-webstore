"use client";
import { useQuery } from "@apollo/client";
import { getFragmentData } from "../graphql/generated";
import {
  GetProductsDataDocument,
  RegularProductDataFragmentDoc,
} from "../graphql/generated/graphql";
import { DataTable } from "../app/(admin)/admin/productos/dataTable";
import { columns } from "../app/(admin)/admin/productos/columns";
import { LoadingSkeleton } from "./LoadingSkeleton";

interface DataTableComponentProps {}

export const DataTableComponent = ({}: DataTableComponentProps) => {
  const { data: productsData, loading } = useQuery(GetProductsDataDocument);

  const data = getFragmentData(
    RegularProductDataFragmentDoc,
    productsData?.getProducts!
  );
  return data ? (
    <DataTable columns={columns} data={[...data].sort((a, b) => a.id - b.id)} />
  ) : (
    <LoadingSkeleton />
  );
};