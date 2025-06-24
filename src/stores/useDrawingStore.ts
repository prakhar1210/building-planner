import { create } from 'zustand'

type Shape = {
  type: 'line' | 'rect' | 'circle'
  startX: number
  startY: number
  endX: number
  endY: number
}

type DrawingState = {
  tool: 'line' | 'rect' | 'circle'
  annotations: boolean
  shapes: Shape[]
  setTool: (tool: 'line' | 'rect' | 'circle') => void
  toggleAnnotations: () => void
  addShape: (shape: Shape) => void
  clearShapes: () => void
}

export const useDrawingStore = create<DrawingState>((set) => ({
  tool: 'line',
  annotations: true,
  shapes: [],
  setTool: (tool) => set({ tool }),
  toggleAnnotations: () => set((state) => ({ annotations: !state.annotations })),
  addShape: (shape) => set((state) => ({ shapes: [...state.shapes, shape] })),
  clearShapes: () => set({ shapes: [] }),
}))
