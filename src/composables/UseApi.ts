import useSupabase from 'src/boot/supabase';
import { ref } from 'vue';
import { useAuthUser } from './UseAuthUser';
import { v4 as uuidv4 } from 'uuid';
import { useRoute } from 'vue-router';
import { useTheme } from './UseTheme';
import { Loading } from 'quasar';

const config = ref({
  primary: '',
  secondary: '',
  name: '',
  phone: '',
});

export const useApi = () => {
  const { supabase } = useSupabase();
  const { user } = useAuthUser();
  const route = useRoute();
  const { setTheme } = useTheme();

  const list = async (
    table: string,
    userId: string,
    columnFilter = '',
    filter = ''
  ) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('user_id', userId)
      .eq(columnFilter, filter);
    if (error) throw error;
    return data;
  };

  const listPublic = async (table: string) => {
    const { data, error } = await supabase.from(table).select('*');
    if (error) throw error;
    return data;
  };

  const fetchCount = async (
    table: string,
    userId: string,
    countType: 'exact' | 'planned' | 'estimated'
  ) => {
    const { count, error } = await supabase
      .from(table)
      .select('*', { head: true, count: countType })
      .eq('user_id', userId);
    if (error) throw error;
    return count;
  };

  const getById = async (table: string, id: number) => {
    const { data, error } = await supabase.from(table).select('*').eq('id', id);
    if (error) throw error;
    return data[0];
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const post = async (table: string, form: any) => {
    const { data, error } = await supabase
      .from(table)
      .insert([{ ...form, user_id: user.value?.id }]);
    if (error) throw error;
    return data;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const update = async (table: string, form: { id: any }) => {
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

  const uploadImg = async (file: string, storage: string) => {
    const fileName = uuidv4();
    const { error } = await supabase.storage
      .from(storage)
      .upload(fileName, file, { cacheControl: '3600', upsert: false });
    const publicUrl = await getUrlPublic(fileName, storage);
    if (error) throw error;
    return publicUrl;
  };

  const getUrlPublic = async (fileName: string, storage: string) => {
    const { data } = await supabase.storage
      .from(storage)
      .getPublicUrl(fileName);
    return data.publicUrl;
  };

  const getTheme = async () => {
    const id = route.params.id || user?.value?.id;
    if (id) {
      Loading.show();
      const { data, error } = await supabase
        .from('config')
        .select('*')
        .eq('user_id', id);
      if (error) throw error;
      if (data.length > 0) {
        const { primary, secondary, name, phone } = data[0];
        config.value = { primary, secondary, name, phone };
        setTheme(config.value.primary, config.value.secondary);
      }
      Loading.hide();
      return config;
    }
  };

  return {
    list,
    fetchCount,
    listPublic,
    getById,
    post,
    update,
    remove,
    uploadImg,
    getTheme,
    config,
  };
};
