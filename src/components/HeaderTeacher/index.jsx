import { useEffect, useState } from "react";
import { Typograph } from "../Typograph";
import { dataUser } from "../../api/services/auth/dataUser";

export const HeaderTeacher = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    dataUser()
      .then((response) => {
        setUser(response);
      })
      .catch(console.error);
  }, []);

  console.log(user);

  return (
    <header className="bg-white border-b border-stone-200 px-6 lg:px-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-14">
        <div className="flex items-center gap-3"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-[14px] font-medium text-stone-800">
              {user?.name}
            </div>

            <div className="text-[10px] font-medium text-stone-800">
              {user?.email}
            </div>

            <div className="text-[11px] text-teal-600">
              {user?.status == "approved" ? "Aprovado" : "Reprovado"}
            </div>
          </div>

          <div className="w-9 h-9 rounded-full bg-blue-600 text-white text-sm font-semibold flex items-center justify-center shrink-0">
            {user?.name?.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
};