"use client";

import { useMemo, useState } from "react";
import { clsx } from "clsx";
import styles from "./ui.module.css";

type NavKey = "search" | "planner" | "admin";

type Recipe = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  minutes: number;
};

const SAMPLE_RECIPES: Recipe[] = [
  {
    id: "r1",
    title: "Neon Noodle Bowl",
    description: "Fast, bright, and slurp-worthy. Add veggies + tofu.",
    tags: ["quick", "vegan"],
    minutes: 20
  },
  {
    id: "r2",
    title: "Arcade Chili",
    description: "Hearty chili with a smoky kick. Great for batch cooking.",
    tags: ["comfort", "high-protein"],
    minutes: 55
  },
  {
    id: "r3",
    title: "Pixel Pancakes",
    description: "Fluffy breakfast stack with maple and berries.",
    tags: ["breakfast"],
    minutes: 25
  },
  {
    id: "r4",
    title: "Cassette Caprese",
    description: "Tomato, basil, mozzarella — classic and clean.",
    tags: ["no-cook", "vegetarian"],
    minutes: 10
  },
  {
    id: "r5",
    title: "Synthwave Salmon",
    description: "Crispy skin salmon with lemon-dill and greens.",
    tags: ["dinner"],
    minutes: 30
  },
  {
    id: "r6",
    title: "CRT Caesar Wraps",
    description: "Crunchy romaine with creamy dressing in a wrap.",
    tags: ["lunch"],
    minutes: 15
  }
];

function Icon({ name }: { name: "spark" | "calendar" | "shield" | "heart" | "cart" }) {
  const common = { className: styles.icon, "aria-hidden": true as const };
  switch (name) {
    case "spark":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2l1.4 6.2L20 10l-6.6 1.8L12 18l-1.4-6.2L4 10l6.6-1.8L12 2z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none">
          <path
            d="M7 3v3M17 3v3M4 8h16M6 5h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "shield":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2l8 4v6c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V6l8-4z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "heart":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 21s-7-4.6-9.4-9C.7 8.7 2.5 5.5 5.9 5.1c1.9-.2 3.5.8 4.4 2 1-1.2 2.6-2.2 4.4-2 3.4.4 5.2 3.6 3.3 6.9C19 16.4 12 21 12 21z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "cart":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none">
          <path
            d="M6 6h15l-1.5 9h-12zM6 6l-2-3H2M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm9 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

// PUBLIC_INTERFACE
function AppShell() {
  /** Main retro-themed layout: header/nav + main content + right drawer. */
  const [nav, setNav] = useState<NavKey>("search");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SAMPLE_RECIPES;
    return SAMPLE_RECIPES.filter((r) => {
      const hay = `${r.title} ${r.description} ${r.tags.join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query]);

  return (
    <div className={styles.appRoot}>
      <header className={styles.header}>
        <div className={clsx("container", styles.headerInner)}>
          <div className={styles.brand}>
            <div className={styles.logoMark} aria-hidden>
              RP
            </div>
            <div>
              <div className={styles.brandTitle}>Recipe Planner</div>
              <div className={styles.brandSub}>retro • clean • fast</div>
            </div>
          </div>

          <nav className={styles.nav} aria-label="Primary">
            <button
              className={clsx(styles.navItem, nav === "search" && styles.navItemActive)}
              onClick={() => setNav("search")}
              type="button"
            >
              <Icon name="spark" />
              <span>Search</span>
            </button>
            <button
              className={clsx(styles.navItem, nav === "planner" && styles.navItemActive)}
              onClick={() => setNav("planner")}
              type="button"
            >
              <Icon name="calendar" />
              <span>Meal Planner</span>
            </button>
            <button
              className={clsx(styles.navItem, nav === "admin" && styles.navItemActive)}
              onClick={() => setNav("admin")}
              type="button"
            >
              <Icon name="shield" />
              <span>Admin</span>
            </button>
          </nav>

          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.drawerToggle}
              onClick={() => setDrawerOpen((v) => !v)}
              aria-expanded={drawerOpen}
              aria-controls="right-drawer"
            >
              <span className={styles.drawerToggleIcons} aria-hidden>
                <span className={styles.drawerPill}>
                  <Icon name="heart" /> 3
                </span>
                <span className={styles.drawerPill}>
                  <Icon name="cart" /> 7
                </span>
              </span>
              <span className={styles.drawerToggleText}>Lists</span>
            </button>
          </div>
        </div>
      </header>

      <div className={clsx("container", styles.mainGrid)}>
        <main className={styles.main}>
          {nav === "search" && (
            <section className={clsx("card", "pixel-border", styles.panel)}>
              <div className={styles.panelHeader}>
                <div>
                  <h1 className={styles.h1}>Find Recipes</h1>
                  <p className={styles.muted}>
                    Type to filter (mock data for now). Later this will call the backend search API.
                  </p>
                </div>
                <div className={styles.panelHint}>
                  <span className="badge">
                    Tip: press <span className="kbd">/</span> to focus search (coming soon)
                  </span>
                </div>
              </div>

              <div className={styles.searchRow}>
                <label className={styles.searchLabel}>
                  <span className={styles.searchLabelText}>Search</span>
                  <input
                    className={styles.searchInput}
                    placeholder="e.g. pasta, vegan, quick…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </label>

                <div className={styles.searchActions}>
                  <button type="button" className={styles.primaryBtn}>
                    Smart Search
                  </button>
                  <button type="button" className={styles.secondaryBtn}>
                    Filters
                  </button>
                </div>
              </div>

              <hr className="hr" />

              <div className={styles.recipesHeader}>
                <div className={styles.recipesTitle}>
                  <span className="badge">{filtered.length} recipes</span>
                </div>
                <div className={styles.viewToggles} aria-label="View options">
                  <button type="button" className={styles.ghostBtn} aria-pressed="true">
                    Grid
                  </button>
                  <button type="button" className={styles.ghostBtn} aria-pressed="false">
                    List
                  </button>
                </div>
              </div>

              <div className={styles.recipeGrid}>
                {filtered.map((r) => (
                  <article key={r.id} className={clsx("card", styles.recipeCard)}>
                    <div className={styles.recipeTop}>
                      <div className={styles.recipeMeta}>
                        <span className={styles.minutes}>{r.minutes} min</span>
                        <span className={clsx(styles.dot, styles.dotPrimary)} aria-hidden />
                        <span className={styles.tagline}>retro-ready</span>
                      </div>
                      <button className={styles.favBtn} type="button" aria-label="Add to favorites">
                        <Icon name="heart" />
                      </button>
                    </div>

                    <h2 className={styles.recipeTitle}>{r.title}</h2>
                    <p className={styles.recipeDesc}>{r.description}</p>

                    <div className={styles.recipeTags}>
                      {r.tags.map((t) => (
                        <span key={t} className={styles.tag}>
                          #{t}
                        </span>
                      ))}
                    </div>

                    <div className={styles.recipeActions}>
                      <button className={styles.primaryBtn} type="button">
                        View
                      </button>
                      <button className={styles.secondaryBtn} type="button">
                        Plan
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {nav === "planner" && (
            <section className={clsx("card", "pixel-border", styles.panel)}>
              <div className={styles.panelHeader}>
                <div>
                  <h1 className={styles.h1}>Meal Planner</h1>
                  <p className={styles.muted}>
                    Calendar UI placeholder — this area will host drag-and-drop planning later.
                  </p>
                </div>
              </div>

              <div className={styles.calendarPlaceholder} role="group" aria-label="Calendar placeholder">
                <div className={styles.calendarHeader}>
                  <span className="badge">This Week</span>
                  <div className={styles.calendarControls}>
                    <button type="button" className={styles.ghostBtn}>
                      Prev
                    </button>
                    <button type="button" className={styles.ghostBtn}>
                      Next
                    </button>
                  </div>
                </div>

                <div className={styles.calendarGrid} aria-hidden>
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                    <div key={d} className={styles.dayCol}>
                      <div className={styles.dayHead}>{d}</div>
                      <div className={styles.dayCell}>
                        <div className={styles.daySlot} />
                        <div className={styles.daySlot} />
                        <div className={styles.daySlot} />
                      </div>
                    </div>
                  ))}
                </div>

                <p className={styles.calendarFooter}>
                  Later: assign recipes to days, auto-generate a shopping list, sync in real-time.
                </p>
              </div>
            </section>
          )}

          {nav === "admin" && (
            <section className={clsx("card", "pixel-border", styles.panel)}>
              <div className={styles.panelHeader}>
                <div>
                  <h1 className={styles.h1}>Admin</h1>
                  <p className={styles.muted}>Placeholder for content/recipe management dialogs.</p>
                </div>
              </div>

              <div className={styles.adminGrid}>
                <div className={clsx("card", styles.adminCard)}>
                  <h3 className={styles.h3}>Recipes</h3>
                  <p className={styles.muted}>Create, edit, tag, and publish recipes.</p>
                  <button type="button" className={styles.primaryBtn}>
                    Open
                  </button>
                </div>
                <div className={clsx("card", styles.adminCard)}>
                  <h3 className={styles.h3}>Tags</h3>
                  <p className={styles.muted}>Maintain tag taxonomy for filtering/search.</p>
                  <button type="button" className={styles.secondaryBtn}>
                    Open
                  </button>
                </div>
                <div className={clsx("card", styles.adminCard)}>
                  <h3 className={styles.h3}>Users</h3>
                  <p className={styles.muted}>Manage user roles and access.</p>
                  <button type="button" className={styles.secondaryBtn}>
                    Open
                  </button>
                </div>
              </div>
            </section>
          )}
        </main>

        <aside
          id="right-drawer"
          className={clsx(styles.drawer, drawerOpen ? styles.drawerOpen : styles.drawerClosed)}
          aria-label="Favorites and shopping list"
        >
          <div className={clsx("card", "pixel-border", styles.drawerInner)}>
            <div className={styles.drawerHeader}>
              <div>
                <div className={styles.drawerTitle}>Favorites & Shopping</div>
                <div className={styles.drawerSub}>Your quick-access drawer</div>
              </div>
              <button className={styles.drawerClose} type="button" onClick={() => setDrawerOpen(false)}>
                Close
              </button>
            </div>

            <div className={styles.drawerSection}>
              <div className={styles.sectionHead}>
                <span className="badge">
                  <Icon name="heart" /> Favorites
                </span>
              </div>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <span>Pixel Pancakes</span>
                  <button className={styles.ghostBtn} type="button">
                    View
                  </button>
                </li>
                <li className={styles.listItem}>
                  <span>Synthwave Salmon</span>
                  <button className={styles.ghostBtn} type="button">
                    View
                  </button>
                </li>
                <li className={styles.listItem}>
                  <span>Neon Noodle Bowl</span>
                  <button className={styles.ghostBtn} type="button">
                    View
                  </button>
                </li>
              </ul>
            </div>

            <div className={styles.drawerSection}>
              <div className={styles.sectionHead}>
                <span className="badge">
                  <Icon name="cart" /> Shopping List
                </span>
              </div>
              <ul className={styles.checklist}>
                {[
                  { label: "Romaine", done: false },
                  { label: "Mozzarella", done: true },
                  { label: "Cherry tomatoes", done: false },
                  { label: "Salmon fillets", done: false },
                  { label: "Lemons", done: true }
                ].map((i) => (
                  <li key={i.label} className={styles.checkItem}>
                    <label className={styles.checkLabel}>
                      <input type="checkbox" defaultChecked={i.done} />
                      <span>{i.label}</span>
                    </label>
                  </li>
                ))}
              </ul>
              <div className={styles.drawerActions}>
                <button type="button" className={styles.primaryBtn}>
                  Export
                </button>
                <button type="button" className={styles.secondaryBtn}>
                  Clear
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <footer className={styles.footer}>
        <div className={clsx("container", styles.footerInner)}>
          <span className={styles.footerText}>
            Built for: recipes • planning • lists. UI-first pass (retro theme).
          </span>
          <span className="badge">v0.1</span>
        </div>
      </footer>
    </div>
  );
}

export default function Page() {
  return <AppShell />;
}
