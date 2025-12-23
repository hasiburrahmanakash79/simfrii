export const setCookie = (name, value, options = {}) => {
  const defaultOptions = {
    path: "/",
    maxAge: 86400 * 30,
    secure: import.meta.env.VITE_NODE_ENV === "production",
    SameSite: "strict",
  };

  const cookieOptions = { ...defaultOptions, ...options };
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  for (const optionKey in cookieOptions) {
    const optionValue = cookieOptions[optionKey];
    if (optionValue === false || optionValue === undefined) continue;

    if (optionKey === "maxAge") {
      cookieString += `; max-age=${optionValue}`;
    } else if (optionKey === "expires") {
      cookieString += `; expires=${optionValue.toUTCString()}`;
    } else if (["secure", "httpOnly", "partitioned"].includes(optionKey.toLowerCase())) {
      cookieString += `; ${optionKey}`;
    } else {
      cookieString += `; ${optionKey}=${optionValue}`;
    }
  }

  document.cookie = cookieString;
};

// Get a cookie value by name

export const getCookie = (name) => {
  const nameEQ = `${encodeURIComponent(name)}=`;
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1, cookie.length);
    }

    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
    }
  }

  return null;
};

// Remove a cookie by setting its expiration in the past

export const removeCookie = (name, options = {}) => {
  setCookie(name, "", {
    ...options,
    maxAge: -1,
  });
  // console.log(`Cookie removed: ${name}`);
};

// Check if a cookie exists
export const hasCookie = (name) => {
  const value = getCookie(name);
  return value !== null && value !== "";
};

// Parse the JWT token (without validation)
// Only use this for reading claims, not for authentication purposes
export const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("JWT Parse Error:", error);
    return null;
  }
};

// Store tokens in cookies with long expiration times
export const setAuthTokens = (access_token, refresh_token) => {
  // Set access_token for 1 month (30 days)
  const accessTokenMaxAge = 30 * 24 * 60 * 60; // 30 days in seconds

  // Set refresh_token for 1 year (365 days)
  const refreshTokenMaxAge = 365 * 24 * 60 * 60; // 365 days in seconds

  // Set isAuthenticated for 1 year to match refresh_token
  const authMaxAge = 365 * 24 * 60 * 60; // 365 days in seconds

  setCookie("access_token", access_token, {
    maxAge: accessTokenMaxAge,
    secure: import.meta.env.VITE_NODE_ENV === "production",
    SameSite: "strict",
    path: "/",
  });

  setCookie("refresh_token", refresh_token, {
    maxAge: refreshTokenMaxAge,
    secure: import.meta.env.VITE_NODE_ENV === "production",
    SameSite: "strict",
    path: "/",
  });

  setCookie("isAuthenticated", "true", {
    maxAge: authMaxAge,
    secure: import.meta.env.VITE_NODE_ENV === "production",
    SameSite: "strict",
    path: "/",
  });

  console.log("Auth tokens set with expiration:");
  console.log(`- accessToken: ${accessTokenMaxAge} seconds (30 days)`);
  console.log(`- refreshToken: ${refreshTokenMaxAge} seconds (365 days)`);
  console.log(`- isAuthenticated: ${authMaxAge} seconds (365 days)`);
};

// Remove auth tokens
export const removeAuthTokens = () => {
  removeCookie("access_token", { path: "/", secure: import.meta.env.VITE_NODE_ENV === "production", SameSite: "strict" });
  removeCookie("refresh_token", { path: "/", secure: import.meta.env.VITE_NODE_ENV === "production", SameSite: "strict" });
  removeCookie("isAuthenticated", { path: "/", secure: import.meta.env.VITE_NODE_ENV === "production", SameSite: "strict" });
  console.log("All auth tokens removed");
};

// Check if token is expired
export const isTokenExpired = (token) => {
  const payload = parseJwt(token);
  if (!payload) return true;
  return payload.exp * 1000 < Date.now();
};