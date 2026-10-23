
# 💰 Kroner – Budget Tracker

A simple personal finance tracker for students, built with AI-assisted ("vibe") coding.

## Features
- Log income and expenses (amount, category, date, note)
- Balance, income and expense totals
- Monthly budget with a progress bar (warns when close to or over budget)
- Spending by category for the current month
- Data saved in the browser (localStorage)
- Light and dark mode, mobile friendly

## Run it
No install needed. Open `index.html` in a browser.

## Files
- `index.html` – page structure
- `style.css` – styling
- `script.js` – app logic

## How I used AI

**Tool:** Claude , free chat interface.

### 1. Brainstorming and planning
I gave Claude my idea choice, the personal finance tracker because
managing money as a student is an everyday problem I can relate to.

### 2. Generating the first version
Claude generated a working prototype as a single HTML file. It included:
- adding and deleting income and expense transactions
- balance, income and expense totals
- a monthly budget with a progress bar that turns orange and red
- a spending breakdown by category
- saving data in the browser with localStorage
- light/dark mode and a mobile-friendly layout

### 3. My own changes
- _i noticed some bug, calculations were wrong sometimes, so i fixed it.
- Added color to create contrast

### What I learned
- Describing the problem clearly gets better results than asking for code directly.
- AI-generated code needs testing; I checked each feature myself in the browser
  (see the Testing section).
- Splitting code into separate files makes it easier to understand and edit.

## Testing
- Tested the folliwing:
-added and deleted transactions
- budget limit
- checked empty input
- fixed bugs like numerical errors.

## Ideas for improvement
- CSV export
- Monthly chart
- Recurring transactions