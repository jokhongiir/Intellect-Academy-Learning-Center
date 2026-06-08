import React, { useState, useEffect } from "react";
import { FiMenu, FiX, FiPhone } from "react-icons/fi";
import logo from "../../assets/logo.png";
import "./Navbar.css";

const MENU_ITEMS = [
  { name: "Bosh sahifa", link: "#hero" },
  { name: "Biz haqimizda", link: "#about" },
  { name: "Kurslar", link: "#courses" },
  { name: "Ustozlar", link: "#teachers" },
  { name: "Natijalar", link: "#results" },
  { name: "Aloqa", link: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menyu ochilganda orqa fon skroll bo'lmasligi uchun
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""} ${open ? "menu-is-open" : ""}`}>
      <div className="container nav-container">
        
        {/* LOGO AREA */}
        <a href="#hero" className="logo" onClick={() => setOpen(false)}>
          <img src={logo} alt="Intellect Academy logotipi" />
          <div className="logo-text">
            <h3>Intellect Academy</h3>
            <p>O‘quv Markazi</p>
          </div>
        </a>

        {/* NAVIGATION LINKS (Tepadan tushadigan qism) */}
        <nav className={`nav-menu ${open ? "active" : ""}`}>
          <div className="nav-links-wrapper">
            {MENU_ITEMS.map((item, index) => (
              <a 
                key={index} 
                href={item.link} 
                className="nav-link"
                style={{ "--i": index }} /* CSS-da ketma-ketlik animatsiyasi uchun */
                onClick={() => setOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* MOBILE EXTRA ACTIONS */}
          <div className="mobile-extra">
            <a href="tel:+998901234567" className="phone-link">
              <FiPhone /> +998 90 123 45 67
            </a>
            <button className="primary-btn nav-cta-mobile" type="button">
              Kursga yozilish
            </button>
          </div>
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="nav-actions">
          <a href="tel:+998901234567" className="phone-link">
            <FiPhone aria-hidden="true" />
            <span>+998 90 123 45 67</span>
          </a>
          <button className="primary-btn nav-cta" type="button">
            Kursga yozilish
          </button>
        </div>

        {/* BURGER TRIGGER BUTTON */}
        <button 
          className="burger-btn" 
          onClick={() => setOpen(!open)}
          aria-label="Menyuni ochish/yopish"
          aria-expanded={open}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>

      </div>
    </header>
  );
};

export default Navbar;