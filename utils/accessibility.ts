/**
 * Accessibility utility functions for senior-friendly mobile interfaces.
 */

export function getAriaLabelForResident(name: string, age: number, room: string): string {
  return `Resident ${name}, age ${age}, residing in room ${room}.`;
}

export function getAriaLabelForMedicalRecord(date: string, description: string): string {
  return `Medical record dated ${date}: ${description}`;
}
