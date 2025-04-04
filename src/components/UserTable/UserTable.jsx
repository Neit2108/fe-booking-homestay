import { useState } from "react";

function UserTable() {
  // Sample data for the table
  const [users] = useState([
    {
      id: 1,
      name: "David Wagner",
      email: "david_wagner@example.com",
      createDate: "24 Jun, 2023",
      role: "Super Admin",
    },
    {
      id: 2,
      name: "Ina Hogan",
      email: "windler.warren@runte.net",
      createDate: "24 Aug, 2023",
      role: "Owner",
    },
    {
      id: 3,
      name: "Devin Harmon",
      email: "wintheiser_enos@yahoo.com",
      createDate: "18 Dec, 2023",
      role: "Owner",
    },
    {
      id: 4,
      name: "Lena Page",
      email: "camila_ledner@gmail.com",
      createDate: "8 Otc, 2023",
      role: "Pending",
    },
    {
      id: 5,
      name: "Eula Horton",
      email: "edula_dorton1221@gmail.com",
      createDate: "15 Jun, 2023",
      role: "Owner",
    },
    {
      id: 6,
      name: "Victoria Perez",
      email: "terrill.wiza@hotmail.com",
      createDate: "12 July, 2023",
      role: "Owner",
    },
    {
      id: 7,
      name: "Cora Medina",
      email: "hagenes.isai@hotmail.com",
      createDate: "21 July, 2023",
      role: "Pending",
    },
  ]);

  // Function to get role style based on role
  const getRoleStyle = (role) => {
    switch (role) {
      case "Super Admin":
        return "bg-blue-100 text-blue-800";
      case "Owner":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Handle edit user
  const handleEdit = (userId) => {
    console.log("Edit user with ID:", userId);
    // Implement edit functionality
  };

  // Handle delete user
  const handleDelete = (userId) => {
    console.log("Delete user with ID:", userId);
    // Implement delete functionality
  };

  return (
    <div className="p-5 mb-6 bg-white rounded-2xl border border-solid border-slate-100">
      {/* Table Header */}
      <div className="grid px-8 py-4 mb-4 rounded-lg bg-slate-100 grid-cols-[2fr_1fr_1fr_1fr] max-sm:p-4 max-sm:grid-cols-[1.5fr_1fr_1fr_0.5fr]">
        <div className="text-base font-semibold text-slate-400">Name</div>
        <div className="text-base font-semibold text-slate-400">
          Create Date
        </div>
        <div className="text-base font-semibold text-slate-400">Role</div>
        <div className="text-base font-semibold text-slate-400">Action</div>
      </div>

      {/* Table Body */}
      <div>
        {users.map((user) => (
          <div
            key={user.id}
            className="grid px-8 py-4 border-b border-solid border-b-slate-100 grid-cols-[2fr_1fr_1fr_1fr] max-sm:p-4 max-sm:grid-cols-[1.5fr_1fr_1fr_0.5fr]"
          >
            {/* Name and Email */}
            <div className="flex flex-col gap-1">
              <div className="text-sm font-semibold text-slate-800">
                {user.name}
              </div>
              <div className="text-xs text-slate-400">{user.email}</div>
            </div>

            {/* Create Date */}
            <div className="text-xs text-slate-800">{user.createDate}</div>

            {/* Role */}
            <div
              className={`px-4 py-1.5 text-sm font-semibold rounded-lg w-32 text-center ${getRoleStyle(
                user.role,
              )}`}
            >
              {user.role}
            </div>

            {/* Actions */}
            <div className="flex gap-4 text-xl text-slate-300 max-sm:justify-end">
              <button
                onClick={() => handleEdit(user.id)}
                className="text-blue-500 hover:text-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="text-red-500 hover:text-red-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserTable;
