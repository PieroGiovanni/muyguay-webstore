import { DataTableComponent } from "../../../../components/DataTableComponent";

interface PageProps {}

const Page = async ({}: PageProps) => {
  return (
    <div className="flex justify-center">
      <div className="w-[90%] flex items-center flex-col">
        <p className="mt-5">PRODUCTOS</p>
        <DataTableComponent />
      </div>
    </div>
  );
};
export default Page;
