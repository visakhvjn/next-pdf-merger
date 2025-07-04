import { FileText, Trash2 } from "lucide-react";
import React from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

interface PdfFileReorderListProps {
  files: File[];
  onReorder: (newFiles: File[]) => void;
  onDelete: (file: File) => void;
  onFileClick: (file: File) => void;
}

// Helper function to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const PdfFileReorderList: React.FC<PdfFileReorderListProps> = ({ files, onReorder, onDelete, onFileClick }) => {
  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reorderedFiles = Array.from(files);
    const [removed] = reorderedFiles.splice(result.source.index, 1);
    reorderedFiles.splice(result.destination.index, 0, removed);
    onReorder(reorderedFiles);
  };

  const handleFileClick = (file: File) => {
    onFileClick(file);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="pdfList" direction="vertical" isDropDisabled={false} isCombineEnabled={false} ignoreContainerClipping={false}>
        {(provided) => (
          <div
            className="flex flex-col gap-1 w-full flex-wrap items-center justify-center"
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ listStyle: "none", padding: 0 }}
          >
            {files.map((file, index) => (
              <Draggable
                key={file.name + index}
                draggableId={file.name + index}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="w-full flex items-center justify-between gap-2 bg-white border border-gray-300 shadow-sm px-4 py-2 text-gray-800 hover:shadow-md transition-all select-none"
                    style={{
                      ...provided.draggableProps.style,
                    }}
                    onClick={() => handleFileClick(file)}
                  >
                    <FileText className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="break-words flex-1 min-w-0" title={file.name}>{file.name}</span>
                    <span className="text-sm text-gray-500 flex-shrink-0">{formatFileSize(file.size)}</span>
                    <Trash2 
                      className="w-5 h-5 cursor-pointer text-black hover:text-black/80 flex-shrink-0 mt-0.5" 
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(file);
                      }} 
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default PdfFileReorderList;
