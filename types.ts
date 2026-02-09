
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
  city: string; // Mississauga, North York, Vaughan, Brampton, etc.
  system_breathing: number; // Static Pressure
  heating_power: number; // Delta-T
  system_motors: 'Inducer' | 'Blower' | 'Optimal';
  live_vital_signs: string; // Telemetry summary
  health_score: number;
  grade: HealthGrade;
  rebate_eligible: boolean;
  rebate_amount: number;
  remote_resolution: boolean;
  alert_type?: 'Tripped Breaker' | 'Dirty Filter' | 'None';
}

export interface PartnerConfig {
  id: string;
  name: string;
  accent_color: string;
  logo_text: string;
}

export interface TriageAlert {
  id: string;
  twin_id: string;
  issue: string;
  saved_truck_roll: boolean;
  value_saved: number;
}
