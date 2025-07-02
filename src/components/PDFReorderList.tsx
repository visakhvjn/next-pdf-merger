import React from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

interface PdfFileReorderListProps {
  files: File[];
  onReorder: (newFiles: File[]) => void;
}

const PdfFileReorderList: React.FC<PdfFileReorderListProps> = ({ files, onReorder }) => {
  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reorderedFiles = Array.from(files);
    const [removed] = reorderedFiles.splice(result.source.index, 1);
    reorderedFiles.splice(result.destination.index, 0, removed);
    onReorder(reorderedFiles);
  };

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
                    className="w-full flex items-center gap-2 bg-white border border-gray-300 shadow-sm px-4 py-2 text-gray-800 hover:shadow-md transition-all select-none"
                    style={{
                      ...provided.draggableProps.style,
                    }}
                  >
                    {/* File icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-8 0h8m-8 0v12a1 1 0 001 1h6a1 1 0 001-1V7m-8 0h8" /></svg>
                    <span className="truncate" title={file.name}>{file.name}</span>
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
