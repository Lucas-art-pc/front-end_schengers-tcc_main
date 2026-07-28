import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Typograph } from "../../../components/Typograph";
import {
  answerActivity,
  showActivity,
} from "../../../api/services/courses/activities/activityService";

export const ActivityPage = () => {
  const { id, activityId } = useParams();
  const [activity, setActivity] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await showActivity(id, activityId);
        console.log(response)
        setActivity(response);

        if (response?.answer) {
          setSelectedAnswer(response.answer.fk_id_alternative);
          setSubmitted(true);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchActivity();
  }, [id, activityId]);

  if (!activity) {
    return (
      <main className="flex-1 p-4 md:p-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
            Carregando atividade...
          </div>
        </div>
      </main>
    );
  }

  const { activity: act, alternatives, total, current } = activity;

  const correctAlternative = alternatives.find((a) => a.correct_alternative) ?? null;

  const isCorrect = correctAlternative
    ? selectedAnswer === correctAlternative.id_alternative
    : false;

  const handleSelect = (id_alternative) => {
    if (submitted) return;
    setSelectedAnswer(id_alternative);
  };

const handleSubmit = async () => {
  if (!selectedAnswer) return;

  const payload = {
    question_id: act.id_activity,
    alternative_id: selectedAnswer,
  };

  try {
    setSubmitted(true);
    await answerActivity(payload);
  } catch (err) {
    setSubmitted(false);
    console.error("Erros do Laravel:", err.response?.data);
  }
};

  const LETTERS = ["A", "B", "C", "D", "E"];

  const getAltStyle = (alt) => {
    const selected = selectedAnswer === alt.id_alternative;
    const isCorrectAlt = alt.correct_alternative;

    if (!submitted) {
      return selected
        ? "border-blue-500 bg-blue-50 text-blue-900"
        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50";
    }

    if (isCorrectAlt) return "border-green-500 bg-green-50 text-green-900";
    if (selected && !isCorrectAlt) return "border-red-400 bg-red-50 text-red-900";
    return "border-gray-200 text-gray-400";
  };

  const progressPercent = total ? Math.round(((current - 1) / total) * 100) : 0;

  return (
    <main className="flex-1 p-4 md:p-10">
      {/* Header */}
      <header className="mb-4 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition"
        >
          <ArrowLeft size={16} />
          Voltar
        </button>

        <Typograph tag="title_large" className="text-blue-primary">
          {act.title_activity}
        </Typograph>
      </header>

      {/* Barra de progresso */}
      {total && (
        <div className="max-w-3xl mx-auto mb-4 flex items-center gap-3">
          <span className="text-sm text-gray-500 whitespace-nowrap">
            Questão {current} de {total}
          </span>
          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-primary rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-sm text-gray-500">{progressPercent}%</span>
        </div>
      )}

      {/* Card */}
      <div className="bg-white p-6 rounded-xl shadow max-w-3xl mx-auto">
        {/* Pergunta */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 md:p-6 mb-6">
          <p className="text-xs font-medium text-blue-primary uppercase tracking-wide mb-2">
            Pergunta
          </p>
          <Typograph
            tag="title_large"
            className="text-gray-800 leading-relaxed text-lg md:text-xl font-semibold"
          >
            {act.question_activity}
          </Typograph>
        </div>

        {/* Alternativas */}
        <div className="space-y-2.5 mb-6">
          {alternatives.map((alt, index) => {
            const selected = selectedAnswer === alt.id_alternative;
            const isCorrectAlt = alt.correct_alternative;

            return (
              <button
                key={alt.id_alternative}
                onClick={() => handleSelect(alt.id_alternative)}
                disabled={submitted}
                className={`w-full text-left px-4 py-3.5 rounded-lg border transition-all
                  ${getAltStyle(alt)}
                  ${!submitted ? "cursor-pointer" : "cursor-default"}
                `}
              >
                <div className="flex justify-between items-center gap-3">
                  <span className="text-sm leading-relaxed">
                    <span className="font-semibold mr-1.5">
                      {LETTERS[index]}.
                    </span>
                    {alt.text_alternative}
                  </span>

                  {submitted && isCorrectAlt && (
                    <CheckCircle size={18} className="text-green-600 shrink-0" />
                  )}
                  {submitted && selected && !isCorrectAlt && (
                    <XCircle size={18} className="text-red-500 shrink-0" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Resultado */}
        {submitted && (
          <div
            className={`flex items-start gap-3 p-4 rounded-lg mb-6 text-sm
              ${isCorrect
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-red-50 border border-red-200 text-red-800"
              }`}
          >
            {isCorrect ? (
              <CheckCircle size={18} className="text-green-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-medium">
                {isCorrect ? "Resposta correta!" : "Resposta incorreta"}
              </p>
              {!isCorrect && correctAlternative && (
                <p className="mt-0.5 text-red-700">
                  A alternativa correta era:{" "}
                  <strong>
                    {LETTERS[alternatives.indexOf(correctAlternative)]}.{" "}
                    {correctAlternative.text_alternative}
                  </strong>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Ações */}
        <div className="flex justify-between items-center pt-2">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition text-gray-700"
          >
            Voltar
          </button>

          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className="px-6 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition font-medium"
            >
              Confirmar resposta
            </button>
          ) : (
            <button
              onClick={() => navigate(`/student/course/${id}`)}
              className="px-6 py-2 text-sm bg-blue-primary hover:opacity-90 text-white rounded-lg transition font-medium"
            >
              Voltar ao curso
            </button>
          )}
        </div>
      </div>
    </main>
  );
};