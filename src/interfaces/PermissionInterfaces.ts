interface PermissionInterfaces {
  id: string;
  role_id: string;
  access_id: string;
  code: string;
  name: string;
  description: string;
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

interface PermissionCreateInterfaces {
  role_id: string;
  access_id: string;
  code: string;
  name: string;
  description: string;
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

interface PermissionUpdateInterfaces {
  id: string;
  role_id?: string;
  access_id?: string;
  code?: string;
  name?: string;
  description?: string;
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

interface PermissionDeleteInterfaces {
  id: string;
}

interface PermissionFilterInterfaces {
  id?: string;
  role_id?: string;
  access_id?: string;
  code?: string;
  name?: string;
  description?: string;
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

interface PermissionUploadDeleteInterfaces {
  links: string[];
}

export {
  PermissionInterfaces,
  PermissionFilterInterfaces,
  PermissionUpdateInterfaces,
  PermissionCreateInterfaces,
  PermissionDeleteInterfaces,
  PermissionUploadDeleteInterfaces,
};