// components/PageContainer.jsx
export const PageContainerTeacher = ({ title, children, action }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        {action}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        {children}
      </div>
    </div>
  );
};