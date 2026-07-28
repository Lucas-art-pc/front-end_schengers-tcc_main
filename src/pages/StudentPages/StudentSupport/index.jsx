import { useEffect, useState } from "react";
import { createSupportMessage, getMySupportMessages } from "../../../api/services/support/supportService";

const TYPE_LABELS = {
  falha_plataforma: "Falha na plataforma",
  sugestao_melhoria: "Sugestão de melhoria",
};

// status_support é booleano: false = pendente, true = resolvido.
const STATUS_STYLES = {
  false: "bg-amber-50 text-amber-700 border-amber-200",
  true: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

function StatusBadge({ status }) {
  const style = STATUS_STYLES[String(!!status)];
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${style}`}>
      {status ? "Resolvido" : "Pendente"}
    </span>
  );
}

export const StudentSupport = () => {
  const [form, setForm] = useState({
    title_support: "",
    message_support: "",
    type_support: "falha_plataforma",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', text: string }

  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  const fetchMessages = async () => {
    setLoadingMessages(true);
    try {
      const data = await getMySupportMessages();
      setMessages(Array.isArray(data) ? data : data?.data ?? []);
    } catch (err) {
      console.log(err)
      setToast({ type: "error", text: "Não foi possível carregar suas mensagens." });
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setToast(null);
    setFieldErrors({});
    try {
      await createSupportMessage(form);
      setToast({ type: "success", text: "Mensagem enviada com sucesso!" });
      setForm({ title_support: "", message_support: "", type_support: "falha_plataforma" });
      fetchMessages();
    } catch (err) {
      const responseData = err?.response?.data;
      if (responseData?.errors) {
        setFieldErrors(responseData.errors);
      }
      setToast({
        type: "error",
        text: responseData?.message || "Erro ao enviar sua mensagem. Tente novamente.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-[#0B2373]">Central de ajuda</h1>
        <p className="text-slate-500 mt-1">
          Encontrou um problema ou tem uma sugestão? Envie sua mensagem para nossa equipe.
        </p>
      </header>

      {/* Formulário de envio */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-10">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Enviar nova mensagem</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="title_support" className="block text-sm font-medium text-slate-700 mb-1">
              Título
            </label>
            <input
              id="title_support"
              name="title_support"
              type="text"
              value={form.title_support}
              onChange={handleChange}
              placeholder="Resuma o assunto em poucas palavras"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
            />
            {fieldErrors.title_support && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors.title_support[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="type_support" className="block text-sm font-medium text-slate-700 mb-1">
              Tipo
            </label>
            <select
              id="type_support"
              name="type_support"
              value={form.type_support}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent bg-white"
            >
              {Object.entries(TYPE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="message_support" className="block text-sm font-medium text-slate-700 mb-1">
              Mensagem
            </label>
            <textarea
              id="message_support"
              name="message_support"
              rows={4}
              value={form.message_support}
              onChange={handleChange}
              placeholder="Descreva com detalhes o que aconteceu ou o que você gostaria de sugerir"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent resize-none"
            />
            {fieldErrors.message_support && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors.message_support[0]}</p>
            )}
          </div>

          {toast && (
            <p className={`text-sm ${toast.type === "success" ? "text-emerald-600" : "text-red-600"}`}>
              {toast.text}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={submitting || !form.title_support || !form.message_support}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#1E40AF] text-white text-sm font-medium hover:bg-[#0B2373] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Enviando..." : "Enviar mensagem"}
          </button>
        </div>
      </section>

      {/* Listagem das mensagens do usuário */}
      <section>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Suas mensagens</h2>

        {loadingMessages ? (
          <p className="text-sm text-slate-500">Carregando mensagens...</p>
        ) : messages.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-slate-300 rounded-xl">
            <p className="text-sm text-slate-500">Você ainda não enviou nenhuma mensagem.</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {messages.map((msg) => (
              <li
                key={msg.public_id}
                className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-medium text-slate-800">{msg.title_support}</h3>
                    <span className="text-xs text-slate-400">
                      {TYPE_LABELS[msg.type_support] || msg.type_support}
                    </span>
                  </div>
                  <StatusBadge status={!!msg.status_support} />
                </div>
                <p className="text-sm text-slate-600 mt-2">{msg.message_support}</p>
                {msg.created_at && (
                  <p className="text-xs text-slate-400 mt-2">
                    {new Date(msg.created_at).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}