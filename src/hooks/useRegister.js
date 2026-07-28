import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function useRegister({ registerFn, initialForm, redirectTo }) {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const resetForm = () => setForm(initialForm)

  const formatField = (fieldName, formatFn) => {
    setForm((prev) => ({
      ...prev,
      [fieldName]: formatFn(prev[fieldName]),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await registerFn(form)
      resetForm()
      navigate(redirectTo)
    } catch (err) {
      resetForm()
      if (err.response?.data?.errors) {
        const firstError = Object.values(err.response.data.errors).flat()[0]
        setError(firstError)
      } else {
        setError(
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Erro ao criar conta. Tente novamente."
        )
      }
    } finally {
      setLoading(false)
    }
  }

  return { form, error, loading, handleChange, handleSubmit, formatField }
}