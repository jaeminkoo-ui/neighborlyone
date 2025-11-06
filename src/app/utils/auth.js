/**
 * Authentication utility functions with session persistence
 */

// Session expiry: 7 days
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

// Check if session is expired
function isSessionExpired() {
  if (typeof window === "undefined") return true;
  const expiresAt = localStorage.getItem("sessionExpiresAt");
  if (!expiresAt) return true;
  return Date.now() > parseInt(expiresAt);
}

// Update session expiry (extend session)
function updateSessionExpiry() {
  if (typeof window === "undefined") return;
  const expiresAt = Date.now() + SESSION_DURATION;
  localStorage.setItem("sessionExpiresAt", expiresAt.toString());
}

// Check if user is authenticated
export function isAuthenticated() {
  if (typeof window === "undefined") return false;
  const user = localStorage.getItem("user");
  
  if (!user) return false;
  
  // Check if session expired
  if (isSessionExpired()) {
    // Auto-logout if expired
    logout();
    return false;
  }
  
  // Extend session on activity
  updateSessionExpiry();
  return true;
}

// Get current user
export function getCurrentUser() {
  if (typeof window === "undefined") return null;
  
  // Check session first
  if (isSessionExpired()) {
    logout();
    return null;
  }
  
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch (e) {
    return null;
  }
}

// Get current business
export function getCurrentBusiness() {
  if (typeof window === "undefined") return null;
  
  // Check session first
  if (isSessionExpired()) {
    logout();
    return null;
  }
  
  const businessStr = localStorage.getItem("currentBusiness");
  if (!businessStr) return null;
  try {
    return JSON.parse(businessStr);
  } catch (e) {
    return null;
  }
}

// Set user session (called after login/signup)
export function setUserSession(user, business) {
  if (typeof window === "undefined") return;
  
  // Save user data
  localStorage.setItem("user", JSON.stringify(user));
  
  // Save business data if provided
  if (business) {
    localStorage.setItem("currentBusiness", JSON.stringify(business));
  }
  
  // Set session expiry
  updateSessionExpiry();
  
  // Save login timestamp
  localStorage.setItem("lastLoginAt", new Date().toISOString());
}

// Logout user
export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("user");
  localStorage.removeItem("currentBusiness");
  localStorage.removeItem("sessionExpiresAt");
  localStorage.removeItem("lastLoginAt");
  window.location.href = "/login";
}

// Require authentication (redirect to login if not authenticated)
export function requireAuth(navigate) {
  if (!isAuthenticated()) {
    navigate("/login");
    return false;
  }
  return true;
}

// Get session info (for debugging)
export function getSessionInfo() {
  if (typeof window === "undefined") return null;
  
  const expiresAt = localStorage.getItem("sessionExpiresAt");
  const lastLoginAt = localStorage.getItem("lastLoginAt");
  
  return {
    isActive: !isSessionExpired(),
    expiresAt: expiresAt ? new Date(parseInt(expiresAt)) : null,
    lastLoginAt: lastLoginAt ? new Date(lastLoginAt) : null,
    remainingTime: expiresAt ? Math.max(0, parseInt(expiresAt) - Date.now()) : 0,
  };
}


