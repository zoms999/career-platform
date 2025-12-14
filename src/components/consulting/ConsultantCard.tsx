"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Monitor, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface Consultant {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  image: string;
  rating: number;
  reviews: number;
  location: string; // "Online", "Offline (Seoul)", etc.
  isOnlineAvailable: boolean;
  nextAvailable: string; // e.g., "Tomorrow 10:00 AM"
  description: string;
}

interface ConsultantCardProps {
  consultant: Consultant;
  className?: string;
}

export function ConsultantCard({ consultant, className }: ConsultantCardProps) {
  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        className={cn("bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 flex flex-col", className)}
    >
      <div className="p-6 flex gap-6 items-start">
        <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 border-2 border-slate-100 dark:border-slate-700">
            <Image
                src={consultant.image}
                alt={consultant.name}
                fill
                className="object-cover"
            />
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
                <Link href={`/consulting/${consultant.id}`}>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white hover:text-primary transition-colors">
                        {consultant.name}
                    </h3>
                </Link>
                <div className="flex items-center text-amber-500 text-sm font-medium">
                    <Star className="w-4 h-4 fill-current mr-1" />
                    {consultant.rating} ({consultant.reviews})
                </div>
            </div>
            <p className="text-sm text-primary font-medium mb-2">{consultant.role}</p>
            <div className="flex flex-wrap gap-1 mb-3">
                {consultant.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        {specialty}
                    </Badge>
                ))}
            </div>
            <div className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {consultant.description}
            </div>
        </div>
      </div>

      <div className="mt-auto px-6 pb-6 pt-0">
         <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 pt-4 border-t border-slate-100 dark:border-slate-700">
             <div className="flex items-center gap-1">
                 {consultant.isOnlineAvailable ? <Monitor className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
                 {consultant.location}
             </div>
             <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium">
                 <Clock className="w-3.5 h-3.5" />
                 {consultant.nextAvailable} 가능
             </div>
         </div>
         
         <div className="grid grid-cols-2 gap-3">
             <Button variant="outline" className="w-full" asChild>
                <Link href={`/consulting/${consultant.id}`}>
                    프로필 보기
                </Link>
             </Button>
             <Button className="w-full" asChild>
                <Link href={`/consulting/${consultant.id}?book=true`}>
                    예약하기
                </Link>
             </Button>
         </div>
      </div>
    </motion.div>
  );
}
