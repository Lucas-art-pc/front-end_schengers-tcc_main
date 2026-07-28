const required = (value, message) => (!value ? message : null);

const validURL = (value, message) =>
  value && !/^https?:\/\/.+/.test(value) ? message : null;

const validEmail = (value) =>
  value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "E-mail inválido." : null;

const validYear = (value) =>
  value && !/^\d{4}$/.test(value) ? "Ano inválido." : null;

export const stepValidators = [
  (form) => ({
    name:      required(form.name, "Nome é obrigatório."),
    email:     required(form.email, "E-mail é obrigatório.") ?? validEmail(form.email),
    phone:     required(form.phone, "Telefone é obrigatório."),
    linkedin:  validURL(form.linkedin, "URL inválida."),
    portfolio: validURL(form.portfolio, "URL inválida."),
  }),
  (form) => ({
    education_level: required(form.education_level, "Nível de formação é obrigatório."),
    institution:     required(form.institution, "Instituição é obrigatória."),
    course:          required(form.course, "Curso é obrigatório."),
    graduation_year: validYear(form.graduation_year),
  }),
  (form) => ({
    skills: required(form.skills, "Habilidades são obrigatórias."),
  }),
  (form) => ({
    personal_document:     required(form.personal_document, "Documento pessoal é obrigatório."),
    professional_document: required(form.professional_document, "Documento profissional é obrigatório."),
  }),
];

const ALLOWED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const validateFile = (file) => {
  if (!ALLOWED_FILE_TYPES.includes(file.type))
    return "Formato inválido. Envie PDF, JPG ou PNG.";
  if (file.size > MAX_FILE_SIZE)
    return "Arquivo muito grande. Máximo 5MB.";
  return null;
};