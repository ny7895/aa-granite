"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./blog.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GraniteVsQuartzMarble() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const [current, setCurrent] = useState("intro");
  const sectionRefs = useRef<Record<string, HTMLElement>>({});

  // Scroll‑spy
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrent(e.target.id);
        });
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const setRef = (id: string) => (el: HTMLElement) => {
    if (el) sectionRefs.current[id] = el;
  };

  const tocItems = [
    { id: "intro", label: "Introduction" },
    { id: "edge-profiles", label: "Edge Profiles" },
    { id: "granite", label: "1. Granite" },
    { id: "quartz", label: "2. Quartz" },
    { id: "marble", label: "3. Marble" },
    { id: "marble-bathroom", label: "Marble for Bathrooms" },
    { id: "maintenance", label: "Maintenance Tips" },
    { id: "conclusion", label: "Conclusion" },
  ];

  return (
    <div className={styles.container} id="top">
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

      <aside className={styles.toc}>
        <ul>
          {tocItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={current === item.id ? styles.tocActive : ""}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      <main className={styles.article}>
        {/* Introduction */}
        <section id="intro" ref={setRef("intro")} className={styles.section}>
          <h1>Introduction</h1>
          <p>
            Choosing the perfect countertop material can feel overwhelming—there
            are so many options, each with its own look, performance, and price
            range. In this article, we compare three of the most popular stones:
            <strong> granite</strong>, <strong>quartz</strong>, and{" "}
            <strong>marble</strong>, plus key edge profiles and eco‑friendly
            options to help you make an informed choice.
          </p>
        </section>

        {/* Edge Profiles */}
        <section
          id="edge-profiles"
          ref={setRef("edge-profiles")}
          className={styles.section}
        >
          <h2>Edge Profiles: The Finishing Touch</h2>
          <p>
            The edge you choose impacts style and durability. Here are the most
            popular profiles:
          </p>
          <ul>
            <li>
              <strong>Flat (Eased)</strong>: Straight, subtle bevel on top—clean
              and modern, ideal for contemporary kitchens.
            </li>
            <li>
              <strong>Beveled</strong>: A 45° chamfered cut—adds definition
              while remaining understated.
            </li>
            <li>
              <strong>Ogee</strong>: S‑shaped curves—classic and ornate, perfect
              for traditional or transitional designs.
            </li>
            <li>
              <strong>Bullnose</strong>: Fully rounded top—soft and safe, great
              for families and casual spaces.
            </li>
            <li>
              <strong>Mitered</strong>: Two slabs joined at a 45° seam—creates
              the illusion of a thick slab without the weight.
            </li>
          </ul>
          <div className={styles.examplesGrid}>
            {[
              {
                title: "Flat Edge",
                img: "https://aa-granite.s3.us-east-1.amazonaws.com/eased+edge.png",
              },
              {
                title: "Beveled edge",
                img: "https://aa-granite.s3.us-east-1.amazonaws.com/bevel+edge.png",
              },
              {
                title: "Bullnose Edge",
                img: "https://aa-granite.s3.us-east-1.amazonaws.com/bull+nose+edge.png",
              },
            ].map((ex, i) => (
              <figure key={i} className={styles.exampleCard}>
                <img src={ex.img} alt={ex.title} />
                <figcaption>{ex.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Granite */}
        <section
          id="granite"
          ref={setRef("granite")}
          className={styles.section}
        >
          <h2>1. Granite: Natural Beauty & Durability</h2>
          <img
            className={styles.sectionImage}
            src="https://aa-granite.s3.us-east-1.amazonaws.com/granite+counter.png"
            alt="Polished granite countertop"
          />
          <p>
            Granite is quarried from the earth, offering unique veining and
            coloration. Highly heat‑resistant, it stands up to daily wear. With
            proper sealing, it remains stain‑resistant and beautiful for
            decades.
          </p>
          <ul>
            <li>
              <strong>Pros:</strong> Unique patterns, high heat tolerance, very
              hard surface
            </li>
            <li>
              <strong>Cons:</strong> Requires annual sealing, can chip if struck
            </li>
          </ul>
        </section>

        {/* Quartz */}
        <section id="quartz" ref={setRef("quartz")} className={styles.section}>
          <h2>2. Quartz: Engineered Consistency</h2>
          <img
            className={styles.sectionImage}
            src="https://aa-granite.s3.us-east-1.amazonaws.com/quartz.png"
            alt="Modern quartz countertop"
          />
          <p>
            Quartz is man‑made by blending ground stone with resins, creating a
            non‑porous, low‑maintenance surface with consistent color and
            pattern—perfect for clean, modern kitchens.
          </p>
          <ul>
            <li>
              <strong>Pros:</strong> No sealing needed, resistant to stains &
              scratches
            </li>
            <li>
              <strong>Cons:</strong> Less heat‑tolerant than granite, can look
              artificial
            </li>
          </ul>
        </section>

        {/* Marble */}
        <section id="marble" ref={setRef("marble")} className={styles.section}>
          <h2>3. Marble: Luxury & Elegance</h2>
          <img
            className={styles.sectionImage}
            src="https://aa-granite.s3.us-east-1.amazonaws.com/madison-bracaglia-fcWAwPKpkTU-unsplash.jpg"
            alt="Classic marble countertop"
          />
          <p>
            Marble delivers timeless elegance—think classic Italian villas. It
            patinas over time, acquiring an “etched” look, and is softer than
            granite, ideal for low‑traffic areas or vintage‑style bathrooms.
          </p>
          <ul>
            <li>
              <strong>Pros:</strong> Stunning veining, luxurious feel, natural
              patina
            </li>
            <li>
              <strong>Cons:</strong> Prone to scratches & etching, requires
              regular sealing
            </li>
          </ul>
        </section>

        {/* Marble for Bathrooms */}
        <section
          id="marble-bathroom"
          ref={setRef("marble-bathroom")}
          className={styles.section}
        >
          <h2>Marble Countertops: Bathroom Considerations</h2>
          <img
            className={styles.sectionImage}
            src="https://aa-granite.s3.us-east-1.amazonaws.com/henry-co-ONnKNBzGWJw-unsplash.jpg"
            alt="Marble bathroom vanity"
          />
          <p>
            Marble is a classic choice for bathroom vanities, but it needs care:
          </p>
          <ul>
            <li>
              Seal every 6–12 months to protect against water spots and soap
              etching.
            </li>
            <li>
              Use gentle cleaners (pH‑neutral) to avoid stripping the seal.
            </li>
            <li>
              Pair with contrasting fixtures—matte black or brass looks
              stunning.
            </li>
          </ul>
        </section>

        {/* Maintenance Tips */}
        <section
          id="maintenance"
          ref={setRef("maintenance")}
          className={styles.section}
        >
          <h2>Maintenance Tips for All Stones</h2>
          <ol>
            <li>Wipe up spills immediately to prevent staining.</li>
            <li>Use cutting boards—never chop directly on the stone.</li>
            <li>Avoid harsh cleaners; mild soap & water is usually enough.</li>
            <li>Reseal natural stones (granite, marble) annually.</li>
          </ol>
        </section>

        {/* Conclusion */}
        <section
          id="conclusion"
          ref={setRef("conclusion")}
          className={styles.section}
        >
          <h2>Conclusion</h2>
          <p>
            <strong>Granite</strong> offers one‑of‑a‑kind durability,{" "}
            <strong>Quartz</strong> delivers low‑maintenance consistency, and{" "}
            <strong>Marble</strong> brings unparalleled elegance—especially in
            bathrooms.
          </p>
        </section>

        <div className={styles.topLink}>
          <a href="#top">Back on top</a>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerCTA}>
          <h2>Looking for Custom Countertop Solutions?</h2>
          <a href="/inquiry" className={styles.footerButton}>
            Contact Us for a Free Estimate
          </a>
        </div>
      </footer>
    </div>
  );
}
