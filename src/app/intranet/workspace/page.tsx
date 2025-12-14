"use client";

import { useState } from "react";
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, GripVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Types
type Task = {
  id: string;
  content: string;
  assignee: string;
  tag: string;
};

type ColumnType = {
  id: string;
  title: string;
  tasks: Task[];
};

// Initial Data
const INITIAL_DATA: ColumnType[] = [
  {
    id: 'todo',
    title: '할 일 (To Do)',
    tasks: [
      { id: 't1', content: 'B2B 제안서 초안 작성', assignee: '김철수', tag: '기획' },
      { id: 't2', content: '12월 마케팅 리포트 분석', assignee: '이영희', tag: '마케팅' },
    ]
  },
  {
    id: 'inprogress',
    title: '진행중 (In Progress)',
    tasks: [
      { id: 't3', content: '홈페이지 메인 디자인 시안 검토', assignee: '박디자인', tag: '디자인' },
    ]
  },
  {
    id: 'done',
    title: '완료 (Done)',
    tasks: [
      { id: 't4', content: '사내 보안 교육 이수', assignee: '전직원', tag: '공통' },
      { id: 't5', content: '주간 회의록 공유', assignee: '김철수', tag: '행정' },
    ]
  }
];

// Sortable Item Component
function TaskItem({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div 
        ref={setNodeRef} 
        style={style} 
        {...attributes} 
        {...listeners}
        className="bg-white p-3 rounded-lg shadow-sm border mb-2 cursor-grab active:cursor-grabbing hover:border-blue-500 group"
    >
        <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-slate-500 px-2 py-0.5 bg-slate-100 rounded">{task.tag}</span>
            <GripVertical className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100" />
        </div>
        <p className="text-sm font-medium text-slate-800 mb-3">{task.content}</p>
        <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600">
                {task.assignee[0]}
            </div>
            <span className="text-xs text-slate-500">{task.assignee}</span>
        </div>
    </div>
  );
}

export default function WorkspacePage() {
  const [columns, setColumns] = useState<ColumnType[]>(INITIAL_DATA);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
        setActiveId(null);
        return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find source and destination columns
    let sourceColIndex = columns.findIndex(col => col.tasks.some(t => t.id === activeId));
    let destColIndex = columns.findIndex(col => col.tasks.some(t => t.id === overId) || col.id === overId);

    // If dropped on a column header (empty column case)
    if (destColIndex === -1 && columns.some(c => c.id === overId)) {
        destColIndex = columns.findIndex(c => c.id === overId);
    }

    if (sourceColIndex !== -1 && destColIndex !== -1) {
        const sourceCol = columns[sourceColIndex];
        const destCol = columns[destColIndex];

        // Same column reorder
        if (sourceColIndex === destColIndex) {
            const oldIndex = sourceCol.tasks.findIndex(t => t.id === activeId);
            const newIndex = sourceCol.tasks.findIndex(t => t.id === overId);
            
            if (oldIndex !== newIndex) {
                 const newTasks = arrayMove(sourceCol.tasks, oldIndex, newIndex);
                 const newColumns = [...columns];
                 newColumns[sourceColIndex] = { ...sourceCol, tasks: newTasks };
                 setColumns(newColumns);
            }
        } else {
            // Move to different column
            const task = sourceCol.tasks.find(t => t.id === activeId);
            if (task) {
                const newSourceTasks = sourceCol.tasks.filter(t => t.id !== activeId);
                const newDestTasks = [...destCol.tasks, task]; // For simplicity, append to end. Finding index is better but more complex code.

                const newColumns = [...columns];
                newColumns[sourceColIndex] = { ...sourceCol, tasks: newSourceTasks };
                newColumns[destColIndex] = { ...destCol, tasks: newDestTasks };
                setColumns(newColumns);
            }
        }
    }

    setActiveId(null);
  };

  return (
    <DndContext 
        sensors={sensors} 
        collisionDetection={closestCenter} 
        onDragStart={handleDragStart} 
        onDragEnd={handleDragEnd}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
             <div>
                <h1 className="text-2xl font-bold text-slate-900">업무 보드 (Kanban)</h1>
                <p className="text-muted-foreground">프로젝트 진행 상황을 한눈에 파악하세요.</p>
             </div>
             <Button><Plus className="w-4 h-4 mr-2" /> 새 업무 추가</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            {columns.map(col => (
                <Card key={col.id} className="bg-slate-50 border-slate-200 flex flex-col h-full">
                    <CardHeader className="py-4">
                        <div className="flex justify-between items-center">
                             <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">
                                {col.title} <Badge variant="secondary" className="ml-2">{col.tasks.length}</Badge>
                             </CardTitle>
                             <Button variant="ghost" size="icon" className="h-6 w-6"><Plus className="w-4 h-4" /></Button>
                        </div>
                    </CardHeader>
                    <SortableContext 
                        id={col.id}
                        items={col.tasks.map(t => t.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <CardContent className="flex-1 overflow-y-auto space-y-2 p-3 pt-0">
                           {col.tasks.map(task => (
                               <TaskItem key={task.id} task={task} />
                           ))}
                           {col.tasks.length === 0 && (
                               <div className="h-20 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center text-xs text-slate-400">
                                   카드를 이곳으로 드래그하세요
                               </div>
                           )}
                        </CardContent>
                    </SortableContext>
                </Card>
            ))}
        </div>
      </div>
    </DndContext>
  );
}
