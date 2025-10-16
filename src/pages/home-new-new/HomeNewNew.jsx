import CTA from "@/components/home/CTA";
import FAQ from "@/components/home/FAQ";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import Highlights from "@/components/home/Highlights";
import HowItWorks from "@/components/home/HowItWorks";
import SuccessStories from "@/components/home/SuccessStories";
import Navbar from "@/components/layout/Header/Navbar";
import React, { useEffect, useState, useCallback } from "react";
import Footer from "@/components/layout/Footer/Footer";
import BrandLogosCarousel from "@/components/home/BrandLogosCarousel";
import HomeNew from "../home-new/HomeNew";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginModal from "@/components/ui/LoginUI/LoginModal";
import LogoutModal from "@/components/ui/LogoutUI/LogoutModal";
import { logoutUser } from "@/redux/slices/userSlice";

const HomeNewNew = () => {
  const { user } = useSelector((state) => state.user);
  const isLoggedIn = user ? true : false;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Modal states
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  // Handler functions from Navbar
  const handleForgotPassword = useCallback(() => {
    console.log("Open forgot password modal");
  }, []);

  const handleLogout = useCallback(() => {
    setLogoutModalOpen(true);
  }, []);

  const handleConfirmLogout = useCallback(async () => {
    await dispatch(logoutUser());
    navigate("/");
  }, [dispatch, navigate]);

  const rawHTML = `
  <!-- Header -->

<header>

    <div class="header-content">

        <div class="site-branding">

        <img class="image-logo" src="https://dealer.amacar.ai/wp-content/uploads/2024/10/logo-4-2048x680.png" alt="Amacar Logo" />

        </div>

        <nav class="nav">

            <a href="#features">Features</a>

            <a href="#how-it-works">How It Works</a>

            <a href="#resources">Resources</a>

            <a href="#faq">Support</a>

        </nav>

        <div id="header-buttons" class="header-buttons">
            <!-- Authenticated user buttons will be rendered here -->
        </div>
        
        <?php endif; ?>

    </div>

</header>   



<!-- Hero Section -->

<section class="hero">

    <div class="container">

        <div class="hero-content">

            <div class="hero-text">

                <h1>Real Leads.<br><span class="highlight">Real-Time Bidding.</span><br>Real Profit.</h1>

                <p>Get instant access to pre-qualified seller listings — with zero per-unit auction fees. Plus, unlock
                    advanced dealer tools that help you source quality inventory and close more deals, faster.</p>
                <div id="hero-buttons">
                    <!-- Buttons will be conditionally rendered here -->
                </div>

            </div>

            <div class="hero-video">

                <div class="video-placeholder" id="videoPlaceholder">

                    <img src="https://placehold.co/600x400/4f46e5/ffffff?text=Watch+Our+Platform+Demo"
                        alt="Video Thumbnail" class="video-thumbnail">
                    <button class="play-button" id="playButton">
                        <i class="fas fa-play"></i>
                    </button>

                </div>



            </div>

        </div>

    </div>

</section>

<!-- Video Popup Modal -->
<div id="videoModal" class="video-modal">
    <div class="video-modal-content">
        <button class="video-close" id="videoClose">&times;</button>
        <div class="video-container">
            <iframe id="videoPlayer"
                src="https://player.vimeo.com/video/1112370692?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                frameborder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerpolicy="strict-origin-when-cross-origin" title="AmacarAI Video B2B EDITED">
            </iframe>
        </div>
    </div>
</div>

<!-- Benefits Section -->

<section class="benefits">

    <div class="container">

        <div class="benefits-content">

            <div class="benefits-list">

                <div class="benefit-item">

                    <div class="benefit-icon">🚀</div>

                    <div class="benefit-text">

                        <h3>Gain Exclusive Access to Local Private Sellers</h3>
                        <p>Be the first to see ready to sell private sellers before your competition</p>
                    </div>

                </div>

                <div class="benefit-item">

                    <div class="benefit-icon">⚡</div>

                    <div class="benefit-text">

                        <h3>Bid in real time—no outlet waiting</h3>

                        <p>Participate in live auctions with instant feedback, no more need for visiting traditional
                            auctions.</p>

                    </div>

                </div>

                <div class="benefit-item">

                    <div class="benefit-icon">🔗</div>

                    <div class="benefit-text">

                        <h3>API integration for inventory feed</h3>

                        <p>Seamlessly sync with your existing systems.</p>

                    </div>

                </div>

            </div>

        </div>

    </div>

</section>



<!-- Features Section -->

<section class="features" id="features">

    <div class="container">

        <div class="section-header">

            <h2 class="section-title fade-in">Why dealers choose us</h2>

            <p class="section-subtitle fade-in">Built for modern dealerships that demand excellence</p>

        </div>

        <div class="features-grid">

            <div class="feature-card fade-in stagger-1">

                <div class="feature-icon">⚡</div>

                <h3>Early access to seller listings</h3>

                <p>Get first access to motivated sellers before your competition. Our platform gives you priority access

                    to quality inventory listings.</p>

            </div>

            <div class="feature-card fade-in stagger-2">

                <div class="feature-icon">📊</div>

                <h3>Live bidding, instant results</h3>

                <p>Participate in real-time auctions with immediate feedback. Win quality inventory with transparent,

                    competitive bidding processes.</p>

            </div>

            <div class="feature-card fade-in stagger-3">

                <div class="feature-icon">🔄</div>

                <h3>API-powered inventory sync</h3>

                <p>Seamlessly integrate with your existing systems. Our robust API ensures your inventory stays

                    synchronized across all platforms.</p>

            </div>

        </div>

    </div>

</section>



<!-- How It Works Section -->

<section class="how-it-works" id="how-it-works">

    <div class="container">

        <div class="section-header">

            <h2 class="section-title fade-in">How it works<br>for dealers</h2>

            <p class="section-subtitle fade-in">Simple 3-step process to start winning auctions and growing your

                inventory</p>

        </div>



        <div class="vertical-steps-container">

            <div class="steps-line"></div>



            <div class="step-item fade-in">

                <div class="step-number">1</div>

                <div class="step-content">

                    <h3>Sign up in minutes</h3>

                    <p>Complete your dealer verification and get instant access to our live auction platform.</p>

                </div>

            </div>



            <div class="step-item fade-in stagger-1">

                <div class="step-number">2</div>

                <div class="step-content">

                    <h3>Review live private cars ready for sales</h3>

                    <p>Browse pre-qualified private seller vehicles and bid on matches your inventory.</p>

                </div>

            </div>



            <div class="step-item fade-in stagger-2">

                <div class="step-number">3</div>

                <div class="step-content">

                    <h3>Place your bid — enjoy unlimited bidding on unlimited vehicles for one low monthly fee.</h3>

                    <p>Participate in real-time auctions with veriety of cars to bid and win.</p>

                </div>

            </div>

        </div>

    </div>

</section>



<!-- Resources Section -->

<section class="resources" id="resources">

    <div class="container">

        <div class="section-header">

            <h2 class="section-title fade-in">Stay ahead.<br>Win more deals.</h2>

            <p class="section-subtitle fade-in">Access insights and tools that give you a competitive edge</p>

        </div>



        <div class="resources-grid">


            <div class="resource-card fade-in stagger-1">

                <div class="resource-image resource-gradient-2"></div>

                <div class="resource-content">

                    <h3>Boost profit with smarter bidding</h3>

                    <p>Learn advanced bidding strategies that help maximize your ROI while securing quality inventory.

                    </p>

                </div>

            </div>

            <div class="resource-card fade-in stagger-2">

                <div class="resource-image resource-gradient-3"></div>

                <div class="resource-content">

                    <h3>Digital tools to scale inventory</h3>

                    <p>Discover how technology can streamline your operations and scale your dealership efficiently.</p>

                </div>

            </div>

            <div class="resource-card fade-in stagger-3">

                <div class="resource-image resource-gradient-4"></div>

                <div class="resource-content">

                    <h3>Dealers achieving real results</h3>

                    <p>Read success stories from dealers who have transformed their business using our platform.</p>

                </div>

            </div>

        </div>

    </div>

</section>



<!-- Trust & Social Proof Section -->

<section class="trust-proof">

    <div class="container">

        <div class="trust-content">

            <div class="testimonial-quote">

                <blockquote>

                    "We've acquired 50+ cars weekly since joining Amacar."

                </blockquote>

                <div class="quote-author">

                    <strong>Mike Rodriguez</strong>

                    <span>Owner, Rodriguez Auto Group</span>

                </div>

            </div>

            <div class="trust-badges">

                <div class="badge">

                    <span class="badge-icon">🏆</span>

                    <span class="badge-text">Trusted by 500+ Dealers</span>

                </div>

                <div class="badge">

                    <span class="badge-icon">⭐</span>

                    <span class="badge-text">4.9/5 Rating</span>

                </div>

            </div>

        </div>

    </div>

</section>



<!-- FAQ Section -->

<section class="faq" id="faq">

    <div class="container">

        <div class="section-header">

            <h2 class="section-title fade-in">Dealer FAQ: Quick Answers</h2>

            <p class="section-subtitle fade-in">Everything you need to know about joining Amacar</p>

        </div>



        <div class="faq-container">

            <div class="faq-item fade-in">

                <button class="faq-question">

                    What is Amacar?

                    <span class="faq-icon">+</span>

                </button>

                <div class="faq-answer">

                    <p>Amacar is a digital vehicle marketplace that connects verified dealershipslike yourswith private
                        sellers. Dealers can bid on consumer vehicles through live auctions or attract new buyers via
                        Reverse Bidding.</p>

                </div>

            </div>



            <div class="faq-item fade-in stagger-1">

                <button class="faq-question">

                    How do dealerships sign up?

                    <span class="faq-icon">+</span>

                </button>

                <div class="faq-answer">

                    <p>Register on Amacar’s dealer portal, sign up and set up your account. Once approvedby Amacar’s
                        team, you’ll gain access to live seller listings, reverse bidding, and dealerplatform.</p>

                </div>

            </div>



            <div class="faq-item fade-in stagger-2">

                <button class="faq-question">

                    How much can dealers save per month by joining Amacar?

                    <span class="faq-icon">+</span>

                </button>

                <div class="faq-answer">

                    <p>Dealerships can save thousands each month. For example, if you acquire 30 units from traditional
                        auctions at $1,000 per unit, that’s $30,000 in fees. With Amacar, you pay only a low monthly
                        subscription and gain unlimited opportunities to acquire unlimited vehicles—no per-unit auction
                        fees.</p>

                </div>

            </div>
            <div class="faq-item fade-in stagger-3">

                <button class="faq-question">

                    How do dealer auctions work?

                    <span class="faq-icon">+</span>

                </button>

                <div class="faq-answer">

                    <p>Sellers list their vehicles online after appraisal. Participating dealers can place bids in real
                        time. The highest accepted bid wins, and you complete the transaction directly with the
                        customer.</p>

                </div>

            </div>
            <div class="faq-item fade-in stagger-4">

                <button class="faq-question">

                    Do I need to set up appointment with the customers
                    <span class="faq-icon">+</span>

                </button>

                <div class="faq-answer">

                    <p>Yes, you can set up appointment with the customer for in-person appraisal. However, Amacar
                        Customer Platform is designed to set up appointment with the customer oncethey accept the best
                        offer.</p>

                </div>

            </div>
            <div class="faq-item fade-in stagger-5">

                <button class="faq-question">

                    What if my bid is not accepted? <span class="faq-icon">+</span>

                </button>

                <div class="faq-answer">

                    <p>If a seller declines your offer, it may mean your bid wasn’t competitive. You can continue
                        placing bids on other vehicles during the live auction.</p>

                </div>

            </div>
            <div class="faq-item fade-in stagger-6">

                <button class="faq-question">

                    Is there a limit to the number of cars I can bid on? <span class="faq-icon">+</span>

                </button>

                <div class="faq-answer">

                    <p>No. With your monthly subscription, you can place unlimited bids across unlimited vehicles. We
                        ask that all offers be genuine and honored to respect the customer’s time and protect your
                        dealership’s reputation</p>

                </div>

            </div>

        </div>

    </div>

</section>



<!-- Final CTA Section -->

<section class="final-cta" id="contact">

    <div class="container">

        <div class="cta-content">

            <div class="cta-text">

                <h2>Join as a Dealer</h2>

                <p>Start winning auctions and growing your inventory today. Join hundreds of successful dealers who

                    trust Amacar for quality vehicle acquisitions.</p>

                <div id="cta-buttons">
                    <!-- Buttons will be conditionally rendered here -->
                </div>

            </div>

            <div class="cta-visual">

                <div class="cta-dashboard">

                    Premium Dashboard Preview

                </div>

            </div>

        </div>

    </div>

</section>



<!-- Footer -->

<footer>

    <div class="container">

        <!-- <div class="footer-content">

            <div class="footer-column">

                <h4>Product</h4>

                <a href="#">Features</a>

                <a href="#">Pricing</a>

                <a href="#">API Documentation</a>

                <a href="#">Integrations</a>

                <a href="#">Mobile App</a>

            </div>

            <div class="footer-column">

                <h4>Resources</h4>

                <a href="#">Help Center</a>

                <a href="#">Community</a>

                <a href="#">Blog</a>

                <a href="#">Case Studies</a>

                <a href="#">Webinars</a>

            </div>

            <div class="footer-column">

                <h4>Company</h4>

                <a href="#">About Us</a>

                <a href="#">Careers</a>

                <a href="#">Press</a>

                <a href="#">Contact</a>

                <a href="#">Partners</a>

            </div>

            <div class="footer-column">

                <h4>Legal</h4>

                <a href="#">Privacy Policy</a>

                <a href="#">Terms of Service</a>

                <a href="#">Cookie Policy</a>

                <a href="#">GDPR</a>

                <a href="#">Security</a>

            </div>

        </div> -->

        <div class="footer-bottom">

            <p>&copy; 2025 Amacar. All rights reserved. Built for dealers who demand excellence.</p>

        </div>

    </div>

</footer>
`;  

  const legacyCSS = `
    :root {

        --primary: #6366f1;

        --primary-dark: #4f46e5;

        --secondary: #f1f5f9;

        --accent: #06b6d4;

        --text-primary: #0f172a;

        --text-secondary: #64748b;

        --text-muted: #94a3b8;

        --surface: #ffffff;

        --surface-elevated: #f8fafc;

        --border: #e2e8f0;

        --border-light: #f1f5f9;

        --gradient-1: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

        --gradient-2: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);

        --gradient-3: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);

        --gradient-4: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);

        --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);

        --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

        --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

        --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);

    }






    body {

        color: var(--text-primary);

        background: var(--surface);

        overflow-x: hidden;

    }



    body.page {

        margin-top: 0;

    }



    body #masthead,
    .site-footer {

        display: none;

    }





    .container {

        max-width: 1200px;

        margin: 0 auto;

        padding: 0 24px;

    }



    /* Header */

    header {

        position: fixed;

        top: 0;

        width: 100%;

        background: rgba(255, 255, 255, 0.8);

        backdrop-filter: blur(12px);

        border-bottom: 1px solid var(--border-light);

        z-index: 1000;

        transition: all 0.3s ease;

    }



    .header-content {

        display: flex;

        justify-content: space-between;

        align-items: center;

        padding: 16px 24px;

        max-width: 1200px;

        margin: 0 auto;

    }


    .image-logo{
    
        width: 150px;

        height: 50px;

        object-position: center;

        display: block;


        padding: 0;

        border: 0;

        font-size: 100%;

        font: inherit;

        vertical-align: baseline;
    }


    .logo {

        font-size: 24px;

        font-weight: 700;

        color: var(--text-primary);

        display: flex;

        align-items: center;

        gap: 8px;

    }



    .nav {

        display: flex;

        gap: 32px;

        align-items: center;

    }



    .nav a {

        color: var(--text-secondary);

        text-decoration: none;

        font-size: 15px;

        font-weight: 500;

        transition: all 0.2s ease;

        position: relative;

    }



    .nav a:hover {

        color: var(--text-primary);

    }



    .nav a::after {

        content: '';

        position: absolute;

        width: 0;

        height: 2px;

        bottom: -4px;

        left: 0;

        background: var(--primary);

        transition: width 0.2s ease;

    }



    .nav a:hover::after {

        width: 100%;

    }


    .header-cta {
        background: var(--primary);
        color: white;
        padding: 12px 20px;
        border: none;
        border-radius: 12px;
        text-decoration: none;
        font-weight: 600;
        font-size: 14px;
        transition: all 0.2s ease;
        box-shadow: var(--shadow-sm);
        display: block;
        width: max-content;
    }

    .cta-content .header-cta {
        display: inline-block;
    }

    .cta-content .header-buttons {
        justify-content: center;
    }

    .header-cta:hover {

        background: var(--primary-dark);

        transform: translateY(-1px);

        box-shadow: var(--shadow-md);

    }

    .header-buttons {
        display: flex;
        gap: 12px;
        align-items: center;
    }

    .header-signup {
        background: transparent;
        color: var(--primary);
        padding: 12px 20px;
        border: 2px solid var(--primary);
        border-radius: 12px;
        text-decoration: none;
        font-weight: 600;
        font-size: 14px;
        transition: all 0.2s ease;
    }

    .header-signup:hover {
        background: var(--primary);
        color: white;
        transform: translateY(-1px);
        box-shadow: var(--shadow-md);
    }



    /* Hero Section */

    .hero {

        padding: 120px 0 80px;

        background: linear-gradient(135deg, var(--surface) 0%, var(--surface-elevated) 100%);

        position: relative;

        overflow: hidden;

    }



    .hero::before {

        content: '';

        position: absolute;

        top: 0;

        right: -50%;

        width: 100%;

        height: 100%;

        background: radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%);

        animation: float 20s ease-in-out infinite;

    }



    .hero-content {

        display: grid;

        grid-template-columns: 1fr 1fr;

        gap: 80px;

        align-items: center;

        position: relative;

        z-index: 2;

    }



    .hero-text h1 {

        font-size: clamp(3rem, 5vw, 4.5rem);

        font-weight: 800;

        line-height: 1.1;

        margin-bottom: 24px;

        color: var(--text-primary);

        letter-spacing: -0.02em;

    }



    .hero-text .highlight {

        background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);

        -webkit-background-clip: text;

        -webkit-text-fill-color: transparent;

        background-clip: text;

        line-height: 1.1;

    }

    .hero-text p {
        font-size: 20px;
        color: var(--text-secondary);
        margin-bottom: 32px;
        line-height: 1.6;
        font-weight: 400;
        text-align: left;
    }


    .wp-theme-amacar .hero-cta {

        display: inline-flex;

        align-items: center;

        gap: 12px;

        background: var(--primary);

        color: white;

        padding: 16px 32px;

        border: none;

        border-radius: 16px;

        text-decoration: none;

        font-weight: 600;

        font-size: 16px;

        transition: all 0.3s ease;

        box-shadow: var(--shadow-lg);

        position: relative;

        overflow: hidden;

    }



    .hero-cta::before {

        content: '';

        position: absolute;

        top: 0;

        left: -100%;

        width: 100%;

        height: 100%;

        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);

        transition: left 0.5s;

    }



    .hero-cta:hover::before {

        left: 100%;

    }



    .hero-cta:hover {

        transform: translateY(-2px);

        box-shadow: var(--shadow-xl);

    }



    .hero-video {

        position: relative;

        display: flex;

        justify-content: center;

        align-items: center;

    }

    .video-placeholder {
        position: relative;
        width: 100%;
        max-width: 600px;
        border-radius: 24px;
        overflow: hidden;
        box-shadow: var(--shadow-xl);
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .video-placeholder:hover {
        transform: translateY(-8px);
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }

    .video-thumbnail {
        width: 100%;
        height: auto;
        display: block;
    }

    .play-button {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80px;
        height: 80px;
        background: rgba(255, 255, 255, 0.9);
        border: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        color: var(--primary);
        cursor: pointer;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
    }

    .play-button:hover {
        background: white;
        transform: translate(-50%, -50%) scale(1.1);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }

    .play-button i {
        margin-left: 4px;
    }

    /* Video Modal Styles */
    .video-modal {
        display: none;
        position: fixed;
        z-index: 10000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(8px);
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .video-modal.active {
        display: flex;
        opacity: 1;
    }

    .video-modal-content {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }

    .video-close {
        position: absolute;
        top: 20px;
        right: 30px;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: white;
        font-size: 32px;
        cursor: pointer;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        z-index: 10001;
    }

    .video-close:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: scale(1.1);
    }

    .video-container {
        width: 100%;
        max-width: 480px;
        height: 80vh;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
    }

    .video-container iframe {
        width: 100%;
        height: 100%;
        border: none;
    }

    .video-container {
        position: relative;
        width: 50%;
        padding-top: 177.78%;
        /* 9:16 aspect ratio (height / width * 100) */
        overflow: hidden;
    }

    .video-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }















    .floating-dashboard {

        padding: 24px;

        height: calc(100% - 60px);

        display: flex;

        flex-direction: column;

        gap: 16px;

    }



    .dashboard-metric {

        display: flex;

        justify-content: space-between;

        align-items: center;

        padding: 16px;

        background: var(--surface-elevated);

        border-radius: 12px;

        border: 1px solid var(--border-light);

    }



    .metric-label {

        font-size: 14px;

        color: var(--text-secondary);

        font-weight: 500;

    }



    .metric-value {

        font-size: 20px;

        font-weight: 700;

        color: var(--primary);

    }



    .floating-cards {

        position: absolute;

        width: 100%;

        height: 100%;

        pointer-events: none;

    }



    .floating-card {

        position: absolute;

        width: 60px;

        height: 60px;

        background: var(--surface);

        border-radius: 16px;

        box-shadow: var(--shadow-md);

        display: flex;

        align-items: center;

        justify-content: center;

        font-size: 24px;

        animation: float-card 8s ease-in-out infinite;

    }



    .card-1 {

        top: 10%;

        left: 5%;

        animation-delay: 0s;

    }



    .card-2 {

        top: 60%;

        left: -5%;

        animation-delay: 2s;

    }



    .card-3 {

        top: 20%;

        right: -2%;

        animation-delay: 4s;

    }



    .card-4 {

        bottom: -6%;

        right: 10%;

        animation-delay: 6s;

    }



    /* Benefits Section */

    .benefits {

        padding: 80px 0;

        background: var(--surface-elevated);

    }



    .benefits-content {

        max-width: 800px;

        margin: 0 auto;

    }



    .benefits-list {

        display: flex;

        flex-direction: column;

        gap: 32px;

    }



    .benefit-item {

        display: flex;

        align-items: center;

        gap: 24px;

        padding: 24px;

        background: var(--surface);

        border-radius: 16px;

        border: 1px solid var(--border);

        transition: all 0.3s ease;

    }



    .benefit-item:hover {

        transform: translateY(-4px);

        box-shadow: var(--shadow-lg);

        border-color: var(--primary);

    }



    .benefit-icon {

        width: 48px;

        height: 48px;

        background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);

        border-radius: 12px;

        display: flex;

        align-items: center;

        justify-content: center;

        font-size: 24px;

        flex-shrink: 0;

    }



    .benefit-text h3 {

        text-align: left;

        font-size: 18px;

        font-weight: 600;

        color: var(--text-primary);

        margin-bottom: 8px;

    }



    .benefit-text p {

        color: var(--text-secondary);

        font-size: 14px;

        line-height: 1.5;

    }



    /* Trust & Social Proof Section */

    .trust-proof {

        padding: 80px 0;

        background: var(--surface);

    }



    .trust-content {

        display: grid;

        grid-template-columns: 1fr 1fr;

        gap: 64px;

        align-items: center;

        max-width: 900px;

        margin: 0 auto;

    }



    .testimonial-quote {

        text-align: center;

    }



    .testimonial-quote blockquote {

        font-size: 24px;

        font-weight: 600;

        color: var(--text-primary);

        margin-bottom: 24px;

        line-height: 1.4;

        position: relative;

    }



    .testimonial-quote blockquote::before {

        content: '"';

        font-size: 48px;

        color: var(--primary);

        position: absolute;

        top: -20px;

        left: -20px;

        font-weight: 700;

    }



    .quote-author {

        display: flex;

        flex-direction: column;

        align-items: center;

        gap: 4px;

    }



    .quote-author strong {

        color: var(--text-primary);

        font-size: 16px;

    }



    .quote-author span {

        color: var(--text-secondary);

        font-size: 14px;

    }



    .trust-badges {

        display: flex;

        flex-direction: column;

        gap: 16px;

    }



    .badge {

        display: flex;

        align-items: center;

        gap: 12px;

        padding: 16px 24px;

        background: var(--surface-elevated);

        border: 1px solid var(--border);

        border-radius: 12px;

        transition: all 0.3s ease;

    }



    .badge:hover {

        transform: translateX(8px);

        border-color: var(--primary);

    }



    .badge-icon {

        font-size: 20px;

    }



    .badge-text {

        font-weight: 600;

        color: var(--text-primary);

        font-size: 14px;

    }



    /* Features Section */

    .features {

        padding: 120px 0;

        background: var(--surface);

    }



    .section-header {

        text-align: center;

        margin-bottom: 80px;

    }



    .section-title {

        font-size: clamp(2.5rem, 4vw, 3.5rem);

        font-weight: 800;

        color: var(--text-primary);

        margin-bottom: 16px;

        letter-spacing: -0.02em;

    }



    .section-subtitle {

        font-size: 20px;

        color: var(--text-secondary);

        max-width: 600px;

        margin: 0 auto;

        font-weight: 400;

        line-height: 1.6;

    }



    .features-grid {

        display: grid;

        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));

        gap: 32px;

    }



    .feature-card {

        padding: 40px 32px;

        background: var(--surface);

        border: 1px solid var(--border);

        border-radius: 24px;

        transition: all 0.3s ease;

        position: relative;

        overflow: hidden;

    }



    .feature-card::before {

        content: '';

        position: absolute;

        top: 0;

        left: 0;

        right: 0;

        height: 1px;

        background: linear-gradient(90deg, transparent, var(--primary), transparent);

        opacity: 0;

        transition: opacity 0.3s ease;

    }



    .feature-card:hover {

        transform: translateY(-8px);

        box-shadow: var(--shadow-xl);

        border-color: var(--primary);

    }



    .feature-card:hover::before {

        opacity: 1;

    }



    .feature-icon {

        width: 64px;

        height: 64px;

        background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);

        border-radius: 20px;

        display: flex;

        align-items: center;

        justify-content: center;

        font-size: 28px;

        margin-bottom: 24px;

        position: relative;

        overflow: hidden;

    }



    .feature-icon::after {

        content: '';

        position: absolute;

        top: -50%;

        left: -50%;

        width: 200%;

        height: 200%;

        background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);

        animation: shimmer 3s ease-in-out infinite;

    }



    .feature-card h3 {

        font-size: 20px;

        font-weight: 700;

        color: var(--text-primary);

        margin-bottom: 12px;

        letter-spacing: -0.01em;

    }



    .feature-card p {

        color: var(--text-secondary);

        line-height: 1.6;

        font-weight: 400;

    }



    /* How It Works */

    .how-it-works {

        padding: 120px 0;

        background: var(--surface-elevated);

    }



    .vertical-steps-container {

        position: relative;

        max-width: 800px;

        margin: 0 auto;

    }



    .steps-line {

        position: absolute;

        left: 31px;

        top: 64px;

        bottom: 80px;

        width: 2px;

        background: var(--border);

        z-index: 1;

    }



    .steps-line::after {

        content: '';

        position: absolute;

        top: 0;

        left: 0;

        width: 100%;

        height: 30%;

        background: var(--primary);

        animation: progress-line 3s ease-in-out infinite;

    }



    .step-item {

        display: flex;

        gap: 32px;

        margin-bottom: 64px;

        position: relative;

        z-index: 2;

    }



    .step-number {

        width: 64px;

        height: 64px;

        background: var(--primary);

        color: white;

        border-radius: 20px;

        display: flex;

        align-items: center;

        justify-content: center;

        font-weight: 700;

        font-size: 20px;

        flex-shrink: 0;

        box-shadow: var(--shadow-lg);

        position: relative;

        overflow: hidden;

    }



    .step-number::before {

        content: '';

        position: absolute;

        top: -2px;

        left: -2px;

        right: -2px;

        bottom: -2px;

        background: linear-gradient(45deg, var(--primary), var(--accent), var(--primary));

        border-radius: 22px;

        z-index: -1;

        animation: rotate 3s linear infinite;

    }



    .step-content {

        flex: 1;

        padding-top: 8px;

    }



    .step-content h3 {

        font-size: 24px;

        font-weight: 700;

        color: var(--text-primary);

        margin-bottom: 12px;

        letter-spacing: -0.01em;

        text-align: left;

    }



    .step-content p {

        color: var(--text-secondary);

        line-height: 1.6;

        font-size: 16px;

        font-weight: 400;

        text-align: start;

    }



    /* Resources */

    .resources {

        padding: 120px 0;

        background: var(--surface);

    }



    .resources-grid {

        display: grid;

        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

        gap: 32px;

    }



    .resource-card {

        background: var(--surface);

        border-radius: 24px;

        overflow: hidden;

        border: 1px solid var(--border);

        transition: all 0.3s ease;

        position: relative;

        group: hover;

    }



    .resource-card:hover {

        transform: translateY(-8px);

        box-shadow: var(--shadow-xl);

    }



    .resource-image {

        width: 100%;

        height: 200px;

        position: relative;

        overflow: hidden;

    }



    .resource-image::before {

        content: '';

        position: absolute;

        top: 0;

        left: 0;

        right: 0;

        bottom: 0;

        background: linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, transparent 100%);

        z-index: 2;

    }



    .resource-gradient-1 {

        background: var(--gradient-1);

    }



    .resource-gradient-2 {

        background: var(--gradient-2);

    }



    .resource-gradient-3 {

        background: var(--gradient-3);

    }



    .resource-gradient-4 {

        background: var(--gradient-4);

    }



    .resource-content {

        padding: 32px;

    }



    .resource-content h3 {

        font-size: 20px;

        font-weight: 700;

        color: var(--text-primary);

        margin-bottom: 12px;

        letter-spacing: -0.01em;

    }



    .resource-content p {

        color: var(--text-secondary);

        line-height: 1.6;

        font-weight: 400;

    }



    /* FAQ */

    .faq {

        padding: 120px 0;

        background: var(--surface-elevated);

    }



    .faq-container {

        max-width: 800px;

        margin: 0 auto;

    }



    .faq-item {

        background: var(--surface);

        border: 1px solid var(--border);

        border-radius: 16px;

        margin-bottom: 16px;

        overflow: hidden;

        transition: all 0.3s ease;

    }



    .faq-item:hover {

        border-color: var(--primary);

    }



    .faq-question {

        width: 100%;

        background: none;

        border: none;

        text-align: left;

        padding: 24px 32px;

        font-size: 18px;

        font-weight: 600;

        color: var(--text-primary);

        cursor: pointer;

        display: flex;

        justify-content: space-between;

        align-items: center;

        transition: all 0.2s ease;

    }



    .faq-question:hover {

        color: var(--primary);

    }



    .faq-icon {

        width: 24px;

        height: 24px;

        border-radius: 50%;

        background: var(--surface-elevated);

        display: flex;

        align-items: center;

        justify-content: center;

        font-size: 16px;

        font-weight: 700;

        color: var(--text-secondary);

        transition: all 0.3s ease;

    }



    .faq-item.active .faq-icon {

        background: var(--primary);

        color: white;

        transform: rotate(45deg);

    }



    .faq-answer {

        padding: 0 32px 24px;

        color: var(--text-secondary);

        line-height: 1.6;

        font-weight: 400;

        display: none;

        animation: fadeIn 0.3s ease;

    }



    .faq-answer p {

        text-align: left;

    }



    .faq-answer.active {

        display: block;

    }



    /* CTA Section */

    .final-cta {

        padding: 120px 0;

        background: linear-gradient(135deg, var(--text-primary) 0%, #1e293b 100%);

        color: white;

        position: relative;

        overflow: hidden;

    }



    .final-cta::before {

        content: '';

        position: absolute;

        top: 0;

        left: 0;

        right: 0;

        bottom: 0;

        background: radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.3) 0%, transparent 50%);

    }



    .cta-content {

        display: grid;

        grid-template-columns: 1fr 1fr;

        gap: 80px;

        align-items: center;

        position: relative;

        z-index: 2;

    }



    .cta-text h2 {

        font-size: clamp(2.5rem, 4vw, 3.5rem);

        font-weight: 800;

        margin-bottom: 24px;

        letter-spacing: -0.02em;

    }



    .cta-text p {

        font-size: 20px;

        color: rgba(255, 255, 255, 0.8);

        margin-bottom: 32px;

        line-height: 1.6;

        font-weight: 400;

    }



    .wp-theme-amacar .cta-button {

        background: white;

        color: var(--text-primary);

        padding: 16px 32px;

        border: none;

        border-radius: 16px;

        text-decoration: none;

        font-weight: 600;

        font-size: 16px;

        display: inline-flex;

        align-items: center;

        gap: 12px;

        transition: all 0.3s ease;

        box-shadow: var(--shadow-xl);

    }



    .wp-theme-amacar .cta-button:hover {

        transform: translateY(-2px);

        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

    }



    .cta-visual {

        position: relative;

        height: 400px;

        display: flex;

        align-items: center;

        justify-content: center;

    }



    .cta-dashboard {

        width: 100%;

        max-width: 400px;

        height: 300px;

        background: rgba(255, 255, 255, 0.1);

        backdrop-filter: blur(10px);

        border: 1px solid rgba(255, 255, 255, 0.2);

        border-radius: 24px;

        display: flex;

        align-items: center;

        justify-content: center;

        color: rgba(255, 255, 255, 0.7);

        font-size: 0;

        font-weight: 500;

        background-image: url('<?php echo get_template_directory_uri(); ?>/image/dashboard.png');

        animation: pulse-glow 4s ease-in-out infinite;

        background-size: cover;

        background-repeat: no-repeat;

    }



    /* Footer */

    footer {
        background: var(--text-primary);
        color: white;
        padding: 40px 0 40px;
    }

    footer p {
        margin-bottom: 0;
    }



    .footer-content {

        display: grid;

        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

        gap: 48px;

        margin-bottom: 48px;

    }



    .footer-column h4 {

        font-size: 16px;

        font-weight: 600;

        margin-bottom: 24px;

        color: white;

    }



    .footer-column a {

        color: rgba(255, 255, 255, 0.7);

        text-decoration: none;

        display: block;

        margin-bottom: 12px;

        font-weight: 400;

        transition: all 0.2s ease;

        pointer-events: none;

    }



    .footer-column a:hover {

        color: var(--primary);

        transform: translateX(4px);

    }


    .footer-bottom {
        /* border-top: 1px solid rgba(255, 255, 255, 0.1); */
        /* padding-top: 32px; */
        text-align: center;
        color: rgba(255, 255, 255, 0.5);
        font-size: 14px;
    }


    /* Animations */

    @keyframes float {



        0%,

        100% {

            transform: translateY(0px) rotate(0deg);

        }



        50% {

            transform: translateY(-20px) rotate(5deg);

        }

    }



    @keyframes float-gentle {



        0%,

        100% {

            transform: translateY(0px);

        }



        50% {

            transform: translateY(-10px);

        }

    }



    @keyframes float-card {



        0%,

        100% {

            transform: translateY(0px) rotate(0deg);

        }



        25% {

            transform: translateY(-15px) rotate(2deg);

        }



        75% {

            transform: translateY(10px) rotate(-2deg);

        }

    }



    @keyframes shimmer {

        0% {

            transform: translateX(-100%) translateY(-100%) rotate(45deg);

        }



        100% {

            transform: translateX(100%) translateY(100%) rotate(45deg);

        }

    }



    @keyframes progress-line {

        0% {

            height: 30%;

        }



        50% {

            height: 60%;

        }



        100% {

            height: 30%;

        }

    }



    @keyframes rotate {

        0% {

            transform: rotate(0deg);

        }



        100% {

            transform: rotate(360deg);

        }

    }



    @keyframes pulse-glow {



        0%,

        100% {

            box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);

        }



        50% {

            box-shadow: 0 0 40px rgba(99, 102, 241, 0.5);

        }

    }



    @keyframes fadeIn {

        from {

            opacity: 0;

            transform: translateY(-10px);

        }



        to {

            opacity: 1;

            transform: translateY(0);

        }

    }



    /* Responsive Design */

    @media (max-width: 768px) {

        .container {

            padding: 0 20px;

        }



        .nav {

            display: none;

        }



        .hero-content {

            grid-template-columns: 1fr;

            gap: 48px;

            text-align: center;

        }



        .hero-visual {

            order: -1;

        }



        .cta-content {

            grid-template-columns: 1fr;

            gap: 48px;

            text-align: center;

        }



        .steps-line {

            display: none;

        }



        .step-item {

            flex-direction: column;

            align-items: center;

            text-align: center;

            margin-bottom: 48px;

        }



        .section-title {

            font-size: 2.5rem;

        }



        .hero-text h1 {

            font-size: 3rem;

        }



        .benefit-item {

            flex-direction: column;

            text-align: center;

            gap: 16px;

        }



        .trust-content {

            grid-template-columns: 1fr;

            gap: 48px;

            text-align: center;

        }



        .testimonial-quote blockquote {

            font-size: 20px;

        }



        .testimonial-quote blockquote::before {

            left: -10px;

            top: -15px;

        }

    }



    @media (max-width: 576px) {
        .site-branding {
            margin-bottom: 0;
        }

        img.custom-logo {
            max-width: 120px;
        }
    }

    @media (max-width: 480px) {

        .header-content {

            padding: 12px 20px;

        }



        .hero {

            padding: 100px 0 60px;

        }



        .benefits,

        .features,

        .how-it-works,

        .resources,

        .trust-proof,

        .faq,

        .final-cta {

            padding: 60px 0;

        }



        .section-header {

            margin-bottom: 48px;

        }



        .feature-card,

        .resource-content {

            padding: 24px;

        }



        .faq-question {

            padding: 20px 24px;

        }



        .faq-answer {

            padding: 0 24px 20px;

        }



        .benefit-item {

            padding: 20px;

        }



        .testimonial-quote blockquote {

            font-size: 18px;

        }



        .badge {

            padding: 12px 16px;

        }

    }



    /* Utility Classes */

    .fade-in {

        opacity: 0;

        transform: translateY(30px);

        transition: all 0.8s ease;

    }



    .fade-in.visible {

        opacity: 1;

        transform: translateY(0);

    }



    .stagger-1 {

        transition-delay: 0.1s;

    }



    .stagger-2 {

        transition-delay: 0.2s;

    }



    .stagger-3 {

        transition-delay: 0.3s;

    }

    .stagger-4 {

        transition-delay: 0.4s;

    }

    .stagger-5 {

        transition-delay: 0.5s;

    }

    .stagger-6 {

        transition-delay: 0.6s;

    }
`;

  useEffect(() => {
    // ----------------------------
    // CONDITIONAL BUTTONS RENDERING
    // ----------------------------
    const headerButtonsContainer = document.getElementById("header-buttons");
    const heroButtonsContainer = document.getElementById("hero-buttons");
    const ctaButtonsContainer = document.getElementById("cta-buttons");

    console.log("isLoggedIn", isLoggedIn);

    // Render header buttons
    if (headerButtonsContainer) {
      // Clear existing content
      headerButtonsContainer.innerHTML = "";

      if (isLoggedIn) {
        // Render authenticated user buttons
        headerButtonsContainer.innerHTML = `
          <button id="dashboard-button" class="header-cta">Dashboard</button>
          <button id="logout-button" class="header-cta">Logout</button>
        `;

        // Add event listeners for authenticated buttons
        const dashboardButton = document.getElementById("dashboard-button");
        const logoutButton = document.getElementById("logout-button");

        dashboardButton?.addEventListener("click", () => {
          // Navigate to dashboard
          navigate("/dashboard");
        });

        logoutButton?.addEventListener("click", () => {
          // Open logout modal
          handleLogout();
        });
      } else {
        // Render unauthenticated user buttons
        headerButtonsContainer.innerHTML = `
          <button id="signup-button" class="header-signup">Sign Up</button>
          <button id="login-button" class="header-cta">Login</button>
        `;

        // Add event listeners for auth buttons
        const signupButton = document.getElementById("signup-button");
        const loginButton = document.getElementById("login-button");

        signupButton?.addEventListener("click", () => {
          // Navigate to signup
          navigate("/register");
        });

        loginButton?.addEventListener("click", () => {
          // Open login modal
          setLoginModalOpen(true);
        });
      }
    }

    // Render hero buttons
    if (heroButtonsContainer) {
      // Clear existing content
      heroButtonsContainer.innerHTML = "";

      if (isLoggedIn) {
        // Render authenticated user hero button
        heroButtonsContainer.innerHTML = `
          <button id="hero-dashboard-button" class="header-cta">Dashboard <span>→</span></button>
        `;
        
        // Add event listener for hero dashboard button
        const heroDashboardButton = document.getElementById("hero-dashboard-button");
        heroDashboardButton?.addEventListener("click", () => {
          navigate("/dashboard");
        });
      } else {
        // Render unauthenticated user hero button
        heroButtonsContainer.innerHTML = `
          <button id="hero-signup-button" class="header-signup">Sign Up <span>→</span></button>
        `;
        
        // Add event listener for hero signup button
        const heroSignupButton = document.getElementById("hero-signup-button");
        heroSignupButton?.addEventListener("click", () => {
          navigate("/register");
        });
      }
    }

    // Render CTA buttons
    if (ctaButtonsContainer) {
      // Clear existing content
      ctaButtonsContainer.innerHTML = "";

      if (isLoggedIn) {
        // Render authenticated user CTA button
        ctaButtonsContainer.innerHTML = `
          <button id="cta-dashboard-button" class="header-cta">Dashboard <span>→</span></button>
        `;
        
        // Add event listener for CTA dashboard button
        const ctaDashboardButton = document.getElementById("cta-dashboard-button");
        ctaDashboardButton?.addEventListener("click", () => {
          navigate("/dashboard");
        });
      } else {
        // Render unauthenticated user CTA button
        ctaButtonsContainer.innerHTML = `
          <button id="cta-login-button" class="header-cta">Login <span>→</span></button>
        `;
        
        // Add event listener for CTA login button
        const ctaLoginButton = document.getElementById("cta-login-button");
        ctaLoginButton?.addEventListener("click", () => {
          setLoginModalOpen(true);
        });
      }
    }

    // ----------------------------
    // SMOOTH SCROLLING FOR ANCHORS
    // ----------------------------
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      });
    });

    // ----------------------------
    // FADE-IN SCROLL ANIMATION
    // ----------------------------
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".fade-in").forEach((el) => {
      observer.observe(el);
    });

    // ----------------------------
    // FAQ TOGGLE
    // ----------------------------
    document.querySelectorAll(".faq-question").forEach((button) => {
      button.addEventListener("click", () => {
        const faqItem = button.parentElement;
        const answer = button.nextElementSibling;
        const icon = button.querySelector(".faq-icon");
        const isActive = faqItem.classList.contains("active");

        document.querySelectorAll(".faq-item").forEach((item) => {
          if (item !== faqItem) {
            item.classList.remove("active");
            item.querySelector(".faq-answer").classList.remove("active");
            item.querySelector(".faq-icon").textContent = "+";
          }
        });

        if (isActive) {
          faqItem.classList.remove("active");
          answer.classList.remove("active");
          icon.textContent = "+";
        } else {
          faqItem.classList.add("active");
          answer.classList.add("active");
          icon.textContent = "×";
        }
      });
    });

    // ----------------------------
    // HEADER SCROLL EFFECT
    // ----------------------------
    const header = document.querySelector("header");
    let lastScrollTop = 0;

    const onScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > 100) {
        header.style.background = "rgba(255, 255, 255, 0.95)";
        header.style.backdropFilter = "blur(20px)";
        header.style.borderBottom = "1px solid rgba(226, 232, 240, 0.8)";
      } else {
        header.style.background = "rgba(255, 255, 255, 0.8)";
        header.style.backdropFilter = "blur(12px)";
        header.style.borderBottom = "1px solid var(--border-light)";
      }

      if (scrollTop > lastScrollTop && scrollTop > 200) {
        header.style.transform = "translateY(-100%)";
      } else {
        header.style.transform = "translateY(0)";
      }

      lastScrollTop = scrollTop;
    };

    window.addEventListener("scroll", onScroll);

    // ----------------------------
    // HOVER EFFECTS
    // ----------------------------
    document
      .querySelectorAll(".feature-card, .resource-card")
      .forEach((card) => {
        card.addEventListener("mouseenter", function () {
          this.style.transform = "translateY(-12px) scale(1.02)";
          this.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
        });
        card.addEventListener("mouseleave", function () {
          this.style.transform = "translateY(0) scale(1)";
        });
      });

    // ----------------------------
    // PARALLAX EFFECT
    // ----------------------------
    const parallaxScroll = () => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector(".hero");
      if (!hero) return;
      const heroHeight = hero.offsetHeight;

      if (scrolled < heroHeight) {
        const parallaxElements = document.querySelectorAll(".floating-card");
        parallaxElements.forEach((element, index) => {
          const speed = 0.5 + index * 0.1;
          element.style.transform = `translateY(${scrolled * speed}px)`;
        });
      }
    };

    window.addEventListener("scroll", parallaxScroll);

    // ----------------------------
    // METRICS COUNTER
    // ----------------------------
    const animateMetrics = () => {
      const metrics = document.querySelectorAll(".metric-value");
      metrics.forEach((metric) => {
        const finalValue = metric.textContent;
        const isPercentage = finalValue.includes("%");
        const isCurrency = finalValue.includes("$");
        const isK = finalValue.includes("K");
        const numericValue = parseFloat(finalValue.replace(/[$%K,]/g, ""));
        let currentValue = 0;
        const increment = numericValue / 50;

        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= numericValue) {
            currentValue = numericValue;
            clearInterval(timer);
          }

          let displayValue = Math.floor(currentValue);
          if (isCurrency) displayValue = `$${displayValue}${isK ? "K" : ""}`;
          else if (isPercentage) displayValue = `${displayValue}%`;

          metric.textContent = displayValue;
        }, 50);
      });
    };

    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(animateMetrics, 1000);
          heroObserver.unobserve(entry.target);
        }
      });
    });

    const hero = document.querySelector(".hero");
    if (hero) heroObserver.observe(hero);

    // ----------------------------
    // VIDEO MODAL
    // ----------------------------
    const videoModal = document.getElementById("videoModal");
    const videoPlaceholder = document.getElementById("videoPlaceholder");
    const playButton = document.getElementById("playButton");
    const videoClose = document.getElementById("videoClose");
    const videoPlayer = document.getElementById("videoPlayer");

    function openVideoModal() {
      videoModal?.classList.add("active");
      document.body.style.overflow = "hidden";
      if (videoPlayer) {
        const currentSrc = videoPlayer.src;
        videoPlayer.src = currentSrc + "&autoplay=1";
      }
    }

    function closeVideoModal() {
      videoModal?.classList.remove("active");
      document.body.style.overflow = "";
      if (videoPlayer) {
        const currentSrc = videoPlayer.src;
        videoPlayer.src = currentSrc.replace("&autoplay=1", "");
      }
    }

    videoPlaceholder?.addEventListener("click", openVideoModal);
    playButton?.addEventListener("click", openVideoModal);
    videoClose?.addEventListener("click", closeVideoModal);

    videoModal?.addEventListener("click", (e) => {
      if (e.target === videoModal) closeVideoModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && videoModal?.classList.contains("active")) {
        closeVideoModal();
      }
    });

    // ----------------------------
    // CLEANUP on unmount
    // ----------------------------
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", parallaxScroll);
      // Add more cleanup if needed
    };
  }, [isLoggedIn, user, navigate, handleLogout, setLoginModalOpen, handleForgotPassword, handleConfirmLogout]);

  return (
    <>
      <style>{legacyCSS}</style>
      <div dangerouslySetInnerHTML={{ __html: rawHTML }} />
      
      {/* Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onForgotPassword={handleForgotPassword}
      />

      {/* Logout Modal */}
      {logoutModalOpen && (
        <LogoutModal
          isOpen={logoutModalOpen}
          onClose={() => setLogoutModalOpen(false)}
          onConfirm={handleConfirmLogout}
        />
      )}
    </>
  );
};

export default HomeNewNew;
