import { supabase } from './config.js';

export async function fetchSystemConfig() {
  const { data, error } = await supabase
    .from('system_config')
    .select('*')
    .eq('id', 1)
    .single();
  if (error) throw error;
  return data;
}

export async function updateSystemConfig(configData) {
  const { data, error } = await supabase
    .from('system_config')
    .update({ ...configData, updated_at: new Date() })
    .eq('id', 1);
  if (error) throw error;
  return data;
}

export async function fetchSetoran() {
  const { data, error } = await supabase
    .from('setoran')
    .select('*, profiles(full_name, username)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function updateSetoranStatus(id, status) {
  const { data, error } = await supabase
    .from('setoran')
    .update({ status })
    .eq('id', id);
  if (error) throw error;
  return data;
}

export async function fetchWithdrawals() {
  const { data, error } = await supabase
    .from('withdrawals')
    .select('*, profiles(full_name, username)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function updateWithdrawalStatus(id, status) {
  const { data, error } = await supabase
    .from('withdrawals')
    .update({ status })
    .eq('id', id);
  if (error) throw error;
  return data;
}

export async function fetchProfiles() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function modifyUserBalance(userId, adminId, type, amount, reason) {
  const { data: profile, error: fetchErr } = await supabase
    .from('profiles')
    .select('balance')
    .eq('id', userId)
    .single();

  if (fetchErr) throw fetchErr;

  const currentBalance = Number(profile.balance || 0);
  const numericAmount = Number(amount);
  const newBalance = type === 'add' ? currentBalance + numericAmount : currentBalance - numericAmount;

  if (newBalance < 0) {
    throw new Error('Saldo pengguna tidak mencukupi untuk dikurangi.');
  }

  const { error: updateErr } = await supabase
    .from('profiles')
    .update({ balance: newBalance })
    .eq('id', userId);

  if (updateErr) throw updateErr;

  const { error: logErr } = await supabase
    .from('balance_logs')
    .insert({
      user_id: userId,
      admin_id: adminId,
      type,
      amount: numericAmount,
      reason
    });

  if (logErr) throw logErr;
}

export async function updateUserStatus(userId, status) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ status })
    .eq('id', userId);
  if (error) throw error;
  return data;
}
