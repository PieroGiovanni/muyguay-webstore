import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { getProduct } from "../app/api/queries";
import {
  BrandPropsFragmentDoc,
  GetBrandsDocument,
  GetProductDocument,
  GetProductTypesDocument,
  GetProductsDocument,
  ProductPropsFragmentDoc,
  ProductTypePropsFragmentDoc,
  UpdateProductDocument,
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
import { Textarea } from "./ui/textarea";
import {
  convertArrayToString,
  parseStringToArray,
} from "../app/utils/stringUtils";
import { CldUploadButton, CldUploadWidget } from "next-cloudinary";
import { Button } from "./ui/button";
import { UploadWidget } from "./UploadWidget";
import { useMutation } from "@apollo/client";
import { Variable } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";

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

  const { data: brandData } = useQuery(GetBrandsDocument);

  const [updateProduct] = useMutation(UpdateProductDocument);

  const product = getFragmentData(
    ProductPropsFragmentDoc,
    productData?.getProduct
  );

  const productTypes = getFragmentData(
    ProductTypePropsFragmentDoc,
    productTypeData?.getProductTypes
  );

  const brands = getFragmentData(BrandPropsFragmentDoc, brandData?.getBrands);

  const [nameInput, setNameInput] = useState<string>();
  const [descriptionInput, setDescriptionInput] = useState<string | null>();
  const [isFeatured, setIsFeatured] = useState<boolean>();
  const [priceInput, setPriceInput] = useState<number>();
  const [productTypeId, setProductTypeId] = useState<number>();
  const [brandId, setBrandId] = useState<number>();
  const [tags, setTags] = useState<string[]>();
  const [stock, setStock] = useState<number>();

  useEffect(() => {
    setNameInput(product?.name);
    setDescriptionInput(product?.description);
    setIsFeatured(product?.isFeatured);
    setBrandId(product?.brandId);
    setPriceInput(product?.price);
    setProductTypeId(product?.productTypeId);
    setTags(product?.tags);
    setStock(product?.stock);
  }, [product]);

  const saveChanges = async () => {
    await updateProduct({
      variables: {
        productInput: {
          id: productId,
          brandId: brandId,
          description: descriptionInput,
          isFeatured: isFeatured,
          name: nameInput,
          price: priceInput,
          productTypeId: productTypeId,
          stock: stock,
          tags: tags,
        },
      },
    });
  };

  return product && productTypes && brands ? (
    <div className="flex flex-col gap-5">
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
        <Textarea
          defaultValue={product.description as string}
          placeholder={product.description ? "" : "Agregar descriptción"}
          onChange={(e) => setDescriptionInput(e.target.value)}
        />
      </div>
      <div className="flex flex-row gap-1">
        <RadioGroup
          defaultValue={product.isFeatured ? "featured" : "notFeatured"}
          className="flex flex-row basis-2/3"
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
        <div className="flex flex-row items-center gap-2 basis-1/3 justify-center">
          <Label>Stock</Label>
          <Input
            type="number"
            className="w-14"
            defaultValue={product.stock}
            onChange={(e) => setStock(parseInt(e.target.value))}
          />
        </div>
      </div>
      <div className="flex flex-row gap-3">
        <div className="flex flex-col justify-start gap-3 basis-1/2">
          <Label className="text-start">Tipo de Producto</Label>
          <Select onValueChange={(e) => setProductTypeId(parseInt(e))}>
            <SelectTrigger className="">
              <SelectValue placeholder={product.productType.name} />
            </SelectTrigger>
            <SelectContent className="h-96">
              {productTypes.map((pt) => (
                <SelectItem key={pt.id} value={pt.id.toString()}>
                  {pt.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col justify-start gap-3 basis-1/2">
          <Label className="text-start">Marca</Label>
          <Select onValueChange={(e) => setBrandId(parseInt(e))}>
            <SelectTrigger className="">
              <SelectValue placeholder={product.brand.name} />
            </SelectTrigger>
            <SelectContent>
              {brands.map((brand) => (
                <SelectItem key={brand.id} value={brand.id.toString()}>
                  {brand.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col justify-start gap-3">
        <Label className="text-start">Etiquetas</Label>
        <Textarea
          className="h-5"
          defaultValue={convertArrayToString(product.tags)}
          placeholder={product.tags.length > 1 ? "" : "Agregar etiquetas"}
          onChange={(e) => setTags(parseStringToArray(e.target.value))}
        />
      </div>
      <div className="flex justify-center">
        <DialogClose asChild>
          <Button className="w-32" onClick={saveChanges}>
            Guardar
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button>Cancelar</Button>
        </DialogClose>
      </div>
    </div>
  ) : (
    <LoadingSkeleton />
  );
};