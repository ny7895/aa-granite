"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "./styles.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

const projects = [
  {
    id: 1,
    title: "Luxury Kitchen Remodel",
    description:
      "Custom marble countertops installation in Albuquerque, NM by Double A Granite",
    category: "residential",
    bgColor: "#e8e0d9",
    textColor: "#1a1a1a",
    image: "https://aa-granite.s3.us-east-1.amazonaws.com/IMG_2014.jpeg",
  },
  {
    id: 2,
    title: "Outside Bar",
    description:
      "Commercial-grade marble outside bar top installation in Albuquerque, NM by Double A Granite",
    category: "commercial",
    bgColor: "#1a1a1a",
    textColor: "#ffffff",
    image: "https://aa-granite.s3.us-east-1.amazonaws.com/IMG_2012.jpeg",
  },
  {
    id: 3,
    title: "Waterfall edge",
    description:
      "Premium marble kitchen waterfall edge installation in Albuquerque, NM by Double A Granite",
    category: "residential",
    bgColor: "#e8e0d9",
    textColor: "#1a1a1a",
    image: "https://aa-granite.s3.us-east-1.amazonaws.com/IMG_0749.jpeg",
  },
];

export default function Projects() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const titlesRef = useRef<HTMLHeadingElement[]>([]);
  const descriptionsRef = useRef<HTMLParagraphElement[]>([]);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(true);

  const addToRefs =
    (refArray: React.MutableRefObject<any[]>, index: number) => (el: any) => {
      if (el) refArray.current[index] = el;
    };

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      // Mobile detection and setup
      const isMobile = window.innerWidth <= 768;

      if (isMobile) {
        // Mobile-specific setup - ensure all content is visible immediately
        gsap.set(
          [
            ...imagesRef.current,
            ...titlesRef.current,
            ...descriptionsRef.current,
          ],
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
          }
        );

        // Simple fade-in animation for mobile
        gsap.utils
          .toArray<HTMLElement>(".project-section")
          .forEach((section, i) => {
            const image = section.querySelector(
              ".project-image"
            ) as HTMLElement;
            const title = section.querySelector(
              ".project-title"
            ) as HTMLElement;
            const desc = section.querySelector(
              ".project-description"
            ) as HTMLElement;

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none none",
              },
            });

            tl.from([title, desc, image], {
              opacity: 0,
              y: 30,
              duration: 0.8,
              stagger: 0.1,
              ease: "power2.out",
            });
          });

        // Hide scroll hint on mobile
        setShowScrollHint(false);
      } else {
        // Desktop animations (original implementation)
        gsap.set(imagesRef.current, {
          y: "30vh",
          scale: 0.95,
          opacity: 0,
        });
        gsap.set([titlesRef.current, descriptionsRef.current], {
          x: -30,
          opacity: 0,
        });

        sectionsRef.current.forEach((section, i) => {
          if (!section) return;

          // Hide scroll hint when reaching last section
          if (i === projects.length - 1) {
            ScrollTrigger.create({
              trigger: section,
              start: "top center",
              end: "bottom center",
              onEnter: () => setShowScrollHint(false),
              onLeaveBack: () => setShowScrollHint(true),
            });
          }

          // Text color change
          ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
            onEnter: () => {
              gsap.to(scrollHintRef.current, {
                color: projects[i].textColor,
                duration: 0.5,
              });
            },
            onEnterBack: () => {
              gsap.to(scrollHintRef.current, {
                color: projects[i].textColor,
                duration: 0.5,
              });
            },
          });

          // Image animation
          gsap.to(imagesRef.current[i], {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              end: "top 40%",
              scrub: 1,
            },
          });

          // Text animation
          gsap.to(titlesRef.current[i], {
            x: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 60%",
              scrub: 1,
            },
          });

          gsap.to(descriptionsRef.current[i], {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.1,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 60%",
              scrub: 1,
            },
          });

          // Push previous image up when leaving
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom top",
            onLeave: () => {
              if (i > 0) {
                gsap.to(imagesRef.current[i - 1], {
                  y: "-30vh",
                  scale: 0.9,
                  opacity: 0,
                  duration: 0.8,
                });
              }
            },
            onEnterBack: () => {
              if (i > 0) {
                gsap.to(imagesRef.current[i - 1], {
                  y: 0,
                  scale: 1,
                  opacity: 1,
                  duration: 0.8,
                });
              }
            },
          });
        });
      }

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, []);

  return (
    <div id="projects-page">
      <header className="navbar">
        <div className="navbar__brand">
          <Link href="/">Double A Granite</Link>
        </div>

        {/* Hamburger toggle—hidden on desktop */}
        <button
          className="navbar__toggle"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <nav className={`navbar__nav ${menuOpen ? "open" : ""}`}>
          {[
            { href: "/", label: "Home" },
            { href: "/projects", label: "Projects" },
            { href: "/blog", label: "Blog" },
            { href: "/inquiry", label: "Quote" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href
                  ? "navbar__link navbar__link--active"
                  : "navbar__link"
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
      <div className="projects-hero">
        <h1>Our Expertise</h1>
        <p>Scroll to discover our craftsmanship</p>
        <p>
          Our granite countertop installation services in Albuquerque ensure
          durability and elegance for any of your needs.
        </p>
      </div>

      <div className="projects-container">
        {projects.map((project, index) => (
          <section
            key={project.id}
            className="project-section"
            ref={addToRefs(sectionsRef, index)}
            style={{
              backgroundColor: project.bgColor,
              color: project.textColor,
            }}
          >
            <div className="project-content">
              <div className="text-content">
                <h2 className="project-title" ref={addToRefs(titlesRef, index)}>
                  {project.title}
                </h2>
                <p
                  className="project-description"
                  ref={addToRefs(descriptionsRef, index)}
                >
                  {project.description}
                </p>
              </div>

              <div
                className="project-image"
                ref={addToRefs(imagesRef, index)}
                style={{ backgroundImage: `url(${project.image})` }}
              ></div>
            </div>
          </section>
        ))}
      </div>

      {showScrollHint && (
        <div className="scroll-hint" ref={scrollHintRef}>
          <div className="scroll-hint-arrow"></div>
          <span>Scroll to explore</span>
        </div>
      )}

      <footer className="projects-footer">
        <h3>Ready to transform your space?</h3>
        <Link href="/inquiry" className="cta-button">
          Schedule a Consultation
        </Link>
      </footer>
    </div>
  );
}
