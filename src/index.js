import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import styles from './index1.module.scss';
import { Zap, Play, Workflow, MessageCircle, Server } from 'lucide-react';

// --- Button (inlined) ---
const Button = React.forwardRef(
  ({ className = '', variant = 'default', size = 'default', ...props }, ref) => {
    const sizeClassMap = {
      default: styles.sizeDefault,
      sm: styles.sizeSm,
      lg: styles.sizeLg,
      icon: styles.sizeIcon,
    };
    const finalClassName = [
      styles.button,
      styles[variant],
      sizeClassMap[size],
      className
    ].filter(Boolean).join(' ');
    return (
      <button className={finalClassName} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

// --- HeroSection (inlined) ---
const HeroSection = ({
  superheading = "AI Assistant & Toolkit Built for Furniture Stores",
  heading = "No Code Needed",
  bodyText = "Customize your AI-powered store with simple drag-and-drop tools, update your offerings in real time, and host it your way on-premise or in the cloud. Automate product discovery, checkout, shipping, and more with zero coding.",
  primaryButtonText = "Get started for free",
  secondaryButtonText = "Talk to sales",
  imageUrl = "https://appsketch-prod-1.s3.amazonaws.com/phurti-cloudfront/imagestore/Screenshot_2025-06-25_at_3.15.11_AM.png",
  imageAlt = "Modern coding workspace"
} = {}) => {
  const sectionRef = useRef(null);
  const handlePrimaryClick = () => {
    window.location.href = '/';
  };
  const handleSecondaryClick = () => {
    window.open('https://wa.me/919611574548?text=Hi%2C%0AI%20would%20like%20to%20know%20more%20about%20your%20product.%0APlease%20contact%20me%21', '_blank');
  };
  const handleMouseMove = (e) => {
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    sectionRef.current.style.setProperty('--x', `${x}%`);
    sectionRef.current.style.setProperty('--y', `${y}%`);
  };
  const handleMouseLeave = () => {
    sectionRef.current.style.setProperty('--x', `50%`);
    sectionRef.current.style.setProperty('--y', `50%`);
  };
  return (
    <section
      className={styles.heroSection}
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.gradientOverlay} />
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.textContent}>
            <h1 className={styles.superheading}>
              <span>
                <span className={styles.orangeText}>AI Assistant</span> &amp; Toolkit Built for <span className={styles.orangeText}>Furniture Stores</span>
              </span>
            </h1>
            <h1 className={styles.heading}>
              <span className={styles.headingGradient}>{heading}</span>
            </h1>
            <p className={styles.bodyText}>{bodyText}</p>
            <div className={styles.buttonGroup}>
              <Button size="lg" onClick={handlePrimaryClick} className={styles.primaryButton}>{primaryButtonText}</Button>
              <Button variant="outline" size="lg" onClick={handleSecondaryClick} className={styles.secondaryButton}>{secondaryButtonText}</Button>
            </div>
          </div>
          <div className={styles.imageContent}>
            <div className={styles.imageWrapper}>
              {imageUrl ? (
                <img src={imageUrl} alt={imageAlt} className={styles.image} />
              ) : (
                <div className={styles.imagePlaceholder}>
                  <Zap size={120} className={styles.placeholderIcon} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- TabbedImageSelector (inlined) ---
const defaultTabs = [
  {
    id: 'it-ops',
    title: 'IT Ops can',
    subtitle: 'On-board new employees',
    icon: <Zap />,
    imageUrl: "https://appsketch-prod-1.s3.amazonaws.com/phurti-cloudfront/imagestore/Screenshot_2025-07-02_at_1.44.17_AM.png",
  },
  {
    id: 'sec-ops',
    title: 'Sec Ops can',
    subtitle: 'Enrich security incident tickets',
    icon: <Zap />,
    imageUrl: "https://appsketch-prod-1.s3.amazonaws.com/phurti-cloudfront/imagestore/WhatsApp_Image_2025-06-29_at_15.38.31.jpeg",
  },
  {
    id: 'dev-ops',
    title: 'Dev Ops can',
    subtitle: 'Convert natural language into API calls',
    icon: <Zap />,
    imageUrl: "https://appsketch-prod-1.s3.amazonaws.com/phurti-cloudfront/imagestore/Screenshot_2025-07-02_at_1.44.39_AM.png",
  }
];
const TabbedImageSelector = ({ tabs = defaultTabs } = {}) => {
  const [selectedTabId, setSelectedTabId] = useState(tabs[0]?.id || '');
  const selectedTab = tabs.find(tab => tab.id === selectedTabId);
  return (
    <div className={styles.tabSelector}>
      <div className={styles.tabRow}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTabId(tab.id)}
            className={`${styles.tabButton} ${selectedTabId === tab.id ? styles.tabButtonSelected : ''}`}
          >
            <div className={styles.tabButtonContent}>
              <span className={styles.tabIcon}>{tab.icon}</span>
              <span className={styles.tabTitle}>{tab.title}</span>
            </div>
            <p className={styles.tabSubtitle}>{tab.subtitle}</p>
          </button>
        ))}
      </div>
      <div className={styles.contentArea}>
        {selectedTab?.imageUrl ? (
          <img src={selectedTab.imageUrl} alt={`${selectedTab.title} workflow`} className={styles.image} />
        ) : (
          <div className={styles.fallbackContent}>
            <div className={styles.fallbackIconWrapper}>
              {selectedTab?.icon && React.cloneElement(selectedTab.icon, { className: styles.fallbackIcon })}
            </div>
            <h3 className={styles.fallbackTitle}>{selectedTab?.title}</h3>
            <p className={styles.fallbackSubtitle}>{selectedTab?.subtitle}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- FeatureGrid (inlined) ---
const defaultFeatures = [
  {
    id: 'agents',
    title: 'Build Smart Workflows That Run Your Furniture Store 14 Your Way',
    body: 'Design multi-step automations for anything 14 from managing daily orders to tracking stock 14 all in one place. Just drag and drop to create AI-powered tools that fit your Furniture store.',
    buttonText: 'Explore AI',
    icon: <Workflow />,
    placement: 'A'
  },
  {
    id: 'chat',
    title: 'Chat with Your Furniture Store 14 And Make Smarter Decisions Instantly',
    body: 'Use Slack, Teams, SMS, voice, or our embedded chat interface to get accurate answers from your data, create tasks, and complete workflows.',
    icon: <MessageCircle />,
    placement: 'B'
  },
  {
    id: 'self-host',
    title: 'Host Your Furniture Store`s AI Tools Anywhere 14 Even On Your Own Server',
    body: '',
    listItems: [
      'Whether you want full control with on-premise hosting or the convenience of the cloud, your Furniture Store`s AI workflows, data, and tools stay in your hands 14 always secure, always customizable.'
    ],
    icon: <Server />,
    placement: 'C'
  }
];
const FeatureGrid = ({ features = defaultFeatures } = {}) => {
  const getGridClass = (placement) => {
    if (placement === 'A') return styles.cardA;
    if (placement === 'B') return styles.cardB;
    if (placement === 'C') return styles.cardC;
    return '';
  };
  const getIconClass = (placement) => {
    if (placement === 'A') return styles.iconA;
    if (placement === 'B') return styles.iconB;
    if (placement === 'C') return styles.iconC;
    return '';
  };
  const handleButtonClick = () => {
    window.location.href = '/';
  };
  return (
    <section className={styles.featureGridSection}>
      <div className={styles.featureGridHeadingWrapper}>
        <h2 className={styles.featureGridHeading}>
          <span className={styles.featureGridHeadingTop}>Bring AI to Your Furniture Store</span>
          <span className={styles.featureGridHeadingBottom}>Without the Tech Headaches</span>
        </h2>
      </div>
      <div className={styles.grid}>
        {features.map((feature, idx) => {
          const cardRef = useRef(null);
          const handleMouseMove = (e) => {
            const rect = cardRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            cardRef.current.style.setProperty('--x', `${x}%`);
            cardRef.current.style.setProperty('--y', `${y}%`);
          };
          return (
            <div
              key={feature.id}
              ref={cardRef}
              className={`${styles.card} ${getGridClass(feature.placement)}`}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => {
                cardRef.current.style.removeProperty('--x');
                cardRef.current.style.removeProperty('--y');
              }}
            >
              <div className={styles.gradientOverlay} />
              {feature.id === 'self-host' && (
                <div className={styles.selfHostedBadge}>SELF HOSTED</div>
              )}
              {feature.icon && (
                <div className={`${styles.iconBg} ${getIconClass(feature.placement)}`}>
                  {React.cloneElement(feature.icon, { className: `${getIconClass(feature.placement)}` })}
                </div>
              )}
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                {feature.body && <p className={styles.cardBody}>{feature.body}</p>}
                {feature.listItems && (
                  <ul className={styles.list}>
                    {feature.listItems.map((item, index) => (
                      <li key={index} className={styles.listItem}>
                        <div className={styles.bullet} />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {feature.buttonText && (
                  <Button className={styles.button} onClick={handleButtonClick}>{feature.buttonText}</Button>
                )}
                {feature.id === 'chat' && (
                  <div className={styles.chatBubbles}>
                    <div className={styles.bubbleUser}>
                      <p className={styles.bubbleUserText}>Who held meetings with SpaceX last week?</p>
                    </div>
                    <div className={styles.bubbleBot}>
                      <p className={styles.bubbleBotText}>On Wednesday, Joe updated the status to "won" in Salesforce after a Zoom call.</p>
                    </div>
                    <div className={styles.bubbleUser}>
                      <p className={styles.bubbleUserText}>Create a task in Asana...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// --- StickyScrollSection (inlined) ---
const StickyScrollSection = () => {
  const handleButtonClick = () => {
    window.location.href = '/';
  };
  return (
    <section className={styles.stickyScrollSection}>
      <div className={styles.stickyWhite}>
        <div className={styles.whiteContentGrid}>
          <div className={styles.leftContent}>
            <div className={styles.headingGroup}>
              <h2 className={styles.heading}>
                Code when you need it,<br />
                <span className={styles.headingSub}>UI when you don&apos;t</span>
              </h2>
              <p className={styles.description}>
                Other tools limit you to either a visual building experience, or code. 
                With Appsketch, you get the best of both worlds.
              </p>
            </div>
            <div className={styles.featureList}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>&lt;/&gt;</span>
                <div>
                  <span className={styles.featureTitle}>Export the code you want</span>
                  <span className={styles.featureDesc}> - you can always fall back to code</span>
                </div>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>&lt;/&gt;</span>
                <div>
                  <span className={styles.featureTitle}>Use our intuitive editor </span>
                  <span className={styles.featureDesc}> to customize your app the way you want</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.rightContent}>
            <div className={styles.workflowCard}>
              <div className={styles.workflowNodes}>
                <div className={styles.nodeRow}>
                  <div className={styles.nodeBlue}>
                    <div className={styles.nodeDotBlue}></div>
                    <span className={styles.nodeLabel}>Trigger</span>
                  </div>
                  <div className={styles.nodeLine}></div>
                </div>
                <div className={styles.nodeRow}>
                  <div className={styles.nodeGreen}>
                    <div className={styles.nodeDotGreen}></div>
                    <span className={styles.nodeLabel}>Process</span>
                  </div>
                  <div className={styles.nodeLine}></div>
                </div>
                <div className={styles.codeOverlayWrapper}>
                  <div className={styles.codeOverlay}>
                    <div className={styles.codeLine + ' ' + styles.codeOrange}>const</div>
                    <div className={styles.codeLine + ' ' + styles.codeBlue}>result = items.map</div>
                    <div className={styles.codeLine + ' ' + styles.codePurple}>(item =&gt; item.data)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.darkSection}>
        <div className={styles.heroContainer}>
          <div className={styles.content}>
            <h1>Chat. Tweak. Repeat</h1>
            <p>The same short feedback loops that make you smile at your scripts.</p>
            <ul className={styles.features}>
              <li>
                <span className={styles.check} />
                <div>
                  <strong>Chat with our system to update any flow you have created in your Furniture Store instantly</strong>
                  <span></span>
                </div>
              </li>
              <li>
                <span className={styles.check} />
                <div>
                  <strong>Ai enabled data analytics for boosting sales and marketing</strong>
                  <span></span>
                </div>
              </li>
              <li>
                <span className={styles.check} />
                <div>
                  <strong>Single click deployment</strong>
                  <span></span>
                </div>
              </li>
              <li>
                <span className={styles.check} />
                <div>
                  <strong>Choose from existing templates to jusm start your Furniture store online</strong>
                  <span></span>
                </div>
              </li>
            </ul>
            <button className={styles.ctaButton} onClick={handleButtonClick}>
              See full product overview
            </button>
          </div>
          <div className={styles.visual}>
            <div className={styles.centralCircle}>
              <svg className={styles.icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L3 14h7l-1 8L21 10h-7l-1-8z" fill="currentColor" />
              </svg>
            </div>
            <div className={styles.line} />
            <div className={styles.line} />
            <div className={styles.line} />
            <div className={styles.line} />
          </div>
        </div>
      </div>
    </section>
  );
};

// --- ContactUsV2 (inlined) ---
const ContactUsV2 = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
      alert('Thank You for contacting us, we will get in touch with you soon.');
    }, 1200);
  };
  const handleOnChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  return (
    <div className="contact-container">
      <h1 className="contact-title">Get in <span>Touch</span></h1>
      <p className="contact-description">We'd love to hear from you! Reach out to us for any inquiries or collaborations.</p>
      <div className="contact-content">
        <div className="contact-info">
          <div className="contact-card">
            <div className="contact-icon email"></div>
            <h3>Email Us 📧</h3>
            <p><a href="mailto:care@appsketch.ai">care@appsketch.ai</a></p>
          </div>
          <div className="contact-card">
            <div className="contact-icon phone"></div>
            <h3>Call Us 📞</h3>
            <p>+91 9611574548</p>
          </div>
          <div className="contact-card">
            <h3>Connect with us on Discord</h3>
            <a href='https://discord.com/invite/efndymmh' >{`https://discord.com/invite/efndymmh`} </a>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmitForm}>
          <div className="input-wrapper" >
            <input type="text" placeholder="Your Name" required value={formData.name} onChange={e => handleOnChange('name', e.target.value)} />
          </div>
          <div className="input-wrapper">
            <input type="email" placeholder="Your Email" required value={formData.email} onChange={e => handleOnChange('email', e.target.value)} />
          </div>
          <div className="input-wrapper">
            <textarea placeholder="Your Message" rows="5" required value={formData.message} onChange={e => handleOnChange('message', e.target.value)}></textarea>
          </div>
          <button type="submit" className={isSubmitting ? "submit-button submitting" : "submit-button"} disabled={isSubmitting}>
            {isSubmitting ? <span className="submit-loader" /> : <span>Send Message</span>}
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Main Page ---
function App() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <HeroSection />
        <TabbedImageSelector />
        <FeatureGrid />
        <StickyScrollSection />
        <ContactUsV2 />
      </div>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />); 