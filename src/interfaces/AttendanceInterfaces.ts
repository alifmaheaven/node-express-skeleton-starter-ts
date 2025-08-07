interface AttendanceInterfaces {
  id: string;
  company_id: string;
  contract_id: string;
  user_id: string;
  site_id: string;
  evidence_group_id: string;
  code: string;
  name: string;
  description: string;
  longitude: number | null;
  latitude: number | null; // Corrected from langitude
  check_in: Date | null; // Corrected to camelCase
  check_out: Date | null; // Corrected to camelCase
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  x1?: string;
  x2?: string;
  x3?: string;
  x4?: string;
  x5?: string;
  x6?: string;
  x7?: string;
  x8?: string;
  x9?: string;
  x10?: string;
  x11?: string;
  x12?: string;
  x13?: string;
  x14?: string;
  x15?: string;
  x16?: string;
  x17?: string;
  x18?: string;
  x19?: string;
  x20?: string;
}

interface AttendanceCreateInterfaces {
  company_id: string;
  contract_id: string;
  user_id: string;
  site_id: string;
  evidence_group_id: string;
  code: string;
  name: string;
  description: string;
  longitude?: number;
  latitude?: number; // Corrected from langitude
  check_in?: Date; // Corrected to camelCase
  check_out?: Date; // Corrected to camelCase
  x1?: string;
  x2?: string;
  x3?: string;
  x4?: string;
  x5?: string;
  x6?: string;
  x7?: string;
  x8?: string;
  x9?: string;
  x10?: string;
  x11?: string;
  x12?: string;
  x13?: string;
  x14?: string;
  x15?: string;
  x16?: string;
  x17?: string;
  x18?: string;
  x19?: string;
  x20?: string;
}

interface AttendanceUpdateInterfaces {
  id: string;
  company_id?: string;
  contract_id?: string;
  user_id?: string;
  site_id?: string;
  evidence_group_id?: string;
  code?: string;
  name?: string;
  description?: string;
  longitude?: number;
  latitude?: number; // Corrected from langitude
  check_in?: Date; // Corrected to camelCase
  check_out?: Date; // Corrected to camelCase
  x1?: string;
  x2?: string;
  x3?: string;
  x4?: string;
  x5?: string;
  x6?: string;
  x7?: string;
  x8?: string;
  x9?: string;
  x10?: string;
  x11?: string;
  x12?: string;
  x13?: string;
  x14?: string;
  x15?: string;
  x16?: string;
  x17?: string;
  x18?: string;
  x19?: string;
  x20?: string;
}

interface AttendanceDeleteInterfaces {
  id: string;
}

interface AttendanceFilterInterfaces {
  id?: string;
  company_id?: string;
  contract_id?: string;
  user_id?: string;
  site_id?: string;
  evidence_group_id?: string;
  code?: string;
  name?: string;
  description?: string;
  longitude?: number;
  latitude?: number; // Corrected from langitude
  check_in?: Date; // Corrected to camelCase
  check_out?: Date; // Corrected to camelCase
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
  x1?: string;
  x2?: string;
  x3?: string;
  x4?: string;
  x5?: string;
  x6?: string;
  x7?: string;
  x8?: string;
  x9?: string;
  x10?: string;
  x11?: string;
  x12?: string;
  x13?: string;
  x14?: string;
  x15?: string;
  x16?: string;
  x17?: string;
  x18?: string;
  x19?: string;
  x20?: string;
}

interface AttendanceUploadDeleteInterfaces {
  links: string[];
}

export {
  AttendanceInterfaces,
  AttendanceUpdateInterfaces,
  AttendanceCreateInterfaces,
  AttendanceDeleteInterfaces,
  AttendanceUploadDeleteInterfaces,
  AttendanceFilterInterfaces,
};
