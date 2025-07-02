"use client";

import Button from "@/components/Button";
import { useState } from "react";
import PDFMerger from "pdf-merger-js/browser";
import Navbar from "@/components/Navbar";
import SelectPDFs from "@/components/SelectPDFs";
import PdfFileReorderList from "@/components/PDFReorderList";


export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [mergedUrl, setMergedUrl] = useState('');
  const [isMerging, setIsMerging] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleFiles = (event: any) => {
    setFiles([]);
    setMergedUrl('');

    setFiles(Array.from(event.target.files));
  };

  const handleReorderFiles = (files: File[]) => {
    setMergedUrl('');
    setFiles(files);
  }

  const mergePdfs = async () => {
    setIsMerging(true);
    setMergedUrl('');

    try {
      const merger = new PDFMerger();
      for (const file of files) {
        await merger.add(file);
        await sleep(500); // 500ms delay between each file
      }
      const mergedBlob = await merger.saveAsBlob();
      setMergedUrl(URL.createObjectURL(mergedBlob));
    } finally {
      setIsMerging(false);
    }
  };

  const downloadPDF = async () => {
    if (!mergedUrl) return;

    const a = document.createElement("a");

    a.href = mergedUrl;
    a.download = "merged.pdf";

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
  }
  
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl font-bold">Merge PDFs</h1>
        <p className="text-2xl text-gray-500 mt-2 mb-2">{'Select - Arrange - Merge - Download'}</p>
      </div>
      <div className="flex mb-10 w-1/2 p-2">
        <PdfFileReorderList files={files} onReorder={handleReorderFiles} />
      </div>
      <div className="flex gap-2">
        <SelectPDFs onChange={handleFiles} />
        {files.length > 1 && <Button isLoading={isMerging} disabled={!files.length} onClick={mergePdfs}>Merge PDFs</Button>}
        {mergedUrl && <Button isLoading={isDownloading} disabled={!mergedUrl} onClick={downloadPDF}>Download PDF</Button>}
      </div>
    </div>
  );
}
