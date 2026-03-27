# Design System — Henry's Learning Hub

## Product Context
- **What this is:** Personal AI tech learning journal — auto-fetches daily AI news, renders as annotated journal entries with Henry's personal commentary
- **Who it's for:** Henry Chang (primary author); secondary audience: anyone who discovers the site
- **Space/industry:** Developer personal site / learning journal / knowledge base
- **Project type:** Editorial web app — reading-optimized single-column journal with showcase section

## Aesthetic Direction
- **Direction:** Japanese Technical Editorial
- **Decoration level:** Intentional — typography carries 90% of the weight; subtle grain and dividers only where they aid reading hierarchy
- **Mood:** Like reading a thoughtful researcher's annotated notebook. Warm, intimate, and precise. Feels like a physical journal that happens to live on the web — the opposite of a cold "developer portfolio."
- **Key insight:** Every developer site uses cold white + sans-serif to signal "technical." Henry's site is a *learning journal*, not a portfolio. Journals are warm and meant for slow reading. The Noto Serif JP + warm paper direction is correct and should be leaned into, not abandoned.

## Typography

- **Display / Body:** Noto Serif JP (`'Noto Serif JP', 'Hiragino Mincho ProN', 'Yu Mincho', serif`)
  - Used for all article headings, body text, and AnnotationCard connection/adjacent text
  - Rationale: Distinctive in the dev site space; signals "thoughtful reading" vs "quick scanning"; the Japanese character support reinforces the editorial identity
  - Load: `https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500;600;700&display=swap`

- **UI Chrome:** Geist Sans (`'Geist Sans', system-ui, sans-serif`)
  - Used for: navigation links, buttons, labels, AnnotationCard headers ("Henry's Take"), tags/chips, date strings, captions
  - Rationale: Creates a deliberate serif/sans contrast — serif = "reading zone," sans = "interface zone." Makes navigation feel crisp and functional without fighting the editorial body.
  - Load: `https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.0/index.css`

- **Code / Data:** Geist Mono (`'Geist Mono', 'SF Mono', 'Fira Code', monospace`)
  - Used for: code blocks, inline code, AnnotationCard MONO labels, date metadata in sidebar
  - Rationale: Same family as Geist Sans — visual consistency in the UI chrome system. Supports `tabular-nums` for data alignment.
  - Load: `https://cdn.jsdelivr.net/npm/@fontsource/geist-mono@5.0.0/index.css`

### Type Scale

| Token    | Size   | Weight | Font      | Usage                        |
|----------|--------|--------|-----------|------------------------------|
| display  | 36px   | 600    | Noto Serif JP | Hero / page titles        |
| h1       | 24px   | 600    | Noto Serif JP | Journal entry titles       |
| h2       | 18px   | 600    | Noto Serif JP | Section headings           |
| h3       | 16px   | 500    | Noto Serif JP | Subsection headings        |
| body     | 15px   | 400    | Noto Serif JP | Article body (line-height 1.85) |
| ui       | 13px   | 400    | Geist Sans    | Nav, buttons, labels       |
| caption  | 12px   | 400    | Geist Sans    | Dates, metadata            |
| mono     | 13px   | 400    | Geist Mono    | Code, data                 |
| label    | 10-11px| 400    | Geist Mono    | AnnotationCard internal labels, section headers |

## Color

- **Approach:** Restrained + one expressive layer for annotations
- **Primary background:** `#fdfcfa` — warm parchment white (not pure white, which reads cold)
- **Background soft:** `#f8f6f3` — slightly warmer; used for code blocks, sidebar, card backgrounds
- **Background muted:** `#f0ede8` — hover states, active sidebar items
- **Text primary:** `#1a1a18` — warm near-black ink
- **Text secondary:** `#5a5856` — body text in secondary contexts
- **Text tertiary:** `#767472` — captions, metadata, labels
- **Brand:** `#3d6b5e` — muted forest green; used sparingly for brand accent, active states, blockquote borders
- **Brand soft:** `rgba(61, 107, 94, 0.08)` — background fill for brand-tinted UI elements
- **Divider:** `rgba(26, 26, 24, 0.06)` — ultra-subtle section separators
- **Border:** `rgba(26, 26, 24, 0.10)` — card and component borders
- **Border strong:** `rgba(26, 26, 24, 0.18)` — focused states, emphasized borders

### ✦ Annotation Accent (signature color — AnnotationCard only)
- **Annotation:** `#bf7a26` (light mode) / `#d4943a` (dark mode) — warm amber
- **Annotation soft:** `rgba(191, 122, 38, 0.08)` — AnnotationCard header background fill
- **Annotation border:** `rgba(191, 122, 38, 0.25)` — AnnotationCard top border accent
- **Rationale:** The amber is used *exclusively* for AnnotationCard "Henry's Take" elements. It creates a visual layer that reads like marginalia in a printed book — the author's personal commentary, visually distinct from the primary text. Do not use this color elsewhere.

### Dark Mode
- **bg:** `#161614` — warm near-black (not cold #000000; the slight yellow tone preserves the "warm ink on paper" atmosphere)
- **bg-soft:** `#1e1e1b`
- **bg-muted:** `#252520`
- **text-1:** `#e8e6e3`
- **text-2:** `#a09e9b`
- **text-3:** `#6e6c69`
- **brand:** `#5a9a8a` (slightly more saturated to compensate for dark bg)
- **annotation:** `#d4943a` (warm amber, slightly brighter for dark bg)
- **Strategy:** Reduce saturation ~10-15% on brand color. Keep annotation amber warm. Avoid cold blue-shifted grays.

### Semantic Colors
- **Success:** `#3d6b5e` (brand green)
- **Warning:** `#bf7a26` (annotation amber)
- **Error:** `hsl(0, 72%, 52%)`
- **Info:** `hsl(210, 60%, 52%)`

## Spacing

- **Base unit:** 4px
- **Density:** Comfortable (generous whitespace appropriate for a reading-first layout)

| Token | px | Usage                            |
|-------|----|----------------------------------|
| sp-1  | 4  | micro gaps, icon margins         |
| sp-2  | 8  | tight component internal padding |
| sp-3  | 12 | component padding (small)        |
| sp-4  | 16 | standard component padding       |
| sp-5  | 24 | section internal spacing         |
| sp-6  | 32 | between sections (small)         |
| sp-7  | 48 | between sections (large)         |
| sp-8  | 64 | page-level vertical rhythm       |
| sp-9  | 96 | hero/page-top breathing room     |

## Layout

- **Approach:** Grid-disciplined for structure, editorial for reading flow
- **Content max-width:** 860px (journal) / 1100px (showcase grid)
- **Columns:** single column for journal entries, 2-3 column for showcase cards
- **Sidebar:** fixed left, 220-240px, background `bg-soft`
- **Border radius scale:**
  - `r-sm`: 4px — chips, tags, small badges
  - `r-md`: 6px — cards, inputs, buttons
  - `r-lg`: 10px — panels, nav containers, large cards
  - `r-full`: 9999px — pills, avatar, circular elements

## Motion

- **Approach:** Minimal-functional — motion only when it aids comprehension
- **Easing:** enter `ease-out` / exit `ease-in` / move `ease-in-out`
- **Duration scale:**
  - micro: 50-100ms (hover color changes)
  - short: 150ms (button interactions)
  - medium: 200ms (AnnotationCard expand/collapse, theme toggle)
  - long: 300ms (page transitions, larger layout changes)
- **AnnotationCard:** `details` expand/collapse uses chevron rotation `ease-out 200ms` — keep existing implementation
- **Never use:** bounce/spring animations (doesn't match editorial tone), decorative motion, scroll-triggered animations on text

## AnnotationCard — Signature Component

The AnnotationCard is the most distinctive element of this site. Design decisions must preserve its identity:

1. **Header accent:** 2px top border in `--color-annotation` (#bf7a26), background fill `--color-annotation-soft`
2. **"Henry's Take" label:** `Geist Mono`, 11px, `--color-annotation`, letter-spacing 0.05em
3. **Relevance pips:** 8×8px squares, border-radius 2px, filled = `--color-annotation`, empty = `--color-border`
4. **Body:** 2-column grid on desktop (匹配技能 / 與你的關聯), full-width 延伸探索
5. **Internal labels:** `Geist Mono` 10px uppercase, `--color-text-3`
6. **Connection/Adjacent text:** `Noto Serif JP` 12px, `--color-text-2`, line-height 1.65
7. **Default open:** relevance ≥ 3/5

## shadcn/ui Integration

**Stack:** shadcn v2 (base-nova style) + Tailwind v4.2.2 + OKLCH color space

### How tokens work

`globals.css` is the single source of truth. All design tokens live there as CSS custom properties, mapped into shadcn's semantic slot system via `@theme inline`. This means:

- **shadcn components** (`Button`, `Sheet`, `Card`, etc.) automatically use our palette — no overrides needed
- **Custom components** (`AnnotationCard`, `prose-journal`) use the same underlying CSS vars
- **Dark mode** is activated by `.dark` class on `<html>` (shadcn standard) or `[data-theme="dark"]`

### Adding new shadcn components

```bash
pnpm dlx shadcn@latest add <component-name>
```

The component will automatically inherit our palette. No additional token wiring needed.

### Token usage rules

| Need | Use | Example |
|------|-----|---------|
| shadcn component | Tailwind utility class | `bg-background`, `text-foreground`, `bg-primary` |
| Editorial prose | `var(--background)`, `var(--foreground)`, `var(--primary)` | `.prose-journal a { color: var(--primary); }` |
| Annotation accent | `var(--annotation)` / `bg-annotation` | AnnotationCard header, pip fills |
| Never use | hardcoded hex in component code | ❌ `color: #3d6b5e` → ✅ `color: var(--primary)` |

### Adding new design tokens

Define in `globals.css` under `:root` + `.dark`, then expose to Tailwind via `@theme inline`:

```css
/* In :root */
--warning: oklch(0.84 0.16 84);

/* In .dark */
--warning: oklch(0.41 0.11 46);

/* In @theme inline */
--color-warning: var(--warning);
```

Then use as `bg-warning` in Tailwind classes.

## CSS Variable Reference (Authoritative)

> **Source:** `src/app/globals.css` — this section mirrors it for quick reference.
> If they conflict, `globals.css` wins.

### Semantic tokens (OKLCH — used by shadcn components)

| Token | Light value | Dark value | Semantic meaning |
|-------|------------|------------|-----------------|
| `--background` | oklch(99.2% 0.003 75) = #fdfcfa | oklch(9.5% 0.005 75) = #161614 | Page background |
| `--foreground` | oklch(12.5% 0.005 75) = #1a1a18 | oklch(91.5% 0.007 75) = #e8e6e3 | Primary text |
| `--primary` | oklch(43.8% 0.063 169) = #3d6b5e | oklch(62.5% 0.076 183) = #5a9a8a | Brand green — active states, links |
| `--muted` | oklch(97.5% 0.006 75) = #f8f6f3 | oklch(12.5% 0.007 100) = #1e1e1b | Bg-soft — code blocks, card bg |
| `--muted-foreground` | oklch(47.5% 0.007 55) = #767472 | oklch(66.5% 0.006 55) = #a09e9b | Subdued text (text-3) |
| `--secondary` | oklch(94.5% 0.009 75) = #f0ede8 | oklch(16.5% 0.007 100) = #252520 | Bg-muted — hover states |
| `--border` | oklch(12.5% 0.005 75 / 10%) | oklch(91.5% 0.007 75 / 10%) | Dividers, card borders |
| `--ring` | = `--primary` | = `--primary` | Focus rings |

### Custom extension tokens (not in shadcn's slots)

| Token | Light | Dark | Rule |
|-------|-------|------|------|
| `--annotation` | oklch(59.0% 0.129 58) = #bf7a26 | oklch(66.5% 0.133 58) = #d4943a | **AnnotationCard only** |
| `--annotation-soft` | oklch(59.0% 0.129 58 / 8%) | oklch(66.5% 0.133 58 / 12%) | AnnotationCard header bg |
| `--annotation-border` | oklch(59.0% 0.129 58 / 25%) | oklch(66.5% 0.133 58 / 30%) | AnnotationCard outer border |

### Font variables

```css
--font-serif  → var(--font-noto-serif-jp)  → Noto Serif JP   (body / headings)
--font-sans   → var(--font-geist-sans)     → Geist Sans      (nav / UI chrome)
--font-mono   → var(--font-geist-mono)     → Geist Mono      (code / data)
```

### Radius scale (derived from `--radius: 0.5rem`)

```
--radius-sm   calc(radius × 0.6) ≈ 4px   chips, tags
--radius-md   calc(radius × 0.8) ≈ 6px   cards, inputs
--radius-lg   = radius           = 8px   panels, nav containers
--radius-xl   calc(radius × 1.6) ≈ 13px  large cards
--radius-full 9999px                      pills, avatars
```

## Decisions Log

| Date       | Decision | Rationale |
|------------|----------|-----------|
| 2026-03-27 | Initial design system created | `/design-consultation` — competitive research (Brittany Chiang, Lee Robinson, Paco Coursey) + first-principles analysis |
| 2026-03-27 | Kept Noto Serif JP as primary | Distinctive in dev site space; correct for a reading-first learning journal, not a portfolio |
| 2026-03-27 | Added Geist Sans for UI chrome | Creates deliberate serif/sans contrast: serif = reading zone, sans = interface zone |
| 2026-03-27 | Added #bf7a26 annotation amber | Exclusive to AnnotationCard; signals marginalia/commentary layer, visually distinct from brand green |
| 2026-03-27 | Dark mode with warm darks (#161614) | Preserves warm paper aesthetic in dark mode; avoids cold #000 that breaks the editorial character |
| 2026-03-27 | Formalized 4px spacing scale | Existing code was using ad-hoc values; 4px base provides consistent 4/8/12/16/24/32/48/64 rhythm |
| 2026-03-27 | Upgrade to Tailwind v4 + shadcn v2 (Route C) | Resolved two-system conflict — globals.css is now single source of truth; shadcn semantic tokens mapped to our DESIGN.md palette; OKLCH for native color manipulation; pnpm as package manager |
