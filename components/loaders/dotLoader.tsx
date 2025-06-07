import DotLoader from "react-spinners/DotLoader";

interface DotLoaderSpinnerProps {
  loading: boolean;
}

export default function DotLoaderSpinner({ loading }: DotLoaderSpinnerProps) {
  return (
    <div
      className={`fixed inset-0 z-10 grid place-items-center bg-background/50 ${
        loading ? "block" : "hidden"
      }`}
    >
      <DotLoader color="var(--primary)" loading={loading} />
    </div>
  );
}
