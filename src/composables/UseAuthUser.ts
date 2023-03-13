import { ref } from 'vue';
import useSupabase from 'boot/supabase';
import { Provider, User } from '@supabase/supabase-js';

const user = ref<User | null>(null);

export const useAuthUser = () => {
  const { supabase } = useSupabase();

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };
  const loginWithSocialProvider = async (provider: Provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
    });
    if (error) throw error;
    return data;
  };
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };
  const isLoggedIn = async () => {
    return !!user.value;
  };

  const register = async ({
    email,
    password,
    ...meta
  }: {
    email: string;
    password: string;
  }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: meta,
        emailRedirectTo: `${window.location.origin}/perfil?fromEmail=registrationConfirmation`,
      },
    });
    if (error) throw error;
    return data;
  };
  const update = async (userData: { email?: string; password?: string }) => {
    const { data, error } = await supabase.auth.updateUser(userData);
    if (error) throw error;
    return data;
  };
  const sendPasswordResetEmail = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/recover_password`,
    });
    if (error) throw error;
    return data;
  };

  const resetPassword = async (newPassword: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) throw error;
    return data;
  };

  return {
    user,
    login,
    loginWithSocialProvider,
    logout,
    isLoggedIn,
    register,
    update,
    sendPasswordResetEmail,
    resetPassword,
  };
};
