interface LoadingSpinnerProps {
  size?: "xs" | "sm" | "m" | "lg";
  color?: string;
}

export const LoadingSpinner = ({ size, color }: LoadingSpinnerProps) => {
  let spinnerSize;
  switch (size) {
    case "xs":
      spinnerSize = "h-5 w-5 border-[2.5px]";
      break;
    case "sm":
      spinnerSize = "h-10 w-10 border-[3.5px]";
      break;
    case "lg":
      spinnerSize = "h-[120px] w-[120px] border-[10.5px]";
      break;
    default:
      spinnerSize = "h-20 w-20  border-[7px]";
  }

  let spinnerColor = "border-secondary";
  if (color) {
    spinnerColor = "border-" + color;
  }

  return (
    <div
      className={`inline-block animate-spin rounded-full border-solid ${spinnerColor} border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${spinnerSize}`}
      role="status"
    >
      {/* <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Cargando...
      </span> */}
    </div>
  );
};
