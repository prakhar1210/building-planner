"use client";
import React from "react";
import { useDrawingStore } from "../stores/useDrawingStore";

export default function Toolbar() {
  const { setTool, toggleAnnotations } = useDrawingStore();

  return (
    <div className="flex gap-3 mb-4">
      <button
        className="px-3 py-1 bg-blue-500 text-white rounded"
        onClick={() => setTool("line")}
      >
        Line
      </button>
      <button
        className="px-3 py-1 bg-blue-500 text-white rounded"
        onClick={() => setTool("rect")}
      >
        Rectangle
      </button>
      <button
        className="px-3 py-1 bg-blue-500 text-white rounded"
        onClick={() => setTool("circle")}
      >
        Circle
      </button>
      <button
        className="px-3 py-1 bg-green-500 text-white rounded"
        onClick={toggleAnnotations}
      >
        Toggle Annotations
      </button>
    </div>
  );
}
