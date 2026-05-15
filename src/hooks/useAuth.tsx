import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "../lib/supabase";
import { User } from "@supabase/supabase-js";

export type UserRole = "estudante" | "empresa";

export interface AuthUser {
  id: string;
  nome: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check active sessions
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const u = session.user;
        setUser({
          id: u.id,
          nome: u.user_metadata.full_name || u.email?.split('@')[0] || 'Usuário',
          email: u.email || '',
          role: u.user_metadata.role || 'estudante',
          avatar: u.user_metadata.avatar_url,
        });
      }
      setIsLoading(false);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        const u = session.user;
        setUser({
          id: u.id,
          nome: u.user_metadata.full_name || u.email?.split('@')[0] || 'Usuário',
          email: u.email || '',
          role: u.user_metadata.role || 'estudante',
          avatar: u.user_metadata.avatar_url,
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading,
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

