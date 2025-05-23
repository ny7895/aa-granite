"use client";
import React, { useState, useEffect } from "react";
import styles from "./inquiry.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { usePathname } from "next/navigation";

type ExtendedLocomotiveScroll = {
  scrollTo: (
    target: Element | string | number,
    options?: { duration?: number; disableLerp?: boolean }
  ) => void;
  on: (event: string, callback: () => void) => void;
  off: (event: string, callback: () => void) => void;
  update: () => void;
  destroy: () => void;
  scroll?: {
    instance?: {
      scroll?: {
        y: number;
      };
    };
  };
};

export default function InquiryForm() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    material: "",
    edgeProfile: "",
    color: "",
    squareFootage: "",
    sinkCutout: "",
    measurementDate: "",
    installationDate: "",
    notes: "",
    estimate: "",
    knowsSquareFootage: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      import("locomotive-scroll").then((LocomotiveScrollModule) => {
        const scrollEl = document.querySelector(
          "#inquiry-container"
        ) as HTMLElement;
        if (!scrollEl) return;

        const scroll = new LocomotiveScrollModule.default({
          el: scrollEl,
          smooth: true,
        }) as unknown as ExtendedLocomotiveScroll;

        const handleScroll = () => ScrollTrigger.update();
        scroll.on("scroll", handleScroll);

        ScrollTrigger.scrollerProxy("#inquiry-container", {
          scrollTop(value) {
            if (typeof value === "number") {
              scroll.scrollTo(value, { duration: 0, disableLerp: true });
              return;
            }
            return scroll.scroll?.instance?.scroll?.y || 0;
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            };
          },
          pinType: scrollEl.style.transform ? "transform" : "fixed",
        });

        const handleResize = () => ScrollTrigger.refresh();
        window.addEventListener("resize", handleResize);

        ScrollTrigger.addEventListener("refresh", () => scroll.update());
        ScrollTrigger.refresh();

        return () => {
          if (scroll.off) scroll.off("scroll", handleScroll);
          window.removeEventListener("resize", handleResize);
          ScrollTrigger.clearMatchMedia();
          scroll.destroy();
        };
      });
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("Submitting...");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/inquiry`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setMessage("Inquiry submitted successfully!");
        setFormData({
          name: "",
          phone: "",
          email: "",
          address: "",
          material: "",
          edgeProfile: "",
          color: "",
          squareFootage: "",
          sinkCutout: "",
          measurementDate: "",
          installationDate: "",
          notes: "",
          estimate: "",
          knowsSquareFootage: "",
        });
      } else {
        setMessage("Error submitting inquiry. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <div id="inquiry-container" data-scroll-container>
      <div data-scroll-section className={styles.contactLayout}>
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
        {/* Left Column - Contact Text */}
        <div className={styles.contactTextContent}>
          <h2 className={styles.contactHeader}>GET IN TOUCH</h2>
          <p className={styles.contactTagline}>
            Let's create something{" "}
            <span className={styles.highlight}>beautiful</span> together.
          </p>

          <div className={styles.contactDetails}>
            <p>Available for consultations</p>
            <p>DoubleAGraniteABQ@gmail.com</p>
            <p>english: 505-267-9060</p>
            <p>espanol: 505-818-2430</p>
            <p>se habla español</p>
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.inquiryFormContainer}>
          <h1 className={styles.inquiryTitle}>Request a Quote</h1>
          <p className={styles.inquirySubtitle}>
            Fill out the form below to get started on your project. Not all
            fields are required but it does help.
          </p>

          {message && <p className={styles.inquiryMessage}>{message}</p>}

          <form className={styles.inquiryForm} onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone Number */}
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Address */}
            <div className={styles.formGroup}>
              <label htmlFor="address">Installation Address</label>
              <input
                id="address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            {/* Material Selection */}
            <div className={styles.formGroup}>
              <label htmlFor="material">Material</label>
              <select
                id="material"
                name="material"
                value={formData.material}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Select a material
                </option>
                <option value="Granite">Granite</option>
                <option value="Marble">Marble</option>
                <option value="Quartz">Quartz</option>
              </select>
            </div>

            {/* Edge Profile */}
            <div className={styles.formGroup}>
              <label htmlFor="edgeProfile">Edge Profile</label>
              <select
                id="edgeProfile"
                name="edgeProfile"
                value={formData.edgeProfile}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Select an edge profile
                </option>
                <option value="Straight">Straight</option>
                <option value="Beveled">Beveled</option>
                <option value="Rounded">Rounded</option>
                <option value="Not sure">Not sure</option>
              </select>
            </div>

            {/* Color Preference */}
            <div className={styles.formGroup}>
              <label htmlFor="color">Color Preference</label>
              <input
                id="color"
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
              />
            </div>

            {/* Square Footage */}
            <div className={styles.formGroup}>
              <label htmlFor="knowsSquareFootage">
                Do you know the square footage?
              </label>
              <select
                id="knowsSquareFootage"
                name="knowsSquareFootage"
                value={formData.knowsSquareFootage}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            {/* Knows Square Footage */}
            {formData.knowsSquareFootage === "yes" && (
              <div className={styles.formGroup}>
                <label htmlFor="squareFootage">Estimated Square Footage</label>
                <input
                  id="squareFootage"
                  type="number"
                  name="squareFootage"
                  min="1"
                  value={formData.squareFootage}
                  onChange={handleChange}
                  placeholder="Enter approximate square footage"
                />
              </div>
            )}
            {/* Sink Cutout */}
            <div className={styles.formGroup}>
              <label htmlFor="sinkCutout">Do you need a sink cutout?</label>
              <select
                id="sinkCutout"
                name="sinkCutout"
                value={formData.sinkCutout}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Select an option
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Measurement Date */}
            <div className={styles.formGroup}>
              <label htmlFor="measurementDate">
                Preferred Measurement Date
              </label>
              <input
                id="measurementDate"
                type="date"
                name="measurementDate"
                value={formData.measurementDate}
                onChange={handleChange}
              />
            </div>

            {/* Installation Date */}
            <div className={styles.formGroup}>
              <label htmlFor="installationDate">
                Preferred Installation Date
              </label>
              <input
                id="installationDate"
                type="date"
                name="installationDate"
                value={formData.installationDate}
                onChange={handleChange}
              />
            </div>

            {/* Additional Notes */}
            <div className={styles.formGroup}>
              <label htmlFor="notes">Additional Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
              ></textarea>
            </div>

            <button className={styles.submitButton} type="submit">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
