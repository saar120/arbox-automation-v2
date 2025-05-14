export interface ScheduleResponse {
    data: ClassSchedule[];
}

export interface ClassSchedule {
    id: number;
    time: string;
    end_time: string;
    date: string;
    second_coach_fk: number | null;
    coach_fk: number;
    box_category_fk: number;
    locations_box_fk: number;
    box_fk: number;
    max_users: number;
    series_fk: number;
    live_link: string | null;
    has_spots: number;
    availability_id: number | null;
    disable_cancellation_time: number;
    enable_late_cancellation: number;
    enable_registration_time: number;
    status: string;
    spaces_id: number | null;
    late_cancellation: number | null;
    past: number;
    user_booked: number;
    user_in_standby: number | null;
    stand_by_position: number | null;
    booked_users: ScheduleUser[];
    stand_by: number;
    free: number;
    registered: number;
    booking_option: string;
    reschedule: boolean;
    day_of_week: number;
    date_time: DateTime;
    end_date_time: DateTime;
    box: BoxSummary;
    box_categories: BoxCategory;
    locations_box: LocationBox;
    series: Series;
    disable_pages_app: DisablePagesApp[];
    spaces: unknown;
    custom_field_value: unknown[];
    schedule_user: ScheduleUser[];
    schedule_stand_by: ScheduleUser[];
    coach: Coach;
    second_coach: unknown | null;
}

export interface ScheduleUser {
    id: number;
    first_name: string;
    last_name: string;
    image: string;
    schedule_user_id: number;
    late_cancellation: number;
    spot: number | null;
    membership_user_fk: number;
    checked_in: number;
    laravel_through_key: number;
    last_name_shorten: string;
    full_name_shorten: string;
    full_name: string;
    is_user: boolean;
}

export interface DateTime {
    date: string;
    timezone: string;
}

export interface BoxSummary {
    id: number;
    name: string;
    has_regular_clients: number;
    cloudinary_image: string;
    phone: string;
}

export interface BoxCategory {
    id: number;
    name: string;
    bio: string | null;
    category_color: string;
    length: number;
    price: number | null;
    type: number;
    color_name: string;
    membership_types: unknown[];
    box_categories_groups: BoxCategoriesGroup[];
    category_type: {
        id: number;
        name: string;
        created_at: string;
        updated_at: string;
        deleted_at: string | null;
    };
}

export interface BoxCategoriesGroup {
    id: number;
    name: string;
    boxes_id: number;
    active: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    laravel_through_key: number;
}

export interface LocationBox {
    id: number;
    location: string;
    logo: string | null;
    date_format: string;
    time_format: string;
    timezone: string;
    debit_block: number;
    medical_cert: number;
    without_waiver: number;
    epidemic_statement: number;
    currency_symbol: string;
    has_shop: boolean;
}

export interface Series {
    id: number;
    series_name: string;
    box_fk: number;
    locations_box_fk: number;
    spaces_id: number | null;
    box_category_fk: number;
    start_date: string | null;
    end_date: string | null;
    price: number | null;
    start_time: string;
    end_time: string;
    status: string;
    day: string;
    max_users: number;
    min_users: number;
    has_spots: number;
    cancel_limit_min: number | null;
    coach_fk: number;
    second_coach_fk: number | null;
    live_link: string | null;
    enable_registration_time: number;
    block_registration_time: number;
    disable_cancellation_time: number;
    enable_late_cancellation: number;
    transparent: number;
    register_group_member: number;
    allow_mid_booking: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    custom_field_value: unknown[];
    membership_types: unknown[];
}

export interface DisablePagesApp {
    locations_box_id: number;
    area: string;
    section_name: string;
    laravel_through_key: number;
}

export interface Coach {
    id: number;
    bio: string | null;
    image: string;
    user_fk: number;
    first_name: string;
    last_name: string;
    box_fk: number;
    image_public_id_cloudinary: string;
    cloudinary_image: string;
    last_name_shorten: string;
    full_name_shorten: string;
    full_name: string;
    is_user: boolean;
}
