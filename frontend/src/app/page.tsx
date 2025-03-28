"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import "./style.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const isMobile = window.innerWidth <= 768;

      const setupMobileScrolling = () => {
        const scrollEl = document.querySelector("#main") as HTMLElement;
        if (scrollEl) {
          scrollEl.style.overflow = "visible";
          scrollEl.style.height = "auto";
        }
        ScrollTrigger.defaults({ scroller: window });
        ScrollTrigger.refresh();
      };

      if (isMobile) {
        setupMobileScrolling();
        return;
      }

      import("locomotive-scroll").then((LocomotiveScrollModule) => {
        const scrollEl = document.querySelector("#main") as HTMLElement;
        if (!scrollEl) return;

        // Correct initialization without breakpoint
        const scroll = new LocomotiveScrollModule.default({
          el: scrollEl,
          smooth: true,
          // Official API only accepts 'smooth' for devices
          smartphone: {
            smooth: false,
          },
          tablet: {
            breakpoint: 0,
          },
        }) as unknown as ExtendedLocomotiveScroll;

        // Event handlers
        const handleScroll = () => ScrollTrigger.update();
        const handleRefresh = () => scroll.update();
        const handleResize = () => {
          if (window.innerWidth <= 768) {
            setupMobileScrolling();
            scroll.destroy();
          } else {
            ScrollTrigger.refresh();
          }
        };

        scroll.on?.("scroll", handleScroll);
        ScrollTrigger.addEventListener("refresh", handleRefresh);
        window.addEventListener("resize", handleResize);

        // Scroller proxy
        ScrollTrigger.scrollerProxy("#main", {
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

        ScrollTrigger.refresh();

        // Animation setup with proper typing
        gsap.utils.toArray<HTMLElement>(".staggered-row").forEach((row, i) => {
          const heading = row.querySelector(".section-heading") as HTMLElement;
          const description = row.querySelector(
            ".section-description"
          ) as HTMLElement;
          const image = row.querySelector(".image-contain") as HTMLElement;

          gsap.set([heading, description], { opacity: 1, y: 0 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 1,
              scroller: isMobile ? window : "#main",
            },
          });

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

        // Cleanup function
        return () => {
          ScrollTrigger.removeEventListener("refresh", handleRefresh);
          scroll.off?.("scroll", handleScroll);
          window.removeEventListener("resize", handleResize);
          ScrollTrigger.clearMatchMedia();
          scroll.destroy?.();
        };
      });
    }
  }, []);

  return (
    <div id="main" data-scroll-container>
      {/* Hero Section */}
      <div id="page1">
        <div id="heading">
          <h1 id="site-title">Double A Granite</h1>{" "}
          {/* Replaces the logo image */}
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
          <h4>Turning slabs into statements</h4>
        </div>

        <div className="floating-text-container">
          <h2 className="floating-text" data-scroll data-scroll-speed="0.3">
            20+ years of expertise. <br /> We guarantee
          </h2>
          <h1
            id="quality"
            className="quality floating-text"
            data-scroll
            data-scroll-speed="0.5"
          >
            quality
          </h1>
        </div>

        <div
          className="image-container"
          id="ig10-container"
          data-scroll
          data-scroll-speed="-0.2"
        ></div>
        <div id="line" data-scroll></div>
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
                <strong>Customer Satisfaction Guaranteed</strong> – We don’t
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
            marble countertops tailored to your needs..
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
      <div id="page8">
        {/* First Row */}
        <div className="staggered-row">
          <div className="text-content">
            <h2 className="section-heading">Premium Granite Selection</h2>
            <p className="section-description">
              Elevate your space with the timeless beauty and durability of
              premium granite countertops. At Double A Granite, we source only
              the finest slabs, offering a variety of colors, patterns, and
              finishes to match any style. Whether you want a bold statement
              piece or a classic, elegant touch, our expertly crafted granite
              countertops are built to last. Scratch-resistant, heat-resistant,
              and low-maintenance, they’re perfect for kitchens, bathrooms, and
              beyond. Upgrade your home with the luxury of granite today!
            </p>
          </div>
          <div className="image-contain" id="ig11-container">
            <div className="hover-image"></div>
          </div>
        </div>

        {/* Second Row */}
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
              to last. Every cut, polish, and installation is done with care and
              expertise, ensuring a flawless fit and finish. When you choose us,
              you’re choosing quality, durability, and unmatched craftsmanship
              that transforms your space.
            </p>
          </div>
        </div>
      </div>
      {/* Page 7 - Scrolling Text */}
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
