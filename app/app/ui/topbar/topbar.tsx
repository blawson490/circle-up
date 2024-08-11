import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface TopBarProps {
  title: string;
  className?: string;
  backLink?: string;
}

export default function TopBar({ title, className, backLink }: TopBarProps) {
  return (
    <div
      className={`flex flex-row h-14 w-full justify-between items-center p-4 shadow-md sticky top-0 z-10 ${className}`}
    >
      {backLink ? (
        <Link href={backLink}>
          <div className="flex flex-row">
            <ChevronLeftIcon className="w-6 h-6" />
            <span>Back</span>
          </div>
        </Link>
      ) : (
        <div className="flex flex-row gap-2 w-20" />
      )}
      <div className="absolute left-1/2 -translate-x-1/2 text-center">{title}</div>
    </div>
  );
}