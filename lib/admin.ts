export const ADMIN_PHONES = ["9876543210"];

export function isAdminPhone(phone?: string | null) {
  if (!phone) return false;
  return ADMIN_PHONES.includes(String(phone).trim());
}