import { useState, useEffect } from "react";
import {
  Clock,
  Video,
  AlignLeft,
  Pencil,
  Trash2,
  Check,
  X,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCourses,
  updateCourses,
  getCourseContent,
} from "../../../api/services/courses/coursesService";
import { createLesson } from "../../../api/services/courses/lessons/lessonsService";
import {
  createActivity,
  updateActivity,
  deleteActivity,
} from "../../../api/services/courses/activities/activityService";
import { ClassModal } from "../../../components/ClassModal";
import { ActivityModal } from "../../../components/ActivityModal";
import { validate } from "../../../validators/courseFormValidator";
import { CoursePart } from "../../../components/CoursePart";
import { SucessCourseCreate } from "../../../components/SucessCourseCreate";
import { TabAulasFormCourse } from "../../../components/TabAulasFormCourse";
import { TabActivityFormCourse } from "../../../components/TabActivityFormCourse";

const EMPTY_FORM = {
  slug_area: "",
  title_course: "",
  description_course: "",
  duration_course: "",
  active_course: true,
};

export default function CourseForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  // ── Formulário do curso ───────────────────────────────────────────────────
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // ── Aulas ─────────────────────────────────────────────────────────────────
  const [loadingData, setLoadingData] = useState(isEditing);
  const [activeTab, setActiveTab] = useState("aulas");
  const [classes, setClasses] = useState([]);
  const [classModal, setClassModal] = useState(null);
  const [deletingClass, setDeletingClass] = useState(null);

  // ── Atividades ────────────────────────────────────────────────────────────
  const [activities, setActivities] = useState([]);
  const [activityModal, setActivityModal] = useState(null);
  const [deletingActivity, setDeletingActivity] = useState(null);

  // ── Fetch inicial (modo edição) ───────────────────────────────────────────
  useEffect(() => {
    if (!isEditing) return;
    const fetchAll = async () => {
      try {
        const data = await getCourseContent(id);
        setForm({
          slug_area: data.area?.slug_area ?? "",
          title_course: data.title_course ?? "",
          description_course: data.description_course ?? "",
          duration_course: data.duration_course ?? "",
          active_course: data.active_course ?? true,
        });
        if (data.url_image_course) {
          setImagePreview(
            `http://localhost:8000/storage/${data.url_image_course}`,
          );
        }
        setClasses(data.classes ?? []);
        setActivities(data.activities ?? []);
      } catch (err) {
        setSubmitError("Não foi possível carregar os dados do curso.");
        console.error(err);
      } finally {
        setLoadingData(false);
      }
    };
    fetchAll();
  }, [id, isEditing]);

  // ── Handlers do formulário do curso ──────────────────────────────────────

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        image: "Formato inválido. Use JPG, PNG ou WEBP.",
      }));
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: "A imagem deve ter no máximo 2MB.",
      }));
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setErrors((prev) => ({ ...prev, image: undefined }));
  }

  function handleRemoveImage() {
    setImageFile(null);
    setImagePreview(null);
  }

  function handleReset() {
    setForm(EMPTY_FORM);
    setErrors({});
    setSubmitError(null);
    setImageFile(null);
    setImagePreview(null);
  }

  async function handleSubmit() {
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setSubmitError(null);
    try {
      const payload = new FormData();
      payload.append("slug_area", form.slug_area);
      payload.append("title_course", form.title_course);
      payload.append("description_course", form.description_course);
      payload.append("duration_course", Number(form.duration_course));
      payload.append("active_course", form.active_course ? 1 : 0);
      if (imageFile) payload.append("url_image_course", imageFile);

      if (isEditing) {
        payload.append("_method", "PATCH");
        await updateCourses(id, payload);
      } else {
        await createCourses(payload);
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err?.message || `Erro ao ${isEditing ? "atualizar" : "criar"} o curso.`,
      );
    } finally {
      setLoading(false);
    }
  }

  // ── Handlers de aulas ─────────────────────────────────────────────────────

  async function handleSaveClass(formData) {
    try {
      if (classModal?.public_id) {
        // await updateClass(classModal.public_id, formData);
        setClasses((prev) =>
          prev.map((c) =>
            c.public_id === classModal.public_id ? { ...c, ...formData } : c,
          ),
        );
      } else {
        const payload = {
          title_class: formData.title_class,
          description_class: formData.description_class || null,
          explication_class: formData.explication_class || null,
          url_class: formData.url_class || null,
          duration_class:
            formData.duration_class !== ""
              ? Number(formData.duration_class)
              : null,
        };
        const response = await createLesson(id, payload);
        setClasses((prev) => [...prev, response.class]);
      }
      setClassModal(null);
    } catch (err) {
      console.error("Erro ao salvar aula:", err.response?.data ?? err.message);
    }
  }

  async function handleDeleteClass(publicId) {
    try {
      // await deleteClass(publicId);
      setClasses((prev) => prev.filter((c) => c.public_id !== publicId));
      setDeletingClass(null);
    } catch (err) {
      console.error(err);
    }
  }

  // ✅ Correto
  async function handleSaveActivity(formData) {
    try {
      if (activityModal?.public_id) {
        const response = await updateActivity(
          id,
          activityModal.public_id,
          formData,
        );
        setActivities((prev) =>
          prev.map((a) =>
            a.public_id === activityModal.public_id
              ? { ...a, ...response.data }
              : a,
          ),
        );
      } else {
        const response = await createActivity(id, formData);
        console.log(response);
        setActivities((prev) => [...prev, response.data]);
      }
      setActivityModal(null);
    } catch (err) {
      console.error(
        "Erro ao salvar atividade:",
        err.response?.data ?? err.message,
      );
    }
  }

  async function handleDeleteActivity(publicId) {
    try {
      await deleteActivity(publicId);
      setActivities((prev) => prev.filter((a) => a.public_id !== publicId));
      setDeletingActivity(null);
    } catch (err) {
      console.error(
        "Erro ao excluir atividade:",
        err.response?.data ?? err.message,
      );
    }
  }

  // ── Loading skeleton ──────────────────────────────────────────────────────

  if (loadingData) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 animate-pulse space-y-2">
          <div className="h-3 w-32 bg-gray-200 rounded" />
          <div className="h-7 w-48 bg-gray-200 rounded" />
          <div className="h-4 w-72 bg-gray-100 rounded" />
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-4 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-24 bg-gray-200 rounded" />
              <div className="h-10 bg-gray-100 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Sucesso ───────────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <SucessCourseCreate
        form={form}
        isEditing={isEditing}
        handleReset={handleReset}
      />
    );
  }

  // ── Render principal ──────────────────────────────────────────────────────

  return (
    <div className="max-w-2xl mx-auto pb-12">
      {/* Header */}
      <div className="mb-6">
        <p className="text-xs font-mono text-indigo-400 tracking-widest uppercase mb-1">
          Gestão / Cursos / {isEditing ? "Editar" : "Novo"}
        </p>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          {isEditing ? "Editar Curso" : "Novo Curso"}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {isEditing
            ? "Atualize as informações do curso abaixo."
            : "Preencha as informações para cadastrar um novo curso na plataforma."}
        </p>
      </div>

      {/* Formulário do curso */}
      <CoursePart
        form={form}
        errors={errors}
        loading={loading}
        submitError={submitError}
        imagePreview={imagePreview}
        isEditing={isEditing}
        onChange={handleChange}
        onImageChange={handleImageChange}
        onRemoveImage={handleRemoveImage}
        onToggleActive={() =>
          setForm((p) => ({ ...p, active_course: !p.active_course }))
        }
        onSubmit={handleSubmit}
        onReset={handleReset}
        onCancel={() => navigate("/teacherAuth/courses")}
      />

      {/* Seção Aulas / Atividades */}
      {isEditing && (
        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            {[
              { key: "aulas", label: "Aulas", count: classes.length },
              {
                key: "atividades",
                label: "Atividades",
                count: activities.length,
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab.label}
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                    activeTab === tab.key
                      ? "bg-indigo-100 text-indigo-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Tab: Aulas */}
          <TabAulasFormCourse
            activeTab={activeTab}
            classes={classes}
            handleDeleteClass={handleDeleteClass}
            deletingClass={deletingClass}
            setClassModal={setClassModal}
            setDeletingClass={setDeletingClass}
          />

          {/* Tab: Atividades */}
          
          <TabActivityFormCourse 
           activeTab={activeTab}
           activities={activities}
           handleDeleteActivity={handleDeleteActivity}
           deletingActivity={deletingActivity}
           setActivityModal={setActivityModal}
           setDeletingActivity={setDeletingActivity}
          />

        </div>
      )}

      <p className="text-xs text-gray-400 mt-4 text-right">
        Campos com{" "}
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-500 align-middle mx-0.5" />{" "}
        são obrigatórios.
      </p>

      {classModal && (
        <ClassModal
          initial={classModal !== "new" ? classModal : null}
          onSave={handleSaveClass}
          onClose={() => setClassModal(null)}
        />
      )}

      {activityModal && (
        <ActivityModal
          initial={activityModal !== "new" ? activityModal : null}
          onSave={handleSaveActivity}
          onClose={() => setActivityModal(null)}
        />
      )}
    </div>
  );
}
