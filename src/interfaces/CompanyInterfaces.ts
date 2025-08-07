// contract service
interface CompanyInterfaces {
  id: string;
  code: string;
  name: string;
  description: string;
  pic: string;
  pm: string;
  logo: string;
  address: string;
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

interface CompanyCreateInterfaces {
  code: string;
  name: string;
  description: string;
  pic: string;
  pm: string;
  logo: string;
  address: string;
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

interface CompanyUpdateInterfaces {
  id: string;
  code?: string;
  name?: string;
  description?: string;
  pic?: string;
  pm?: string;
  logo?: string;
  address?: string;
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

interface CompanyDeleteInterfaces {
  id: string;
}

interface CompanyFilterInterfaces {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  pic?: string;
  pm?: string;
  logo?: string;
  address?: string;
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

interface CompanyUploadDeleteInterfaces {
  links: string[];
}

export {
  CompanyInterfaces,
  CompanyUpdateInterfaces,
  CompanyCreateInterfaces,
  CompanyDeleteInterfaces,
  CompanyUploadDeleteInterfaces,
  CompanyFilterInterfaces,
};
