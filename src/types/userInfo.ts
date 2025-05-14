export interface ApiResponse {
    data: UserProfile;
}

export interface UserProfile {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    language: string;
    on_boarding: number;
    image: string;
    birthday: string;
    gender: 'male' | 'female' | string;
    phone: string;
    weight: string;
    height: string;
    country: string | null;
    city: string | null;
    address: string | null;
    bio: string | null;
    zip: string | null;
    state: string | null;
    time_format_preferred: string;
    counter_fail_login: number;
    block_until_login: string | null;
    last_login: string;
    verified: number;
    bounced: number;
    pending: unknown;
    consent_date: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    boxes: number[];
    activeBoxes: number[];
    inactiveBoxes: number[];
    allBoxes: number[];
    refreshToken: string;
    dateFormat: string;
    timeFormat: string;
    locations: number[];
    appNamesId: number;
    friend_connection: FriendConnection[];
    user_token: string;
    slug: string;
    last_name_shorten: string;
    full_name_shorten: string;
    full_name: string;
    is_user: boolean;
    users_boxes: UsersBox[];
}

export interface FriendConnection {
    id: number;
    users_id: number;
    friend_users_id: number;
    status: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    user: FriendUser;
}

export interface FriendUser {
    id: number;
    last_name: string;
    first_name: string;
    bio: string | null;
    image: string;
    last_name_shorten: string;
    full_name_shorten: string;
    full_name: string;
    is_user: boolean;
    users_boxes_active: UsersBoxActive[] | Record<string, UsersBoxActive>; // handle both array and object
}

export interface UsersBoxActive {
    id: number;
    box_fk: number;
    user_fk: number;
    full_name: string;
    total_debt: number;
    age: number | string | null;
    user_image: string;
    box: Box;
}

export interface UsersBox {
    ub_id: number;
    id: number;
    first_name: string;
    last_name: string;
    birthday: string;
    personal_id: string | null;
    gender: string;
    phone: string;
    additional_phone: string | null;
    user_fk: number;
    box_fk: number;
    locations_box_fk: number;
    medical_cert: number;
    epidemic_statement: number;
    has_waiver: number;
    country: string | null;
    zip: string | null;
    state: string | null;
    address: string | null;
    city: string | null;
    active: number;
    rolesArray: number[];
    full_name: string;
    total_debt: number;
    age: string | number;
    user_image: string;
    box: Box;
    locations_box: LocationsBox;
    schedule_favorites: ScheduleFavorite[];
    group_connection: any;
}

export interface Box {
    id: number;
    name: string;
    phone?: string;
    email?: string;
    address?: string;
    city?: string;
    country?: string;
    cloudinary_image?: string;
    bio?: string | null;
    website?: string;
    has_regular_clients?: number;
    recurring_payments_charge_day?: string | null;
    epidemic_mode?: number;
    allow_relative_payment?: number;
    box_type_fk?: number;
}

export interface LocationsBox {
    id: number;
    qr_code: number;
    logo: string | null;
    time_format: string;
    date_format: string;
    timezone: string;
    country_code: string;
    currency_symbol: string;
    has_shop: boolean;
    disable_pages_app: DisablePagesApp[];
}

export interface DisablePagesApp {
    locations_box_id: number;
    area: string;
    section_name: string;
}

export interface ScheduleFavorite {
    id: number;
    users_boxes_id: number;
    series_id: number;
}
