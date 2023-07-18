import { useSnackbar } from "@/hooks";
import { getUser, logout, signin, signup } from "@/services/authentication";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

interface AuthContextType {
  user: {} | null;
  isLoading: boolean;
  handleSignin: (email: string, password: string) => Promise<void>;
  handleSignup: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;
  handleLogout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  handleSignin: () => Promise.resolve(),
  handleSignup: () => Promise.resolve(),
  handleLogout: () => Promise.resolve(),
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const snackbar = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<{} | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!user && token) {
      getUser().then(setUser);
    }
  }, [user]);

  const handleSignin = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const token = await signin(email, password);
      localStorage.setItem("token", token);
      getUser().then(setUser);
      router.push("/profile");
    } catch (err) {
      snackbar.error(`${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    setIsLoading(true);

    try {
      await signup(email, password, firstName, lastName);
      router.push("/signin");
    } catch (err) {
      snackbar.error(`${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      await logout();
      localStorage.removeItem("token");
      setUser(null);
      router.push("/");
    } catch (err) {
      snackbar.error(`${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, handleSignin, handleSignup, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
