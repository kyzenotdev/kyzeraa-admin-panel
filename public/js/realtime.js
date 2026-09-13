import { supabase } from './config.js';

export function subscribeToRealtimeChanges(tableName, callback) {
  const channel = supabase
    .channel(`public:${tableName}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: tableName
      },
      (payload) => {
        callback(payload);
      }
    )
    .subscribe();

  return channel;
}

export function unsubscribeChannel(channel) {
  if (channel) {
    supabase.removeChannel(channel);
  }
}
