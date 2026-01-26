import { apiClient } from './client';
import { WEB_BASE_URL } from '../utils/constans';

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

const getRootItems = (data: any): RawMenuItem[] => {
    if (Array.isArray(data)) {
        return data;
    }

    return (
        data?.menuItems ??
        data?.MenuItems ??
        data?.items ??
        data?.Items ??
        data?.navigation?.items ??
        data?.navigation?.Items ??
        data?.Navigation?.items ??
        data?.Navigation?.Items ??
        []
    );
};

const getChildItems = (item: RawMenuItem): RawMenuItem[] => {
    return (
        item.menuItems ??
        item.items ??
        item.children ??
        item.subItems ??
        (item as any).menuItems ??
        (item as any).MenuItems ??
        (item as any).nodes ??
        (item as any).Nodes ??
        []
    );
};

const getTitle = (item: RawMenuItem): string => {
    return item.menuLabel ?? item.title ?? item.label ?? item.name ?? 'Untitled';
};

const normalizeUrl = (url?: string): string | undefined => {
    if (!url) return undefined;
    if (url.startsWith('http')) return url;
    if (url.startsWith('/')) return `${WEB_BASE_URL}${url}`;
    return `${WEB_BASE_URL}/${url}`;
};

const normalizeItems = (
    items: RawMenuItem[],
    path: string[] = []
): MenuItem[] => {
    return items.map((item, index) => {
        const title = getTitle(item);
        const id = [...path, `${title}-${index}`].join('/');
        const url =
            item.url ??
            item.href ??
            item.link ??
            item.targetUrl ??
            item.navigationUrl ??
            item.uri;
        const children = getChildItems(item);

        return {
            id,
            title,
            url: normalizeUrl(url),
            children: normalizeItems(children, [...path, `${title}-${index}`]),
        };
    });
};

export const fetchMenuConfig = async (): Promise<MenuItem[]> => {
    const response = await apiClient.get(MENU_CONFIG_PATH);
    const rootItems = getRootItems(response.data);
    return normalizeItems(rootItems);
};
