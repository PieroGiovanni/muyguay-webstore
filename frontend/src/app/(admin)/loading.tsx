import { LoadingSpinner } from "../../components/LoadingSpinner";

export default function Loading() {
  return (
    <div className="w-full h-[100vh] flex relative justify-center items-center">
      <LoadingSpinner size="lg" />
    </div>
  );
}
