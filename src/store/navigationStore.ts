import { create } from 'zustand';
import { MenuItem } from '../api/menu';
import { WEB_BASE_URL } from '../utils/constans';

type NavigationState = {
    currentUrl: string;
    menu: MenuItem[];
    loading: boolean;
    error: string | null;
    setCurrentUrl: (url: string) => void;
    setMenu: (menu: MenuItem[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
};

const DEFAULT_URL = `${WEB_BASE_URL}/de-de`;

export const useNavigationStore = create<NavigationState>((set) => ({
    currentUrl: DEFAULT_URL,
    menu: [],
    loading: false,
    error: null,
    setCurrentUrl: (url) => set({ currentUrl: url }),
    setMenu: (menu) => set({ menu }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
}));
