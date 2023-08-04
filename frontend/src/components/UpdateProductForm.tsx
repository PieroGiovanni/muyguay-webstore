import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { getProduct } from "../app/api/queries";
import {
  GetProductDocument,
  GetProductTypesDocument,
  GetProductsDocument,
  ProductPropsFragmentDoc,
  ProductTypePropsFragmentDoc,
} from "../graphql/generated/graphql";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { getFragmentData } from "../graphql/generated";
import { useEffect, useState } from "react";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface UpdateProductFormProps {
  productId: number;
}

export const UpdateProductForm = ({ productId }: UpdateProductFormProps) => {
  const { data: productData, loading: loadingProducts } = useQuery(
    GetProductDocument,
    {
      variables: { getProductId: productId },
    }
  );

  const { data: productTypeData, loading: loadingProductTypes } = useQuery(
    GetProductTypesDocument
  );

  const product = getFragmentData(
    ProductPropsFragmentDoc,
    productData?.getProduct
  );

  const productTypes = getFragmentData(
    ProductTypePropsFragmentDoc,
    productTypeData?.getProductTypes
  );

  const [nameInput, setNameInput] = useState<string>();
  const [descriptionInput, setDescriptionInput] = useState<string | null>();
  const [isFeatured, setIsFeatured] = useState<boolean>();
  const [priceInput, setPriceInput] = useState<number>();

  useEffect(() => {
    setNameInput(product?.name);
    setDescriptionInput(product?.description);
    setIsFeatured(product?.isFeatured);
    console.log("product type: ", product?.productType.name);
  }, [product]);

  return product && productTypes ? (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <div className="flex flex-col justify-start gap-3 basis-3/4">
          <Label className="text-start">Nombre</Label>
          <Input
            defaultValue={product.name}
            onChange={(e) => setNameInput(e.target.value)}
          />
        </div>

        <div className="flex flex-col justify-start gap-3 basis-1/4">
          <Label className="text-start">Precio</Label>
          <div className="flex flex-row items-center gap-1">
            <Label className="text-start">S/. </Label>
            <Input
              defaultValue={product.price}
              type="number"
              onChange={(e) => setPriceInput(parseFloat(e.target.value))}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start gap-3">
        <Label className="text-start">Description</Label>
        <Input
          defaultValue={product.description as string}
          placeholder={product.description ? "" : "Agregar descriptción"}
          onChange={(e) => setDescriptionInput(e.target.value)}
        />
      </div>
      <div>
        <RadioGroup
          defaultValue={product.isFeatured ? "featured" : "notFeatured"}
          className="flex flex-row"
          onValueChange={(e) =>
            setIsFeatured(e === "isFeatured" ? true : false)
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="featured" id="featured" />
            <Label htmlFor="featured">Destacado</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="notFeatured" id="notFeatured" />
            <Label htmlFor="notFeatured">No Destacado</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="flex flex-col justify-start gap-3">
        <Label className="text-start">Tipo de Producto</Label>
        <Select>
          <SelectTrigger className="w-[50%]">
            <SelectValue placeholder={product.productType.name} />
          </SelectTrigger>
          <SelectContent className="h-96">
            {productTypes.map((pt) => (
              <SelectItem key={pt.id} value={pt.name}>
                {pt.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  ) : (
    <LoadingSkeleton />
  );
};
