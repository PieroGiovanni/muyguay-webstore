import { useSession } from "next-auth/react";
import { UserOrders } from "../../components/UserOrders";

interface PageProps {}

const Page = async ({}: PageProps) => {
  const { data: userData } = useSession({ required: true });
  return (
    <div>
      <UserOrders />
    </div>
  );
};
export default Page;
