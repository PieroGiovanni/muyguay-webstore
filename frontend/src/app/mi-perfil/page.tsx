import { PerfilCard } from "../../components/PerfilCard";

interface PageProps {}

const Page = ({}: PageProps) => {
  return (
    <div className="mt-20 flex justify-center">
      <PerfilCard />
    </div>
  );
};
export default Page;
