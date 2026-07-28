# Basil — manager dashboard mockup

Static reference build for the production app. No backend, no persistence, no build step.
Unzip and open `index.html`. Keep the folder intact — it loads `css/` and `js/` alongside.
Bootstrap 5.3, Bootstrap Icons and the three fonts come from CDN, so it needs an internet connection.

## Files

```
index.html            all nine screens, one shell
css/basil-theme.css   the theme layer — every page inherits from this
js/dashboard.js       navigation, menu rendering, allergen matrix, mock data
```

Conventions match the brief: Bootstrap 5, nothing inline, custom CSS and JS in separate files,
responsive side menu that becomes a drawer below 992px.

## What it is for

This is the **configuration surface**: everything a client can change about how Basil behaves in
their venue, across all four modules. It is a specification you can click, not a design to copy
pixel for pixel. Where the layout gets in the way of Laravel, change the layout.

Two toggles in the top bar:

- **Build notes** — dark panels explaining the schema implication behind a screen. Off by default.
- **Open decisions** — seven product decisions that are still open. Each is drawn in place with a
  recommendation pre-selected. They are Dan's to close; they are here so the shape of each one is
  visible rather than described.

## Screens

| Screen | What the client controls |
|---|---|
| Venue | Identity, service style, brand voice, house standards |
| Menu | Sections, dishes, prices, allergen matrix, adaptation notes, hidden-ingredient notes, specials |
| Safety & escalation | Escalation procedure, cross-contamination wording, review queue, menu confidence |
| Service authority | Offer-authority matrix, gesture cap, relay rule (Module 3) |
| Payment policy | Service charge, cover, corkage, splitting, tipping, who may change a bill (Module 4) |
| Staff | Invites, roles, per-module tier assignment, unlock rule |
| The Brief | Menu diff, notify, completion before service |
| Reports | Scores by module and staff, coaching interventions, weak points |
| Plan & users | Plan, venues under a group, permissions |

## Three things that are load-bearing

**Allergen status is a three-state enum, never a boolean.** `CONTAINS / FREE_FROM / UNVERIFIED`,
defaulting to UNVERIFIED. See `allergenMap()` in `dashboard.js` — the default is applied first and
only confirmed values override it. A boolean cannot tell "confirmed safe" apart from "nobody
checked", and the entire safety module rests on that difference.

**Everything on these screens is injected at runtime.** The guest simulator, the coach and the
scorer read the same versioned venue profile at the start of every session. None of it may be
hardcoded into a prompt. If they read different versions, the coach corrects a trainee against a
menu that no longer exists.

**Authority needs two records, not one.** A server relaying a manager-authorised comp is compliant;
a server issuing one is not. If the data model only stores "a comp was given", those two are
indistinguishable and the scorer cannot grade them differently. Record the escalation event and the
resolution event separately, with the resolution carrying an `authorised_by` reference.

## Not in this mockup

Staff-side screens, login and onboarding, the training session itself, billing flows, notification
delivery. Buttons that do nothing show a short toast saying what would happen.
