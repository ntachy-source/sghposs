import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App.tsx";
import "./index.css";
import { applyAccent, getStoredAccent } from "./lib/accent";

// Register PWA service worker for Android standalone installation & offline caching
if ("serviceWorker" in navigator) {
  registerSW({
    immediate: true,
  });
}

// Apply theme before render to avoid flash
(() => {
  try {
    const stored = localStorage.getItem("theme");
    const dark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", dark);
    applyAccent(getStoredAccent());
  } catch {}
})();

createRoot(document.getElementById("root")!).render(<App />);
