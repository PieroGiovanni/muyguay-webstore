interface LoadingProps {}

export const Loading = ({}: LoadingProps) => {
  return (
    <div className="pt-16 w-full h-[50vh] flex justify-center items-end">
      <div
        className="inline-block h-20 w-20 animate-spin rounded-full border-[6px] border-solid border-secondary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};
