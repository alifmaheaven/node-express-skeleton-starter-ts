interface RoomsInterfaces {
  uuid: string;
  name: string;
  description: string;
  media: string;
  room_code: number;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  user_id: string;
}

interface RoomsUpdateInterfaces {
  uuid: string;
  name: string;
  description: string;
  media: string;
  room_code: number;
}

interface RoomsCreateInterfaces {
  name: string;
  description: string;
  media: string;
  room_code: number;
}

interface RoomsDeleteInterfaces {
  uuid: string;
}

interface RoomsFilterInterfaces {
  /**
   * This uuid will be used to filter data exact match
   */
  uuid_exact?: string[];
  name_exact?: string[];
  description_exact?: string[];
  media_exact?: string[];
  room_code_exact?: string[];
  created_at_exact?: Date[];
  updated_at_exact?: Date[];
  is_active_exact?: boolean[];
  user_id_exact?: string[];
  uuid_except?: string[];
  name_except?: string[];
  description_except?: string[];
  media_except?: string[];
  room_code_except?: string[];
  created_at_except?: Date[];
  updated_at_except?: Date[];
  is_active_except?: boolean[];
  user_id_except?: string[];
  uuid_like?: string[];
  name_like?: string[];
  description_like?: string[];
  media_like?: string[];
  room_code_like?: string[];
  created_at_like?: Date[];
  updated_at_like?: Date[];
  is_active_like?: boolean[];
  user_id_like?: string[];
  uuid_ilike?: string[];
  name_ilike?: string[];
  description_ilike?: string[];
  media_ilike?: string[];
  room_code_ilike?: string[];
  created_at_ilike?: Date[];
  updated_at_ilike?: Date[];
  is_active_ilike?: boolean[];
  user_id_ilike?: string[];
  uuid_startswith?: string[];
  name_startswith?: string[];
  description_startswith?: string[];
  media_startswith?: string[];
  room_code_startswith?: string[];
  created_at_startswith?: Date[];
  updated_at_startswith?: Date[];
  is_active_startswith?: boolean[];
  user_id_startswith?: string[];
  uuid_istartswith?: string[];
  name_istartswith?: string[];
  description_istartswith?: string[];
  media_istartswith?: string[];
  room_code_istartswith?: string[];
  created_at_istartswith?: Date[];
  updated_at_istartswith?: Date[];
  is_active_istartswith?: boolean[];
  user_id_istartswith?: string[];
  uuid_endswith?: string[];
  name_endswith?: string[];
  description_endswith?: string[];
  media_endswith?: string[];
  room_code_endswith?: string[];
  created_at_endswith?: Date[];
  updated_at_endswith?: Date[];
  is_active_endswith?: boolean[];
  user_id_endswith?: string[];
  uuid_iendswith?: string[];
  name_iendswith?: string[];
  description_iendswith?: string[];
  media_iendswith?: string[];
  room_code_iendswith?: string[];
  created_at_iendswith?: Date[];
  updated_at_iendswith?: Date[];
  is_active_iendswith?: boolean[];
  user_id_iendswith?: string[];
  // gt
  created_at_gt?: Date[];
  updated_at_gt?: Date[];
  // gte 
  created_at_gte?: Date[];
  updated_at_gte?: Date[];
  // lt
  created_at_lt?: Date[];
  updated_at_lt?: Date[];
  // lte
  created_at_lte?: Date[];
  updated_at_lte?: Date[];
  // order_by_asc
  order_by_asc?: string[];
  // order_by_desc
  order_by_desc?: string[];
}

export { 
  RoomsInterfaces, 
  RoomsUpdateInterfaces,
  RoomsCreateInterfaces,
  RoomsDeleteInterfaces,
  RoomsFilterInterfaces 
}