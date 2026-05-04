"use client";
import { useState } from 'react';
import { FileText, Wrench, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';

import { updateMedia } from '@/lib/updates/updateMedia';

export default function PatchNotesBot() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const notes = updateMedia;

  return (
    <div className="bg-card border border-white/10 rounded-xl p-6 shadow-xl shadow-black/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/20 p-3 rounded-lg border border-primary/30">
          <Wrench className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-heading font-black text-2xl uppercase leading-none">Update Tracker <span className="text-primary">Bot</span></h3>
          <p className="text-white/50 text-sm font-medium">Automated changelog extraction</p>
        </div>
      </div>

      <div className="space-y-4">
        {notes.map((note, idx) => (
          <div key={note.id} className="border border-white/5 rounded-lg overflow-hidden bg-background/50 hover:border-primary/30 transition-colors">
            <button 
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="font-black text-lg text-primary">{note.category}</span>
                <span className="text-sm text-white/50">{note.date}</span>
              </div>
              {openIndex === idx ? <ChevronUp className="w-5 h-5 text-white/50" /> : <ChevronDown className="w-5 h-5 text-white/50" />}
            </button>
            <motion.div 
              initial={false}
              animate={{ height: openIndex === idx ? 'auto' : 0, opacity: openIndex === idx ? 1 : 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 space-y-4 border-t border-white/5">
                <p className="font-bold text-white uppercase tracking-wider">{note.title}</p>
                <p className="text-sm text-white/70 leading-relaxed">{note.summary}</p>
                <div className="p-3 bg-primary/5 border border-primary/20 rounded text-xs text-primary italic">
                  FortHub: {note.fortHubCommentary}
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
