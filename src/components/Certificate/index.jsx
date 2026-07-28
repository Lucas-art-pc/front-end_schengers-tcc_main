import { useState, useEffect, useRef } from "react";
import { getCertificate } from "../../api/services/courses/coursesService";
import { useParams } from "react-router-dom";

export const Certificate = () => {
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const printRef = useRef();

  useEffect(() => {
    getCertificate(id)
      .then((res) => setCertificate(res))
      .catch(() => setError("Não foi possível carregar o certificado."))
      .finally(() => setLoading(false));
  }, [id]);

  const handlePrint = () => {
    const style = document.createElement("style");
    style.id = "print-override";
    style.innerHTML = `
      @page { size: A4 landscape; margin: 0; }
      @media print {
        body * { visibility: hidden !important; }
        #cert-print-area,
        #cert-print-area * { visibility: visible !important; }
        #cert-print-area {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          margin: 0 !important;
          padding: 10mm !important;
          width: 297mm !important;
          height: 210mm !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          box-sizing: border-box !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }
        #cert-print-area > * {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }
      }
    `;
    document.head.appendChild(style);
    window.print();
    document.head.removeChild(style);
  };

  if (loading) {
    return (
      <div style={styles.pageWrapper}>
        <div style={styles.skeletonCard}>
          <div style={styles.skeletonBar} />
          <div style={{ ...styles.skeletonLine, width: "30%", margin: "0 auto 12px" }} />
          <div style={{ ...styles.skeletonLine, width: "55%", margin: "0 auto 8px" }} />
          <div style={{ ...styles.skeletonLine, width: "40%", margin: "0 auto 32px" }} />
          <div style={{ ...styles.skeletonLine, width: "70%", margin: "0 auto 8px" }} />
          <div style={{ ...styles.skeletonLine, width: "50%", margin: "0 auto" }} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.pageWrapper}>
        <div style={styles.errorCard}>
          <div style={styles.errorIcon}>✕</div>
          <p style={styles.errorTitle}>Algo deu errado</p>
          <p style={styles.errorText}>{error}</p>
        </div>
      </div>
    );
  }

  const issuedDate = new Date(certificate.issued_at).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div style={styles.pageWrapper}>
      {/* Preview do certificado */}
      <div ref={printRef} id="cert-print-area" className="cert-outer" style={styles.certOuter}>
        <div style={styles.certificate}>
          {/* Borda decorativa interna */}
          <div style={styles.innerBorder} />

          {/* Coluna lateral esquerda */}
          <div style={styles.sidebar}>
            <div style={styles.sidebarAccent} />
            <div style={styles.sidebarContent}>
              <div style={styles.logoMark}>
                <img
                  src="/assets/images-schengers/logo-schengers-branca.png"
                  alt="Schengers"
                  style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                />
              </div>
              <div style={styles.sidebarDivider} />
              <p style={styles.sidebarLabel}>SCHENGERS</p>
              <p style={styles.sidebarSub}>Gestão{"\n"}Educacional</p>
            </div>
          </div>

          {/* Conteúdo principal */}
          <div style={styles.content}>
            <div style={styles.contentTop}>
              <p style={styles.eyebrow}>CERTIFICADO DE CONCLUSÃO</p>
              <p style={styles.certifiesLine}>Certificamos que</p>
              <p style={styles.studentName}>{certificate.student_name}</p>
              <div style={styles.nameDivider}>
                <div style={styles.nameDividerLine} />
                <div style={styles.nameDividerDot} />
                <div style={styles.nameDividerLine} />
              </div>
              <p style={styles.certifiesLine}>concluiu com êxito o curso</p>
              <p style={styles.courseTitle}>"{certificate.course_title}"</p>
            </div>

            <div style={styles.metaRow}>
              <div style={styles.metaItem}>
                <p style={styles.metaLabel}>CARGA HORÁRIA</p>
                <p style={styles.metaValue}>{certificate.workload ?? "—"}h</p>
              </div>
              <div style={styles.metaSeparator} />
              <div style={styles.metaItem}>
                <p style={styles.metaLabel}>DATA DE EMISSÃO</p>
                <p style={styles.metaValue}>{issuedDate}</p>
              </div>
              <div style={styles.metaSeparator} />
              <div style={styles.metaItem}>
                <p style={styles.metaLabel}>SITUAÇÃO</p>
                <p style={{ ...styles.metaValue, color: "#1E40AF" }}>Aprovado</p>
              </div>
            </div>

            <div style={styles.footer}>
              <div style={styles.hashBlock}>
                <p style={styles.hashLabel}>CÓDIGO DE VALIDAÇÃO</p>
                <p style={styles.hashValue}>{certificate.hash}</p>
                {certificate.validated_url && (
                  <p style={styles.hashUrl}>{certificate.validated_url}</p>
                )}
              </div>
              <div style={styles.signatureBlock}>
                <div style={styles.signatureLine} />
                <p style={styles.signatureName}>Schengers</p>
                <p style={styles.signatureRole}>Gestão Educacional</p>
              </div>
            </div>
          </div>

          {/* Faixa superior */}
          <div style={styles.topStripe} />
          {/* Faixa inferior */}
          <div style={styles.bottomStripe} />
        </div>
      </div>

      {/* Ações */}
      <div style={styles.actions}>
        <p style={styles.actionsHint}>
          Visualize seu certificado acima e clique em imprimir para salvar ou exportar como PDF.
        </p>
        <button
          onClick={handlePrint}
          style={styles.printButton}
          onMouseEnter={e => e.currentTarget.style.background = "#0B2373"}
          onMouseLeave={e => e.currentTarget.style.background = "#1E40AF"}
        >
          Imprimir certificado
        </button>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    background: "#f0f4f8",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "2rem",
    padding: "2.5rem 1rem",
    fontFamily: "'Inter', sans-serif",
  },

  /* Certificado */
  certOuter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  certificate: {
    position: "relative",
    background: "#ffffff",
    width: "277mm",
    height: "190mm",
    borderRadius: "4px",
    boxShadow: "0 4px 40px rgba(11,35,115,0.13), 0 1px 4px rgba(11,35,115,0.07)",
    display: "flex",
    overflow: "hidden",
    border: "1px solid #e2e8f0",
    flexShrink: 0,
  },
  innerBorder: {
    position: "absolute",
    inset: "12px",
    border: "1px solid #dbeafe",
    borderRadius: "2px",
    pointerEvents: "none",
    zIndex: 1,
  },
  topStripe: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "10px",
    background: "linear-gradient(90deg, #FCAC21 0%, #f59e0b 100%)",
  },
  bottomStripe: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "15px",
    background: "linear-gradient(90deg, #FCAC21 0%, #f59e0b 100%)",
  },

  /* Sidebar */
  sidebar: {
    width: "100px",
    background: "#0B2373",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "38px 0",
    flexShrink: 0,
    position: "relative",
  },
  sidebarAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "5px",
    background: "#FCAC21",
  },
  sidebarContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    marginTop: "16px",
  },
  logoMark: {
    width: "50px",
    height: "50px",
    borderRadius: "10px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  sidebarDivider: {
    width: "32px",
    height: "1px",
    background: "rgba(255,255,255,0.15)",
  },
  sidebarLabel: {
    color: "#fff",
    fontSize: "20px",
    fontWeight: "600",
    letterSpacing: "4px",
    writingMode: "vertical-rl",
    textOrientation: "mixed",
    transform: "rotate(180deg)",
    marginTop: "8px",
  },
  sidebarSub: {
    color: "rgba(255,255,255,0.4)",
    fontSize: "12px",
    letterSpacing: "1px",
    writingMode: "vertical-rl",
    textOrientation: "mixed",
    transform: "rotate(180deg)",
    whiteSpace: "pre",
    textAlign: "center",
  },

  /* Conteúdo */
  content: {
    flex: 1,
    padding: "48px 52px 36px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "28px",
  },
  contentTop: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    gap: "6px",
  },
  eyebrow: {
    fontSize: "28px",
    letterSpacing: "3.5px",
    color: "#FCAC21",
    fontWeight: "600",
    marginBottom: "16px",
  },
  certifiesLine: {
    fontSize: "20px",
    color: "#94a3b8",
    fontWeight: "400",
    letterSpacing: "0.5px",
  },
  studentName: {
    fontSize: "48px",
    fontWeight: "600",
    color: "#0B2373",
    fontFamily: "'Playfair Display', Georgia, serif",
    lineHeight: 1.2,
    margin: "8px 0 4px",
  },
  nameDivider: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "6px 0 10px",
  },
  nameDividerLine: {
    flex: 1,
    maxWidth: "64px",
    height: "1px",
    background: "#dbeafe",
  },
  nameDividerDot: {
    width: "5px",
    height: "5px",
    background: "#FCAC21",
    borderRadius: "50%",
  },
  courseTitle: {
    fontSize: "28px",
    fontWeight: "500",
    color: "#1E40AF",
    fontFamily: "'Playfair Display', Georgia, serif",
    fontStyle: "italic",
    marginTop: "4px",
    lineHeight: 1.4,
  },

  /* Meta */
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: "0",
    background: "#f8faff",
    border: "1px solid #dbeafe",
    borderRadius: "8px",
    padding: "16px 24px",
  },
  metaItem: {
    flex: 1,
    textAlign: "center",
  },
  metaSeparator: {
    width: "1px",
    height: "32px",
    background: "#dbeafe",
  },
  metaLabel: {
    fontSize: "14px",
    color: "#94a3b8",
    letterSpacing: "2px",
    fontWeight: "600",
    marginBottom: "4px",
  },
  metaValue: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#0B2373",
  },

  /* Footer */
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderTop: "1px solid #f1f5f9",
    paddingTop: "20px",
  },
  hashBlock: {
    maxWidth: "55%",
  },
  hashLabel: {
    fontSize: "8px",
    color: "#94a3b8",
    letterSpacing: "2px",
    fontWeight: "600",
    marginBottom: "4px",
  },
  hashValue: {
    fontSize: "10px",
    fontFamily: "'Courier New', monospace",
    color: "#64748b",
    wordBreak: "break-all",
    lineHeight: 1.5,
  },
  hashUrl: {
    fontSize: "9px",
    color: "#94a3b8",
    marginTop: "2px",
    wordBreak: "break-all",
  },
  signatureBlock: {
    textAlign: "right",
  },
  signatureLine: {
    width: "90px",
    height: "1.5px",
    background: "#0B2373",
    marginBottom: "6px",
    marginLeft: "auto",
  },
  signatureName: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#0B2373",
    letterSpacing: "0.5px",
  },
  signatureRole: {
    fontSize: "10px",
    color: "#94a3b8",
    marginTop: "2px",
  },

  /* Ações */
  actions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  },
  actionsHint: {
    fontSize: "12px",
    color: "#94a3b8",
    textAlign: "center",
    maxWidth: "380px",
    lineHeight: 1.6,
  },
  printButton: {
    background: "#1E40AF",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "0.75rem 2.5rem",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    letterSpacing: "0.3px",
    transition: "background 0.2s ease",
  },

  /* Skeleton */
  skeletonCard: {
    background: "#fff",
    borderRadius: "12px",
    padding: "3rem",
    width: "100%",
    maxWidth: "860px",
    minHeight: "320px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "0",
  },
  skeletonBar: {
    height: "5px",
    background: "#e2e8f0",
    borderRadius: "4px",
    width: "100%",
    marginBottom: "40px",
    animation: "pulse 1.5s ease-in-out infinite",
  },
  skeletonLine: {
    height: "16px",
    background: "#e2e8f0",
    borderRadius: "4px",
  },

  /* Error */
  errorCard: {
    background: "#fff",
    borderRadius: "12px",
    padding: "3rem",
    textAlign: "center",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  },
  errorIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#fee2e2",
    color: "#dc2626",
    fontSize: "18px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 12px",
  },
  errorTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#111827",
    marginBottom: "6px",
  },
  errorText: {
    fontSize: "13px",
    color: "#6b7280",
  },
};