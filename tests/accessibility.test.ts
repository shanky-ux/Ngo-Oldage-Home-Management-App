import { getAriaLabelForResident, getAriaLabelForMedicalRecord } from '../utils/accessibility';

describe('Accessibility Utilities', () => {
  it('should generate correct aria label for resident', () => {
    const label = getAriaLabelForResident('John Doe', 78, '102-B');
    expect(label).toBe('Resident John Doe, age 78, residing in room 102-B.');
  });

  it('should generate correct aria label for medical record', () => {
    const label = getAriaLabelForMedicalRecord('2026-10-26', 'Routine checkup completed');
    expect(label).toBe('Medical record dated 2026-10-26: Routine checkup completed');
  });
});
