"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

function ReaderPage({ number, width, scrollRoot }: {
  number: number;
  width: number;
  scrollRoot: RefObject<HTMLDivElement | null>;
}) {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(number === 1);
  const [ratio, setRatio] = useState(1.414);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      root: scrollRoot.current,
      rootMargin: "1000px 0px",
    });
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, [scrollRoot]);

  return (
    <div ref={container} className="mb-4 bg-white shadow-md" style={{ width, minHeight: width * ratio }}>
      {visible && (
        <Page
          pageNumber={number}
          width={width}
          onLoadSuccess={(page) => {
            const viewport = page.getViewport({ scale: 1 });
            setRatio(viewport.height / viewport.width);
          }}
          loading={<p className="p-4 text-sm">Loading page {number}…</p>}
        />
      )}
    </div>
  );
}

export default function PdfDocumentViewer({ file }: { file: string }) {
  const scrollRoot = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(600);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    const container = scrollRoot.current;
    if (!container) return;
    const observer = new ResizeObserver(() => setWidth(Math.max(200, container.clientWidth - 32)));
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div ref={scrollRoot} aria-label="PDF pages" tabIndex={0} className="min-h-0 flex-1 overflow-auto overscroll-contain bg-[#808080] p-4">
        <Document
          file={file}
          externalLinkTarget="_blank"
          onLoadSuccess={({ numPages }) => setPages(numPages)}
          loading={<p className="text-sm text-white">Loading PDF…</p>}
          error={<p className="bg-white p-4 text-sm">Unable to display this PDF. Please use “Open in new tab” above.</p>}
          className="mx-auto w-fit"
        >
          {Array.from({ length: pages }, (_, index) => (
            <ReaderPage key={index} number={index + 1} width={Math.floor(width)} scrollRoot={scrollRoot} />
          ))}
        </Document>
      </div>
    </div>
  );
}
