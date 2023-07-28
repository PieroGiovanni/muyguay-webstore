import { Skeleton } from "./ui/skeleton";

interface LoadingSkeletonProps {}

export const LoadingSkeleton = ({}: LoadingSkeletonProps) => {
  return (
    <div className="mt-20 flex items-center space-x-4 justify-center">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};
