"use client";

import Button from "@/components/Button";
import React, { useState } from "react";
import PDFMerger from "pdf-merger-js/browser";
import SelectPDFs from "@/components/SelectPDFs";
import PdfFileReorderList from "@/components/PDFReorderList";
import Sidebar from "@/components/Sidebar";


export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [mergedUrl, setMergedUrl] = useState('');
  const [isMerging, setIsMerging] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles([]);
    setMergedUrl('');

    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleReorderFiles = (files: File[]) => {
    setMergedUrl('');
    setFiles(files);
  }

  const handleDeleteFile = (file: File) => {
    setFiles(files.filter(f => f.name !== file.name));
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

  const handleFileClick = (file: File) => {
    setShowSidebar(true);
    setSelectedFile(file);
  }

  const handleCloseSidebar = () => {
    if (showSidebar) {
      setShowSidebar(false);
      setSelectedFile(null);
    }
  }
  
  return (
    <>
    {showSidebar && (
      <div 
        className="fixed inset-0 bg-gray-100/40 z-40"
        onClick={handleCloseSidebar}
      />
    )}
    {selectedFile && showSidebar && <Sidebar file={selectedFile} />}
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl font-bold">Merge PDFs</h1>
        <p className="text-xl text-gray-500 mt-2 mb-2">{'Select - Arrange - Merge - Download'}</p>
      </div>
      <div className="flex mb-10 w-1/2 p-2">
        <PdfFileReorderList onFileClick={handleFileClick} files={files} onReorder={handleReorderFiles} onDelete={handleDeleteFile} />
      </div>
      <div className="flex gap-2">
        <SelectPDFs onChange={handleFiles} />
        {files.length > 1 && <Button isLoading={isMerging} disabled={!files.length} onClick={mergePdfs}>Merge PDFs</Button>}
        {mergedUrl && <Button isLoading={false} disabled={!mergedUrl} onClick={downloadPDF}>Download PDF</Button>}
      </div>
    </div>
    </>
  );
}
