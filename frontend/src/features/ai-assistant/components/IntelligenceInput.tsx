import { useState } from "react";
import { Mic, Paperclip, Send, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IntelligenceInputProps {
  onSend: (query: string) => void;
  disabled?: boolean;
}

export function IntelligenceInput({ onSend, disabled }: IntelligenceInputProps) {
  const [query, setQuery] = useState("");

  const handleSend = () => {
    if (query.trim() && !disabled) {
      onSend(query.trim());
      setQuery("");
    }
  };

  return (
    <div className="w-full bg-slate-900 border-t border-slate-800 p-4 shrink-0 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="relative flex items-center bg-slate-800 rounded-lg border border-slate-700 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
          
          <div className="flex pl-2 gap-1">
            <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-full" disabled={disabled}>
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-full" disabled={disabled}>
              <Camera className="h-5 w-5" />
            </Button>
          </div>

          <input
            type="text"
            className="flex-1 bg-transparent border-0 h-14 px-4 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-0"
            placeholder="Enter intelligence directive or case query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            disabled={disabled}
          />

          <div className="flex pr-2 gap-2 items-center">
            <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-full" disabled={disabled}>
              <Mic className="h-5 w-5" />
            </Button>
            <Button 
              size="icon" 
              className={`h-10 w-10 rounded-full ${query.trim() ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-slate-700 text-slate-500'}`}
              onClick={handleSend}
              disabled={disabled || !query.trim()}
            >
              <Send className="h-4 w-4 ml-0.5" />
            </Button>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between px-1">
          <div className="text-[10px] text-slate-500 flex gap-4">
            <span>Powered by SCRB AI</span>
            <span>Encrypted Session</span>
          </div>
          <div className="flex gap-2 text-xs">
            {["Show hotspots", "Repeat offenders", "Financial traces"].map(suggestion => (
              <button 
                key={suggestion}
                className="text-slate-400 hover:text-blue-400 transition-colors border-b border-dashed border-slate-600 hover:border-blue-400"
                onClick={() => setQuery(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
