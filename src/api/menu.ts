import { apiClient } from './client';
import { API_BASE_URL } from '../utils/constans';

export type MenuItem = {
    id: string;
    title: string;
    url?: string;
    children: MenuItem[];
};

type RawMenuItem = {
    title?: string;
    label?: string;
    name?: string;
    menuLabel?: string;
    url?: string;
    href?: string;
    link?: string;
    targetUrl?: string;
    navigationUrl?: string;
    uri?: string;
    menuItems?: RawMenuItem[];
    items?: RawMenuItem[];
    children?: RawMenuItem[];
    subItems?: RawMenuItem[];
};

const MENU_CONFIG_PATH =
    '/de-de/api/bsg-feature-navigation/MenuConfiguration/GetConfiguration';

const ROOT_ITEM_PATHS = [
    ['menuItems'],
    ['MenuItems'],
    ['items'],
    ['Items'],
    ['navigation', 'items'],
    ['navigation', 'Items'],
    ['Navigation', 'items'],
    ['Navigation', 'Items'],
];

const CHILD_ITEM_KEYS = [
    'menuItems',
    'items',
    'children',
    'subItems',
    'MenuItems',
    'nodes',
    'Nodes',
];

const URL_KEYS = ['url', 'href', 'link', 'targetUrl', 'navigationUrl', 'uri'];

const getArrayByPath = (data: unknown, path: string[]): RawMenuItem[] | undefined => {
    let current: unknown = data;

    for (const key of path) {
        if (!current || typeof current !== 'object') {
            return undefined;
        }

        current = (current as Record<string, unknown>)[key];
    }

    return Array.isArray(current) ? (current as RawMenuItem[]) : undefined;
};

const getArrayByKeys = (item: RawMenuItem, keys: string[]): RawMenuItem[] => {
    for (const key of keys) {
        const value = (item as Record<string, unknown>)[key];
        if (Array.isArray(value)) {
            return value as RawMenuItem[];
        }
    }

    return [];
};

const getStringByKeys = (item: RawMenuItem, keys: string[]): string | undefined => {
    for (const key of keys) {
        const value = (item as Record<string, unknown>)[key];
        if (typeof value === 'string' && value.length > 0) {
            return value;
        }
    }

    return undefined;
};

const getRootItems = (data: unknown): RawMenuItem[] => {
    if (Array.isArray(data)) {
        return data;
    }

    for (const path of ROOT_ITEM_PATHS) {
        const items = getArrayByPath(data, path);
        if (items) {
            return items;
        }
    }

    return [];
};

const getChildItems = (item: RawMenuItem): RawMenuItem[] => {
    return getArrayByKeys(item, CHILD_ITEM_KEYS);
};

const getTitle = (item: RawMenuItem): string => {
    return item.menuLabel ?? item.title ?? item.label ?? item.name ?? 'Untitled';
};

const getUrl = (item: RawMenuItem): string | undefined => {
    return getStringByKeys(item, URL_KEYS);
};

const normalizeUrl = (url?: string): string | undefined => {
    if (!url) return undefined;
    if (url.startsWith('http')) return url;
    if (url.startsWith('/')) return `${API_BASE_URL}${url}`;
    return `${API_BASE_URL}/${url}`;
};

const normalizeItems = (
    items: RawMenuItem[],
    path: string[] = []
): MenuItem[] => {
    return items.map((item, index) => {
        const title = getTitle(item);
        const pathSegment = `${title}-${index}`;
        const nextPath = [...path, pathSegment];

        return {
            id: nextPath.join('/'),
            title,
            url: normalizeUrl(getUrl(item)),
            children: normalizeItems(getChildItems(item), nextPath),
        };
    });
};

export const fetchMenuConfig = async (): Promise<MenuItem[]> => {
    const response = await apiClient.get(MENU_CONFIG_PATH);
    const rootItems = getRootItems(response.data);
    return normalizeItems(rootItems);
};
