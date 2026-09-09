export const API_BASE =
  process.env.REACT_APP_API_BASE || 'https://dummyjson.com';

export type ApiRequestInit = {
  method?: string;
  body?: any;
};

export type ApiResponse = {
  data: any;
  status: number;
};

export async function request(path: string, init?: ApiRequestInit): Promise<ApiResponse> {
  const res = await fetch(API_BASE + path, {
    method: init?.method || 'GET',
    headers: init?.body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
    body: init?.body !== undefined ? JSON.stringify(init.body) : undefined,
  });
  const data = await res.json();
  return { data, status: res.status };
}
