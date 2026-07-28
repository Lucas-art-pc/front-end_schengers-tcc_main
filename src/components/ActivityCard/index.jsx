export const ActivityCard = ({ activity }) => {
  const completed = activity.is_completed;

  return (
    <>
      <div
        className={`flex items-center justify-between p-4 rounded-lg shadow transition-colors ${
          completed
            ? "bg-green-50 border border-green-200"
            : "bg-white hover:bg-gray-50"
        }`}
      >
        <div className="flex items-center gap-3">
          {completed ? (
            <CheckCircle className="text-green-500 shrink-0" />
          ) : (
            <FileText className="text-green-600 shrink-0" />
          )}
          <div>
            <Typograph
              className={completed ? "text-gray-400 line-through" : ""}
            >
              {activity.title_activity}
            </Typograph>
            <Typograph className="text-gray-500 text-sm">
              {activity.description_activity}
            </Typograph>
          </div>
        </div>
      </div>
    </>
  );
};
