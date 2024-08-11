export default function Deck({ name, className, children }: {name: string, className: string, children?: React.ReactNode}) {
    return (
      <div
        className={` ${className} rounded-xl overflow-clip w-full aspect-square aspect-h-1 relative`}
      >
        <div className="p-4 text-white h-full w-full">
          <p className="text-lg font-semibold">{name}</p>
        </div>
        <div className="absolute bottom-0 right-0 p-4 text-white">
          {children}
        </div>
      </div>
    );
  }