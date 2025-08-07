interface TicketInterfaces {
  id: string;
  user_id: string;
  company_id: string;
  contract_id: string;
  site_id: string;
  attendance_id: string;
  evidence_group_id: string;
  severity_id: string;
  device_id: string;
  status_id: string;
  code: string;
  name: string;
  description: string;
  start_ticket: Date | null;
  end_ticket: Date | null;
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

interface TicketCreateInterfaces {
  user_id: string;
  company_id: string;
  contract_id: string;
  site_id: string;
  attendance_id: string;
  evidence_group_id: string;
  severity_id: string;
  device_id: string;
  status_id: string;
  code: string;
  name: string;
  description: string;
  start_ticket?: Date;
  end_ticket?: Date;
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

interface TicketUpdateInterfaces {
  id: string;
  user_id?: string;
  company_id?: string;
  contract_id?: string;
  site_id?: string;
  attendance_id?: string;
  evidence_group_id?: string;
  severity_id?: string;
  device_id?: string;
  status_id?: string;
  code?: string;
  name?: string;
  description?: string;
  start_ticket?: Date;
  end_ticket?: Date;
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

interface TicketDeleteInterfaces {
  id: string;
}

interface TicketFilterInterfaces {
  id?: string;
  user_id?: string;
  company_id?: string;
  contract_id?: string;
  site_id?: string;
  attendance_id?: string;
  evidence_group_id?: string;
  severity_id?: string;
  device_id?: string;
  status_id?: string;
  code?: string;
  name?: string;
  description?: string;
  start_ticket?: Date;
  end_ticket?: Date;
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

interface TicketUploadDeleteInterfaces {
  links: string[];
}

export {
  TicketInterfaces,
  TicketUpdateInterfaces,
  TicketCreateInterfaces,
  TicketDeleteInterfaces,
  TicketUploadDeleteInterfaces,
  TicketFilterInterfaces,
};