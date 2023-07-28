import { UserOrders } from "../../components/UserOrders";

interface PageProps {}

const Page = async ({}: PageProps) => {
  return (
    <>
      <UserOrders />
    </>
  );
};
export default Page;
