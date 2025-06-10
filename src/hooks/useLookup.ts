import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import type {UserLookupResponse} from '../models/api.model.ts';

const fetchUsers = async (searchTerm: string): Promise<UserLookupResponse> => {
    const response = await axiosInstance.get<UserLookupResponse>('/v2/lookup/advanced', {
        params: {
            username: searchTerm,
        },
    });
    return response.data;
};

export const useLookup = (searchTerm: string) =>
    useQuery<UserLookupResponse, Error>({
        queryKey: ['users', searchTerm],
        queryFn: () => fetchUsers(searchTerm),
        enabled: !!searchTerm, // prevent fetching on empty input
    });
