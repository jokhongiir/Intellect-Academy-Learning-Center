import React from "react";
import "./Reviews.css";
import { FaStar } from "react-icons/fa";

const reviewsData = [
  {
    name: "От Gulnora M.",
    rating: 5,
    comment: "Assalomu alaykum! Intellect Academyga katta rahmat. Farzandimning bilimlari ancha o'sdi, darslar interaktiv va qiziqarli o'tmoqda.",
    video: null,
  },
  {
    name: "От Rustam Q.",
    rating: 5,
    comment: "Rahmat Intellect Academy! Bolalarimiz har doim darsdan zavq olib chiqadi. Malakali ustozlar va ajoyib muhit.",
    video: null,
  },
  {
    name: "От Malika S.",
    rating: 5,
    comment: "Farzandimning nutqi va ijodiy fikrlashi ancha yaxshilandi. Intellect Academyga rahmat, ishlariiz barakali bo'lsin!",
    video: null,
  },
  {
    name: "От Azizbek T.",
    rating: 5,
    comment: "Katta rahmat Intellect Academyga! Bolalar darsdan keyin uyda ham mustaqil mashq qilmoqda, bilimlari mustahkamlandi.",
    video: null,
  },
  {
    name: "От Nilufar J.",
    rating: 5,
    comment: "Intellect Academy bilan ishlash juda yoqimli. Atmosfera iliq va bolalar darsda juda faol.",
    video: null,
  },
  {
    name: "От Sardor A.",
    rating: 5,
    comment: "Rahmat sizga! Farzandimning rivojlanishini ko‘rib hursand bo‘lamiz. Intellect Academy ajoyib!",
    video: null,
  },
];

const Reviews = () => {
  return (
    <section className="reviews" id="reviews">
      <div className="container">
        <h2 className="reviews-title fade-up">
          Отзывы <span>родителей</span>
        </h2>

        <div className="reviews-grid">
          {reviewsData.map((review, index) => (
            <div
              key={index}
              className="review-card fade-up"
              style={{ animationDelay: `${0.2 * index}s` }}
            >
              <div className="review-rating">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="review-comment">{review.comment}</p>
              <h4 className="review-name">{review.name}</h4>
              {review.video && (
                <video className="review-video" controls>
                  <source src={review.video} type="video/mp4" />
                  Ваш браузер не поддерживает видео.
                </video>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;