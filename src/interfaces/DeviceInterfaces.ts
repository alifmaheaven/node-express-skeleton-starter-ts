interface DeviceInterfaces {
  id: string;
  company_id: string;
  contract_id: string;
  service_id: string;
  location_id: string;
  site_id: string;
  code: string;
  name: string;
  description: string;
  serial_number: string;
  product_number: string;
  brand: string;
  ip: string;
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

interface DeviceCreateInterfaces {
  company_id: string;
  contract_id: string;
  service_id: string;
  location_id: string;
  site_id: string;
  code: string;
  name: string;
  description: string;
  serial_number: string;
  product_number: string;
  brand: string;
  ip: string;
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

interface DeviceUpdateInterfaces {
  id: string;
  company_id?: string;
  contract_id?: string;
  service_id?: string;
  location_id?: string;
  site_id?: string;
  code?: string;
  name?: string;
  description?: string;
  serial_number?: string;
  product_number?: string;
  brand?: string;
  ip?: string;
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

interface DeviceDeleteInterfaces {
  id: string;
}

interface DeviceFilterInterfaces {
  id?: string;
  company_id?: string;
  contract_id?: string;
  service_id?: string;
  location_id?: string;
  site_id?: string;
  code?: string;
  name?: string;
  description?: string;
  serial_number?: string;
  product_number?: string;
  brand?: string;
  ip?: string;
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

interface DeviceUploadDeleteInterfaces {
  links: string[];
}

export {
  DeviceInterfaces,
  DeviceFilterInterfaces,
  DeviceUpdateInterfaces,
  DeviceCreateInterfaces,
  DeviceDeleteInterfaces,
  DeviceUploadDeleteInterfaces,
};