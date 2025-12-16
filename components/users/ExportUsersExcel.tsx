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

interface Props {
  data: UsersData;
}

const ExportUsersExcel: React.FC<Props> = ({ data }) => {
  const exportToExcel = () => {
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

    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "users.xlsx");
  };

  return (
    <button
      onClick={exportToExcel}
      className="px-3 py-1.5 cursor-pointer bg-green-600 text-white rounded hover:bg-green-700"
    >
      Excelga yuklash
    </button>
  );
};

export default ExportUsersExcel;
