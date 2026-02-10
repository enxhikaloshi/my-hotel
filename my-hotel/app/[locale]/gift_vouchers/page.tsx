'use client';
import {useEffect, useState,useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from '@/components/gift.module.css';
import Link from 'next/link';
import BuyerInfoForm from '@/components/giftFormInfo';
import PaymentShipping, { PaymentShippingData } from '@/components/PaymentShipping';
import Overview from '@/components/overview';

type ViewState = 'selection' | 'details';
type VoucherType = 'spa' | 'value';
type Step = 1 | 2 | 3 | 4;

export default function Moments() {
  const [view, setView] = useState<ViewState>('selection');
  const [activeStep, setActiveStep] = useState<Step>(1);
  const [voucherType, setVoucherType] = useState<VoucherType>('spa');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<any[]>([]);
  const [voucherServices, setVoucherServices] = useState([]);
  const [selectedMotif, setSelectedMotif] = useState(0);
  const [serviceQuantities, setServiceQuantities] = useState<{[key: number]: number}>({});
  const [expandedDropdowns, setExpandedDropdowns] = useState<{[key: number]: boolean}>({});
  const [expandedDetails, setExpandedDetails] = useState<{[key: number]: boolean}>({});
  const [paymentData, setPaymentData] = useState<PaymentShippingData | null>(null);
  const [buyerData, setBuyerData] = useState<any>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [allData, setAllData] = useState<any>({
    buyer: {},
    voucher: {},
    paymentMethod: ''
  });
//step 4 submit
const handleFinalSubmit = async () => {
  try {
    // 1. Llogarit çmimin total në momentin e dërgimit
    const totalPrice = voucherType === 'spa' 
      ? selectedServices.reduce((sum, s) => sum + (serviceQuantities[s.id] || 0) * s.price_euro, 0)
      : voucherAmount;

    // 2.
    const orderData = {
      personalInfo: buyerData, 
      voucherInfo: {
        id: voucherType === 'spa' ? 101 : 102, 
        totalPrice: totalPrice,
        treatmentsList: voucherType === 'spa' 
          ? JSON.stringify(selectedServices.map(s => ({
              name: s.treatment_name,
              qty: serviceQuantities[s.id]
            })))
          : "Value Voucher"
      },
      paymentMethod: paymentData?.paymentMethod || 'Credit Card'
    };

    // 3. Dërgo kërkesën në API
    const response = await fetch('/api/voucher_order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });

    // 4. Kontrollo përgjigjen
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true); 
      } else {
        alert("Server Error: " + result.error);
      }
    } else {
      // Nëse serveri dështon (psh. 500 Error), kthen HTML. Kjo kap gabimin:
      const errorHtml = await response.text();
      console.error("Gabim kritik nga Serveri:", errorHtml);
      alert("Something went wrong on the server. Please check the console.");
    }
  } catch (error) {
    console.error("Gabim në dërgim:", error);
    alert("Network error or invalid data.");
  }
};
  // Step 3: Payment & Shipping
  const handlePaymentNext = (data: PaymentShippingData) => {
    setPaymentData(data);
    setActiveStep(4);
    console.log('Payment & Shipment:', data);
  };

  const handlePaymentBack = () => {
    setActiveStep(2);
  };

  // Step 2: Buyer Information
  const handleFormSubmit = (data: any) => {
    console.log("Buyer data received:", data);
    setBuyerData(data);
    setActiveStep(3); 
  };

  // Step 4: Overview handlers
  const handleOverviewBack = () => {
    setActiveStep(3);
  };

  const handleSubmitOrder = () => {
    console.log('Submitting order...', {
      voucher: {
        type: voucherType,
        amount: voucherType === 'spa' 
          ? selectedServices.reduce((sum, s) => sum + (serviceQuantities[s.id] || 0) * s.price_euro, 0)
          : voucherAmount,
        services: selectedServices.map(s => ({
          ...s,
          quantity: serviceQuantities[s.id] || 0
        })),
        motif: selectedMotif,
        message: voucherData
      },
      buyer: buyerData,
      payment: paymentData
    });
    
    
    alert('Order submitted successfully!');
  };

  // Prepare data for Overview component
  const getVoucherDataForOverview = () => {
    return {
      name: voucherType === 'spa' ? 'Treatment voucher' : 'Feel good Voucher',
      category: voucherType === 'spa' ? 'SPA' : 'VALUE VOUCHER',
      price: voucherType === 'spa' 
        ? selectedServices.reduce((sum, s) => sum + (serviceQuantities[s.id] || 0) * s.price_euro, 0)
        : voucherAmount,
      imageUrl: currentMotifs[selectedMotif]
    };
  };

  const getAdditionalItemsForOverview = () => {
    return selectedServices
      .filter(s => serviceQuantities[s.id] > 0)
      .map(s => ({
        name: s.treatment_name,
        quantity: serviceQuantities[s.id]
      }));
  };

  // Carousel ref
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Motif arrays
  const spaMotifs = [
    '/spa1.jpg', '/gift_voucher2.jpg', '/gift_voucher3.jpg', '/gift_voucher4.jpg',
    '/gift_voucher5.jpg', '/gift_voucher6.jpg', '/gift_voucher7.jpg'
  ];
  
  const valueMotifs = [
    '/gift_voucher8.jpg', '/gift_voucher9.jpg', '/gift_voucher10.jpg', '/gift_voucher11.jpg',
    '/gift_voucher12.jpg', '/gift_voucher4.jpg', '/gift_voucher7.jpg'
  ];
  
  // Current motifs based on voucher type
  const currentMotifs = voucherType === 'spa' ? spaMotifs : valueMotifs;
  
  // Selected image
  const selectedImage = currentMotifs[selectedMotif];
  
  // Carousel navigation
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -220, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 220, behavior: 'smooth' });
    }
  };
  
  const handleOpenDetails = (type: VoucherType) => {
    setVoucherType(type);
    setView('details');
    setActiveStep(1);
  };
  
  const isSelected = (id: number) => selectedServices.some((s: any) => s.id === id);
  
  const toggleService = (service: any) => {
    if (isSelected(service.id)) {
      setSelectedServices(selectedServices.filter(s => s.id !== service.id));
      const newQuantities = {...serviceQuantities};
      delete newQuantities[service.id];
      setServiceQuantities(newQuantities);
    } else {
      if (selectedServices.length < 5) {
        setSelectedServices([...selectedServices, service]);
        setServiceQuantities({...serviceQuantities, [service.id]: 1});
      } else {
        alert("Only a maximum of 5 different types of services can be selected!");
      }
    }
  };

  const updateQuantity = (serviceId: number, quantity: number) => {
    setServiceQuantities({...serviceQuantities, [serviceId]: quantity});
  };

  const toggleDropdown = (serviceId: number) => {
    setExpandedDropdowns({...expandedDropdowns, [serviceId]: !expandedDropdowns[serviceId]});
  };

  const toggleDetails = (serviceId: number) => {
    setExpandedDetails({...expandedDetails, [serviceId]: !expandedDetails[serviceId]});
  };
  
  const [voucherAmount, setVoucherAmount] = useState(50);
  const handleIncrement = () => setVoucherAmount(prev => prev + 1); 
  const handleDecrement = () => setVoucherAmount(prev => (prev > 50 ? prev - 1 : 50));
  
  const removeService = (id: number) => {
    setSelectedServices(selectedServices.filter((s: any) => s.id !== id));
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/treatments?type=voucher');
        if (response.ok) {
          const data = await response.json();
          setVoucherServices(data); 
        }
      } catch (error) {
        console.error("Error while taking the treatments:", error);
      }
    };

    fetchServices();
  }, []);

  const [isVoucherPreviewOpen, setIsVoucherPreviewOpen] = useState(false);
  const [voucherData, setVoucherData] = useState({
    salutation: '',
    message: '',
    recipientName: ''
  });

  const nextStep = () => setActiveStep((prev) => (prev < 4 ? (prev + 1) as Step : prev));
  const prevStep = () => setActiveStep((prev) => (prev > 1 ? (prev - 1) as Step : prev));
 

  return (
    <div className={styles.pageWrapper}>
      <Header forceSmall={true} />
      {isSubmitted ? (
      /* --- KJO SHFAQET VETËM KUR IS_SUBMITTED ESHTE TRUE --- */
      <main className={styles.mainContent}>
        <div className={styles.thankYouContainer} style={{ textAlign: 'center', padding: '100px 20px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Thank you for your voucher order!</h1>
          <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '40px' }}>
            We will process your order immediately and send you the voucher by e-mail shortly.
          </p>
          
          <div className={styles.regardsSection} style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
            <p>Kind regards from Taisten,</p>
            <p><strong>The Feichter family</strong></p>
          </div>
          
        </div>
      </main>
    ) : (
      <>
      <section className={styles.heroContainer}>
        <h2 className={styles.title}>A voucher for moments of endless bliss</h2>
        <p className={styles.description}>
          Moments that touch the heart. <Link href='/cuisine' className={styles.link}>Indulgence</Link> that knows no bounds. And <Link href='/relax' className={styles.link}>wellness</Link> in the<Link href='/experience' className={styles.link}> Dolomites UNESCO World Heritage</Link>. With a voucher for the Alpen Tesitin, you're giving your loved ones all that – and much more besides.
        </p>
      </section>

      <main className={styles.mainContent}>
        {view === 'selection' ? (
          
          <>
            <div className={styles.filterBar}>
              {['All', 'Value voucher', 'Spa'].map(f => (
                <button 
                  key={f}
                  className={activeFilter === f ? styles.activeFilter : ''}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className={styles.voucherGrid}>
              {(activeFilter === 'All' || activeFilter === 'Spa') && (
                <div className={styles.bigCard} onClick={() => handleOpenDetails('spa')}>
                  <img src="/spa1.jpg" alt="Spa" />
                  <div className={styles.cardOverlay}>
                    <span className={styles.topPrice}>From €43.00</span>
                    <div className={styles.bottomInfo}>
                      <span className={styles.categoryLabel}>Spa</span>
                      <h3>Treatment voucher</h3>
                      <button className={styles.detailsBtn}>Details</button>
                    </div>
                  </div>
                </div>
              )}

              {(activeFilter === 'All' || activeFilter === 'Value voucher') && (
                <div className={styles.bigCard} onClick={() => handleOpenDetails('value')}>
                  <img src="/value1.jpg" alt="Value" />
                  <div className={styles.cardOverlay}>
                    <span className={styles.topPrice}>From €50.00</span>
                    <div className={styles.bottomInfo}>
                      <span className={styles.categoryLabel}>Value voucher</span>
                      <h3>Feel good Voucher</h3>
                      <button className={styles.detailsBtn}>Details</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.paymentSection}>
              <p className={styles.paymentTitle}>Payment methods:</p>
              <div className={styles.paymentButtons}>
                <button type="button" className={styles.methodBtn}>Bank transfer</button>
                <button type="button" className={styles.methodBtn}>Credit card</button>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.stepperContainer}>
            {/* PROGRESS BAR */}
            <div className={styles.stepper}>
              {['Coupon', 'Buyer information', 'Payment & shipping', 'Overview'].map((label, idx) => (
                <div key={label} className={`${styles.step} ${activeStep === idx + 1 ? styles.stepActive : ''}`}>
                  <span className={styles.stepNum}>{idx + 1}</span>
                  <span className={styles.stepLabel}>{label}</span>
                </div>
              ))}
            </div>

            <div 
              className={styles.stickyVoucherCard}
              onClick={() => setIsVoucherPreviewOpen(true)}
            >
              <img 
                src={selectedImage} 
                alt="Voucher preview" 
                className={styles.voucherPreviewImage}
              />
              <div className={styles.voucherCardContent}>
                <span className={styles.voucherCategory}>
                  {voucherType === 'spa' ? 'Spa' : 'Value voucher'}
                </span>
                <h3 className={styles.voucherCardTitle}>
                  {voucherType === 'spa' ? 'Treatment voucher' : 'Feel good Voucher'}
                </h3>
                <p className={styles.voucherPrice}>
                  €{voucherType === 'spa' 
                    ? selectedServices.reduce((sum, s) => sum + (serviceQuantities[s.id] || 0) * s.price_euro, 0).toFixed(2)
                    : voucherAmount.toFixed(2)}
                </p>
                <button className={styles.showVoucherBtn}>
                  Show voucher
                </button>
              </div>
            </div>

            {activeStep === 1 && (
              <div className={styles.stepOneContent}>
                <button className={styles.backBtn} onClick={() => activeStep === 1 ? setView('selection') : prevStep()}>
                  <span className={styles.arrowLeft}>←</span>
                </button>
                <h2>{voucherType === 'spa' ? 'Treatment voucher' : 'Feel good Voucher'}</h2>
                <p className={styles.subtext}>Massages and treatments - treat yourself to some pure delight!</p>
                
                <div className={styles.motifSelector}>
                  <h3>Voucher motif</h3>
                  <h4>Use our beautiful motifs to design your personal voucher.</h4>
                 
                  {/* Carousel */}
                  <div className={styles.motifCarousel}>
                    <button 
                      onClick={scrollLeft} 
                      className={styles.navButtonLeft}
                      aria-label="Previous images"
                    >
                      ←
                    </button>
                    
                    <div 
                      ref={carouselRef}
                      className={styles.motifGrid}
                    >
                      {currentMotifs.map((src, index) => (
                        <div 
                          key={index} 
                          className={`${styles.motifItem} ${selectedMotif === index ? styles.motifItemActive : ''}`}
                          onClick={() => setSelectedMotif(index)}
                        >
                          <img 
                            src={src} 
                            alt={`Voucher Motif ${index + 1}`} 
                          />
                          {selectedMotif === index && (
                            <div className={styles.checkmark}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="11" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
                                <path d="M7 12L10.5 15.5L17 9" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className={styles.controlsWrapper}>
                      <div className={styles.carouselCounter}>
                        <button 
                          onClick={scrollRight} 
                          className={styles.navButtonRight}
                          aria-label="Next images"
                        >
                          →
                        </button>
                      </div>
                    </div>
                  </div>

                  {voucherType === 'spa' && (
                    <div className={styles.servicesSection}>
                      <h3>Services</h3>
                      <div className={styles.selectedList}>
                        {selectedServices.map((service: any) => (
                          <div key={service.id} className={styles.selectedItem}>
                            <span>{service.treatment_name} - €{service.price_euro}</span>
                            
                            <button 
                              className={styles.removeItemBtn} 
                              onClick={() => removeService(service.id)}
                              aria-label="Remove service"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      <button className={styles.addServiceBtn} onClick={() => setIsModalOpen(true)}>
                        + Add additionals
                      </button>
                    </div>
                  )}
                  
                  {voucherType === 'value' && (
                    <div className={styles.valueSection}>
                      <h3>Voucher value</h3>
                      <p className={styles.subtext}>Please enter the desired amount here.</p>
                      
                      <label className={styles.amountLabel}>Amount</label>
                      <div className={styles.amountInputContainer}>
                        <input 
                          aria-label='add amount'
                          type="number" 
                          value={voucherAmount} 
                          min="50"
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setVoucherAmount(val < 50 || isNaN(val) ? 50 : val);
                          }}
                          className={styles.amountInput}
                        />
                        
                        <div className={styles.chevronControls}>
                          <button onClick={handleIncrement} className={styles.chevronBtn}>▲</button>
                          <button onClick={handleDecrement} className={styles.chevronBtn}>▼</button>
                        </div>
                        
                        <span className={styles.currencySymbol}>€</span>
                      </div>
                    </div>
                  )}
                  
                  <div className={styles.messageSection}>
                    <label>Recipient & message</label>
                    <h4>Please enter the greeting here and add a few personal words to your voucher.</h4>
                    <h5>Salutation</h5>
                    <input 
                      type="text" 
                      placeholder="Dear..." 
                      className={styles.inputField} 
                      value={voucherData.salutation} 
                      onChange={(e) => setVoucherData({...voucherData, salutation: e.target.value})}
                    />
                    <h5>Message</h5>
                    <textarea 
                      placeholder="Take some time for yourself!" 
                      className={styles.textArea}
                      value={voucherData.message}
                      onChange={(e) => setVoucherData({...voucherData, message: e.target.value})}
                    />
                  </div>
                  <div className={styles.buttonActionGroup}>
                    <button className={styles.backStepBtn} onClick={() => activeStep === 1 ? setView('selection') : prevStep()}>
                      <span className={styles.backArrow}>←</span> Back
                    </button>
                    <button className={styles.proceedBtn} onClick={nextStep}>
                      Proceed to buyer information
                    </button>
                  </div>
                </div>
              </div> 
            )}
              
            {activeStep === 2 && (
              <div className={styles.stepTwoContent}>
                <BuyerInfoForm onNext={handleFormSubmit} onBack={() => setActiveStep(1)} />
              </div>
            )}

            {activeStep === 3 && (
              <div className={styles.stepTwoContent}>
                <div className={styles.formSection}>
                  <PaymentShipping 
                    onNext={handlePaymentNext}
                    onBack={handlePaymentBack}
                  />
                </div>
              </div>
            )}

            {activeStep === 4 && buyerData && paymentData && (
              <div className={styles.stepTwoContent}>
                <Overview
                  voucherData={getVoucherDataForOverview()}
                  buyerData={buyerData}
                  paymentData={paymentData}
                  additionalItems={getAdditionalItemsForOverview()}
                  onBack={handleOverviewBack}
                  onSubmit={handleFinalSubmit}
                />
              </div>
            )}
          </div>
        )}
      
      </main>

      {/* SERVICE MODAL */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div className={styles.headerText}>
                <h3>Details</h3>
                <p>Only a maximum of 5 different types of services can be selected!</p>
              </div>
              <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>×</button>
            </div>

            <div className={styles.serviceList}>
              {voucherServices.map((item: any) => {
                const quantity = serviceQuantities[item.id] || 0;
                const isDropdownOpen = expandedDropdowns[item.id] || false;
                const isDetailsOpen = expandedDetails[item.id] || false;
                
                return (
                  <div key={item.id} className={styles.serviceItemContainer}>
                    <div className={styles.serviceItemRow}>
                      <div className={styles.itemMainInfo}>
                        <div 
                          className={`${styles.checkbox} ${isSelected(item.id) ? styles.checked : ''}`}
                          onClick={() => toggleService(item)}
                        />
                        <div className={styles.nameWrapper}>
                          <span className={styles.serviceName}>
                            {quantity}x {item.treatment_name}
                          </span>
                          <button 
                            className={styles.showDetails}
                            onClick={() => toggleDetails(item.id)}
                          >
                            Show details <span className={`${styles.smallArrow} ${isDetailsOpen ? styles.arrowUp : ''}`}>▼</span>
                          </button>
                        </div>
                      </div>
                      
                      <div className={styles.quantityDropdownWrapper}>
                        <button 
                          className={styles.quantityDropdown}
                          onClick={() => toggleDropdown(item.id)}
                          disabled={!isSelected(item.id)}
                        >
                          <span>{quantity} x €{item.price_euro}.00</span>
                          <span className={`${styles.dropdownArrow} ${isDropdownOpen ? styles.arrowRotated : ''}`}>▼</span>
                        </button>
                        
                        {isDropdownOpen && isSelected(item.id) && (
                          <div className={styles.dropdownMenu}>
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                              <div
                                key={num}
                                className={`${styles.dropdownOption} ${quantity === num ? styles.selectedOption : ''}`}
                                onClick={() => {
                                  updateQuantity(item.id, num);
                                  toggleDropdown(item.id);
                                }}
                              >
                                {num} x €{item.price_euro}.00
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {isDetailsOpen && (
                      <div className={styles.detailsContent}>
                        <p>{item.description || "Treatment details would appear here."}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className={styles.modalFooter}>
              <button 
                className={styles.addBtn} 
                disabled={selectedServices.length === 0}
                onClick={() => setIsModalOpen(false)}
              >
                Add {selectedServices.length} additional
              </button>
            </div>
          </div>
        </div>
      )}

      {isVoucherPreviewOpen && (
        <div className={styles.voucherModalOverlay} onClick={() => setIsVoucherPreviewOpen(false)}>
          <div className={styles.voucherModalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.voucherCloseBtn} 
              onClick={() => setIsVoucherPreviewOpen(false)}
            >
              ×
            </button>
            
            <div className={styles.voucherDocument}>
              <div className={styles.voucherHeader}>
                <img src="/logo.png" alt="Alpen Tesitin" className={styles.voucherLogo} />
              </div>
              
              <img 
                src={selectedImage} 
                alt="Voucher" 
                className={styles.voucherMainImage}
              />
              
              <div className={styles.voucherDetails}>
                <h2 className={styles.voucherTitle}>
                  {voucherType === 'spa' ? 'TREATMENT VOUCHER' : 'VALUE VOUCHER'}
                </h2>
                
                <div className={styles.voucherValue}>
                  <span className={styles.valueLabel}>COUPON VALUE:</span>
                  <span className={styles.valueAmount}>
                    €{voucherType === 'spa' 
                      ? selectedServices.reduce((sum, s) => sum + (serviceQuantities[s.id] || 0) * s.price_euro, 0).toFixed(2)
                      : voucherAmount.toFixed(2)}
                  </span>
                </div>
                
                {voucherType === 'spa' && selectedServices.length > 0 && (
                  <div className={styles.treatmentsList}>
                    <p className={styles.treatmentsIntro}>
                      Massages and treatments - treat yourself to some pure delight!
                    </p>
                    {voucherData.salutation && (
                      <div className={styles.voucherMessage}>
                        <p className={styles.salutation}>{voucherData.salutation}</p>
                        {voucherData.message && (
                          <p className={styles.messageText}>{voucherData.message}</p>
                        )}
                      </div>
                    )}
                    <ul className={styles.treatments}>
                      {selectedServices.map(service => (
                        serviceQuantities[service.id] > 0 && (
                          <li key={service.id}>
                            {serviceQuantities[service.id]}x {service.treatment_name}
                          </li>
                        )
                      ))}
                    </ul>
                  </div>
                )}
                
                {voucherData.salutation && (
                  <div className={styles.voucherMessage}>
                    <p className={styles.salutation}>{voucherData.salutation}</p>
                    {voucherData.message && (
                      <p className={styles.messageText}>{voucherData.message}</p>
                    )}
                  </div>
                )}
                
                <div className={styles.voucherFooter}>
                  <p className={styles.footerNote}>
                    Valid for 3 years. This is valid from the date of purchase and can be extended.
                  </p>
                </div>
              </div>
              
              <div className={styles.contactInfo}>
                <p>Hotel Alpen Tesitin</p>
                <p>Via Roma 2, 73020 Tesitin, Italy | +39 123 456789</p>
                <p>www.alpentesitin.it | info@alpentesitin.it</p>
              </div>
            </div>
          </div>
        </div>
      )}
       </>
    )}
      <Footer />
  
    </div>
  );
}