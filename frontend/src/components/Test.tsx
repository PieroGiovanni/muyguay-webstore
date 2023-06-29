"use client";

import { GetImagesQuery } from "../generated/graphql/graphql";

interface testProps {
  images: GetImagesQuery;
}

export const Test = ({ images }: testProps) => {
  return <div>why is this working</div>;
};
