import React, { useState, useRef, useEffect } from "react";
import { 
  FaUser, FaPhoneAlt, FaCheckCircle, FaSpinner, 
  FaArrowRight, FaTimesCircle, FaCheck, FaChevronDown, FaTimes, FaHeadset 
} from "react-icons/fa";
import "./RegisterForm.css";
import logo from "../../assets/logo.png"; 

const COURSES = [
  { id: "arabic", name: "Арабский язык"},
  { id: "it-programming", name: "IT Программирование"},
  { id: "english", name: "Английский язык"},
  { id: "russian", name: "Русский язык" },
  { id: "english-kids", name: "Английский для детей"},
  { id: "math", name: "Математика" },
  { id: "mental-arithmetic", name: "Ментальная арифметика"},
  { id: "pochemuchka", name: "Почемучка" },
];

const BRANCHES = [
  { id: "Massiv", name: "Метро Толарик " },
  { id: "Honabot", name: "Метро Хонобод (68-я поликлиника)" },
];

const TELEGRAM_BOT_TOKEN = "8524999950:AAFWuv495VHXhytltftk5_EpDvgX-clZU6w";
const TELEGRAM_CHAT_IDS = ["5507546111", "1828687504", "744504387", "5704467"];

const RegisterForm = () => {
  const [formData, setFormData] = useState({ fullName: "", phone: "+998 ", courses: [], branch: "" });
  const [status, setStatus] = useState({ loading: false, type: null });

  // har dropdown uchun alohida state
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [branchOpen, setBranchOpen] = useState(false);

  const coursesRef = useRef(null);
  const branchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (coursesRef.current && !coursesRef.current.contains(event.target)) setCoursesOpen(false);
      if (branchRef.current && !branchRef.current.contains(event.target)) setBranchOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatPhoneNumber = (value) => {
    if (!value) return "+998 ";
    const numbers = value.replace(/[^\d]/g, "");
    const cut = numbers.startsWith("998") ? numbers.slice(3) : numbers;
    let res = "+998 ";
    if (cut.length > 0) res += "(" + cut.slice(0, 2);
    if (cut.length > 2) res += ") " + cut.slice(2, 5);
    if (cut.length > 5) res += "-" + cut.slice(5, 7);
    if (cut.length > 7) res += "-" + cut.slice(7, 9);
    return res;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (value.length < 5) return; 
      setFormData((prev) => ({ ...prev, phone: formatPhoneNumber(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toggleCourse = (courseName) => {
    setFormData(prev => {
      const isSelected = prev.courses.includes(courseName);
      return isSelected 
        ? { ...prev, courses: prev.courses.filter(c => c !== courseName) }
        : { ...prev, courses: [...prev.courses, courseName] };
    });
  };

  const selectBranch = (branchName) => {
    setFormData(prev => ({ ...prev, branch: branchName }));
    setBranchOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.phone.length < 19 || formData.courses.length === 0 || !formData.branch) {
      alert("Пожалуйста, заполните все поля и выберите курс и филиал");
      return;
    }
    setStatus({ loading: true, type: null });

    const message = `🌟 **НОВАЯ ЗАЯВКА**\n━━━━━━━━━━━━━━\n👤 **Ф.И.О:** ${formData.fullName}\n📞 **Тел:** ${formData.phone}\n📚 **Курсы:** ${formData.courses.join(", ")}\n🏫 **Филиал:** ${formData.branch}\n━━━━━━━━━━━━━━\n🕒 **Дата:** ${new Date().toLocaleString('ru-RU')}`;

    try {
      await Promise.all(TELEGRAM_CHAT_IDS.map(chatId =>
        fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "Markdown" }),
        })
      ));
      setStatus({ loading: false, type: "success" });
      setFormData({ fullName: "", phone: "+998 ", courses: [], branch: "" });
    } catch {
      setStatus({ loading: false, type: "error" });
    }
  };

  return (
    <div className="app-container">
      <div className="dynamic-bg">
        <div className="blob b-1"></div>
        <div className="blob b-2"></div>
      </div>

      <div className="glass-card fade-up">
        <header className="brand-identity">
          <div className="logo-wrapper">
            <img src={logo} alt="Logo" className="academy-logo" />
            <div className="logo-glow"></div>
          </div>
          <h1 className="brand-name">INTELLECT <span>ACADEMY</span></h1>
          <p className="brand-tag">Learning Center</p>
        </header>

        <form onSubmit={handleSubmit} className="premium-grid">
          {/* Full Name */}
          <div className="form-group">
            <label className="field-label">Ваше полное имя</label>
            <div className="input-wrapper">
              <FaUser className="input-icon" />
              <input 
                name="fullName" 
                type="text" 
                placeholder="Напр: Иван Иванов" 
                value={formData.fullName} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          {/* Phone */}
          <div className="form-group">
            <label className="field-label">Контактный номер</label>
            <div className="input-wrapper">
              <FaPhoneAlt className="input-icon" />
              <input 
                name="phone" 
                type="tel" 
                maxLength="19" 
                value={formData.phone} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          {/* Courses */}
          <div className="form-group" ref={coursesRef}>
            <label className="field-label">Выберите направления</label>
            <div className={`pro-dropdown ${coursesOpen ? 'active' : ''}`}>
              <div className="select-trigger" onClick={() => setCoursesOpen(!coursesOpen)}>
                <div className="chips-container">
                  {formData.courses.length === 0 ? (
                    <span className="placeholder">Нажмите для выбора...</span>
                  ) : (
                    formData.courses.map(course => (
                      <span key={course} className="selection-chip">
                        {course}
                        <FaTimes className="remove-chip" onClick={(e) => { e.stopPropagation(); toggleCourse(course); }} />
                      </span>
                    ))
                  )}
                </div>
                <FaChevronDown className={`chevron ${coursesOpen ? 'rotate' : ''}`} />
              </div>
              <div className="options-panel">
                {COURSES.map(course => (
                  <div 
                    key={course.id} 
                    className={`option-row ${formData.courses.includes(course.name) ? 'selected' : ''}`} 
                    onClick={() => toggleCourse(course.name)}
                  >
                    <span className="course-text">{course.name}</span>
                    <div className="custom-check">{formData.courses.includes(course.name) && <FaCheck />}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Branch */}
          <div className="form-group" ref={branchRef}>
            <label className="field-label">Выберите филиал</label>
            <div className={`pro-dropdown ${branchOpen ? 'active' : ''}`}>
              <div className="select-trigger" onClick={() => setBranchOpen(!branchOpen)}>
                <div className="chips-container">
                  {!formData.branch ? (
                    <span className="placeholder">Выберите филиал...</span>
                  ) : (
                    <span className="selection-chip">
                      {formData.branch}
                      <FaTimes className="remove-chip" onClick={(e) => { e.stopPropagation(); setFormData(p => ({ ...p, branch: "" })); }} />
                    </span>
                  )}
                </div>
                <FaChevronDown className={`chevron ${branchOpen ? 'rotate' : ''}`} />
              </div>
              <div className="options-panel">
                {BRANCHES.map(branch => (
                  <div 
                    key={branch.id} 
                    className={`option-row ${formData.branch === branch.name ? 'selected' : ''}`} 
                    onClick={() => selectBranch(branch.name)}
                  >
                    <span className="course-text">{branch.name}</span>
                    <div className="custom-check">{formData.branch === branch.name && <FaCheck />}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button type="submit" className="submit-btn-premium" disabled={status.loading}>
            {status.loading ? <FaSpinner className="spin-loader" /> : (
              <>
                <span>Отправить заявку</span>
                <div className="btn-icon-box"><FaArrowRight /></div>
              </>
            )}
          </button>
        </form>

        {/* Support Footer */}
        <footer className="form-footer-pro">
          <div className="support-badge">
            <div className="s-icon"><FaHeadset /></div>
            <div className="s-info">
              <span className="s-title">Служба поддержки</span>
              <a href="tel:+998334325555" className="s-link">+998 33 432 55 55</a>
            </div>
          </div>
        </footer>
      </div>

      {/* Modal */}
      {status.type && (
        <div className="modal-overlay">
          <div className={`premium-modal ${status.type} fade-up`}>
            <div className="modal-visual">
              {status.type === 'success' ? <FaCheckCircle /> : <FaTimesCircle />}
              <div className="visual-pulse"></div>
            </div>
            <h2>{status.type === 'success' ? "Принято!" : "Ошибка"}</h2>
            <p>{status.type === 'success' 
              ? "Мы получили вашу заявку. Наш менеджер свяжется с вами в ближайшее время." 
              : "Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз."}
            </p>
            <button className="modal-close" onClick={() => setStatus({ loading: false, type: null })}>
              Понятно
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
