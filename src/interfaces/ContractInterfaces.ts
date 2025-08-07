interface ContractInterfaces {
  id: string;
  company_id: string;
  code: string;
  number: string;
  name: string;
  description: string;
  contract_file: string;
  start_contract: Date | null;
  end_contract: Date | null;
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

interface ContractCreateInterfaces {
  company_id: string;
  code: string;
  number: string;
  name: string;
  description: string;
  contract_file: string;
  start_contract?: Date;
  end_contract?: Date;
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

interface ContractUpdateInterfaces {
  id: string;
  company_id?: string;
  code?: string;
  number?: string;
  name?: string;
  description?: string;
  contract_file?: string;
  start_contract?: Date;
  end_contract?: Date;
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

interface ContractDeleteInterfaces {
  id: string;
}

interface ContractFilterInterfaces {
  id?: string;
  company_id?: string;
  code?: string;
  number?: string;
  name?: string;
  description?: string;
  contract_file?: string;
  start_contract?: Date;
  end_contract?: Date;
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

interface ContractUploadDeleteInterfaces {
  links: string[];
}


export {
  ContractInterfaces,
  ContractUpdateInterfaces,
  ContractCreateInterfaces,
  ContractDeleteInterfaces,
  ContractUploadDeleteInterfaces,
  ContractFilterInterfaces,
};
