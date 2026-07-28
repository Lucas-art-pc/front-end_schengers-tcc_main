import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function CoursesBarChart({ courses }) {
  const MAX_LABEL = 14;

  const data = courses.map((course) => ({
    name:
      course.title_course.length > MAX_LABEL
        ? course.title_course.substring(0, MAX_LABEL) + "…"
        : course.title_course,
    fullName: course.title_course,
    Aulas: course.classes_count,
    Atividades: course.activities_count,
  }));

  return (
    <ResponsiveContainer width="100%" height={360}>
      <BarChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 80 }}
        barCategoryGap="15%"
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 10 }}
          angle={-90}
          textAnchor="end"
          interval={0}
          height={90}
        />
        <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
        <Tooltip
          labelFormatter={(_, payload) =>
            payload?.[0]?.payload?.fullName ?? ""
          }
        />
        <Legend verticalAlign="top" height={36} />
        <Bar dataKey="Aulas" fill="#378ADD" radius={[3, 3, 0, 0]} />
        <Bar dataKey="Atividades" fill="#1D9E75" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

