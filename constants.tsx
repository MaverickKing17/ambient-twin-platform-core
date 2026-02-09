
import { DigitalTwin, HealthGrade, PartnerConfig } from './types';

export const PARTNERS: Record<string, PartnerConfig> = {
  'mckinnon': {
    id: 'mckinnon',
    name: 'McKinnon Heating & Cooling',
    accent_color: '#e11d48', // McKinnon Red
    logo_text: 'McKinnon Red'
  },
  'thermex': {
    id: 'thermex',
    name: 'Thermex Home Comfort',
    accent_color: '#0ea5e9', // Thermex Blue
    logo_text: 'Thermex Blue'
  }
};

export const INITIAL_MOCK_DATA: DigitalTwin[] = [
  {
    id: 'tw-001',
    client_name: 'Sarah Johnson',
    address: '1240 Hurontario St',
    city: 'Mississauga',
    system_breathing: 0.45,
    heating_power: 42,
    system_motors: 'Optimal',
    live_vital_signs: 'Stable oscillation at 60Hz',
    health_score: 94,
    grade: HealthGrade.A,
    rebate_eligible: true,
    rebate_amount: 1500,
    remote_resolution: false
  },
  {
    id: 'tw-002',
    client_name: 'David Chen',
    address: '4500 Jane St',
    city: 'North York',
    system_breathing: 0.85,
    heating_power: 28,
    system_motors: 'Inducer',
    live_vital_signs: 'High resistance detected',
    health_score: 62,
    grade: HealthGrade.C,
    rebate_eligible: true,
    rebate_amount: 2500,
    remote_resolution: true,
    alert_type: 'Dirty Filter'
  },
  {
    id: 'tw-003',
    client_name: 'Marcello Rossi',
    address: '8888 Keele St',
    city: 'Vaughan',
    system_breathing: 0.52,
    heating_power: 38,
    system_motors: 'Optimal',
    live_vital_signs: 'Normal operating range',
    health_score: 88,
    grade: HealthGrade.B,
    rebate_eligible: false,
    rebate_amount: 0,
    remote_resolution: false
  },
  {
    id: 'tw-004',
    client_name: 'Anita Sharma',
    address: '100 Main St S',
    city: 'Brampton',
    system_breathing: 1.12,
    heating_power: 12,
    system_motors: 'Blower',
    live_vital_signs: 'Voltage drop detected',
    health_score: 41,
    grade: HealthGrade.D,
    rebate_eligible: true,
    rebate_amount: 4500,
    remote_resolution: true,
    alert_type: 'Tripped Breaker'
  },
  {
    id: 'tw-005',
    client_name: 'Robert Miller',
    address: '25 The West Mall',
    city: 'Etobicoke',
    system_breathing: 0.38,
    heating_power: 45,
    system_motors: 'Optimal',
    live_vital_signs: 'Peak efficiency',
    health_score: 98,
    grade: HealthGrade.A,
    rebate_eligible: false,
    rebate_amount: 0,
    remote_resolution: false
  },
  {
    id: 'tw-006',
    client_name: 'Elena Petrova',
    address: '3000 Bathurst St',
    city: 'North York',
    system_breathing: 0.72,
    heating_power: 31,
    system_motors: 'Blower',
    live_vital_signs: 'Ramping up lag',
    health_score: 74,
    grade: HealthGrade.B,
    rebate_eligible: true,
    rebate_amount: 1500,
    remote_resolution: false
  },
  {
    id: 'tw-007',
    client_name: 'James Wilson',
    address: '55 City Centre Dr',
    city: 'Mississauga',
    system_breathing: 0.95,
    heating_power: 24,
    system_motors: 'Inducer',
    live_vital_signs: 'Static pressure critical',
    health_score: 55,
    grade: HealthGrade.D,
    rebate_eligible: true,
    rebate_amount: 3500,
    remote_resolution: true,
    alert_type: 'Dirty Filter'
  },
  {
    id: 'tw-008',
    client_name: 'Lisa Wong',
    address: '1 Promenade Cir',
    city: 'Thornhill',
    system_breathing: 0.48,
    heating_power: 40,
    system_motors: 'Optimal',
    live_vital_signs: 'Steady state reached',
    health_score: 91,
    grade: HealthGrade.A,
    rebate_eligible: false,
    rebate_amount: 0,
    remote_resolution: false
  },
  {
    id: 'tw-009',
    client_name: 'Kevin O\'Leary',
    address: '100 King St W',
    city: 'Toronto',
    system_breathing: 0.61,
    heating_power: 36,
    system_motors: 'Optimal',
    live_vital_signs: 'System health nominal',
    health_score: 82,
    grade: HealthGrade.B,
    rebate_eligible: true,
    rebate_amount: 1500,
    remote_resolution: false
  },
  {
    id: 'tw-010',
    client_name: 'Patricia Murphy',
    address: '9500 Dufferin St',
    city: 'Vaughan',
    system_breathing: 1.05,
    heating_power: 18,
    system_motors: 'Blower',
    live_vital_signs: 'Inconsistent airflow',
    health_score: 48,
    grade: HealthGrade.F,
    rebate_eligible: true,
    rebate_amount: 5500,
    remote_resolution: false
  }
];
