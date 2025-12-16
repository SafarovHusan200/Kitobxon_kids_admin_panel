"use client";

import * as XLSX from "xlsx";

interface User {
  _id: string;
  userId: string;
  username?: string;
  registered: boolean;
  age_group?: string;
  district?: string;
  full_name?: string;
  parent?: string;
  parent_phone?: string;
  phone?: string;
  region?: string;
  school?: string;
  referralCount?: number;
}

interface UsersData {
  total: number;
  users: User[];
}

export const exportUsersExcel = (data: UsersData): void => {
  const rows = data.users.map((user, index) => ({
    "№": index + 1,
    "To‘liq ismi": user.full_name ?? "",
    "Telegram ID": user.userId,
    Username: user.username ?? "",
    Telefon: user.phone ?? "",
    "Ota-ona": user.parent ?? "",
    "Ota-ona telefoni": user.parent_phone ?? "",
    Hudud: user.region ?? "",
    Tuman: user.district ?? "",
    Maktab: user.school ?? "",
    "Yosh guruhi": user.age_group ?? "",
    "Referallar soni": user.referralCount ?? 0,
    "Ro‘yxatdan o‘tgan": user.registered ? "Ha" : "Yo‘q",
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();

  const now = new Date();

  const fileName = `users_${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}_${String(
    now.getHours()
  ).padStart(2, "0")}-${String(now.getMinutes()).padStart(2, "0")}.xlsx`;

  XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
  XLSX.writeFile(workbook, fileName);
};
