# DUPR Mobile UI Refresh Design

Date: 2026-06-06

## Goal

Refresh the current DUPR profile maker so it visually matches the newer mobile DUPR profile style while preserving the existing maker workflow:

- edit values locally in the browser
- upload or change the profile photo from the device
- switch between Doubles and Singles datasets
- save the rendered mobile profile as a photo

The result is a mobile-only web view that scrolls like the reference UI and captures the full profile screen, while keeping the edit and export controls outside the captured area.

## Scope

In scope:

- replace the current profile layout with the new mobile UI direction
- keep the page mobile-first and constrained to a phone-width canvas
- support separate editable datasets for `doubles` and `singles`
- keep `clubs` visible as a non-functional tab
- make only the requested values editable
- support tap-to-change profile photo from the device picker
- include the full long mobile screen in photo export

Out of scope:

- functional top-nav actions for settings, add, chat, or share
- functional bottom navigation
- functional club-specific content
- backend persistence

## Design Direction

The visual direction is a close adaptation of the provided DUPR mobile UI:

- white app surface above the hero section
- blue gradient hero for active rating
- restrained gray labels and cards
- compact mobile spacing
- iOS-style visual rhythm with simple iconography

This should read as a realistic mobile product screen, not a generic marketing page or dashboard.

## Editable Surface

### Shared editable fields

- profile photo
- player name
- location
- gender
- follower count pill value

### Tab-specific editable fields

Each of `doubles` and `singles` has its own independent editable values for:

- main rating
- reliability percent
- career high
- mixed rating
- record
- average partner
- average opponent
- average points won
- match adjustment value
- match transition start rating
- match transition end rating
- match date

### Fixed text

These remain constant:

- tab labels: `Doubles`, `Singles`, `Clubs`
- gray descriptive labels under performance values
- static card headings such as `Performance` and `Matches`
- non-data UI copy and icon buttons

## Information Architecture

The screen is split into a captured mobile surface and non-captured maker controls.

### Captured mobile surface

1. Status bar treatment and top action row
2. Profile header
   - profile photo
   - player name
   - location and gender line
   - follower count pill
3. Tab strip
   - Doubles
   - Singles
   - Clubs
4. Active tab hero
   - `MyDUPR`
   - main rating
   - career high
   - reliability ring
5. Performance section
   - card grid with fixed labels and editable values
6. Matches section
   - one featured card with editable adjustment value, rating transition, and date
7. Bottom navigation

### Non-captured controls

- edit mode toggle
- save as photo action

These remain outside the capture container so the exported image only contains the mobile profile screen.

## Interaction Model

### Edit mode

When edit mode is off:

- the screen reads like a real app view
- editable values render as plain text
- photo overlay controls are hidden

When edit mode is on:

- editable values become tappable inline fields
- the profile photo becomes tappable and opens the device file picker
- fixed labels remain unchanged and non-interactive

### Tab behavior

- `Doubles` and `Singles` switch the active dataset and all tab-specific values
- `Clubs` remains visible for fidelity but does not activate separate content
- the tab labels themselves are not editable

### Photo upload

- photo upload remains client-side
- on phone, tapping the avatar in edit mode should invoke the native image picker
- the chosen image is resized as needed and rendered immediately

### Export behavior

- export targets the full mobile screen container
- the long captured image includes the profile header, hero, performance section, matches card, and bottom nav
- edit/save controls outside the captured surface are excluded

## Proposed Component Structure

### `DuprProfileMaker`

Top-level client component responsible for:

- profile state
- active tab state
- edit mode state
- capture/export lifecycle

### `ProfileHeader`

Contains:

- avatar upload/change affordance
- name
- location and gender line
- follower count pill
- tab strip

### `RatingHero`

Contains:

- hero gradient panel
- active tab rating
- career high
- reliability ring and percent

### `PerformanceGrid`

Contains:

- performance section heading
- fixed-label cards
- active-tab value rendering and editing

### `MatchesCard`

Contains:

- static structure and copy for the card
- editable green adjustment number
- editable transition values
- editable date

### Shared primitives

- reuse `EditableField` with light extension for new formatting cases
- reuse `PhotoUploader`
- reuse `ProgressRing`

## Data Model Changes

Current state is too flat for the new screen. Replace it with a shared profile shell plus per-tab datasets.

Example shape:

```ts
type ActiveTab = "doubles" | "singles";

interface PerformanceStats {
  mixedRating: string;
  record: string;
  avgPartner: string;
  avgOpponent: string;
  avgPointsWon: string;
}

interface MatchCardData {
  adjustment: string;
  ratingStart: string;
  ratingEnd: string;
  date: string;
}

interface TabProfileData {
  rating: string;
  reliability: number;
  careerHigh: string;
  performance: PerformanceStats;
  match: MatchCardData;
}

interface ProfileData {
  name: string;
  location: string;
  gender: string;
  followers: number;
  profilePhoto: string;
  activeTab: ActiveTab;
  doubles: TabProfileData;
  singles: TabProfileData;
}
```

`clubs` should not require its own dataset because it is display-only in this version.

## Rendering and Layout

- constrain the main captured screen to a mobile width
- allow page scrolling for the full screen experience
- keep the layout visually stable in narrow viewports
- use fixed card dimensions and consistent grid behavior so editing does not shift layout
- preserve a realistic mobile hierarchy rather than collapsing everything into one panel

## Error Handling

- if image selection is cancelled, leave the current photo unchanged
- numeric fields should clamp only where the UI requires it, such as reliability percentage
- malformed numeric input should degrade to a safe display value instead of crashing the screen
- export failures should leave the page interactive and avoid locking edit mode

## Testing and Verification

Minimum verification for implementation:

- `eslint` passes
- local mobile browser check at phone width
- every requested editable value can be changed in edit mode
- fixed gray labels remain unchanged
- avatar upload/change works through the device file picker path
- switching between Doubles and Singles shows separate values
- Clubs remains visible and inert
- exported image contains the full mobile screen and excludes external controls

## Implementation Notes

- keep the implementation client-side
- prefer small focused components over expanding the existing monolithic component
- preserve the current image resize and export pipeline unless verification shows a concrete defect
- keep styling in line with the provided UI instead of inventing extra visual features
