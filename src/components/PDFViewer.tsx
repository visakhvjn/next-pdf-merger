"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

export default function PDFViewer({ file }: { file: File }) {
    const [numPages, setNumPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        setIsLoading(false);
    }

    const onDocumentLoadError = () => {
        console.error("Error loading PDF");
        setIsLoading(false);
    }

    return (
        <Document 
            file={file} 
            onLoadSuccess={onDocumentLoadSuccess} 
            onLoadError={onDocumentLoadError}
            loading={
                <div className="flex items-center justify-center h-32">
                    <div className="flex flex-col items-center space-y-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p className="text-sm text-gray-600">Loading PDF...</p>
                    </div>
                </div>
            }
            error={
                <div className="flex items-center justify-center h-32">
                    <div className="text-center text-red-600">
                        <p className="text-sm">Error loading PDF</p>
                        <p className="text-xs text-gray-500 mt-1">Please try again</p>
                    </div>
                </div>
            }
        >
            {!isLoading && (
                <div className="flex flex-col items-center space-y-6">
                    {Array.from({ length: numPages }, (_, index) => (
                        <div key={index} className="w-full flex flex-col items-center">
                            <div className="text-sm text-gray-500 mb-2 text-center">
                                Page {index + 1} of {numPages}
                            </div>
                            <div className="w-full flex justify-center">
                                <Page 
                                    pageNumber={index + 1} 
                                    width={280}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                    className="border border-gray-200 rounded shadow-sm"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Document>
    )
}