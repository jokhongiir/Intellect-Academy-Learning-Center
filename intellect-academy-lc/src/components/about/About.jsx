import React, { useEffect, useRef, useState } from "react";
import "./About.css";

import {
  FaGraduationCap,
  FaLanguage,
  FaChalkboardTeacher,
  FaSchool,
} from "react-icons/fa";

import student from "../../assets/clarified_image.png";

/* ================= NEW DATA ================= */
const items = [
  {
    icon: <FaGraduationCap />,
    value: 1500,
    suffix: "+",
    title: "Bitirgan talabalar",
    desc: "Real natija ko‘rsatgan bitiruvchilar bazasi",
  },
  {
    icon: <FaLanguage />,
    value: 12,
    suffix: "",
    title: "O‘quv dasturlari",
    desc: "IT, dizayn, til va soft skills kurslari",
  },
  {
    icon: <FaChalkboardTeacher />,
    value: 45,
    suffix: "",
    title: "Mentorlar jamoasi",
    desc: "Industry tajribasiga ega ustozlar",
  },
  {
    icon: <FaSchool />,
    value: 5,
    suffix: "",
    title: "Ta’lim markazlari",
    desc: "Toshkent va viloyatlarda filiallar",
  },
];

/* ================= COUNTER ================= */
const Counter = ({ target, suffix, start }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let current = 0;
    const step = Math.ceil(target / 70);

    const timer = setInterval(() => {
      current += step;

      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [start, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const About = () => {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(true);
      },
      { threshold: 0.25 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className={`about ${show ? "show" : ""}`}>

      {/* BACKGROUND */}
      <div className="about-bg">
        <div className="blob b1" />
        <div className="blob b2" />
      </div>

      <div className="about-container">

        {/* LEFT CONTENT (NEW STYLE COPY) */}
        <div className="about-left">

          <div className="badge">📊 Ta’lim Statistikasi</div>

          <h2>
            Natijalarimiz
            <span> real o‘sish va tajriba asosida</span>
          </h2>

          <p>
            Intellect Academy — faqat kurs emas, balki real skills beradigan
            ta’lim ekotizimi. Har bir o‘quvchi bizda amaliy natija bilan chiqadi.
          </p>

          {/* GRID */}
          <div className="grid">
            {items.map((item, i) => (
              <div
                key={i}
                className={`card ${show ? "show" : ""}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="icon">{item.icon}</div>

                <div>
                  <h4>
                    <Counter
                      target={item.value}
                      suffix={item.suffix}
                      start={show}
                    />
                  </h4>

                  <p>{item.title}</p>
                  <span className="desc">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT VISUAL (DIFFERENT STORY) */}
        <div className={`right ${show ? "show" : ""}`}>

          <div className="imageBox">

            <img src={student} alt="student" />

            <div className="tag t1">📈 Progress tracking</div>
            <div className="tag t2">🧠 Skill based learning</div>
            <div className="tag t3">🌍 International level</div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default About;