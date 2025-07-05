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
        <div className={`
            p-4 fixed 
            overflow-y-auto
            h-2/3 md:h-full
            w-full md:w-96
            bottom-0 md:bottom-auto md:top-0 md:right-0
            rounded-t-2xl md:rounded-none
            border-t-2 md:border-t-0 border-gray-200 md:border-none
            bg-white shadow-2xl 
            transform transition-transform duration-300 ease-in-out z-50`
        }>
            <PDFViewer file={file} />
        </div>
    )
}