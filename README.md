# Clinician dispatch

Picks the clinician with the shortest drive for a patient visit. Optional lab drop-off.

## Run

    npm install
    npm run dev

http://localhost:5173

## Distance

Random mode returns 1-100. Haversine mode uses lat/lng from `src/data/coords.ts`, falls back to random when an address isn't there.

With a lab, tries every clinician + lab combo and picks the smallest.

## Assumptions

- Patient address is free text.
- Clinician starts and ends at home.
- No fixed lab per clinician.
- Distance to 1 decimal.

## Limitations

- Distance isn't real (random or haversine).
- No availability check.
- Data is hardcoded.

## Other factors to consider

- Availability
- Specialty
- Continuity
- Patient preferences
- Urgency
- Licensing
- Cost
