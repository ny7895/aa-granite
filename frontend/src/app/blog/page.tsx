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
          <h2>Introduction</h2>
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
          <h1>Can You Paint Granite Counters?</h1>
          <img
            className={styles.sectionImage}
            src="https://aa-granite.s3.us-east-1.amazonaws.com/granite+counter.png"
            alt="Polished granite countertop"
          />
          <h2>
            Granite countertops are known for their timeless beauty and
            durability. But as styles change and homeowners look to refresh
            their spaces, a common question arises: Can you paint granite
            countertops?
          </h2>
          <p>
            The short answer is <strong>yes</strong>—you can. However, painting
            granite requires careful preparation and the right tools to ensure
            the paint adheres properly and the result is long-lasting. In this
            post, Double A Granite explains how you can transform your existing
            countertops on a budget and offers professional tips along the way.
          </p>

          <h2>The Tools You Will Need To Paint Granite Counters</h2>
          <ul>
            <li>Scouring pads</li>
            <li>Painter’s tape</li>
            <li>Granite countertop painting kit</li>
            <li>Utility knife</li>
            <li>Rubber gloves</li>
            <li>Scissors</li>
            <li>Clear caulk</li>
            <li>Thin-tipped artist’s paintbrush</li>
            <li>600-grit sandpaper</li>
            <li>Paint trays</li>
          </ul>

          <h2>What Is The Best Granite Countertop Painting Kit?</h2>
          <p>Top recommended kits include:</p>
          <ul>
            <li>Giani Granite Countertop Paint Kit</li>
            <li>SpreadStone Countertop Finishing Kit</li>
            <li>Rust-Oleum Countertop Transformations</li>
            <li>Light Cure Acrylic Repair Kit</li>
          </ul>

          <h2>How To Paint Granite Countertops</h2>

          <h3>Scrub the Counter to Remove Old Caulk</h3>
          <p>
            Clean the surface with a scouring pad and cleaner to remove grease
            and dirt. Use a utility knife to remove old caulk. Dry thoroughly
            before continuing.
          </p>

          <h3>Apply Painter’s Tape</h3>
          <p>
            Protect nearby surfaces like sinks, backsplashes, and cabinets using
            painter’s tape and newspaper.
          </p>

          <h3>Apply the Primer</h3>
          <p>
            Apply primer using a foam brush and roller. Let it dry for at least
            8 hours before painting.
          </p>

          <h3>Apply the Mineral Paint</h3>
          <p>
            Dab mineral paint in layers using a sponge. Practice on a sample
            sheet, then move to the countertop.
          </p>

          <h3>Sand the Countertop</h3>
          <p>
            Use 600-grit sandpaper to smooth uneven areas and help the topcoat
            adhere. Wipe clean, apply a clear topcoat, and let it dry before
            applying a second coat.
          </p>

          <h2>Painting Your Countertop To Look Like A Granite Top</h2>
          <p>
            You can mimic granite’s texture and veining with paint using sponges
            and small brushes. This method works on other countertop types, too,
            and is a popular budget-friendly solution.
          </p>

          <h2>Closing Remarks</h2>
          <p>
            Painting granite countertops is a cost-effective DIY way to refresh
            your kitchen or bathroom. For a premium finish in the perfect size
            and color, contact Double A Granite for custom fabrication and
            professional installation.
          </p>

          <h2>FAQs About Granite Countertops</h2>

          <h3>Can granite countertops be refinished?</h3>
          <p>
            Yes. Granite can be refinished through cleaning, polishing, and
            resealing to restore its shine and smoothness.
          </p>

          <h3>Can granite countertops stain?</h3>
          <p>
            Granite is stain-resistant when properly sealed. Resealing regularly
            prevents absorption and staining.
          </p>

          <h3>How long do granite countertops last?</h3>
          <p>
            With proper care, granite countertops can last 30+ years, making
            them a long-term investment.
          </p>

          <h3>Do granite countertops need to be sealed?</h3>
          <p>
            Yes. Seal them during installation and every 1–2 years thereafter to
            keep them protected and stain-resistant.
          </p>
        </section>

        <section
          id="granite"
          ref={setRef("granite")}
          className={styles.section}
        >
          <h1>2. Granite: Natural Beauty & Durability</h1>
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
          <h2>3. Quartz: Engineered Consistency</h2>
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
        </section>

        <section id="quartz" ref={setRef("quartz")} className={styles.section}>
          <h1>Does Quartz Stain?</h1>
          <h2>
            Quartz countertops are a top choice for homeowners who want a
            durable, elegant, and low-maintenance surface. But many people still
            ask: <strong>Does quartz stain?</strong>
            At Double A Granite, we get this question often, and we're here to
            give you clear, honest answers backed by experience.
          </h2>

          <h3>What is Quartz?</h3>
          <p>
            Quartz is an engineered stone made from roughly 90% natural quartz
            minerals combined with 10% resins and pigments. The resins make
            quartz non-porous and resistant to stains and scratches, while the
            pigments give it color and style.
          </p>

          <h3>Why Is Quartz the Best Countertop Material?</h3>
          <ul>
            <li>
              Highly durable and resistant to chips, cracks, and scratches
            </li>
            <li>
              Non-porous surface makes it stain-resistant and easy to clean
            </li>
            <li>
              Available in a wide variety of colors and finishes to match any
              space
            </li>
            <li>Does not require sealing like granite or marble</li>
          </ul>

          <h3>Does Quartz Stain?</h3>
          <p>
            Quartz is <strong>stain-resistant</strong>, not{" "}
            <strong>stain-proof</strong>. Spills from coffee, wine, or chemical
            products can leave marks if not cleaned quickly. However, quartz
            absorbs far less than natural stone, and most surface stains are
            easy to wipe away with the right method.
          </p>

          <h3>Do Quartz Countertops Require Regular Sealing?</h3>
          <p>
            No—quartz is naturally non-porous thanks to the resins used during
            manufacturing. This means liquids don’t seep in like they do with
            granite, so sealing is not required.
          </p>

          <h3>What Is the Best Way to Remove Quartz Stains?</h3>
          <ul>
            <li>
              Use mild soap and water—avoid harsh chemicals that can react with
              quartz resins.
            </li>
            <li>
              Wipe spills immediately—don’t let liquids like wine or coffee sit
              too long.
            </li>
            <li>
              Use a microfiber cloth—abrasive pads can scratch the surface and
              damage the finish.
            </li>
          </ul>

          <h3>Here Are Some More Quartz Countertop Maintenance Tips</h3>
          <ul>
            <li>
              <strong>Protect against heat:</strong> Use trivets for hot pots
              and pans. Quartz is heat-resistant but not heat-proof.
            </li>
            <li>
              <strong>Use a cutting board:</strong> Avoid slicing directly on
              the countertop to prevent scratching.
            </li>
            <li>
              <strong>Never use metal scrapers:</strong> These can cause
              permanent damage.
            </li>
            <li>
              <strong>Avoid hot water cleaning:</strong> Use warm or room
              temperature water.
            </li>
            <li>
              <strong>Keep permanent markers away:</strong> Ink stains can be
              permanent on quartz.
            </li>
          </ul>

          <h3>Can Stained Quartz Countertop Materials Be Restored?</h3>
          <p>
            Mild stains can often be removed with proper cleaning. However, deep
            or chemical stains may not be repairable. Quartz restoration is
            limited, so daily care is essential for keeping your countertops
            looking like new.
          </p>

          <h2>Compare Similar Colours</h2>
          <p>
            Quartz countertops come in a variety of shades—white, grey, black,
            and marble-like finishes. At Double A Granite, we help you choose
            the perfect hue to match your style and space.
          </p>

          <h5>Choose Finish Type</h5>
          <p>
            From polished to matte, quartz is available in different finishes to
            suit modern and traditional kitchens alike. Our team can walk you
            through all your options.
          </p>

          <h2>Can Quartz Countertops Be Refinished?</h2>
          <p>
            Unlike natural stone, quartz can’t be refinished by grinding or
            resealing. Once the surface is damaged or stained, repair options
            are limited. That’s why preventive care is key.
          </p>

          <h2>Can Quartz Countertops Be Polished?</h2>
          <p>
            Quartz surfaces come pre-polished during manufacturing and do not
            need further polishing. Over-polishing or abrasive cleaners can
            actually dull the surface, so stick to gentle cleaning for the best
            results.
          </p>

          <h2>FAQs About Quartz Countertops</h2>

          <h3>Are quartz countertops good for kitchens?</h3>
          <p>
            Absolutely! Quartz is one of the most popular kitchen countertop
            materials because it is strong, stylish, and requires little
            maintenance.
          </p>

          <h3>Can quartz countertops crack?</h3>
          <p>
            Quartz is highly durable, but extreme impact or sudden temperature
            change (thermal shock) can cause cracks. Always use protective pads
            for hot cookware.
          </p>

          <h3>Is quartz better than granite?</h3>
          <p>
            Quartz is more consistent in appearance and requires no sealing,
            while granite has a natural, unique look but requires regular
            maintenance. Both are excellent options depending on your needs.
          </p>

          <h3>How do I maintain quartz countertops?</h3>
          <p>
            Clean daily with mild soap and water, avoid abrasive tools, and wipe
            up spills promptly to maintain beauty and longevity.
          </p>

          <h3>Does quartz discolor over time?</h3>
          <p>
            Quality quartz from trusted brands resists fading and discoloration.
            However, prolonged exposure to UV rays or harsh chemicals can affect
            its appearance.
          </p>

          <h2>Looking for Quartz Countertops in Albuquerque New Mexico?</h2>
          <p>
            At <strong>Double A Granite</strong>, we fabricate and install
            premium quartz countertops tailored to your needs. Whether you just
            want to upgrade your surface, we provide expert craftsmanship, color
            matching, and unbeatable service.
          </p>
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
          <h2>FAQs About Double A Granite</h2>

          <h3>Who is Double A Granite?</h3>
          <p>
            We are a trusted granite, marble, and quartz countertop fabricator
            and installer serving Albuquerque, New Mexico and surrounding areas.
            We specialize in high-quality custom work.
          </p>

          <h3>Do you offer custom colors or cuts?</h3>
          <p>
            Yes! We fabricate countertops tailored to your design and lifestyle
            needs using precision technology.
          </p>

          <h3>Do you handle installation?</h3>
          <p>
            Absolutely. We handle everything from fabrication to delivery and
            final installation for a seamless experience.
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
