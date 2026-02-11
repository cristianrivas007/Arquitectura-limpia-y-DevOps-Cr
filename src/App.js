import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "./App.css";

pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function App() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [containerWidth, setContainerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setContainerWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const nextPage = () =>
    setPageNumber((prev) => Math.min(prev + 1, numPages));

  const prevPage = () =>
    setPageNumber((prev) => Math.max(prev - 1, 1));

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 2));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.6));

  return (
    <div className="app">
      <div className="toolbar">
        <div className="left-controls">
          <button onClick={prevPage} disabled={pageNumber <= 1}>
            ◀
          </button>

          <span className="page-info">
            Página {pageNumber} de {numPages || "..."}
          </span>

          <button onClick={nextPage} disabled={pageNumber >= numPages}>
            ▶
          </button>
        </div>

        <div className="right-controls">
          <button onClick={zoomOut}>−</button>

          <span className="zoom-info">
            {Math.round(scale * 100)}%
          </span>

          <button onClick={zoomIn}>＋</button>
        </div>
      </div>

      <div className="pdf-wrapper">
        <Document
          file="/Cristian-Rivas-Arquitectura.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            width={containerWidth < 768 ? containerWidth - 40 : undefined}
          />
        </Document>
      </div>
    </div>
  );
}

export default App;