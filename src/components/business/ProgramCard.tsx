"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, Clock, Building2, School, Landmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ProgramProps {
  id: string;
  title: string;
  target: "school" | "company" | "public" | "welfare";
  description: string;
  thumbnail: string;
  minPeople: number;
  maxPeople: number;
  duration: string;
  tags: string[];
}

const TargetIcon = ({ target }: { target: ProgramProps["target"] }) => {
  switch (target) {
    case "school": return <School className="w-4 h-4" />;
    case "company": return <Building2 className="w-4 h-4" />;
    case "public": return <Landmark className="w-4 h-4" />;
    case "welfare": return <Users className="w-4 h-4" />; // Using Users as a fallback/welfare icon
    default: return <Building2 className="w-4 h-4" />;
  }
};

const TargetLabel = {
  school: "학교 (초/중/고/대)",
  company: "기업/스타트업",
  public: "공공기관/지자체",
  welfare: "복지관/지원센터"
};

export function ProgramCard({ program }: { program: ProgramProps }) {
  return (
    <Card className="group overflow-hidden flex flex-col h-full hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-800">
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        <Image 
            src={program.thumbnail} 
            alt={program.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
             <Badge variant="secondary" className="bg-white/90 text-slate-800 backdrop-blur-sm shadow-sm gap-1.5 hover:bg-white">
                 <TargetIcon target={program.target} />
                 {TargetLabel[program.target]}
             </Badge>
        </div>
      </div>
      
      <CardHeader className="p-5 pb-2">
        <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {program.title}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2 min-h-[40px]">
            {program.description}
        </p>
      </CardHeader>
      
      <CardContent className="p-5 pt-2 flex-grow">
          <div className="flex flex-wrap gap-2 mb-4">
              {program.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-medium">
                      #{tag}
                  </span>
              ))}
          </div>
          
          <div className="flex items-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  <span>{program.minPeople}~{program.maxPeople}명 권장</span>
              </div>
              <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{program.duration}</span>
              </div>
          </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 mt-auto">
        <Button asChild className="w-full bg-slate-900 group-hover:bg-primary transition-colors">
            <Link href={`/business/${program.id}`}>
                상세보기 & 견적 요청 <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
