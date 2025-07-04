"use client";

import dynamic from 'next/dynamic';

const PDFViewer = dynamic(() => import('./PDFViewer'), {
  ssr: false
});

interface SidebarProps {
    file: File;
}

export default function Sidebar({ file }: SidebarProps) {
    return (
        <div className={`p-4 fixed top-0 overflow-y-auto right-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50`}>
            <PDFViewer file={file} />
        </div>
    )
}