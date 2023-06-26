import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface ShowcaseProps {}

export const Showcase = ({}: ShowcaseProps) => {
  return (
    <Tabs defaultValue="featured" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="featured">Destacados</TabsTrigger>
        <TabsTrigger value="new">Lo Nuevo</TabsTrigger>
        <TabsTrigger value="mostSold">Lo más vendido</TabsTrigger>
      </TabsList>
      <TabsContent value="featured">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="new">Change your password here.</TabsContent>
    </Tabs>
  );
};
