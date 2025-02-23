import { useInfiniteQuery } from '@tanstack/react-query';
import supabase from '../../lib/supabase';

const fetchDrugs = async ({ pageParam = 0 }) => {
  const limit = 50; 
  const { data, error } = await supabase
    .from('patient_drugs')
    .select('*')
    .order('drug_name', { ascending: true })
    .range(pageParam, pageParam + limit - 1);
  if (error) {
    throw new Error(error.message);
  }

  return { data, nextOffset: data.length ? pageParam + limit : null };
};

export const usePaginatedPatient = () => {
  return useInfiniteQuery({
    queryKey: ['patient_drugs'],
    queryFn: fetchDrugs,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset, // Get next offset
  });
};
