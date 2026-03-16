import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BsGithub, BsArrowRight } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import "./ProjectCards.css";

function ProjectCards(props) {
  const navigate = useNavigate();
  const { title, description, imgPath, images, tags, isBlog, blogId, ghLink, demoLink } = props;

  // Image carousel — uses `images` array if provided, else falls back to single `imgPath`
  const imageList = images && images.length > 0 ? images : imgPath ? [imgPath] : [];
  const [currentImg, setCurrentImg] = useState(0);
  const [fading, setFading] = useState(false);
  const intervalRef = useRef(null);
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Auto-shuffle images every 2.8s
  useEffect(() => {
    if (imageList.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrentImg((prev) => (prev + 1) % imageList.length);
        setFading(false);
      }, 320);
    }, 2800);
    return () => clearInterval(intervalRef.current);
  }, [imageList.length]);

  // Scroll reveal
  useEffect(() => {
    const el = cardRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleBlogClick = () => {
    if (blogId) navigate(`/blog/${blogId}`);
  };

  return (
    <div ref={cardRef} className={`pc-card ${visible ? "pc-card--visible" : ""}`}>
      {/* Image Area */}
      <div className="pc-img-wrap">
        {imageList.length > 0 ? (
          <img
            src={imageList[currentImg]}
            alt={title}
            className={`pc-img ${fading ? "pc-img--fade" : ""}`}
          />
        ) : (
          <div className="pc-img-placeholder">
            <span className="pc-placeholder-hex">⬡</span>
          </div>
        )}

        {/* Dot indicators */}
        {imageList.length > 1 && (
          <div className="pc-dots">
            {imageList.map((_, i) => (
              <button
                key={i}
                className={`pc-dot ${i === currentImg ? "pc-dot--active" : ""}`}
                onClick={() => {
                  setCurrentImg(i);
                  clearInterval(intervalRef.current);
                }}
              />
            ))}
          </div>
        )}

        {/* Tag strip */}
        {tags && tags.length > 0 && (
          <div className="pc-tags">
            {tags.slice(0, 3).map((t) => (
              <span key={t} className="pc-tag">{t}</span>
            ))}
          </div>
        )}

        {/* Image count badge */}
        {imageList.length > 1 && (
          <div className="pc-img-count">
            {currentImg + 1}/{imageList.length}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="pc-body">
        <h3 className="pc-title">{title}</h3>
        <p className="pc-desc">{description}</p>

        <div className="pc-actions">
          {isBlog && (
            <button className="pc-btn pc-btn--primary" onClick={handleBlogClick}>
              Read Blog <BsArrowRight className="pc-btn-icon" />
            </button>
          )}
          {!isBlog && ghLink && (
            <a className="pc-btn pc-btn--primary" href={ghLink} target="_blank" rel="noreferrer">
              <BsGithub /> &nbsp;GitHub
            </a>
          )}
          {!isBlog && demoLink && (
            <a className="pc-btn pc-btn--ghost" href={demoLink} target="_blank" rel="noreferrer">
              <CgWebsite /> &nbsp;Demo
            </a>
          )}
        </div>
      </div>

      {/* Decorative corner */}
      <div className="pc-corner-accent" />
    </div>
  );
}

export default ProjectCards;
