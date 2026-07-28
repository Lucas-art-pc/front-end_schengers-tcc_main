import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/GuestPages/Homepage";
import { LearnMore } from "../pages/GuestPages/LearnMore";
import { FormStudent } from "../pages/FormPages/FormStudent";
import { CoursesMarketing } from "../pages/GuestPages/CoursesMarketing";
import { FormTeacherUser } from "../pages/FormPages/FormTeacherUser";
import { LoginStudent } from "../pages/FormPages/LoginStudent";
import { LoginTeacher } from "../pages/FormPages/LoginTeacher";
import { Vacancies } from "../pages/VacanciePages/Vacancies";
import { VacanciePage } from "../pages/VacanciePages/VacanciePage";
import { StudentDashboard } from "../pages/StudentPages/StudentDashboard";
import { StudentProfile } from "../pages/StudentPages/StudentProfile";
import { StudyPlans } from "../pages/StudentPages/StudyPlans";
import { StudentLayout } from "../layouts/StudentLayout";
import { StudentCourses } from "../pages/StudentPages/StudentCourses";
import { GuestLayout } from "../layouts/GuestLayout";
import { CourseDetails } from "../pages/CoursePages/CourseDetails";
import { StudentCoursePage } from "../pages/StudentPages/StudentCoursePage";
import { LessonPlayer } from "../pages/CoursePages/LessonPlayer";
import { ActivityPage } from "../pages/CoursePages/ActivityPage";
import { ForgotPassword } from "../pages/StudentPages/ForgotPassword";
import { ResetPassword } from "../pages/StudentPages/ResetPassword";
import { CurriculumForm } from "../pages/FormPages/FormCurriculum";
import { DashboardTeacher } from "../pages/TeacherPages/DashboardTeacher";
import { TeacherLayout } from "../layouts/TeacherLayout";
import { PrivateRouteStudent } from "../components/PrivateRouteStudent";
import { PrivateRouteTeacherPending } from "../components/PrivateRouteTeacherPending";
import { PrivateRouteTeacherApproved } from "../components/PrivateRouteTeacherApproved";
import FormCourse from "../pages/CoursePages/FormCourse";
import { GuestRouteStudent } from "../components/GuestRouteStudent";
import { GuestRouteTeacher } from "../components/GuestRouteTeacher";
import CourseListPage from "../pages/TeacherPages/CoursesTeacher";
import { AdminLayout } from "../layouts/AdminLayout";
import { PrivateRouteAdmin } from "../components/PrivateRouteAdmin";
import { DashboardAdmin } from "../pages/AdminPages/DashboardAdmin";
import { ListStudents } from "../pages/AdminPages/ListStudents";
import { ListTeachers } from "../pages/AdminPages/ListTeachers";
import { ListCourses } from "../pages/AdminPages/ListCourses";
import { ListAreas } from "../pages/AdminPages/ListAreas";
import { ListCurriculum } from "../pages/AdminPages/CurriculumList";
import { CurriculumDetails } from "../pages/AdminPages/CurriculumDetails";
import { ListVacancyCurriculum } from "../pages/AdminPages/ListVacancyCurriculum";
import { ListVacanciesAdmin } from "../pages/AdminPages/ListVacancies";
import { VacancyDetails } from "../pages/AdminPages/VacancieDetails";
import { FormVacancy } from "../pages/FormPages/FormVacancy";
import { NotFound } from "../pages/NotFoundPage";
import { Certificate } from "../components/Certificate";
import { FormTaskTeacher } from "../pages/AdminPages/FormTaskTeacher";
import { NotificationTeacher } from "../pages/TeacherPages/NotificationTeacher";
import { StudentSupport } from "../pages/StudentPages/StudentSupport";
import { AdminSupportList } from "../pages/AdminPages/SupportList";


export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound/>} />

        

        <Route path="/" element={<GuestLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="learn-more" element={<LearnMore />} />
          <Route path="courses-schengers" element={<CoursesMarketing />} />
        </Route>
        <Route path="auth">
          <Route element={<GuestRouteStudent />}>
            <Route path="register-student" element={<FormStudent />} />
            <Route path="login-student" element={<LoginStudent />} />
          </Route>
          <Route element={<GuestRouteTeacher />}>
          <Route path="register-teacherUser" element={<FormTeacherUser />} />
          <Route path="login-teacherUser" element={<LoginTeacher />} />
          </Route>
          
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>

        <Route element={<PrivateRouteTeacherPending />}>
          <Route path="teacher">
            <Route path="vacancies" element={<Vacancies />} /> // precisa ser
            protegida
            <Route path="vacancie/:id" element={<VacanciePage />} /> // precisa
            ser protegida
            <Route
              path="vacancie/:id/curriculum"
              element={<CurriculumForm />}
            />
          </Route>
        </Route>
        <Route element={<PrivateRouteTeacherApproved />}>
          <Route path="teacherAuth" element={<TeacherLayout />}>
            <Route path="dashboard" element={<DashboardTeacher />} />
            <Route path="courses" element={<CourseListPage />} />
            <Route path="course">
              <Route path="form" element={<FormCourse />} />
              <Route path=":id/form" element={<FormCourse />}/>
            </Route>
            <Route path="tasks" element={<NotificationTeacher/>}/>
          </Route>
        </Route>

        <Route element={<PrivateRouteStudent />}>
          <Route path="student" element={<StudentLayout />}>
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="study-plans" element={<StudyPlans />} />
            <Route path="my-courses" element={<StudentCourses />} />
            <Route path="enroll-course/:id" element={<CourseDetails />} />
            <Route path="course/:id" element={<StudentCoursePage />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="support" element={<StudentSupport />} />
            <Route
              path="course/:id/lesson/:lessonId"
              element={<LessonPlayer />}
            />
            <Route
              path="course/:id/activity/:activityId"
              element={<ActivityPage />}
            />

            <Route path="course/certificate/:id" element={<Certificate/>} />
          </Route>
        </Route>

        <Route element={<PrivateRouteAdmin />}>
          <Route path="admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<DashboardAdmin/>} />
            <Route path="listStudents" element={<ListStudents/>} />
            <Route path="listTeachers" element={<ListTeachers/>} />
            <Route path="listCourses" element={<ListCourses/>} />
            <Route path="listAreas" element={<ListAreas/>} />
            <Route path="vacancies" element={<ListVacancyCurriculum/>} />
            <Route path="supports" element={<AdminSupportList/>} />
            <Route path="vacancies/:id/curriculums/" element={<ListCurriculum/>} />
            <Route path="vacancies/:id/curriculums/:idCurriculum" element={<CurriculumDetails/>} />
            <Route path="listVacancies" element={<ListVacanciesAdmin/>}/>
            <Route path="vacancy/:idVacancy" element={<VacancyDetails/>}/>
            <Route path="vacancyEdit/:idVacancy" element={<FormVacancy/>}/>
            <Route path="vacancyCreate" element={<FormVacancy/>}/>
            <Route path=":idTeacher/sendTaskMessageTeacher" element={<FormTaskTeacher/>}/>

          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
};
