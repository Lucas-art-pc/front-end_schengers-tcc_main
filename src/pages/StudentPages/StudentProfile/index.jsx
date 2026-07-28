import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Lock,
  Save,
  Camera,
} from "lucide-react";
import {
  editPasswordUser,
  updateAvatar,
} from "../../../api/services/auth/studentAuthService";
import { Input } from "../../../components/Input";
import { dataUser } from "../../../api/services/auth/dataUser";
import { Typograph } from "../../../components/Typograph";

export const StudentProfile = () => {
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [message, setMessage] = useState("");
  const [typeMessage, setTypeMessage] = useState(true)

 useEffect(() => {
  const fetchData = async () => {
    try {
      const userData = await dataUser();
      setUser(userData);
      setAvatarUrl(
        userData.url_image_profile
          ? `http://localhost:8000/storage/${userData.url_image_profile}`
          : "http://localhost:8000/storage/avatars/foto-avatar.jpg"
      );
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await editPasswordUser(formData);
      setMessage("Senha alterada com sucesso!");
      setTypeMessage(true)
      setFormData({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
    } catch (error) {
      setTypeMessage(false)
      setMessage(error.response?.data?.message || error.message || "Erro ao atualizar avatar.");
    }

    setTimeout(() => setMessage(""), 3000);
  };

const handleAvatarChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const data = await updateAvatar(file);
    setAvatarUrl(data.avatar_url);
    setMessage("Foto atualizada com sucesso!");
    setTypeMessage(true)
  } catch (error) {
    setTypeMessage(false)
    setMessage(error.response?.data?.message || error.message || "Erro ao atualizar avatar.");
  }

  setTimeout(() => setMessage(""), 3000);
};

  if (!user) return <div className="p-10">Carregando...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-5xl space-y-6">
        {/* HEADER */}
        <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-6">
          <div className="relative">
            <img
              src={avatarUrl}
              className="w-24 h-24 rounded-full object-cover"
            />

            <input
              type="file"
              id="avatar-input"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />

            <label
              htmlFor="avatar-input"
              className="absolute bottom-0 right-0 bg-blue-primary text-white p-2 rounded-full cursor-pointer"
            >
              <Camera size={16} />
            </label>
          </div>

          <div>
            <Typograph tag="title" className="text-xl font-bold text-gray-800">{user.name}</Typograph>
            <p className="text-gray-500">Email: {user.email}</p>
            <p className="text-blue-primary">
              Data de nascimento:{" "}
              {new Date(user.date_of_birthday).toLocaleDateString("pt-BR")}
            </p>
          </div>
        </div>

        {/* GRID */}
        <div className="gap-6">
          {/* FORMULÁRIO */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Informações pessoais
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 flex gap-2 items-center">
                  <User size={16} /> Nome
                </label>
                <Input
                  type="text"
                  name="name"
                  defaultValue={user.name}
                  readOnly
                  disabled
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 flex gap-2 items-center">
                  <Mail size={16} /> Email
                </label>
                <Input
                  type="email"
                  name="email"
                  defaultValue={user.email}
                  readOnly
                  disabled
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 flex gap-2 items-center">
                  <Lock size={16} /> Senha Atual
                </label>
                <Input
                  type="password"
                  name="current_password"
                  value={formData.current_password}
                  onChange={handleChange}
                  placeholder="Digite sua senha atual"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 flex gap-2 items-center">
                  <Lock size={16} /> Nova Senha
                </label>
                <Input
                  type="password"
                  name="new_password"
                  value={formData.new_password}
                  onChange={handleChange}
                  placeholder="Digite a nova senha"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 flex gap-2 items-center">
                  <Lock size={16} /> Confirmar Nova Senha
                </label>
                <Input
                  type="password"
                  name="new_password_confirmation"
                  value={formData.new_password_confirmation}
                  onChange={handleChange}
                  placeholder="Confirme a nova senha"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-primary text-white py-3 rounded-lg flex justify-center items-center gap-2"
              >
                <Save size={18} /> Salvar Alterações
              </button>

              {message && (
                <p
                  className={`text-center text-sm ${message && typeMessage ? "text-green-600" : "text-red-500"}`}
                >
                  {message}
                </p>
              )}
            </form>
          </div>

          {/* SIDEBAR */}
          
        </div>
      </div>
    </div>
  );
};
