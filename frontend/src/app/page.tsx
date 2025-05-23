"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./style.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Head from "next/head";
import { usePathname } from "next/navigation";
import SeoScript from "../app/components/SeoScript"; // wherever you placed it

export default function Home() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      // Configure ScrollTrigger to use the default window scroller
      ScrollTrigger.defaults({
        scroller: window,
      });

      // Mobile detection and setup
      const isMobile = window.innerWidth <= 768;

      if (isMobile) {
        // Mobile-specific animation setup
        gsap.utils.toArray<HTMLElement>(".staggered-row").forEach((row, i) => {
          const heading = row.querySelector(".section-heading") as HTMLElement;
          const description = row.querySelector(
            ".section-description"
          ) as HTMLElement;
          const image = row.querySelector(".image-contain") as HTMLElement;

          // Set initial state for mobile
          gsap.set([heading, description, image], {
            opacity: 1,
            y: 0,
            x: 0,
          });

          // Create simpler mobile animations
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none none",
            },
          });

          tl.from([heading, description, image], {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
          });
        });
        gsap.fromTo(
          ".image-container",
          { scale: 0.6, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "expo.out",
            stagger: { amount: 0.8, from: "center" },
            delay: 0.7,
            clearProps: "transform,opacity",
          }
        );
        gsap.from("#site-title", {
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",
          delay: 0.5, // slight delay so things don’t all pop at once
        });
      } else {
        // Desktop animations (your original code)

        gsap.utils.toArray<HTMLElement>(".staggered-row").forEach((row, i) => {
          const heading = row.querySelector(".section-heading") as HTMLElement;
          const description = row.querySelector(
            ".section-description"
          ) as HTMLElement;
          const image = row.querySelector(".image-contain") as HTMLElement;

          // Set initial visible state
          gsap.set([heading, description], { opacity: 1, y: 0 });

          // Create timeline for each row
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 1,
            },
          });

          // Animation sequence
          tl.from(heading, {
            y: 100,
            opacity: 0,
            duration: 0.8,
          })
            .from(
              description,
              {
                y: 80,
                opacity: 0,
                duration: 0.6,
              },
              "-=0.4"
            )
            .from(
              image,
              {
                x: i % 2 === 0 ? 200 : -200,
                opacity: 0,
                duration: 1,
              },
              "-=0.6"
            );
        });
        gsap.fromTo(
          ".image-container",
          { scale: 0.6, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "expo.out",
            stagger: { amount: 0.8, from: "center" },
            delay: 0.7,
            clearProps: "transform,opacity",
          }
        );

        gsap.from("#site-title", {
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",
          delay: 0.5, // slight delay so things don’t all pop at once
        });
      }
      // Cleanup function
      return () => {
        ScrollTrigger.clearMatchMedia();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, []);

  return (
    <div id="main">
      <Head>
        {/* Primary Meta Tags */}
        <title>
          Double A Granite | Custom Stone Countertops in Albuquerque
        </title>
        <meta
          name="description"
          content="Double A Granite specializes in custom granite, quartz, and marble countertops for residential and commercial spaces in Albuquerque, NM."
        />
        <meta name="author" content="Double A Granite" />
        <meta name="robots" content="index, follow" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.doubleagranite.com" />

        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Double A Granite" />
        <meta property="og:url" content="https://www.doubleagranite.com" />
        <meta
          property="og:title"
          content="Double A Granite | Custom Stone Countertops in Albuquerque"
        />
        <meta
          property="og:description"
          content="Elevate your home or business with premium granite, quartz, and marble countertops from Double A Granite in Albuquerque, NM."
        />
        <meta
          property="og:image"
          content="https://aa-granite.s3.us-east-1.amazonaws.com/dramatic-slabs.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Double A Granite | Custom Stone Countertops in Albuquerque"
        />
        <meta
          name="twitter:description"
          content="Elevate your home or business with premium granite, quartz, and marble countertops from Double A Granite in Albuquerque, NM."
        />
        <meta
          name="twitter:image"
          content="https://aa-granite.s3.us-east-1.amazonaws.com/dramatic-slabs.png"
        />

        {/* Optional: Keywords (mostly for legacy/analytics tools) */}
        <meta
          name="keywords"
          content="granite countertops Albuquerque, quartz countertops Albuquerque, marble countertops Albuquerque, countertop fabrication, countertop installation"
        />

        {/* Structured Data */}
        <SeoScript />
      </Head>
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
      {/* Hero Section */}
      <div id="page1">
        <div id="heading">
          <h1 id="site-title">Double A Granite</h1>
        </div>
        {/* Image Containers */}
        <div className="image-container" id="ig1-container"></div>
        <div className="image-container" id="ig2-container"></div>
        <div className="image-container" id="ig3-container"></div>
        <div className="image-container" id="ig4-container"></div>
        <div className="image-container" id="ig5-container"></div>
        <div className="image-container" id="ig6-container"></div>
        <div className="image-container" id="ig7-container"></div>
      </div>

      {/* Page 2 */}
      <div id="page2">
        <div id="down">
          <h4>© 2024</h4>
          <div id="line1"></div>
          <div id="line2"></div>
          <h4>Turning slabs into statements in Albuquerque, New Mexico</h4>
        </div>

        <div className="floating-text-container">
          <h2 className="floating-text">
            20+ years of expertise. <br /> We guarantee
          </h2>
          <h1 id="quality" className="quality floating-text">
            quality
          </h1>
        </div>

        <div className="image-container" id="ig10-container"></div>
        <div id="line"></div>
      </div>

      {/* Page 3 */}
      <div id="page3">
        <div id="l1" className="line3"></div>
        <div id="line3-vt"></div>
        <div id="l2" className="line3"></div>
        <div id="left">
          <h3>Why Choose Double A Granite?</h3>
          <h4>
            <div>
              <p>
                <strong>Expert Fabrication & Installation</strong> – Our skilled
                team ensures a flawless finish, custom cuts, and seamless
                installation.
              </p>
              <p>
                <strong>Top-Quality Materials</strong> – We source premium
                granite, quartz, and marble for long-lasting beauty and
                durability.
              </p>
              <p>
                <strong>Competitive Pricing</strong> – Get the luxury look
                without breaking the bank!
              </p>
              <p>
                <strong>Fast Turnaround Times</strong> – From design to
                installation, we work efficiently to bring your vision to life.
              </p>
              <p>
                <strong>Customer Satisfaction Guaranteed</strong> – We don't
                just build countertops, we build trust and lasting
                relationships.
              </p>
            </div>
          </h4>
          <div className="over">
            <div className="igs">
              <h5>Commercial</h5>
              <h2>Premises</h2>
            </div>
          </div>
        </div>
        <div id="right">
          <h3>Elevate Your Space with High-Quality Countertops</h3>
          <h4>
            Looking for expert countertop fabrication and installation? At
            Double A Granite, we specialize in custom stone countertops that
            bring luxury, durability, and style to your home or business.
            Whether you're renovating your kitchen, bathroom, or commercial
            space, we deliver precision-cut, high-quality granite, quartz, and
            marble countertops tailored to your needs.
          </h4>
          <div className="over">
            <div className="igs">
              <h2>Residential</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Services Page */}
      <div id="page6">
        <div id="elem2">
          <div className="cta-wrapper">
            <Link href="/inquiry" className="cta-button">
              Request Consultation
            </Link>
          </div>
          <div id="line6-h"></div>
        </div>
        <div id="elem3">
          <h4>We will help you implement</h4>
          <h4>any design solutions</h4>
          <div id="linee"></div>
        </div>
      </div>

      {/* Page8 */}
      <div id="page8">
        <div className="staggered-row">
          <div className="text-content">
            <h2 className="section-heading">Premium Granite Selection</h2>
            <p className="section-description">
              Elevate your space with the timeless beauty and durability of
              premium granite countertops. At Double A Granite, we source only
              the finest slabs, offering a variety of colors, patterns, and
              finishes to match any style.
            </p>
          </div>
          <div className="image-contain" id="ig11-container">
            <div className="hover-image"></div>
          </div>
        </div>

        <div className="staggered-row reversed">
          <div className="image-contain" id="ig12-container">
            <div className="hover-image"></div>
          </div>
          <div className="text-content">
            <h2 className="section-heading">Expert Craftsmanship</h2>
            <p className="section-description">
              At Double A Granite, precision meets perfection. Our skilled
              fabricators use state-of-the-art technology and hand-finished
              detailing to create countertops that are both stunning and built
              to last.
            </p>
          </div>
        </div>
      </div>

      {/* Page 7 - Scrolling Text */}
      <div className="see-our-work-wrapper">
        <Link href="/projects" className="see-our-work-button">
          See Our Work
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      <div id="page7">
        <div id="slide7">
          <h1>
            Double A Granite<sup></sup>
          </h1>
          <h1>
            Double A Granite<sup></sup>
          </h1>
        </div>
      </div>

      {/* Footer */}
      <div id="footer">
        <div id="bottom">
          <h2>Double A Granite ©2024</h2>
          <h2 id="bottom">
            <div id="elem2">
              <Link href="/login">
                <button id="login-button">Admin Login</button>
              </Link>
            </div>
          </h2>
        </div>
      </div>
    </div>
  );
}
