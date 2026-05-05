import { supabase } from "@/lib/supabase";

type ReaperLogEvent = {
  id: number;
  time: string;
  type: string;
  message: string;
  status?: string;
  teamId?: string;
  source?: string;
  [key: string]: any;
};

let logs: ReaperLogEvent[] = [];

export async function logEvent(event: Omit<ReaperLogEvent, "id" | "time">) {
  const timestamp = new Date().toISOString();
  const id = Date.now();

  const newLog: ReaperLogEvent = {
    id,
    time: timestamp,
    ...event,
  } as ReaperLogEvent;

  logs.push(newLog);
  logs = logs.slice(-100);

  // Async persistence to Supabase
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      await supabase.from('bot_runs').insert([{
        team_id: event.teamId || event.type || 'SYSTEM',
        status: event.status || 'SUCCESS',
        message: event.message,
        metadata: event,
        source: event.source || 'live'
      }]);
      
      await supabase.from('proof_events').insert([{
        type: event.type || 'BOT_RUN',
        message: event.message,
        metadata: event
      }]);
    } catch (err) {
      console.error("Supabase Log Error:", err);
    }
  }
}

export function getLogs() {
  return logs.slice().reverse();
}
