import { createContext, useState, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: string | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  const login = (email: string, password: string) => {
    if (email === 'admin@gmail.com' && password === '123456') {
      setUser(email);
      router.push('/');
      return true;
    }
    return false;
  };

  const logout = () => {
  setUser(null);
  location.reload();
  // set a small delay for routing after reload
  setTimeout(() => {
    router.push('/auth/sign-in');
  }, 2000);
};


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
