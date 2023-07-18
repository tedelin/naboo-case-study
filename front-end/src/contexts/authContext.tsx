import { useSnackbar } from "@/hooks";
import { getUser, logout, signin, signup } from "@/services/authentication";
import { SignInInput, SignUpInput, User } from "@/utils";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  handleSignin: (input: SignInInput) => Promise<void>;
  handleSignup: (input: SignUpInput) => Promise<void>;
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
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!user && token) {
      getUser().then(setUser);
    }
  }, [user]);

  const handleSignin = async (input: SignInInput) => {
    setIsLoading(true);

    try {
      const token = await signin(input);
      localStorage.setItem("token", token);
      getUser().then(setUser);
      router.push("/profile");
    } catch (err) {
      snackbar.error(`${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (input: SignUpInput) => {
    setIsLoading(true);

    try {
      await signup(input);
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
