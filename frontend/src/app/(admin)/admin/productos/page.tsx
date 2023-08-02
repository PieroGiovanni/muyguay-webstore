import { getProductsData } from "../../../api/queries";
import { columns } from "./columns";
import { DataTable } from "./dataTable";

interface PageProps {}

const Page = async ({}: PageProps) => {
  const data = await getProductsData();
  return (
    <div className="flex justify-center">
      <div className="w-[90%]">
        <DataTable columns={columns} data={[...data]} />
      </div>
    </div>
  );
};
export default Page;
