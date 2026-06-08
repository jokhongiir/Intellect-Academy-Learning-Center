import React from "react";
import "./Courses.css";
import courseImage from "../../assets/boy.png";

const courses = [
  { title: "Арабский язык", desc: "Изучайте арабский язык с нуля до продвинутого уровня" },
  { title: "IT программирование", desc: "Frontend, Backend и современные технологии" },
  { title: "Английский язык", desc: "Грамматика, разговор и практика" },
  { title: "Английский для детей", desc: "Весёлое и интерактивное обучение" },
  { title: "Русский язык", desc: "Быстрое и эффективное изучение" },
  { title: "Ментальная арифметика", desc: "Развитие памяти и логики" },
];

const Courses = () => {
  return (
    <section className="courses" id="courses">
      <div className="container courses-container fade-up">
        <h2 className="courses-title">
          Наши <span>курсы</span>
        </h2>

        <div className="courses-wrapper">
          {/* LEFT IMAGE */}
          <div className="courses-image">
            <img src={courseImage} alt="Courses" />
          </div>

          {/* RIGHT LIST */}
          <ul className="courses-list">
            {courses.map((course, index) => (
              <li className="course-item" key={index}>
                <div className="course-number">{index + 1}</div>
                <div className="course-text">
                  <h3>{course.title}</h3>
                  <p>{course.desc}</p>
                </div>
                <div className="course-arrow">→</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Courses;