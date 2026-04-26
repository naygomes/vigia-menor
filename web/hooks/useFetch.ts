import {
  IFetchData,
  RequestParams,
  GetParams,
  PostParams,
  PatchParams,
} from "@/types";

interface useFetchProps {
  baseURL: string;
}

export function useFetch({ baseURL }: useFetchProps): IFetchData {
  async function request({
    url,
    method = "GET",
    data = null,
    customHeaders = {},
  }: RequestParams) {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...customHeaders,
      },
    };

    if (
      data &&
      method.toUpperCase() !== "GET" &&
      method.toUpperCase() !== "HEAD"
    ) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }

  async function get({ endpoint, params = {}, customHeaders = {} }: GetParams) {
    const validParams = Object.entries(params)
      .filter(([_, value]) => value != null)
      .map(([key, value]) => [key, String(value)]);

    const queryString = new URLSearchParams(validParams).toString();
    const url = `${baseURL}${endpoint}${queryString ? `?${queryString}` : ""}`;

    return request({ url, method: "GET", data: null, customHeaders });
  }

  async function post({ endpoint, data = {}, customHeaders = {} }: PostParams) {
    return request({
      url: `${baseURL}${endpoint}`,
      method: "POST",
      data,
      customHeaders,
    });
  }

  async function patch({
    endpoint,
    data = {},
    customHeaders = {},
  }: PatchParams) {
    return request({
      url: `${baseURL}${endpoint}`,
      method: "PATCH",
      data,
      customHeaders,
    });
  }

  return {
    request,
    get,
    post,
    patch,
  };
}
