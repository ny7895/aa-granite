"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import "./style.css";

// Import Locomotive Scroll & GSAP
import LocomotiveScroll from "locomotive-scroll";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Ensure element exists before initializing Locomotive Scroll
    const mainElement = document.querySelector("#main") as HTMLElement | null;
    if (!mainElement) return; // Exit if `#main` is not found

    const scroll = new LocomotiveScroll({
      el: mainElement,
      smooth: true,
    });

    return () => {
      scroll.destroy();
    };
  }, []);

  return (
    <div id="main" data-scroll-container>
      {/* Hero Section */}
      <div id="page1">
        <div id="heading">
          <h1 id="site-title">Double A Granite</h1>{" "}
          {/* Replaces the logo image */}
        </div>
        <img id="ig1" src="slabs-stacked.png" alt="" />
        <img id="ig2" src="slabs-luxury-stacked.png" alt="" />
        <img id="ig3" src="slabs-black-white.png" alt="" />
        <img id="ig4" src="dramatic-slabs.png" alt="" />
        <img id="ig5" src="black-slabs.png" alt="" />
        <img id="ig6" src="marble-slabs.png" alt="" />
        <img id="ig7" src="black-and-white-slabs.png" alt="" />
        <h4>Turning slabs into statements</h4>
      </div>

      {/* Page 2 */}
      <div id="page2">
        <div id="down">
          <h4>© 2024</h4>
          <h4>Our address</h4>
          <div id="line1"></div>
          <div id="line2"></div>
        </div>
        <h2>
          20+ years of expertise. <br /> We guarantee
        </h2>
        <h1 id="quality" className="quality">
          quality
        </h1>
        <img id="ig10" src="industrial-slabs.png" alt="" />
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
        <div id="elem1">
          <h4>All apartments</h4>
          <h4>All premises</h4>
          <div id="line6"></div>
          <div id="line6-vt"></div>
        </div>
        <div id="elem2">
          <Link href="/inquiry">
            <button id="cta-button">Send Request</button>
          </Link>
          <div id="line6-h"></div>
        </div>
        <div id="elem3">
          <h4>We will help you implement</h4>
          <h4>any design solutions</h4>
          <div id="linee"></div>
        </div>
      </div>

      {/* Page 7 - Scrolling Text */}
      <div id="page7">
        <div id="slide7">
          <h1>
            Double A Granite<sup>®</sup>
          </h1>
          <h1>
            Double A Granite<sup>®</sup>
          </h1>
        </div>
      </div>

      {/* Background Image */}
      <div id="page8">
        <img
          data-scroll
          data-scroll-speed="-2"
          src="dramatic-slab.png"
          alt=""
        />
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
