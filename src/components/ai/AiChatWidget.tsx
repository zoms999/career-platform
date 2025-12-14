"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Mic, Headphones, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useSpeech } from "./useSpeech";
import { ChatMessage } from "./ChatMessage";
import { Badge } from "@/components/ui/badge";

type Message = {
  id: number;
  role: 'user' | 'assistant';
  content: string;
};

export function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'assistant', content: "안녕하세요! 👋\n한국진로적성센터 AI 상담원입니다.\n무엇을 도와드릴까요? (검사, 가격, 교육 문의 등)" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { isListening, transcript, setTranscript, startListening, speak, isSupported } = useSpeech();

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Sync speech transcript to input
  useEffect(() => {
    if (transcript) {
        setInput(transcript);
        // Optional: Auto-send after pause? For now, let user check and send.
        setTranscript(''); // Clear transcript once moved to input
    }
  }, [transcript, setTranscript]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput("");
    
    // Add user message
    const msgId = Date.now();
    setMessages(prev => [...prev, { id: msgId, role: 'user', content: userMsg }]);
    
    setIsTyping(true);

    // Simulate AI delay
    setTimeout(() => {
        let aiResponse = "죄송합니다. 질문을 잘 이해하지 못했어요. \n'상담원 연결'이라고 입력하시면 전문가를 연결해 드릴게요.";
        
        // Mock Intent Analysis (I-03)
        if (userMsg.includes("검사") || userMsg.includes("테스트")) {
            aiResponse = "진로적성검사를 찾으시나요?\n[진로적성검사]( /test ) 페이지에서 OCTO 검사를 받아보실 수 있습니다. \n비용은 개인 기준 5만원입니다.";
        } else if (userMsg.includes("가격") || userMsg.includes("비용")) {
            aiResponse = "검사 비용은 다음과 같습니다.\n- OCTO 개인 검사: 50,000원\n- 종합 컨설팅: 150,000원부터";
        } else if (userMsg.includes("상담") || userMsg.includes("컨설팅")) {
            aiResponse = "전문가 상담을 원하시나요?\n[전문가 상담]( /consulting ) 페이지에서 원하시는 전문가를 예약하실 수 있습니다.";
        } else if (userMsg.includes("기관") || userMsg.includes("학교")) {
            aiResponse = "기관 및 단체 검사는 [기관 프로그램]( /business ) 페이지를 확인해주시거나, 상담원 연결을 통해 견적 상담이 가능합니다.";
        } else if (userMsg.includes("상담원") || userMsg.includes("사람")) {
            aiResponse = "상담 접수(티켓)가 생성되었습니다. [Ticket #2841]\n담당자가 확인 후 24시간 이내에 연락드리겠습니다.";
            // Logic for I-04 Ticket Creation (Mock)
            console.log("Creating support ticket for:", userMsg);
        }

        setIsTyping(false);
        setMessages(prev => [...prev, { id: Date.now(), role: 'assistant', content: aiResponse }]);
        
        // TTS (Rule I-02)
        speak(aiResponse);
        
    }, 1000); // 1s delay
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg transition-transform hover:scale-110">
         {!isOpen ? (
             <Button 
                onClick={() => setIsOpen(true)}
                className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-xl flex items-center justify-center p-0"
             >
                 <Headphones className="w-8 h-8 text-white" />
                 {/* Notification Badge Mock */}
                 <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                 </span>
             </Button>
         ) : (
             <Button 
                onClick={() => setIsOpen(false)}
                className="w-14 h-14 rounded-full bg-slate-500 hover:bg-slate-600 shadow-xl flex items-center justify-center p-0"
             >
                 <X className="w-8 h-8 text-white" />
             </Button>
         )}
      </div>

      {/* Chat Window */}
      {isOpen && (
         <div className="fixed bottom-24 right-6 z-50 w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl border flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
             {/* Header */}
             <div className="bg-blue-600 p-4 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                     <div className="bg-white/20 p-2 rounded-full">
                        <Headphones className="w-5 h-5 text-white" />
                     </div>
                     <div>
                         <h3 className="font-bold text-white">AI 상담원</h3>
                         <div className="flex items-center gap-1.5">
                             <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                             <span className="text-xs text-blue-100">운영중 • 보통 1초내 응답</span>
                         </div>
                     </div>
                 </div>
                 <Badge variant="secondary" className="bg-blue-500/50 text-white/90 border-0">Beta</Badge>
             </div>

             {/* Messages */}
             <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
                 {messages.map(msg => (
                     <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
                 ))}
                 {isTyping && (
                     <div className="flex w-full mt-2 space-x-3">
                         <div className="p-3 bg-white border rounded-lg shadow-sm">
                            <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
                         </div>
                     </div>
                 )}
             </div>

             {/* Input */}
             <div className="p-3 bg-white border-t">
                 <div className="flex items-center gap-2">
                     <Button 
                        variant="ghost" 
                        size="icon" 
                        className={cn("text-slate-400 hover:text-blue-500", isListening && "text-red-500 animate-pulse bg-red-50")}
                        onClick={startListening}
                        disabled={!isSupported}
                        title={isSupported ? "음성 입력" : "브라우저가 지원하지 않습니다"}
                     >
                         <Mic className="w-5 h-5" />
                     </Button>
                     <Input 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="메시지를 입력하세요..."
                        className="flex-1"
                     />
                     <Button 
                        size="icon" 
                        className="bg-blue-600 hover:bg-blue-700" 
                        onClick={handleSend}
                        disabled={!input.trim()}
                     >
                         <Send className="w-4 h-4" />
                     </Button>
                 </div>
                 <div className="text-center mt-2">
                     <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                         Powered by <span className="font-bold text-slate-500">HumanX AI</span>
                     </p>
                 </div>
             </div>
         </div>
      )}
    </>
  );
}
