import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 sticky top-0 bg-white z-50">
      <div className="flex items-center gap-2">
        <Image src={'/globe.svg'} alt={''} width={20} height={20} />
        <h1 className="text-2xl font-bold">Merge PDFs</h1>
      </div>
    </nav>
  );
}