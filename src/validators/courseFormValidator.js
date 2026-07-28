export function validate(form) {
  const errors = {};
  if (!form.slug_area) errors.slug_area = "Selecione uma área.";
  if (!form.title_course || form.title_course.length < 3)
    errors.title_course = "O título deve ter no mínimo 3 caracteres.";
  if (form.title_course && form.title_course.length > 255)
    errors.title_course = "O título deve ter no máximo 255 caracteres.";
  if (!form.description_course || form.description_course.length < 10)
    errors.description_course = "A descrição deve ter no mínimo 10 caracteres.";
  if (!form.duration_course || Number(form.duration_course) < 1)
    errors.duration_course = "A duração deve ser de pelo menos 1 hora.";
  return errors;
}