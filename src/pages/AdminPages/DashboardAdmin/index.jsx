import { useState, useEffect, useRef } from "react";
import {
  GraduationCap,
  Users,
  BookOpen,
  ClipboardCheck,
  Video,
} from "lucide-react";
import {
  classesPerArea,
  countersAdmin,
} from "../../../api/services/admin/dataService";
import { PageContainerTeacher } from "../../../components/PageContainerTeacher";
import { dataUser } from "../../../api/services/auth/dataUser";

const COLORS = {
  bluePrimary: "#1E40AF",
  blueHover: "#0B2373",
  yellowPrimary: "#FCAC21",
};

const metricConfig = [
  {
    label: "Professores",
    key: "teachers",
    Icon: GraduationCap,
    bg: "#CFE2FF",
  },
  {
    label: "Alunos",
    key: "students",
    Icon: Users,
    bg: "#FEF3C7",
  },
  {
    label: "Cursos",
    key: "courses",
    Icon: BookOpen,
    bg: "#CFE2FF",
  },
  {
    label: "Atividades",
    key: "activities",
    Icon: ClipboardCheck,
    bg: "#FEF3C7",
  },
  {
    label: "Aulas",
    key: "classes",
    Icon: Video,
    bg: "#CFE2FF",
  },
];



function AnimatedNumber({ target }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (target == null) return;
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setVal(target);
        clearInterval(timer);
      } else setVal(current);
    }, 20);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{val.toLocaleString("pt-BR")}</span>;
}

function DonutChart({ data }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const size = canvas.width;
    const cx = size / 2,
      cy = size / 2;
    const r = size * 0.4,
      ri = size * 0.26;

    ctx.clearRect(0, 0, size, size);

    let startAngle = -Math.PI / 2;
    // Usa total_aulas para calcular o total (alinhado com a API)
    const total = data.reduce((s, d) => s + d.total_aulas, 0);

    data.forEach((d) => {
      // Usa total_aulas no ângulo também
      const angle = (d.total_aulas / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, startAngle, startAngle + angle);
      ctx.closePath();
      ctx.fillStyle = d.color_area; // alinhado com a API
      ctx.fill();
      startAngle += angle;
    });

    // Furo central
    ctx.beginPath();
    ctx.arc(cx, cy, ri, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    // Texto central: soma total de aulas
    ctx.font = "bold 16px Inter, sans-serif";
    ctx.fillStyle = "#0B2373";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(total.toString(), cx, cy - 9); // dinâmico, não hardcoded
    ctx.font = "11px Inter, sans-serif";
    ctx.fillStyle = "#94A3B8";
    ctx.fillText("aulas", cx, cy + 9);
  }, [data]);

  return (
    <canvas
      ref={canvasRef}
      width={160}
      height={160}
      aria-label="Gráfico de aulas por tipo"
    />
  );
}

function MetricCard({ metric, index, value }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 90);
    return () => clearTimeout(t);
  }, [index]);

  const { label, Icon, bg } = metric;

  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-3 transition-all duration-500"
      style={{
        background: "#fff",
        border: "1px solid #E2E8F0",
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: bg }}
      >
        <Icon size={20} strokeWidth={1.8} />
      </div>
      <div>
        <p className="text-xs text-slate-400 mb-1 uppercase tracking-wide font-medium">
          {label}
        </p>
        <p
          className="text-3xl font-semibold"
          style={{ color: COLORS.blueHover }}
        >
          {value != null ? (
            <AnimatedNumber target={value} />
          ) : (
            <span className="inline-block w-16 h-8 bg-slate-100 rounded-lg animate-pulse" />
          )}
        </p>
      </div>
    </div>
  );
}

export const DashboardAdmin = () => {
  

  const [counters, setCounters] = useState(null);
  const [classes, setClasses] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([countersAdmin(), classesPerArea(), dataUser()])
      .then(([countersData, classesData]) => {
        setCounters(countersData);
        setClasses(classesData);
      })
      .catch((err) => {
        console.error(err);
        setError("Erro ao carregar os dados. Tente novamente.");
      })
      .finally(() => setLoading(false));
  }, []);

  

  if (loading)
    return (
      <PageContainerTeacher title="Dashboard">
        <p>Carregando...</p>
      </PageContainerTeacher>
    );

    const totalAulas = classes.reduce((s, c) => s + c.total_aulas, 0);
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-2xl font-semibold"
            style={{ color: COLORS.blueHover }}
          >
            Painel administrativo
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Visão geral do sistema educacional
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 rounded-xl text-sm text-red-700 bg-red-50 border border-red-200">
          {error}
        </div>
      )}

      {/* Metric cards — value vem da API, skeleton enquanto carrega */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {metricConfig.map((m, i) => (
          <MetricCard
            key={m.key}
            metric={m}
            index={i}
            value={counters ? counters[m.key] : null}
          />
        ))}
      </div>

      <div>

        <div
          className="bg-white rounded-2xl p-6 flex flex-col"
          style={{ border: "1px solid #E2E8F0" }}
        >
          <h2
            className="text-sm font-semibold mb-4"
            style={{ color: COLORS.blueHover }}
          >
            Aulas por tipo
          </h2>
          <div className="flex flex-col items-center gap-4 flex-1 justify-center">
            <DonutChart data={classes} />
            <div className="flex flex-col gap-2 w-full">
              {classes.map((c) => (
                <div
                  key={c.slug_area}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: c.color_area }}
                    />
                    <span className="text-slate-500">{c.name_area}</span>
                  </div>
                  <span
                    className="font-semibold"
                    style={{ color: COLORS.blueHover }}
                  >
                    {totalAulas > 0
                      ? Math.round((c.total_aulas / totalAulas) * 100)
                      : 0}
                    %
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
