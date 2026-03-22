import React, { createContext, useContext, useMemo, useState } from "react";

type AuthUser = {
  uid: string;
  mobile: string;
};

type AuthContextType = {
  user: AuthUser | null;
  loginTemp: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>({
    uid: "test_user_001",
    mobile: "9999999999",
  });

  const value = useMemo(
    () => ({
      user,
      loginTemp: () => {
        setUser({
          uid: "test_user_001",
          mobile: "9999999999",
        });
      },
      logout: () => setUser(null),
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}