import {
  OperationVariables,
  TypedDocumentNode,
} from "@apollo/client/core/types";
import { DocumentNode } from "@apollo/client/link/core/types";
import { getClient } from "../../lib/client";
import { HydrateQuery } from "./HydrateQuery";

interface PrefetchQueryProps {
  variables: OperationVariables;
  query: DocumentNode | TypedDocumentNode<any, OperationVariables>;
  children: React.ReactNode;
}

export const PrefetchQuery = async ({
  variables,
  query,
  children,
}: PrefetchQueryProps) => {
  const { data } = await getClient().query({
    query,
    variables,
  });

  return (
    <HydrateQuery query={query} variables={variables} data={data}>
      {children}
    </HydrateQuery>
  );
};
