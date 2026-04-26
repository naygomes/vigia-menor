"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useFetch } from "@/hooks";
import { IUser, ILoginResponse } from "@/types";
import { API_HOST, LOGIN_ENDPOINT } from "@/settings";

const TOKEN_COOKIE_NAME = "cria_token";
const USER_COOKIE_NAME = "cria_user";

export function useAuth() {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const { post } = useFetch({ baseURL: API_HOST });

  useEffect(() => {
    function getUserData() {
      const storedUser = Cookies.get(USER_COOKIE_NAME);
      const storedToken = Cookies.get(TOKEN_COOKIE_NAME);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      if (storedToken) {
        setToken(storedToken);
      }
    }
    getUserData();
  }, []);

  async function login(email: string, password: string) {
    try {
      const response: ILoginResponse = await post({
        endpoint: LOGIN_ENDPOINT,
        data: { email, password },
      });

      Cookies.set(TOKEN_COOKIE_NAME, response.token, { expires: 1 });
      Cookies.set(USER_COOKIE_NAME, JSON.stringify(response.user), {
        expires: 1,
      });

      setUser(response.user);
    } catch (error) {
      console.error("Erro no login:", error);
    }
  }

  function logout() {
    Cookies.remove(TOKEN_COOKIE_NAME);
    Cookies.remove(USER_COOKIE_NAME);
    setUser(null);
  }

  return { user, token, login, logout };
}
