"use client";

import { useApolloClient } from "@apollo/client";
import {
  OperationVariables,
  TypedDocumentNode,
} from "@apollo/client/core/types";
import { DocumentNode } from "@apollo/client/link/core/types";
import { useEffect, useRef } from "react";

interface HydrateQueryProps {
  query: DocumentNode | TypedDocumentNode<any, OperationVariables>;
  variables: {
    query?: string | undefined;
    categoryId?: string | undefined;
    orderBy?: string | undefined;
    cursor?: number | undefined;
  };
  data: any;
  children: React.ReactNode;
}

export const HydrateQuery = ({
  query,
  variables,
  data,
  children,
}: HydrateQueryProps) => {
  const hydrated = useRef(false);
  const client = useApolloClient();
  if (!hydrated.current) {
    hydrated.current = true;
    client.writeQuery({
      query,
      variables,
      data,
    });
    console.log("hydrated");
  }

  return children;
};
