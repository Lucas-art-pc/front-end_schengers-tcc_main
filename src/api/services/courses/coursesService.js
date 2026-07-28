import { api } from "../api";

export const indexCourses = async (params = {}) => {
  const query = new URLSearchParams();

  if (params.search)     query.set("search", params.search);
  if (params.area_slug)  query.set("area_slug", params.area_slug); // ← era area_id


  const response = await api.get(`/courses?${query.toString()}`);
  return response.data;
};

export const showCourse = async (id) => {
  const response = await api.get(`courses/${id}`)
  return response.data.course
}

export const enrollCourse = async (id) => {
   const response = await api.post(`courses/${id}/enroll`)
   return response.data
}

export const getCourseContent = async (publicId) => {
  const response = await api.get(`courses/${publicId}/contentCourse`);
  return response.data;
};
export const getCourseLessons = async (publicId) => {
  const response = await api.get(`courses/${publicId}/classes`);
  return response.data;
};

export const getCourseActivities = async (publicId) => {
  const response = await api.get(`courses/${publicId}/activities`);
  return response.data;
};

export const checkEnrollment = async (publicId) => {
  const response = await api.get(`courses/${publicId}/isEnrolled`);
  return response.data.is_enrolled;
};

export const coursesPerStudent = async () => {
  const response = await api.get("courses/coursesPerStudent")
  return response.data;
}

export const countCoursesPerTeacher = async () => {
  const response = await api.get("courses/countPerTeacher")
  return response.data;
}

export const createCourses = async (data) => {
  const response = await api.post("courses/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};


export const updateCourses = async (public_id, data) => {
  const response = await api.patch(`courses/${public_id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getCertificate = async (publicId) => {
  const response = await api.get(`courses/certificates/${publicId}`)
  return response.data;
}



