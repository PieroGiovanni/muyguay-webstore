"use client";

import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { parseStringToArray } from "../../app/utils/stringUtils";
import {
  CreateProductDocument,
  AddProductImageDocument,
  BrandPropsFragment,
  ProductTypePropsFragment,
} from "../../graphql/generated/graphql";
import { LoadingSkeleton } from "../LoadingSkeleton";
import { UploadWidget } from "../UploadWidget";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

interface AddProductFormProps {
  brands: readonly BrandPropsFragment[];
  productTypes: readonly ProductTypePropsFragment[];
}

const FormSchema = z.object({
  name: z.string().nonempty({ message: "Ingresa el nombre del producto" }),
  productType: z.string({ required_error: "Elige un tipo de producto" }),
  price: z.coerce
    .number({ invalid_type_error: "Ingresa el precio" })
    .positive({ message: "Ingresa el precio" }),
});

export const AddProductForm = ({
  brands,
  productTypes,
}: AddProductFormProps) => {
  const [addProduct] = useMutation(CreateProductDocument);
  const [addProductImage] = useMutation(AddProductImageDocument);

  const [descriptionInput, setDescriptionInput] = useState<string | null>();
  const [isFeatured, setIsFeatured] = useState<boolean>();

  const [brandId, setBrandId] = useState<number>(1);
  const [tags, setTags] = useState<string[]>();
  const [stock, setStock] = useState<number>(1);
  const [imageUrl, setImageUrl] = useState();

  const handleImageUrl = (imageUrl: any) => {
    setImageUrl(imageUrl);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      price: 0,
    },
  });

  const router = useRouter();

  const saveChanges = async (data: z.infer<typeof FormSchema>) => {
    if (imageUrl === undefined) {
      //   toast({
      //     title: "Agregar Imagen",
      //   });
      console.log("YES");
    } else {
      const newProdcut = await addProduct({
        variables: {
          productInput: {
            name: data.name,
            price: data.price,
            productTypeId: parseInt(data.productType),
            description: descriptionInput,
            brandId,
            tags,
            isFeatured,
            stock,
            imageUrl,
          },
        },
      });

      if (newProdcut) {
        toast({
          title: "Producto Agregado",
        });
        setImageUrl(undefined);
        form.reset();
      }
      console.log("IMAGEURL: ", imageUrl);
    }
  };

  return productTypes && brands ? (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(saveChanges)}>
        <div className="flex flex-col gap-5 m-5">
          <div className="flex flex-row gap-4">
            <div className="flex flex-col justify-start gap-3 basis-3/4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-start">Nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nombre del Producto"
                        // onChange={(e) => setNameInput(e.target.value)}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col justify-start gap-3 basis-1/4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-start">Precio</FormLabel>
                    <div className="flex flex-row items-center gap-1">
                      <Label className="text-start">S/. </Label>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col justify-start gap-3">
            <Label className="text-start">Description</Label>
            <Textarea
              placeholder={"Agregar descriptción"}
              onChange={(e) => setDescriptionInput(e.target.value)}
            />
          </div>
          <div className="flex flex-row gap-1">
            <RadioGroup
              defaultValue="notFeatured"
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
                defaultValue={stock}
                onChange={(e) => setStock(parseInt(e.target.value))}
              />
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <div className="flex flex-col justify-start gap-3 basis-1/2">
              <FormField
                control={form.control}
                name="productType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-start">
                      Tipo de Prodcuto
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Tipo de Producto" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="h-96">
                        {productTypes.map((pt) => (
                          <SelectItem key={pt.id} value={pt.id.toString()}>
                            {pt.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col justify-start gap-3 basis-1/2">
              <Label className="text-start">Marca</Label>
              <Select onValueChange={(e) => setBrandId(parseInt(e))}>
                <SelectTrigger className="">
                  <SelectValue
                    placeholder={brands.find((b) => b.id === 1)?.name}
                  />
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
              placeholder="Agregar etiquetas"
              onChange={(e) => setTags(parseStringToArray(e.target.value))}
            />
          </div>
          <UploadWidget onImageUrl={handleImageUrl} />
          <div className="flex justify-center">
            <Button className="w-32" type="submit">
              Guardar
            </Button>

            <Button>Cancelar</Button>
          </div>
        </div>
      </form>
    </Form>
  ) : (
    <LoadingSkeleton />
  );
};
