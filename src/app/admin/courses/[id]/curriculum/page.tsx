"use client";

import { useState } from "react";
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useParams } from "next/navigation";
import { 
  GripVertical, 
  Plus, 
  Trash2, 
  Video, 
  FileText, 
  MoreVertical,
  Edit2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

// Mock Data Types
interface Lecture {
  id: string;
  title: string;
  type: "video" | "quiz" | "file";
  duration: string;
}

interface Section {
  id: string;
  title: string;
  lectures: Lecture[];
}

// Mock Initial Data
const INITIAL_CURRICULUM: Section[] = [
  {
    id: "s1",
    title: "섹션 1: 진로 상담의 기초",
    lectures: [
      { id: "l1", title: "1강. 진로 상담이란 무엇인가?", type: "video", duration: "15:00" },
      { id: "l2", title: "2강. 상담사의 윤리와 자세", type: "video", duration: "20:00" },
    ]
  },
  {
    id: "s2",
    title: "섹션 2: 진로 적성 검사 활용",
    lectures: [
      { id: "l3", title: "3강. OCTO 검사의 이해", type: "video", duration: "30:00" },
    ]
  }
];

// Sortable Section Component
function SortableSectionItem({ 
    section, 
    onDelete, 
    onAddLecture 
}: { 
    section: Section, 
    onDelete: (id: string) => void,
    onAddLecture: (sectionId: string) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <Card ref={setNodeRef} style={style} className="mb-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm relative group">
      <CardHeader className="flex flex-row items-center space-y-0 py-3 px-4 bg-slate-50 dark:bg-slate-800 rounded-t-xl border-b border-slate-100 dark:border-slate-700">
         <div {...attributes} {...listeners} className="cursor-grab hover:text-slate-900 text-slate-400 mr-2 active:cursor-grabbing">
             <GripVertical className="w-5 h-5" />
         </div>
         <div className="flex-1 font-semibold text-lg">{section.title}</div>
         <div className="flex items-center gap-2">
             <Button variant="ghost" size="sm" onClick={() => onAddLecture(section.id)}>
                 <Plus className="w-4 h-4 mr-1" /> 강의 추가
             </Button>
             <DropdownMenu>
                 <DropdownMenuTrigger asChild>
                     <Button variant="ghost" size="icon" className="h-8 w-8">
                         <MoreVertical className="w-4 h-4" />
                     </Button>
                 </DropdownMenuTrigger>
                 <DropdownMenuContent align="end">
                     <DropdownMenuItem><Edit2 className="w-4 h-4 mr-2" /> 이름 수정</DropdownMenuItem>
                     <DropdownMenuItem className="text-red-600" onClick={() => onDelete(section.id)}>
                         <Trash2 className="w-4 h-4 mr-2" /> 섹션 삭제
                     </DropdownMenuItem>
                 </DropdownMenuContent>
             </DropdownMenu>
         </div>
      </CardHeader>
      <CardContent className="p-0">
          {section.lectures.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-500 bg-slate-50/50 dark:bg-slate-900/50">
                  등록된 강의가 없습니다. 강의를 추가해주세요.
              </div>
          ) : (
             <div className="divide-y divide-slate-100 dark:divide-slate-800">
                 {section.lectures.map((lecture) => (
                     <div key={lecture.id} className="flex items-center p-3 pl-10 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                         <div className="mr-3 text-slate-400">
                             {lecture.type === "video" ? <Video className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                         </div>
                         <div className="flex-1 text-sm font-medium">{lecture.title}</div>
                         <div className="text-xs text-slate-400 font-mono mr-4">{lecture.duration}</div>
                         <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-slate-400 hover:text-red-500">
                             <Trash2 className="w-3.5 h-3.5" />
                         </Button>
                     </div>
                 ))}
             </div>
          )}
      </CardContent>
    </Card>
  );
}

export default function CurriculumEditorPage() {
  const params = useParams();
  const [sections, setSections] = useState<Section[]>(INITIAL_CURRICULUM);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addSection = () => {
      const newSection: Section = {
          id: `s${Date.now()}`,
          title: "새 섹션",
          lectures: []
      };
      setSections([...sections, newSection]);
      toast.success("새 섹션이 추가되었습니다.");
  };

  const deleteSection = (id: string) => {
      if (confirm("정말 이 섹션을 삭제하시겠습니까?")) {
          setSections(sections.filter(s => s.id !== id));
          toast.success("섹션이 삭제되었습니다.");
      }
  };

  const addLecture = (sectionId: string) => {
      setSections(sections.map(section => {
          if (section.id === sectionId) {
             const newLecture: Lecture = {
                 id: `l${Date.now()}`,
                 title: "새 강의",
                 type: "video",
                 duration: "00:00"
             };
             return { ...section, lectures: [...section.lectures, newLecture] };
          }
          return section;
      }));
      toast.success("새 강의가 추가되었습니다.");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
         <div>
             <h1 className="text-2xl font-bold mb-1">커리큘럼 관리</h1>
             <p className="text-slate-500 text-sm">섹션을 드래그하여 순서를 변경하거나 강의를 관리하세요.</p>
         </div>
         <Button onClick={addSection}>
             <Plus className="w-4 h-4 mr-2" /> 새 섹션 추가
         </Button>
      </div>

      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={sections.map(s => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {sections.map((section) => (
              <SortableSectionItem 
                key={section.id} 
                section={section} 
                onDelete={deleteSection}
                onAddLecture={addLecture}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      
      {sections.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
              <p className="text-slate-500 mb-4">등록된 커리큘럼이 없습니다.</p>
              <Button variant="outline" onClick={addSection}>첫 섹션 만들기</Button>
          </div>
      )}

      <div className="flex justify-end pt-8 border-t border-slate-100 dark:border-slate-800">
           <Button size="lg" onClick={() => toast.success("커리큘럼이 저장되었습니다.")}>
               저장하기
           </Button>
      </div>
    </div>
  );
}
