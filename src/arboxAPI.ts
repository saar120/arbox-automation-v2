import {LoginResponse, LoginResponseData} from "./types/loginInfo";
import {ScheduleResponse} from "./types/scheduleInfo";
import {ApiResponse, UserProfile} from "./types/userInfo";



/**
 * Interface for schedule between dates request
 */
export interface ScheduleBetweenDatesRequest {
    from: string;
    to: string;
    locations_box_id: number;
    boxes_id: number;
}

/**
 * ArboxApi class for interacting with the Arbox API
 */
export class ArboxAPI {
    private baseUrl = 'https://apiappv2.arboxapp.com';
    private whitelabel: string;
    private email: string;
    private password: string;
    private token: string | null = null;
    private refreshToken: string | null = null;
    private userProfile: LoginResponseData | null = null;

    /**
     * Creates an instance of ArboxApi.
     * @param email - User's email address
     * @param password - User's password
     */
    constructor(email: string, password: string, whitelabel: string) {
        this.email = email;
        this.password = password;
        this.whitelabel = whitelabel;
    }

    /**
     * Logs in the user and saves the authentication token
     * @returns The user profile information
     * @throws Error if login fails
     */
    public async login(): Promise<LoginResponseData> {
        try {
            const response = await fetch(`${this.baseUrl}/api/v2/user/login`, {
                method: 'POST',
                headers: {
                    'whitelabel': this.whitelabel,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.email,
                    password: this.password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Login failed: ${errorData.message || response.statusText}`);
            }

            const data = await response.json() as LoginResponse;
            this.userProfile = data.data;
            this.token = data.data.token;
            this.refreshToken = data.data.refreshToken;

            return this.userProfile;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Authentication error: ${error.message}`);
            }
            throw new Error('Unknown authentication error occurred');
        }
    }

    /**
     * Gets the current authentication token
     * @returns The authentication token or null if not logged in
     */
    public getToken(): string | null {
        return this.token;
    }

    /**
     * Gets the current refresh token
     * @returns The refresh token or null if not logged in
     */
    public getRefreshToken(): string | null {
        return this.refreshToken;
    }

    /**
     * Gets the current user profile
     * @returns The user profile or null if not logged in
     */
    public getUserProfile(): LoginResponse['data'] | null {
        return this.userProfile;
    }

    /**
     * Checks if the user is logged in
     * @returns True if the user is logged in, false otherwise
     */
    public isLoggedIn(): boolean {
        return this.token !== null;
    }

    /**
     * Makes an authenticated request to the API
     * @param endpoint - API endpoint to call
     * @param options - Fetch options
     * @returns Response data
     * @throws Error if not logged in or request fails
     */
    public async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        if (!this.isLoggedIn()) {
            throw new Error('Not authenticated. Please login first.');
        }

        const url = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`;

        const headers: any = {
            ...options.headers,
            'Content-Type': 'application/json',
            'Host': 'apiappv2.arboxapp.com',
            'Accept': 'application/json, text/plain, */*',
            'version': '11',
            'referername': 'app',
            'Connection': 'keep-alive',
            'whitelabel': this.whitelabel,
        };

        if (this.token) {
            headers['accesstoken'] = this.token
        }

        if (this.refreshToken) {
            headers['refreshToken'] = this.refreshToken
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API request failed: ${errorData.message || response.statusText}`);
            }

            return await response.json() as T;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`API request error: ${error.message}`);
            }
            throw new Error('Unknown API request error occurred');
        }
    }

    /**
     * Gets schedule information between two dates
     * @param from - Start date in ISO format (e.g., "2025-04-29T00:00:00.000Z")
     * @param to - End date in ISO format (e.g., "2025-04-29T00:00:00.000Z")
     * @param locationsBoxId - Location box ID
     * @param boxesId - Box ID
     * @returns Schedule information for the specified date range
     * @throws Error if not logged in or request fails
     */
    public async getScheduleBetweenDates(
        from: string,
        to: string,
        locationsBoxId: number,
        boxesId: number
    ): Promise<ScheduleResponse> {
        const requestData: ScheduleBetweenDatesRequest = {
            from,
            to,
            locations_box_id: locationsBoxId,
            boxes_id: boxesId
        };

        const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify(requestData)
        };

        return this.request<ScheduleResponse>('/api/v2/schedule/betweenDates', options);
    }

    /**
     * Gets the user's complete profile information from the API
     * @returns Complete user profile information
     * @throws Error if not logged in or request fails
     */
    public async getProfile(): Promise<UserProfile> {

        const options: RequestInit = {
            method: 'GET'
        };

        const response = await this.request<ApiResponse>('/api/v2/user/profile', options);
        return response.data;


    }


    /**
     * Signs the user up for a class
     * @param scheduleId - ID of the class to sign up for
     * @param membershipId - ID of the membership to use
     * @returns Response data from the sign-up request
     */
    public async signToClass(scheduleId: number, membershipId: number): Promise<any> {
        const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify({
                schedule_id: scheduleId,
                membership_user_id: membershipId
            })
        };

        return this.request<any>('/api/v2/scheduleUser/insert', options);

    }
}
