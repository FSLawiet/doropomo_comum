import useSupabase from 'src/boot/supabase';
import { useAuthUser } from './UseAuthUser';

export const useApi = () => {
  const { supabase } = useSupabase();
  const { user } = useAuthUser();

  const list = async (table: string) => {
    const { data, error } = await supabase.from(table).select('*');
    if (error) throw error;
    return data;
  };
  const getById = async (table: string, id: number) => {
    const { data, error } = await supabase.from(table).select('*').eq('id', id);
    if (error) throw error;
    return data[0];
  };
  const post = async (table: string, form: any) => {
    const { data, error } = await supabase
      .from(table)
      .insert([{ ...form, user: user.value?.id }]);
    if (error) throw error;
    return data;
  };
  const update = async (table: string, form: any) => {
    const { data, error } = await supabase
      .from(table)
      .update([{ ...form }])
      .match({ id: form.id });
    if (error) throw error;
    return data;
  };
  const remove = async (table: string, id: number) => {
    const { data, error } = await supabase.from(table).delete().eq('id', id);
    if (error) throw error;
    return data;
  };

  return { list, getById, post, update, remove };
};
