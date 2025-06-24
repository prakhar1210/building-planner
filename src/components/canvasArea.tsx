"use client";
import React, { useRef, useEffect, useState } from "react";
import { useDrawingStore } from "../stores/useDrawingStore";

type Shape = {
  type: "line" | "rect" | "circle";
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

export default function CanvasArea() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { tool, annotations, shapes, addShape } = useDrawingStore();

  const [drawing, setDrawing] = useState(false);
  const [start, setStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [currentShape, setCurrentShape] = useState<Shape | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawShapes = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      shapes.forEach((shape: Shape) => {
        drawShape(ctx, shape);
      });

      if (currentShape) {
        ctx.strokeStyle = "red";
        drawShape(ctx, currentShape);
        ctx.strokeStyle = "black";
      }
    };

    drawShapes();
  }, [shapes, annotations, currentShape]);

  const drawShape = (ctx: CanvasRenderingContext2D, shape: Shape) => {
    ctx.beginPath();
    switch (shape.type) {
      case "line":
        ctx.moveTo(shape.startX, shape.startY);
        ctx.lineTo(shape.endX, shape.endY);
        break;
      case "rect":
        ctx.rect(
          shape.startX,
          shape.startY,
          shape.endX - shape.startX,
          shape.endY - shape.startY
        );
        break;
      case "circle":
        const r = Math.sqrt(
          Math.pow(shape.endX - shape.startX, 2) +
            Math.pow(shape.endY - shape.startY, 2)
        );
        ctx.arc(shape.startX, shape.startY, r, 0, 2 * Math.PI);
        break;
    }
    ctx.stroke();

    if (annotations) {
      ctx.font = "12px sans-serif";
      ctx.fillText(getAnnotation(shape), shape.startX + 5, shape.startY - 5);
    }
  };

  const getAnnotation = (shape: Shape): string => {
    const width = Math.abs(shape.endX - shape.startX);
    const height = Math.abs(shape.endY - shape.startY);
    if (shape.type === "line")
      return `L: ${Math.round(Math.sqrt(width * width + height * height))} px`;
    if (shape.type === "rect") return `W: ${width} H: ${height}`;
    if (shape.type === "circle")
      return `R: ${Math.round(Math.sqrt(width * width + height * height))}`;
    return "";
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setStart({ x: offsetX, y: offsetY });
    setCurrentShape({
      type: tool,
      startX: offsetX,
      startY: offsetY,
      endX: offsetX,
      endY: offsetY,
    });
    setDrawing(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    setCurrentShape((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        endX: offsetX,
        endY: offsetY,
      };
    });
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    const finalShape: Shape = {
      type: tool,
      startX: start.x,
      startY: start.y,
      endX: offsetX,
      endY: offsetY,
    };
    addShape(finalShape);
    setDrawing(false);
    setCurrentShape(null);
  };

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className="border border-gray-500"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
}
