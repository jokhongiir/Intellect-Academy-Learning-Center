import React, { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "framer-motion";
import {
  FiArrowRight,
  FiPlay,
  FiUsers,
  FiBookOpen,
  FiAward,
  FiCheckCircle,
} from "react-icons/fi";
import logo from "../../assets/logo.png";
import "./Hero.css";

const Counter = ({ from = 0, to, suffix = "" }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest) + suffix);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, {
        duration: 2,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [count, to, isInView]);

  return <motion.h3 ref={ref}>{rounded}</motion.h3>;
};

const STATS_DATA = [
  { id: 1, icon: <FiUsers />, count: 1500, suffix: "+", label: "O‘quvchilar" },
  { id: 2, icon: <FiBookOpen />, count: 50, suffix: "+", label: "Kurslar" },
  { id: 3, icon: <FiAward />, count: 10, suffix: "+", label: "Yillik tajriba" },
  {
    id: 4,
    icon: <FiCheckCircle />,
    count: 95,
    suffix: "%",
    label: "Muvaffaqiyat",
  },
];

const FLOATING_TAGS = [
  { id: 1, text: "📚 Professional kurslar", className: "f1" },
  { id: 2, text: "🌍 Barcha yo‘nalishlar", className: "f2" },
  { id: 3, text: "🏫 Intellect Academy", className: "f3" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Hero = () => {
  return (
    <section className="hero" aria-label="Asosiy qism">
      <div className="bg-blur b1" aria-hidden="true" />
      <div className="bg-blur b2" aria-hidden="true" />

      <div className="container hero-container">
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          <motion.div variants={fadeInUp} className="badge">
            🎓 Intellect Academy
          </motion.div>

          <motion.h1 variants={fadeInUp}>
            Bilim va kelajakni <br />
            <span>Intellect Academy bilan quring</span>
          </motion.h1>

          <motion.p variants={fadeInUp}>
            Intellect Academy — zamonaviy o‘quv markazi. Ingliz tili, IT,
            matematika, rus tili, arab tili va maktab tayyorlov kurslari bir
            joyda.
          </motion.p>

          <motion.div variants={fadeInUp} className="buttons">
            <button className="primary-btn" type="button">
              Kurslarni ko‘rish <FiArrowRight aria-hidden="true" />
            </button>
            <button className="secondary-btn" type="button">
              <FiPlay aria-hidden="true" /> Video
            </button>
          </motion.div>

          <motion.div variants={fadeInUp} className="stats">
            {STATS_DATA.map((stat) => (
              <div key={stat.id} className="stat">
                <span className="stat-icon">{stat.icon}</span>
                <div>
                  <Counter to={stat.count} suffix={stat.suffix} />
                  <span>{stat.label}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="image-wrapper">
            <img src={logo} alt="Intellect Academy logotipi" loading="eager" />

            {FLOATING_TAGS.map((tag) => (
              <motion.div
                key={tag.id}
                className={`float ${tag.className}`}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                  delay: tag.id * 0.4,
                }}
              >
                {tag.text}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
