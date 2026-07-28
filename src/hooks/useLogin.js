import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./useAuth"

export function useLogin({ loginFn, tokenKey, redirectTo }) {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: "", password: "" })
  const [blockedUntil, setBlockedUntil] = useState(() => {
    const saved = localStorage.getItem("login_blocked_until")
    return saved ? Number(saved) : null
  })
  const [remaining, setRemaining] = useState(0)
  const navigate = useNavigate()
  const { saveAuth } = useAuth()

  const isBlocked = remaining > 0

  useEffect(() => {
    if (!blockedUntil) return

    const tick = () => {
      const secondsLeft = Math.ceil((blockedUntil - Date.now()) / 1000)

      if (secondsLeft <= 0) {
        setRemaining(0)
        setBlockedUntil(null)
        localStorage.removeItem("login_blocked_until")
      } else {
        setRemaining(secondsLeft)
      }
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [blockedUntil])

  const formatTime = (s) => {
    const h = String(Math.floor(s / 3600)).padStart(2, "0")
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0")
    const sec = String(s % 60).padStart(2, "0")
    return `${h}:${m}:${sec}`
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => setForm({ email: "", password: "" })

  const onSubmit = async (e) => {
    e.preventDefault()
    if (isBlocked) return

    setLoading(true)
    setError(null)
    try {
      const response = await loginFn(form)

      if (!response?.[tokenKey]) {
        throw new Error(response?.message || "Credenciais inválidas.")
      }

      const role   = response?.teacher?.role ?? "student"
      const status = response?.teacher?.status

      saveAuth(response[tokenKey], role, status)
      resetForm()

      if (role === "admin") {
        navigate("/admin/dashboard")
      } else if (role === "teacher" && status === "approved") {
        navigate("/teacherAuth/dashboard")
      } else if (role === "teacher" && status === "pending") {
        navigate("/teacher/vacancies")
      } else {
        navigate(redirectTo)
      }

    } catch (err) {
      console.log(err)
      if (err.response?.status === 429) {
        const retryAfter = err.response.data?.retry_after ?? 7200
        const until = Date.now() + retryAfter * 1000

        setBlockedUntil(until)
        setRemaining(retryAfter)
        localStorage.setItem("login_blocked_until", until)
      }

      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Erro ao fazer login. Tente novamente."
      )
      resetForm()
    } finally {
      setLoading(false)
    }
  }

  return {
    form, error, loading, isBlocked, remaining,
    remainingFormatted: formatTime(remaining),
    handleChange, onSubmit,
  }
}