import { cn } from "@/lib/utils";
import { User, Sparkles } from "lucide-react";

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  return (
    <div className={cn("flex w-full mt-2 space-x-3 max-w-[80%]", 
        role === 'user' ? "ml-auto justify-end" : ""
    )}>
      {role === 'assistant' && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-blue-600" />
        </div>
      )}
      <div className={cn(
        "p-3 rounded-lg text-sm shadow-sm",
        role === 'user' 
          ? "bg-blue-600 text-white rounded-br-none" 
          : "bg-white border border-gray-100 text-gray-800 rounded-bl-none"
      )}>
         {content.split('\n').map((line, i) => (
             <p key={i} className="mb-1 last:mb-0">{line}</p>
         ))}
      </div>
      {role === 'user' && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
            <User className="h-4 w-4 text-slate-500" />
        </div>
      )}
    </div>
  );
}
