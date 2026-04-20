"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navItems = [
  { href: "#overview", label: "Overview" },
  { href: "#research", label: "Research" },
  { href: "#framework", label: "Framework" },
  { href: "#mode1-designs", label: "Mode Designs" },
  { href: "#information-architecture", label: "IA & System" },
  { href: "#iterations", label: "Iterations" },
  { href: "#validation", label: "Validation" },
  { href: "#monetization", label: "Monetization" },
  { href: "#constraints", label: "Constraints" },
  { href: "#reflection", label: "Reflection" },
];

const sectionIds = navItems.map((item) => item.href.replace("#", ""));

export default function Sidebar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      // Progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));

      // Active section
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 240,
        height: "100vh",
        background: "#FFFFFF",
        borderRight: "1px solid #E8E5E6",
        padding: "60px 40px",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Progress indicator — left edge */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 2,
          height: "100vh",
          background: "#E8E5E6",
        }}
      >
        <div
          style={{
            width: 2,
            background: "#000000",
            height: `${scrollProgress}%`,
            transition: "height 0.05s linear",
          }}
        />
      </div>

      {/* Logo */}
      <div style={{ marginBottom: 64 }}>
        <a href="#" style={{ textDecoration: "none" }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: "var(--color-text-primary)",
                          }}
          >
            WHERING
          </div>
          <div
            style={{
              fontSize: 11,
              color: "var(--color-text-tertiary)",
              marginTop: 4,
              letterSpacing: "0.05em",
                          }}
          >
            Case Study
          </div>
        </a>
      </div>

      {/* Navigation */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {navItems.map((item) => {
          const id = item.href.replace("#", "");
          const isActive = activeSection === id;
          return (
            <a
              key={item.href}
              href={item.href}
              className="sidebar-nav-item"
              style={{
                color: isActive ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                fontWeight: isActive ? 500 : 400,
                borderLeftColor: isActive ? "var(--color-text-primary)" : "transparent",
              }}
            >
              {item.label}
            </a>
          );
        })}
      </nav>

      {/* Configurator link */}
      <div
        style={{
          marginTop: "auto",
          paddingTop: 24,
          borderTop: "1px solid #E8E5E6",
        }}
      >
        <Link
          href="/typography"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 12,
            fontWeight: 500,
            color: "#7D767A",
            textDecoration: "none",
            letterSpacing: "0.4px",
                        transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#3D2B4C")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#7D767A")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
          TYPE CONFIGURATOR
        </Link>
      </div>
    </aside>
  );
}
