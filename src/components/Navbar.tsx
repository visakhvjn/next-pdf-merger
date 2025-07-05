import { Combine } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 sticky top-0 z-50">
      <div className="flex items-center gap-2 justify-between w-full">
        <div className="flex items-center gap-2">
          <Combine className="w-6 h-6" />
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold flex items-center gap-2">Merge</h1>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Link href="https://mergepdf.featurebase.app/" target="_blank" className="text-sm text-gray-500 font-semibold hover:text-black">Feedback</Link>
        </div>
      </div>
    </nav>
  );
}