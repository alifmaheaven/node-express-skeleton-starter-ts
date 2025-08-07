interface SiteInterfaces {
  id: string;
  company_id: string;
  contract_id: string;
  location_id: string;
  code: string;
  name: string;
  description: string;
  longitude: number | null;
  latitude: number | null; // Corrected from langitude
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

interface SiteCreateInterfaces {
  company_id: string;
  contract_id: string;
  location_id: string;
  code: string;
  name: string;
  description: string;
  longitude?: number;
  latitude?: number; // Corrected from langitude
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

interface SiteUpdateInterfaces {
  id: string;
  company_id?: string;
  contract_id?: string;
  location_id?: string;
  code?: string;
  name?: string;
  description?: string;
  longitude?: number;
  latitude?: number; // Corrected from langitude
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

interface SiteDeleteInterfaces {
  id: string;
}

interface SiteFilterInterfaces {
  id?: string;
  company_id?: string;
  contract_id?: string;
  location_id?: string;
  code?: string;
  name?: string;
  description?: string;
  longitude?: number;
  latitude?: number; // Corrected from langitude
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

interface SiteUploadDeleteInterfaces {
  links: string[];
}

export {
  SiteInterfaces,
  SiteFilterInterfaces,
  SiteUpdateInterfaces,
  SiteCreateInterfaces,
  SiteDeleteInterfaces,
  SiteUploadDeleteInterfaces,
};