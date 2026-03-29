import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MenuItem {
    id: bigint;
    name: string;
    isAvailable: boolean;
    description: string;
    imageUrl: string;
    category: Category;
    price: string;
}
export interface SiteSettings {
    tagline: string;
    aboutText: string;
}
export interface UserProfile {
    name: string;
}
export enum Category {
    cakes = "cakes",
    fastFood = "fastFood",
    pastries = "pastries"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addMenuItem(menuItem: MenuItem): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteMenuItem(id: bigint): Promise<void>;
    getAllMenuItems(): Promise<Array<MenuItem>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMenuItem(id: bigint): Promise<MenuItem>;
    getMenuItemsByCategory(category: Category): Promise<Array<MenuItem>>;
    getSiteSettings(): Promise<SiteSettings>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateMenuItem(id: bigint, menuItem: MenuItem): Promise<void>;
    updateSiteSettings(settings: SiteSettings): Promise<void>;
}
