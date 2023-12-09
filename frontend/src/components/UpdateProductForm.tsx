"use client";

import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  BrandPropsFragment,
  GetProductDocument,
  ProductCategoryPropsFragment,
  ProductPropsFragment,
  ProductPropsFragmentDoc,
  UpdateProductDocument,
} from "../graphql/generated/graphql";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { toast } from "./ui/use-toast";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { RevalidateData } from "../app/utils/actions";
import { parseStringToArray } from "../app/utils/stringUtils";
import { ImagesUploader } from "./ImagesUploader";
import { LoadingSpinner } from "./LoadingSpinner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { getFragmentData } from "../graphql/generated";

interface UpdateProductFormProps {
  categories: readonly ProductCategoryPropsFragment[];
  productId: number;
  brands: readonly BrandPropsFragment[];
}

const FormSchema = z.object({
  name: z.string().nonempty({ message: "ingresar nombre del producto" }),
  categoryId: z.number({ required_error: "elegir categoría" }),
  price: z.coerce
    .number({ invalid_type_error: "ingresar precio" })
    .positive({ message: "ingresar precio" }),
  description: z.string(),
  stock: z.coerce
    .number({ invalid_type_error: "Ingresar stock" })
    .gte(0, { message: "ingresar stock" }),
  tags: z.string(),
  brandId: z.number(),
  featured: z.boolean(),
});

export const UpdateProductForm = ({
  productId,
  categories,
  brands,
}: UpdateProductFormProps) => {
  const [updateProduct] = useMutation(UpdateProductDocument);
  const [areImagesUpdated, setAreImagesUpdated] = useState(false);

  const { data } = useSuspenseQuery(GetProductDocument, {
    variables: { id: productId },
  });

  const product = getFragmentData(ProductPropsFragmentDoc, data.getProduct);

  const productImages = product.images.map((i) => i.imageUrl!);

  const [images, setImages] = useState<string[]>(productImages);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: product.name,
      price: product.price,
      description: product.description as string,
      stock: product.stock,
      tags: product.tags.join(",").toString(),
      categoryId: product.productCategoryId,
      brandId: product.brandId,
      featured: product.isFeatured,
    },
  });

  const router = useRouter();

  const saveChanges = async (data: z.infer<typeof FormSchema>) => {
    if (!images.length) {
      toast({
        title: "Agregar almenos una imagen",
      });
      return;
    }

    const updatedProduct = await updateProduct({
      variables: {
        id: product.id,
        productInput: {
          name: data.name,
          price: data.price,
          productCategoryId: data.categoryId,
          description: data.description,
          brandId: data.brandId,
          tags: parseStringToArray(data.tags),
          isFeatured: data.featured,
          stock: data.stock,
          imagesUrl: areImagesUpdated ? images : undefined,
        },
      },
    });

    if (updatedProduct) {
      toast({
        title: "Producto Actualizado",
        duration: 1000,
      });
      await RevalidateData();
    }
    router.push("/admin/productos");
  };

  return categories && brands ? (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(saveChanges)}>
        <Card className="flex flex-col gap-2 px-5 py-3 md:w-[35vw] w-[100vw]">
          <h1 className="font-bold text-center">
            EDITAR PRODUCTO {product.id}
          </h1>
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
          <div className="flex flex-row gap-1 items-center">
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
                      value={field.value ? "featured" : "notFeatured"}
                      className="flex items-center basis-2/3"
                    >
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <RadioGroupItem value="featured" />
                          </FormControl>
                          <FormLabel className="text-center">
                            Destacado
                          </FormLabel>
                        </div>
                      </FormItem>
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <RadioGroupItem value="notFeatured" />
                          </FormControl>
                          <FormLabel>No Destacado</FormLabel>
                        </div>
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
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-start">Categoría</FormLabel>
                    <Select
                      onValueChange={(e) => field.onChange(parseInt(e))}
                      // defaultValue={field.value}
                      value={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Categoría" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="h-auto">
                        {categories.map((c) => (
                          <SelectItem key={c.id} value={c.id.toString()}>
                            {c.name}
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
          <div>
            <FormLabel>Imagénes</FormLabel>
            <ImagesUploader
              images={images}
              setImages={setImages}
              setAreImagesUpdated={setAreImagesUpdated}
            />
          </div>
          <div className="flex justify-center gap-2">
            <Button className="w-32" type="submit">
              Guardar
            </Button>
            <Link href="/admin">
              <Button onClick={() => router.back()}>Cancelar</Button>
            </Link>
          </div>
        </Card>
      </form>
    </Form>
  ) : (
    <LoadingSpinner size="lg" />
  );
};
