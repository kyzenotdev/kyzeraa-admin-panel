import { supabase, TURNSTILE_SITEKEY } from './config.js';

export async function handleRegister(fullName, username, email, password, turnstileToken) {
  if (!turnstileToken) {
    throw new Error('Selesaikan verifikasi Captcha Turnstile terlebih dahulu!');
  }

  const usernameRegex = /^[a-z0-9]+$/;
  if (!usernameRegex.test(username)) {
    throw new Error('Username wajib menggunakan huruf kecil dan angka saja (tanpa spasi atau simbol).');
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        username: username,
        role: 'user'
      }
    }
  });

  if (error) throw error;
  return data;
}

export async function handleVerifyOtp(email, token) {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'signup'
  });

  if (error) throw error;
  return data;
}

export async function handleLogin(email, password, turnstileToken) {
  if (!turnstileToken) {
    throw new Error('Selesaikan verifikasi Captcha Turnstile terlebih dahulu!');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  return data;
}
