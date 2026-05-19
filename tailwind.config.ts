import type { Config } from "tailwindcss";

/**
 * Tokens live in app/globals.css as CSS variables (light + dark).
 * Tailwind names below map 1:1 to those vars so theming flips with .dark
 * on <html> with no class swapping in component code.
 *
 * Canonical names (use these in new code):
 *   bg-canvas, bg-elevated, bg-sunken
 *   text-fg, text-fg-muted, text-fg-subtle
 *   border-line, border-line-strong
 *   bg-accent, text-accent, text-accent-fg, bg-accent-soft
 *
 * Legacy aliases kept so existing components keep compiling:
 *   bg-bg, text-ink, text-muted, text-hint, border-border, border-borderSoft,
 *   bg-surface, plus the `cat.*` category palette.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Canonical
        canvas: "var(--bg)",
        elevated: "var(--bg-elevated)",
        sunken: "var(--bg-sunken)",
        fg: {
          DEFAULT: "var(--fg)",
          muted: "var(--fg-muted)",
          subtle: "var(--fg-subtle)",
        },
        line: {
          DEFAULT: "var(--border)",
          strong: "var(--border-strong)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          soft: "var(--accent-soft)",
          fg: "var(--accent-fg)",
        },
        success: {
          DEFAULT: "var(--success)",
          soft: "var(--success-soft)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          soft: "var(--warning-soft)",
        },
        danger: {
          DEFAULT: "var(--danger)",
          soft: "var(--danger-soft)",
        },

        // Legacy aliases — same vars, old names
        bg: "var(--bg)",
        ink: "var(--fg)",
        muted: "var(--fg-muted)",
        hint: "var(--fg-subtle)",
        border: "var(--border)",
        borderSoft: "var(--border)",
        surface: "var(--bg-elevated)",

        // Category palette (unchanged — used by ToolCard/CategoryCard)
        cat: {
          image: "#fef3c7",
          imageInk: "#d97706",
          pdf: "#fee2e2",
          pdfInk: "#dc2626",
          text: "#dbeafe",
          textInk: "#2563eb",
          util: "#d1fae5",
          utilInk: "#059669",
          design: "#ede9fe",
          designInk: "#7c3aed",
          calc: "#cffafe",
          calcInk: "#0891b2",
        },
      },

      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-instrument-serif)", "Iowan Old Style", "Georgia", "serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-instrument-serif)", "Iowan Old Style", "Georgia", "serif"],
      },

      // Spacing rhythm: 4 8 12 16 24 32 48 64 96 128.
      // Tailwind defaults already cover these (1=4, 2=8, 3=12, 4=16,
      // 6=24, 8=32, 12=48, 16=64, 24=96, 32=128) — kept default.

      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "20px",
        // pill stays as Tailwind's `rounded-full`
      },

      borderWidth: {
        DEFAULT: "1px",
      },

      boxShadow: {
        // Shadows are rare — only for floating UI
        pop: "0 8px 24px -12px rgba(10, 10, 10, 0.18)",
        card: "0 1px 0 rgba(10, 10, 10, 0.02)", // legacy alias, near-flat
      },

      ringColor: {
        DEFAULT: "var(--ring)",
      },
      ringOffsetColor: {
        DEFAULT: "var(--ring-offset)",
      },

      transitionTimingFunction: {
        out: "cubic-bezier(0.2, 0, 0, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        slow: "250ms",
      },

      maxWidth: {
        content: "760px",     // tool reading width
        shell: "1280px",      // outer shell
        prose: "68ch",
      },

      backgroundImage: {
        // Subtle grain — full bg-grain class lives in globals.css for opacity control
      },
    },
  },
  plugins: [],
};

export default config;
