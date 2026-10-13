/**
 * sustainability.js
 * Illustrative sustainability metrics per department per week.
 * These are sample/estimated values for demonstration purposes only.
 * They do not represent actual environmental measurements.
 *
 * Metrics:
 *   officeEnergyKwh   – estimated office energy consumption in kWh
 *   estimatedCarbonKg – estimated CO2-equivalent emissions in kg
 *   paperUsageKg      – estimated paper usage in kg
 *   wasteRecycledKg   – estimated recycled waste in kg
 */

const departments = ['Engineering', 'Marketing', 'Sales', 'Human Resources', 'Finance', 'Operations'];

// Week starting dates
const weeks = [
  '2024-09-02',
  '2024-09-09',
  '2024-09-16',
  '2024-09-23',
  '2024-09-30',
  '2024-10-07',
];

// Base energy values per department (kWh/week, estimated)
const baseEnergy = {
  Engineering: 420,
  Marketing: 280,
  Sales: 320,
  'Human Resources': 180,
  Finance: 260,
  Operations: 510,
};

// Reduction factor: simulates gradual efficiency improvement over the 6-week period
const reductionFactors = [1.0, 0.98, 0.97, 0.95, 0.94, 0.92];

// Carbon intensity factor: 0.233 kg CO2/kWh (illustrative UK grid average)
const CARBON_INTENSITY = 0.233;

function round(val, decimals = 1) {
  return Math.round(val * 10 ** decimals) / 10 ** decimals;
}

export const sustainability = weeks.flatMap((weekStart, wi) =>
  departments.map((dept) => {
    const baseKwh = baseEnergy[dept];
    const reduction = reductionFactors[wi];
    // Add small pseudo-random variation
    const seed = dept.length * (wi + 1);
    const variation = 1 + ((seed % 7) - 3) * 0.01;
    const energy = round(baseKwh * reduction * variation);
    const carbon = round(energy * CARBON_INTENSITY);

    // Paper usage trends downward (digitization effort)
    const basePaper = { Engineering: 2.0, Marketing: 5.5, Sales: 4.0, 'Human Resources': 3.0, Finance: 6.0, Operations: 3.5 };
    const paper = round(basePaper[dept] * reduction * variation);

    // Recycling rate improves slightly over time
    const baseWaste = { Engineering: 8, Marketing: 6, Sales: 7, 'Human Resources': 4, Finance: 5, Operations: 12 };
    const recycledFraction = 0.35 + wi * 0.04; // improves from 35% to 55%
    const recycled = round(baseWaste[dept] * recycledFraction);

    return {
      weekStart,
      department: dept,
      officeEnergyKwh: energy,
      estimatedCarbonKg: carbon,
      paperUsageKg: paper,
      wasteRecycledKg: recycled,
    };
  })
);
