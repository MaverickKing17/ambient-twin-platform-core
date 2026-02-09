
export enum HealthGrade {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  F = 'F'
}

export interface DigitalTwin {
  id: string;
  client_name: string;
  address: string;
  city: string;
  system_breathing: number;
  heating_power: number;
  system_motors: 'Inducer' | 'Blower' | 'Optimal';
  live_vital_signs: string;
  health_score: number;
  grade: HealthGrade;
  rebate_eligible: boolean;
  rebate_amount: number;
  remote_resolution: boolean;
  alert_type?: 'Tripped Breaker' | 'Dirty Filter' | 'None';
}

export interface BrandConfig {
  companyName: string;
  primaryColor: string;
  logoUrl: string | null;
}

export interface TriageAlert {
  id: string;
  twin_id: string;
  issue: string;
  saved_truck_roll: boolean;
  value_saved: number;
}
