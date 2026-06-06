import React, { createContext, useContext, useEffect, useState } from "react";
import { allowedClientEmails, getClientByEmail, type ClientData } from "@/config/clients";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: ClientData | null;
  email: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string) => Promise<{ success: boolean; message: string }>;
  verifyMagicLink: (email: string, token: string) => Promise<boolean>;
  logout: () => void;
  sendMagicLink: (email: string) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simulated magic link tokens (in production, these would be server-side)
const magicLinkStore = new Map<string, { token: string; expires: number }>();

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    email: null,
  });

  useEffect(() => {
    // Check for existing session on mount
    const checkSession = () => {
      const sessionEmail = sessionStorage.getItem("portal_email");
      const sessionExpiry = sessionStorage.getItem("portal_expiry");
      
      if (sessionEmail && sessionExpiry) {
        const expiry = parseInt(sessionExpiry, 10);
        if (Date.now() < expiry) {
          const client = getClientByEmail(sessionEmail);
          if (client) {
            setState({
              isAuthenticated: true,
              isLoading: false,
              user: client,
              email: sessionEmail,
            });
            return;
          }
        }
      }
      
      // Clear invalid session
      sessionStorage.removeItem("portal_email");
      sessionStorage.removeItem("portal_expiry");
      setState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        email: null,
      });
    };

    checkSession();
  }, []);

  const sendMagicLink = async (email: string): Promise<{ success: boolean; message: string }> => {
    // Check if email is allowed
    if (!allowedClientEmails.includes(email.toLowerCase())) {
      // Don't reveal if email exists or not for security
      return {
        success: true,
        message: "If this email is registered, you'll receive a login link shortly.",
      };
    }

    // Generate a token
    const token = Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    
    // Store token with 15-minute expiry
    magicLinkStore.set(email.toLowerCase(), {
      token,
      expires: Date.now() + 15 * 60 * 1000,
    });

    // In production, this would send an actual email
    // For demo, we log the magic link to console
    const magicLink = `${window.location.origin}/portal/verify?email=${encodeURIComponent(email)}&token=${token}`;
    console.log("Magic link generated:", magicLink);

    return {
      success: true,
      message: "Check your inbox for the secure login link.",
    };
  };

  const login = async (email: string): Promise<{ success: boolean; message: string }> => {
    return sendMagicLink(email);
  };

  const verifyMagicLink = async (email: string, token: string): Promise<boolean> => {
    const stored = magicLinkStore.get(email.toLowerCase());
    
    if (!stored || stored.token !== token || Date.now() > stored.expires) {
      return false;
    }

    // Clear the used token
    magicLinkStore.delete(email.toLowerCase());

    // Get client data
    const client = getClientByEmail(email);
    if (!client) {
      return false;
    }

    // Create session (24 hours)
    const expiry = Date.now() + 24 * 60 * 60 * 1000;
    sessionStorage.setItem("portal_email", email.toLowerCase());
    sessionStorage.setItem("portal_expiry", expiry.toString());

    setState({
      isAuthenticated: true,
      isLoading: false,
      user: client,
      email: email.toLowerCase(),
    });

    return true;
  };

  const logout = () => {
    sessionStorage.removeItem("portal_email");
    sessionStorage.removeItem("portal_expiry");
    setState({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      email: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        verifyMagicLink,
        logout,
        sendMagicLink,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Protected route wrapper component
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-primary)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-accent-1)]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login
    window.location.href = "/portal/login";
    return null;
  }

  return <>{children}</>;
}
