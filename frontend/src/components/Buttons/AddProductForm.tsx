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
import { set, useForm } from "react-hook-form";
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
import { valueFromAST } from "graphql";

interface AddProductFormProps {
  brands: readonly BrandPropsFragment[];
  productTypes: readonly ProductTypePropsFragment[];
}

const FormSchema = z.object({
  name: z.string().nonempty({ message: "ingresar nombre del producto" }),
  productType: z
    .string({ required_error: "elegir tipo de producto" })
    .nonempty({ message: "elegir tipo de producto2" }),
  price: z.coerce
    .number({ invalid_type_error: "ingresar precio" })
    .positive({ message: "ingresar precio" }),
  description: z.string(),
  stock: z.coerce
    .number({ invalid_type_error: "Ingresar stock" })
    .positive({ message: "ingresar stock" }),
  tags: z.string(),
  brandId: z.number(),
  featured: z.boolean(),
});

export const AddProductForm = ({
  brands,
  productTypes,
}: AddProductFormProps) => {
  const [addProduct] = useMutation(CreateProductDocument);

  // const [isFeatured, setIsFeatured] = useState<boolean>(false);
  // const [brandId, setBrandId] = useState<number>(1);
  const [imageUrl, setImageUrl] = useState();
  const [resetImage, setResetImage] = useState(false);

  const handleImageUrl = (imageUrl: any) => {
    setImageUrl(imageUrl);
    setResetImage(false);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      stock: 1,
      tags: "",
      productType: "",
      brandId: 1,
      featured: false,
    },
  });

  const router = useRouter();

  const saveChanges = async (data: z.infer<typeof FormSchema>) => {
    // if (imageUrl === undefined) {
    //   toast({
    //     title: "Agregar Imagen",
    //   });
    // } else {
    //   const newProdcut = await addProduct({
    //     variables: {
    //       productInput: {
    //         name: data.name,
    //         price: data.price,
    //         productTypeId: parseInt(data.productType),
    //         description: data.description,
    //         brandId,
    //         tags: parseStringToArray(data.tags),
    //         isFeatured,
    //         stock: data.stock,
    //         imageUrl,
    //       },
    //     },
    //   });
    //   if (newProdcut) {
    //     toast({
    //       title: "Producto Agregado",
    //     });
    console.log("brand: ", data.brandId);
    console.log("featured: ", data.featured);
    setImageUrl(undefined);
    // setIsFeatured(false);
    // setBrandId(1);
    form.reset();
    setResetImage(true);
    //   }
    // }
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
                      <Input placeholder="Nombre del Producto" {...field} />
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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-start">Description</Label>
                  <Textarea placeholder={"Agregar descriptción"} {...field} />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row gap-1">
            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={(e) => {
                        field.onChange(e === "featured" ? true : false);
                      }}
                      // defaultValue="notFeatured"
                      value={field.value ? "featured" : "notFeatured"}
                      className="flex flex-row basis-2/3"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="featured" />
                        </FormControl>
                        <FormLabel className="font-normal">Destacado</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="notFeatured" />
                        </FormControl>
                        <FormLabel>No Destacado</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row items-center gap-2 basis-1/3 justify-center">
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input type="number" className="w-14" {...field} />
                    </FormControl>
                  </FormItem>
                )}
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
                      Tipo de Producto
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
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
              <FormField
                control={form.control}
                name="brandId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-start">Marca</FormLabel>
                    <Select
                      onValueChange={(e) => field.onChange(parseInt(e))}
                      value={field.value.toString()}
                      // defaultValue={
                      //   brands.find((b) => b.id === field.value)?.name
                      // }
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={brands.find((b) => b.id === 1)?.name}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {brands.map((brand) => (
                          <SelectItem
                            key={brand.id}
                            value={brand.id.toString()}
                          >
                            {brand.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col justify-start gap-3">
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-start">Etiquetas</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-5"
                      placeholder="Agregar etiquetas"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <UploadWidget onImageUrl={handleImageUrl} resetImage={resetImage} />
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