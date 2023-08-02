import { RegisterForm } from "../../../components/RegisterForm";

interface PageProps {}

const Page = ({}: PageProps) => {
  return (
    <div className="mt-20 flex justify-center">
      <RegisterForm />
    </div>
  );
};
export default Page;
