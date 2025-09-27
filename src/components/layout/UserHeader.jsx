import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import BusinessNumberValidator from './BusinessNumberValidator';
import AddressSearch from './AddressSearch';

function UserHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('login');
  const [mobileAuthStep, setMobileAuthStep] = useState('select');
  const [signupMethod, setSignupMethod] = useState('');
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [termsScrolled, setTermsScrolled] = useState(false);
  const [completedFields, setCompletedFields] = useState([]);
  const [showGooglePopup, setShowGooglePopup] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [isSeller, setIsSeller] = useState(false);
  const [businessData, setBusinessData] = useState({
    businessName: '',
    businessNumber: '',
    address: '',
    representative: ''
  });
  const termsRef = useRef(null);
  const formContainerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 첫 화면에서만 구글 팝업 표시 (하루에 한 번만)
  useEffect(() => {
    if (location.pathname === '/') {
      const lastShownDate = localStorage.getItem('googlePopupLastShown');
      const today = new Date().toDateString();
      
      if (lastShownDate !== today) {
        setShowGooglePopup(true);
        localStorage.setItem('googlePopupLastShown', today);
      }
    } else {
      setShowGooglePopup(false);
    }
  }, [location]);

  const navItems = [
    { 
      path: '/products', 
      text: '공급상품',
      hasSubmenu: true,
      submenu: [
        { path: '/products/all', text: '전체상품' },
        { path: '/products/calendar', text: '상품캘린더' },
        { path: '/products/images', text: '이미지다운로드' }
      ]
    },
    { path: '/orders', text: '발주시스템' },
    { 
      path: '/tools', 
      text: '업무도구',
      hasSubmenu: true,
      submenu: [
        { path: '/tools/margin-calculator', text: '마진계산기' },
        { path: '/tools/price-simulator', text: '판매가 시뮬레이터' },
        { path: '/tools/order-integration', text: '주문통합 (Excel)' },
        { path: '/tools/option-pricing', text: '옵션가 세팅' },
        { path: '/tools/inventory-tracker', text: '재고 추적기' },
        { path: '/tools/discount-calculator', text: '할인율 계산기' },
        { path: '/tools/sales-analytics', text: '매출 분석' },
        { path: '/tools/customer-message', text: '고객 메시지' },
        { path: '/tools/barcode-generator', text: '바코드 생성기' },
        { path: '/tools/transaction-statement', text: '거래명세서 즉시 발급' },
        { path: '/tools/trend-analysis', text: '트렌드 분석' },
        { path: '/tools/competitor-monitor', text: '경쟁사 모니터링' },
        { path: '/tools/product-name-optimizer', text: '상품명 최적화 도구' },
        { path: '/tools/review-analyzer', text: '리뷰 분석' },
        { path: '/tools/price-recommender', text: '판매가/할인가 추천기' },
        { path: '/tools/category-rank-checker', text: '카테고리 순위 확인' }
      ]
    },
    { path: '/pricing', text: '요금제' },
    { path: '/winwin', text: 'Win-Win', special: true },
    { path: '/notice', text: '공지사항' },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  const openModal = (mode) => {
    setModalMode(mode);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
    if (mode === 'signup' && isMobile) {
      setMobileAuthStep('select');
      setCompletedFields([]);
      setCurrentFieldIndex(0);
      setFormData({});
      setTermsScrolled(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'unset';
    setMobileAuthStep('select');
    setSignupMethod('');
    setCurrentFieldIndex(0);
    setTermsScrolled(false);
    setCompletedFields([]);
    setFormData({});
  };

  const signupFields = [
    { name: 'name', label: '이름', type: 'text', placeholder: '실명을 입력해주세요' },
    { name: 'phone', label: '전화번호', type: 'tel', placeholder: '0000-0000', prefix: '010' },
    { name: 'email', label: '이메일', type: 'email', placeholder: 'example@email.com' },
    { name: 'password', label: '비밀번호', type: 'password', placeholder: '8자 이상 영문, 숫자 조합' },
  ];

  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 4) {
      return numbers;
    } else if (numbers.length <= 8) {
      return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
    }
    return `${numbers.slice(0, 4)}-${numbers.slice(4, 8)}`;
  };

  const handleGoogleAccountSelect = (account) => {
    setSelectedAccount(account);
    setShowGooglePopup(false);
    // 여기서 실제 구글 로그인 처리
    console.log('구글 로그인:', account);
  };

  const googleAccounts = [
    { email: 'gomdolllll', domain: 'syey1744@gmail.com', avatar: '🏔️' },
    { email: 'papa fresh (파파프레시)', domain: 'papafresh.ceo@gmail.com', avatar: '🍑' }
  ];

  // 터치 이벤트 핸들러 추가
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    // 스와이프 중 처리 필요시 추가
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > 50) { // 50px 이상 스와이프시
      if (diff > 0) {
        // 왼쪽으로 스와이프 - 다음 카드
        handleNextCard();
      } else {
        // 오른쪽으로 스와이프 - 이전 카드
        handlePrevCard();
      }
    }
  };

  const handleNextCard = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentCardIndex((prev) => (prev + 1) % navItems.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handlePrevCard = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentCardIndex((prev) => (prev - 1 + navItems.length) % navItems.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  // 모바일 Bottom Sheet 모달
  const MobileAuthModal = () => {
    if (!showModal || !isMobile) return null;

    const handleTermsScroll = (e) => {
      const element = e.target;
      const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 10;
      setTermsScrolled(isAtBottom);
    };

    const handleTermsAgree = () => {
      if (signupMethod === 'email') {
        setMobileAuthStep('form');
        setCurrentFieldIndex(0);
        setCompletedFields([]);
      } else {
        console.log(`${signupMethod} 소셜 로그인 처리`);
        closeModal();
      }
    };

    const handleNextField = () => {
      if (currentFieldIndex < signupFields.length - 1) {
        setCompletedFields([...completedFields, currentFieldIndex]);
        setCurrentFieldIndex(currentFieldIndex + 1);
        
        setTimeout(() => {
          if (formContainerRef.current) {
            formContainerRef.current.scrollTop = formContainerRef.current.scrollHeight;
          }
        }, 100);
      } else {
        console.log('회원가입 완료', formData);
        closeModal();
      }
    };

    const handlePhoneInput = (e) => {
      const formatted = formatPhoneNumber(e.target.value);
      setFormData({ ...formData, phone: formatted });
      
      if (formatted.length === 9) {
        setTimeout(handleNextField, 300);
      }
    };

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'flex-end',
        padding: '0 10px'
      }} onClick={closeModal}>
        <div style={{
          background: 'white',
          width: '100%',
          maxWidth: '500px',
          margin: '0 auto',
          height: modalMode === 'signup' ? '70vh' : '60vh',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          transform: 'translateY(0)',
          transition: 'transform 0.3s ease-out'
        }} onClick={(e) => e.stopPropagation()}>

          <div style={{
            padding: '8px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '32px',
              height: '4px',
              background: '#ddd',
              borderRadius: '2px'
            }} />
          </div>

          {modalMode === 'login' ? (
            <div style={{ padding: '20px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '24px' }}>
                로그인
              </h2>

              <input type="email" placeholder="이메일" style={{
                width: '100%',
                padding: '14px',
                border: '1px solid #e0e0e0',
                borderRadius: '10px',
                fontSize: '15px',
                marginBottom: '10px'
              }} />
              
              <input type="password" placeholder="비밀번호" style={{
                width: '100%',
                padding: '14px',
                border: '1px solid #e0e0e0',
                borderRadius: '10px',
                fontSize: '15px',
                marginBottom: '20px'
              }} />

              <button style={{
                width: '100%',
                padding: '14px',
                background: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: '500',
                marginBottom: '12px'
              }}>로그인</button>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <button style={{
                  flex: 1,
                  padding: '10px',
                  background: '#FEE500',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '13px'
                }}>카카오</button>
                <button style={{
                  flex: 1,
                  padding: '10px',
                  background: '#03C75A',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '13px'
                }}>네이버</button>
                <button style={{
                  flex: 1,
                  padding: '10px',
                  background: 'white',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '13px'
                }}>구글</button>
              </div>

              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '13px', color: '#666' }}>
                  계정이 없으신가요?{' '}
                  <a onClick={() => setModalMode('signup')} style={{
                    color: '#2563eb',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}>회원가입</a>
                </span>
              </div>
            </div>
          ) : (
            <>
              {mobileAuthStep === 'select' && (
                <div style={{ padding: '20px' }}>
                  <h2 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '24px' }}>
                    회원가입
                  </h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button onClick={() => {
                      setSignupMethod('email');
                      setMobileAuthStep('terms');
                    }} style={{
                      padding: '14px',
                      background: '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '15px',
                      fontWeight: '500'
                    }}>이메일로 시작하기</button>

                    <button onClick={() => {
                      setSignupMethod('kakao');
                      setMobileAuthStep('terms');
                    }} style={{
                      padding: '14px',
                      background: '#FEE500',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '15px',
                      fontWeight: '500'
                    }}>카카오로 3초 가입</button>

                    <button onClick={() => {
                      setSignupMethod('naver');
                      setMobileAuthStep('terms');
                    }} style={{
                      padding: '14px',
                      background: '#03C75A',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '15px',
                      fontWeight: '500'
                    }}>네이버로 시작하기</button>

                    <button onClick={() => {
                      setSignupMethod('google');
                      setMobileAuthStep('terms');
                    }} style={{
                      padding: '14px',
                      background: 'white',
                      border: '1px solid #ddd',
                      borderRadius: '10px',
                      fontSize: '15px',
                      fontWeight: '500'
                    }}>구글 계정으로 가입</button>
                  </div>
                </div>
              )}

              {mobileAuthStep === 'terms' && (
                <div style={{ 
                  position: 'absolute',
                  top: '40px',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex', 
                  flexDirection: 'column',
                  padding: '20px'
                }}>
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: '600', 
                    marginBottom: '16px'
                  }}>
                    이용약관
                  </h3>
                  
                  <div 
                    ref={termsRef}
                    onScroll={handleTermsScroll}
                    style={{
                      position: 'relative',
                      height: 'calc(100% - 100px)',
                      overflowY: 'scroll',
                      WebkitOverflowScrolling: 'touch',
                      padding: '12px',
                      background: '#f8f8f8',
                      borderRadius: '10px',
                      fontSize: '13px',
                      lineHeight: '1.6',
                      marginBottom: '16px'
                    }}>
                    <h4>제1조 (목적)</h4>
                    <p>이 약관은 달래마켓이 제공하는 서비스 이용조건을 규정합니다.</p>
                    <br/>
                    <h4>제2조 (정의)</h4>
                    <p>서비스란 회사가 제공하는 모든 서비스를 의미합니다.</p>
                    <br/>
                    <h4>제3조 (약관의 효력)</h4>
                    <p>본 약관은 서비스를 이용하는 모든 회원에게 적용됩니다.</p>
                    <br/>
                    <h4>제4조 (회원가입)</h4>
                    <p>회원가입은 이용자가 약관에 동의하고 회사가 승낙함으로써 성립됩니다.</p>
                    <br/>
                    <h4>제5조 (서비스의 제공)</h4>
                    <p>회사는 다음과 같은 서비스를 제공합니다.</p>
                    <ul>
                      <li>농산물 공급 서비스</li>
                      <li>시세 정보 제공</li>
                      <li>발송 관리 서비스</li>
                      <li>발주 시스템</li>
                    </ul>
                    <br/>
                    <h4>제6조 (개인정보보호)</h4>
                    <p>회사는 이용자의 개인정보를 중요시하며, 개인정보보호법을 준수합니다.</p>
                    <br/>
                    <h4>제7조 (이용자의 의무)</h4>
                    <p>이용자는 다음 행위를 하여서는 안 됩니다.</p>
                    <ul>
                      <li>타인의 정보 도용</li>
                      <li>서비스 운영 방해</li>
                      <li>저작권 침해</li>
                    </ul>
                    <br/>
                    <h4>제8조 (서비스 이용 제한)</h4>
                    <p>회사는 이용자가 약관을 위반한 경우 서비스 이용을 제한할 수 있습니다.</p>
                    <br/>
                    <h4>제9조 (면책조항)</h4>
                    <p>천재지변 등 불가항력적 사유로 인한 서비스 중단에 대해 회사는 책임지지 않습니다.</p>
                    <br/>
                    <h4>제10조 (분쟁 해결)</h4>
                    <p>서비스 이용과 관련하여 분쟁이 발생한 경우 양 당사자는 성실히 협의하여 해결합니다.</p>
                    <br/>
                    <p style={{ marginTop: '20px', fontWeight: 'bold', paddingBottom: '20px' }}>
                      약관의 끝입니다. 위 내용에 모두 동의하십니까?
                    </p>
                  </div>

                  <button 
                    disabled={!termsScrolled}
                    onClick={handleTermsAgree}
                    style={{
                      position: 'absolute',
                      bottom: '20px',
                      left: '20px',
                      right: '20px',
                      padding: '14px',
                      background: termsScrolled ? '#2563eb' : '#e0e0e0',
                      color: termsScrolled ? 'white' : '#999',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '15px',
                      fontWeight: '500',
                      transition: 'all 0.3s',
                      cursor: termsScrolled ? 'pointer' : 'not-allowed'
                    }}>
                    {termsScrolled ? '동의하고 계속하기' : '약관을 끝까지 읽어주세요'}
                  </button>
                </div>
              )}

              {mobileAuthStep === 'form' && (
                <div style={{ 
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '20px'
                }}>
                  <div style={{
                    display: 'flex',
                    gap: '3px',
                    marginBottom: '24px'
                  }}>
                    {signupFields.map((_, index) => (
                      <div key={index} style={{
                        flex: 1,
                        height: '3px',
                        background: index <= currentFieldIndex ? '#2563eb' : '#e0e0e0',
                        borderRadius: '2px',
                        transition: 'background 0.3s'
                      }} />
                    ))}
                  </div>

                  <div 
                    ref={formContainerRef}
                    style={{ 
                      flex: 1,
                      overflowY: 'auto',
                      paddingBottom: '20px'
                    }}>
                    {completedFields.map(index => (
                      <div key={index} style={{
                        marginBottom: '20px',
                        opacity: 0.6
                      }}>
                        <label style={{ fontSize: '13px', color: '#666', marginBottom: '4px', display: 'block' }}>
                          {signupFields[index].label}
                        </label>
                        <div style={{
                          padding: '12px',
                          background: '#f8f8f8',
                          borderRadius: '8px',
                          fontSize: '14px'
                        }}>
                          {signupFields[index].prefix ? `${signupFields[index].prefix}-` : ''}{formData[signupFields[index].name]}
                        </div>
                      </div>
                    ))}

                    <div className="slide-animation" key={currentFieldIndex}>
                      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                        {signupFields[currentFieldIndex].label}
                      </h3>
                      
                      <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
                        {currentFieldIndex === 0 && '서비스에서 사용할 이름을 입력해주세요'}
                        {currentFieldIndex === 1 && '본인 확인을 위한 번호를 입력해주세요'}
                        {currentFieldIndex === 2 && '로그인에 사용할 이메일을 입력해주세요'}
                        {currentFieldIndex === 3 && '안전한 비밀번호를 설정해주세요'}
                      </p>

                      {signupFields[currentFieldIndex].name === 'phone' ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{
                            padding: '14px',
                            background: '#f0f0f0',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '500'
                          }}>010</span>
                          <input
                            type="tel"
                            placeholder={signupFields[currentFieldIndex].placeholder}
                            value={formData.phone || ''}
                            onChange={handlePhoneInput}
                            maxLength="9"
                            autoFocus
                            style={{
                              flex: 1,
                              padding: '14px',
                              border: '2px solid #2563eb',
                              borderRadius: '8px',
                              fontSize: '16px',
                              outline: 'none'
                            }}
                          />
                        </div>
                      ) : (
                        <input
                          type={signupFields[currentFieldIndex].type}
                          placeholder={signupFields[currentFieldIndex].placeholder}
                          value={formData[signupFields[currentFieldIndex].name] || ''}
                          onChange={(e) => setFormData({ ...formData, [signupFields[currentFieldIndex].name]: e.target.value })}
                          autoFocus
                          style={{
                            width: '100%',
                            padding: '14px',
                            border: '2px solid #2563eb',
                            borderRadius: '8px',
                            fontSize: '16px',
                            outline: 'none'
                          }}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleNextField();
                            }
                          }}
                        />
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', paddingTop: '16px' }}>
                    {currentFieldIndex > 0 && (
                      <button onClick={() => {
                        setCurrentFieldIndex(currentFieldIndex - 1);
                        setCompletedFields(completedFields.filter(i => i !== currentFieldIndex - 1));
                      }} style={{
                        padding: '12px 20px',
                        background: '#f0f0f0',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}>이전</button>
                    )}
                    
                    <button onClick={handleNextField} style={{
                      flex: 1,
                      padding: '12px',
                      background: '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}>
                      {currentFieldIndex === signupFields.length - 1 ? '가입완료' : '다음'}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  // 모바일 헤더
  if (isMobile) {
    return (
      <>
        <div style={{ height: '70px' }} />
        <header style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          background: 'white',
          zIndex: 1000
        }}>
          {/* 헤더 상단 */}
          <div style={{
            height: '70px',
            borderBottom: '1px solid #e0e0e0',
            paddingTop: '10px',
            paddingBottom: '10px'
          }}>
            <div style={{
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 16px'
            }}>
              <button 
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                <div style={{ width: '20px', height: '2px', background: '#212529', transition: 'all 0.3s' }}></div>
                <div style={{ width: '20px', height: '2px', background: '#212529', transition: 'all 0.3s' }}></div>
                <div style={{ width: '20px', height: '2px', background: '#212529', transition: 'all 0.3s' }}></div>
              </button>

              <Link to="/" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                <img 
                  src="https://res.cloudinary.com/dde1hpbrp/image/upload/v1753148563/05_etc/dalraemarket_papafarmers.com/DalraeMarket_loge_trans.png"
                  alt="달래마켓"
                  style={{ height: '20px' }}
                />
              </Link>
              
              <button onClick={() => openModal('login')} style={{
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '13px',
                background: 'linear-gradient(135deg, #5b8def 0%, #2563eb 50%, #1d4ed8 100%)',
                color: 'white',
                border: 'none',
                fontWeight: '500',
                boxShadow: '0 2px 8px rgba(37, 99, 235, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <span style={{ position: 'relative', zIndex: 1 }}>로그인</span>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                  animation: 'shine 3s infinite'
                }}></div>
                <style>{`
                  @keyframes shine {
                    0% { left: -100%; }
                    20% { left: 100%; }
                    100% { left: 100%; }
                  }
                `}</style>
              </button>
            </div>
          </div>

          {/* 카드 메뉴 섹션 - 홈 화면 제외 */}
          {location.pathname !== '/' && (
            <div 
              style={{
                height: '100px',
                background: 'linear-gradient(to bottom, #fafafa 0%, #ffffff 100%)',
                position: 'relative',
                overflow: 'visible',
                padding: '15px 0',
                perspective: '1000px'
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div style={{
                position: 'relative',
                height: '70px',
                width: '200px',
                margin: '0 auto'
              }}>
                {navItems.map((item, index) => {
                  const distance = (index - currentCardIndex + navItems.length) % navItems.length;
                  const isActive = distance === 0;
                  const isFlipping = isAnimating && isActive;
                  
                  // 카드 위치 및 스타일 계산
                  let zIndex = 20 - distance;
                  let translateY = 0;
                  let translateX = 0;
                  let scale = 1;
                  let opacity = 1;
                  let rotate = 0;
                  
                  if (isActive) {
                    zIndex = 20;
                    scale = 1;
                  } else {
                    // 뒤에 대기 중인 카드들 - 왼쪽으로 배치
                    translateY = distance * 3;
                    translateX = distance * -8;  // 음수로 변경하여 왼쪽으로
                    scale = 1 - (distance * 0.03);
                    opacity = distance <= 6 ? 1 - (distance * 0.12) : 0;
                    rotate = distance * -1;  // 음수로 변경
                  }
                  
                  return (
                    <div
                      key={item.path}
                      onClick={() => {
                        if (isActive) {
                          // 활성 카드 클릭 시 페이지 이동
                          navigate(item.path);
                        } else if (!isAnimating && distance <= 3) {
                          // 보이는 카드 클릭 시 해당 카드로 이동
                          setCurrentCardIndex(index);
                        }
                      }}
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        background: isActive ?
                          'linear-gradient(145deg, #ffffff 0%, #e7f3ff 50%, #dbeafe 100%)' :
                          'linear-gradient(145deg, #ffffff 0%, #fafafa 100%)',
                        borderRadius: '12px',
                        boxShadow: isActive ? 
                          '0 3px 10px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.1)' : 
                          '0 2px 5px rgba(0,0,0,0.15)',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transform: isFlipping ? 
                          'translateY(-30px) rotateX(-15deg) scale(0.95)' :
                          `translateY(${translateY}px) translateX(${translateX}px) scale(${scale}) rotate(${rotate}deg)`,
                        transformStyle: 'preserve-3d',
                        zIndex: zIndex,
                        opacity: opacity,
                        transition: isAnimating ? 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                        cursor: isActive ? 'pointer' : distance <= 3 ? 'pointer' : 'default',
                        animation: isFlipping ? 'flipToBack 0.5s ease-in-out' : 'none',
                        transformOrigin: 'center bottom'
                      }}
                    >
                      <div style={{
                        fontSize: isActive ? '16px' : '14px',
                        fontWeight: isActive ? '600' : '500',
                        color: isActive ? '#2563eb' : '#495057',
                        transition: 'all 0.3s',
                        textAlign: 'center'
                      }}>
                        {item.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 스와이프 힌트 */}
              <div style={{
                position: 'absolute',
                bottom: '5px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '10px',
                color: '#adb5bd'
              }}>
                <span style={{ opacity: 0.6 }}>←</span>
                <span>스와이프하여 이동</span>
                <span style={{ opacity: 0.6 }}>→</span>
              </div>
            </div>
          )}
        </header>

        {/* 모바일 메뉴 슬라이드 */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: showMobileMenu ? 0 : '-280px',
          width: '280px',
          height: '100vh',
          background: 'linear-gradient(135deg, #dbeafe 0%, #e7f3ff 20%, #ffffff 40%, #ffffff 100%)',
          boxShadow: showMobileMenu ? '2px 0 10px rgba(0,0,0,0.1)' : 'none',
          transition: 'left 0.3s ease-out',
          zIndex: 1001,
          overflowY: 'auto'
        }}>
          <div style={{
            padding: '20px',
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <button
              onClick={() => setShowMobileMenu(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                color: '#495057',
                cursor: 'pointer'
              }}>×</button>
          </div>
          
          <nav style={{ paddingTop: '10px' }}>
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setShowMobileMenu(false)}
                style={{
                  display: 'block',
                  padding: '14px 20px',
                  fontSize: '14px',
                  color: isActive(item.path) ? '#2563eb' : '#212529',
                  fontWeight: isActive(item.path) ? '600' : '400',
                  textDecoration: 'none',
                  borderLeft: isActive(item.path) ? '3px solid #2563eb' : '3px solid transparent',
                  background: isActive(item.path) ? 'rgba(248, 249, 250, 0.8)' : 'transparent'
                }}
              >
                {item.text}
              </Link>
            ))}
          </nav>

          <div style={{ padding: '20px', marginTop: '20px' }}>
            <button 
              onClick={() => {
                setShowMobileMenu(false);
                openModal('signup');
              }}
              style={{
                width: '100%',
                padding: '12px',
                background: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500'
              }}>
              회원가입
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 배경 오버레이 */}
        {showMobileMenu && (
          <div 
            onClick={() => setShowMobileMenu(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1000
            }} 
          />
        )}
        
        {/* 구글 계정 선택 팝업 - 모바일 (화면 중앙) */}
        {showGooglePopup && location.pathname === '/' && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '200px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            padding: '12px',
            zIndex: 999
          }}>
            <button onClick={() => setShowGooglePopup(false)} style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              background: 'none',
              border: 'none',
              fontSize: '14px',
              color: '#999',
              cursor: 'pointer',
              padding: '2px'
            }}>✕</button>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              marginBottom: '10px',
              paddingRight: '16px',
              justifyContent: 'center'
            }}>
              <img src="https://www.google.com/favicon.ico" alt="Google" style={{ width: '14px', height: '14px' }} />
              <div style={{ fontSize: '12px', fontWeight: '400', color: '#202124' }}>
                Google로 시작하기
              </div>
            </div>
            
            <div style={{ 
              borderTop: '1px solid #dadce0',
              paddingTop: '10px'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {googleAccounts.map((account, idx) => (
                  <div key={idx} onClick={() => handleGoogleAccountSelect(account)} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px',
                    borderRadius: '6px',
                    background: '#f8f9fa',
                    cursor: 'pointer'
                  }}>
                    <div style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px'
                    }}>{account.avatar}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '11px', fontWeight: '500', color: '#202124', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {account.email.split('@')[0]}
                      </div>
                      <div style={{ fontSize: '10px', color: '#5f6368' }}>
                        {account.domain.split('@')[1]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        <MobileAuthModal />
      </>
    );
  }

  // PC 헤더
  return (
    <>
      <div style={{ height: '70px' }} />
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '70px',
        background: 'white',
        borderBottom: '1px solid #e0e0e0',
        zIndex: 1000
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          padding: '0 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <Link to="/">
              <img 
                src="https://res.cloudinary.com/dde1hpbrp/image/upload/v1753148563/05_etc/dalraemarket_papafarmers.com/DalraeMarket_loge_trans.png"
                alt="달래마켓"
                style={{ height: '30px' }}
              />
            </Link>

            <nav style={{ display: 'flex', gap: '24px' }}>
              {navItems.map(item => (
                <div 
                  key={item.path}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => item.hasSubmenu && setShowSubmenu(item.path)}
                  onMouseLeave={() => setShowSubmenu(null)}
                >
                  <Link
                    to={item.path}
                    style={{
                      fontSize: '14px',
                      color: isActive(item.path) ? '#2563eb' : '#212529',
                      fontWeight: isActive(item.path) ? '600' : '400',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {item.text}
                    {item.hasSubmenu && (
                      <svg 
                        width="10" 
                        height="6" 
                        viewBox="0 0 10 6" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ opacity: 0.6 }}
                      >
                        <path 
                          d="M1 1L5 5L9 1" 
                          stroke="currentColor" 
                          strokeWidth="1.5" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </Link>
                  
                  {/* 하위메뉴 드롭다운 */}
                  {item.hasSubmenu && showSubmenu === item.path && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: item.text === '업무도구' ? 0 : 0,
                      marginTop: '8px',
                      background: 'white',
                      borderRadius: '8px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                      border: '1px solid #e0e0e0',
                      minWidth: item.text === '업무도구' ? '600px' : '200px',
                      maxHeight: '400px',
                      overflowY: 'auto',
                      zIndex: 1001,
                      padding: item.text === '업무도구' ? '16px' : '0'
                    }}>
                      {item.text === '업무도구' ? (
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          gap: '0'
                        }}>
                          {item.submenu.map(subItem => {
                            // 각 도구별 SVG 아이콘
                            const toolIcons = {
                              '/tools/margin-calculator': (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
                                  <path d="M11 7h2v2h-2zm0 4h2v6h-2z" fill="currentColor"/>
                                </svg>
                              ),
                              '/tools/price-simulator': (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                  <path d="M3 13h2l3 4 4-10 3 6h2v2h-2l-3-6-4 10-3-4H3z" fill="currentColor"/>
                                  <path d="M19 3h2v9h-2zm-4 5h2v4h-2zm-4 2h2v2h-2z" fill="currentColor"/>
                                </svg>
                              ),
                              '/tools/order-integration': (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" fill="currentColor"/>
                                  <path d="M7 7h4v4H7zm6 0h4v4h-4zm-6 6h4v4H7zm6 0h4v4h-4z" fill="currentColor"/>
                                </svg>
                              ),
                              '/tools/option-pricing': (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                  <path d="M12 2L2 7v4c0 5.55 3.84 10.74 9 11.97V20.9C6.91 19.74 4 15.53 4 11.22V8.3L12 4.19l8 4.11v2.92c0 1.24-.2 2.43-.57 3.55l1.74 1.73c.53-1.64.83-3.4.83-5.28V7l-10-5z" fill="currentColor"/>
                                </svg>
                              ),
                              '/tools/inventory-tracker': (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                  <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor"/>
                                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                              ),
                              '/tools/discount-calculator': (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                  <path d="M12.5 6.9c-.73-.57-1.64-.9-2.65-.9-2.76 0-5 2.24-5 5s2.24 5 5 5c1.01 0 1.92-.33 2.65-.9.73.57 1.64.9 2.65.9 2.76 0 5-2.24 5-5s-2.24-5-5-5c-1.01 0-1.92.33-2.65.9z" fill="currentColor"/>
                                </svg>
                              ),
                              '/tools/sales-analytics': (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                  <path d="M5 9.2h3V19H5zm5.6-4.2h2.8V19h-2.8zm5.6 8H19v6h-2.8z" fill="currentColor"/>
                                </svg>
                              ),
                              '/tools/customer-message': (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" fill="currentColor"/>
                                  <path d="M7 9h10v2H7zm0-3h10v2H7zm0 6h7v2H7z" fill="currentColor"/>
                                </svg>
                              ),
                              '/tools/barcode-generator': (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                  <path d="M2 6h2v12H2zm3 0h1v12H5zm2 0h3v12H7zm4 0h1v12h-1zm3 0h2v12h-2zm3 0h1v12h-1zm2 0h3v12h-3z" fill="currentColor"/>
                                </svg>
                              ),
                              '/tools/transaction-statement': (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                  <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" fill="currentColor"/>
                                  <path d="M8 12h8v1.5H8zm0 3h8v1.5H8zm0-6h8v1.5H8z" fill="currentColor"/>
                                </svg>
                              ),
                              '/tools/trend-analysis': (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                  <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z" fill="currentColor"/>
                                </svg>
                              ),
                              '/tools/competitor-monitor': (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
                                </svg>
                              ),
                              '/tools/product-name-optimizer': (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
                                </svg>
                              ),
                              '/tools/review-analyzer': (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                  <path d="M12 2C6.47 2 2 6.48 2 12s4.47 10 11.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM8.5 8c.83 0 1.5.67 1.5 1.5S9.33 11 8.5 11 7 10.33 7 9.5 7.67 8 8.5 8zm3.5 10c-2.5 0-4.7-1.3-5.95-3.25.15-.45.8-.95 2.45-1.75.25.15.75.5 1.5.5s1.25-.35 1.5-.5c1.65.8 2.3 1.3 2.45 1.75C16.7 16.7 14.5 18 12 18zm3.5-7c-.83 0-1.5-.67-1.5-1.5S14.67 8 15.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill="currentColor"/>
                                </svg>
                              ),
                              '/tools/price-recommender': (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.15.96 2.03 2.65 2.03 1.9 0 2.46-1.06 2.46-1.77 0-.89-.46-1.56-2.23-1.98l-1.85-.43c-1.91-.44-2.95-1.65-2.95-3.38 0-1.97 1.45-3.2 3.23-3.56V4h2.67v1.6c1.86.44 2.86 1.78 2.96 3.4h-1.96c-.06-1.04-.76-1.78-2.33-1.78-1.5 0-2.33.69-2.33 1.66 0 .85.54 1.41 2.14 1.79l1.59.38c2.21.5 3.3 1.57 3.3 3.6-.01 2.14-1.43 3.07-3.37 3.44z" fill="currentColor"/>
                                </svg>
                              ),
                              '/tools/category-rank-checker': (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                  <path d="M7.5 21L2 9l2.5 0 3 7 3-7 2.5 0L7.5 21zM17 3v10h5l-5 8V11h-5l5-8z" fill="currentColor"/>
                                </svg>
                              )
                            };
                            
                            return (
                              <Link
                                key={subItem.path}
                                to={subItem.path}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  padding: '8px 12px',
                                  fontSize: '13px',
                                  color: '#212529',
                                  textDecoration: 'none',
                                  transition: 'all 0.2s',
                                  borderRadius: '4px'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#f8f9fa';
                                  e.currentTarget.style.color = '#2563eb';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'transparent';
                                  e.currentTarget.style.color = '#212529';
                                }}
                              >
                                {toolIcons[subItem.path]}
                                <span>{subItem.text}</span>
                              </Link>
                            );
                          })}
                        </div>
                      ) : (
                        item.submenu.map(subItem => {
                          // 공급상품 메뉴 아이콘
                          const productIcons = {
                            '/products/all': (
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" fill="currentColor"/>
                              </svg>
                            ),
                            '/products/calendar': (
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" fill="currentColor"/>
                                <path d="M7 10h5v5H7z" fill="currentColor"/>
                              </svg>
                            ),
                            '/products/images': (
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" fill="currentColor"/>
                                <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                              </svg>
                            )
                          };
                          
                          return (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 16px',
                                fontSize: '13px',
                                color: '#212529',
                                textDecoration: 'none',
                                transition: 'all 0.2s'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#f8f9fa';
                                e.currentTarget.style.color = '#2563eb';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = '#212529';
                              }}
                            >
                              {productIcons[subItem.path]}
                              <span>{subItem.text}</span>
                            </Link>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          <div style={{ display: 'flex', gap: '10px', position: 'relative' }}>
            <button onClick={() => openModal('login')} style={{
              padding: '8px 20px',
              background: 'white',
              border: '1px solid #dee2e6',
              borderRadius: '6px',
              fontSize: '14px',
              color: '#212529',
              cursor: 'pointer'
            }}>로그인</button>
            <button onClick={() => openModal('signup')} style={{
              padding: '8px 20px',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer'
            }}>회원가입</button>
            
            {/* 구글 계정 선택 팝업 - PC */}
            {showGooglePopup && location.pathname === '/' && (
              <div style={{
                position: 'absolute',
                top: '50px',
                right: 0,
                width: '280px',
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                padding: '16px',
                zIndex: 100
              }}>
                <button onClick={() => setShowGooglePopup(false)} style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: 'none',
                  border: 'none',
                  fontSize: '16px',
                  color: '#999',
                  cursor: 'pointer',
                  padding: '4px'
                }}>✕</button>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  marginBottom: '12px',
                  paddingRight: '20px'
                }}>
                  <img src="https://www.google.com/favicon.ico" alt="Google" style={{ width: '16px', height: '16px' }} />
                  <div style={{ fontSize: '13px', fontWeight: '400', color: '#202124' }}>
                    google.com의 계정으로<br/>달래마켓에 로그인하세요
                  </div>
                </div>
                
                <div style={{ 
                  borderTop: '1px solid #dadce0',
                  paddingTop: '12px'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {googleAccounts.map((account, idx) => (
                      <div key={idx} onClick={() => handleGoogleAccountSelect(account)} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '8px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        background: '#fff'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#f8f9fa'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}>
                        <div style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: '#e8eaed',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px'
                        }}>{account.avatar}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '12px', fontWeight: '500', color: '#202124', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {account.email}
                          </div>
                          <div style={{ fontSize: '11px', color: '#5f6368', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {account.domain}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div onClick={() => openModal('login')} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      borderTop: '1px solid #dadce0',
                      marginTop: '4px',
                      paddingTop: '12px'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f8f9fa'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: '#f1f3f4',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{ fontSize: '16px', color: '#5f6368' }}>+</span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#5f6368' }}>다른 계정 사용</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* PC용 로그인/회원가입 모달 */}
      {showModal && !isMobile && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }} onClick={closeModal}>
          <div style={{
            background: 'white',
            width: '400px',
            borderRadius: '12px',
            padding: '40px',
            position: 'relative'
          }} onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'none',
              border: 'none',
              fontSize: '24px',
              color: '#999',
              cursor: 'pointer'
            }}>×</button>

            {modalMode === 'login' ? (
              <>
                <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '32px', textAlign: 'center' }}>
                  로그인
                </h2>

                <input type="email" placeholder="이메일" style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '2px solid transparent',
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  fontSize: '14px',
                  marginBottom: '12px',
                  outline: 'none',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563eb';
                  e.target.style.background = '#ffffff';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'transparent';
                  e.target.style.background = '#f8f9fa';
                }} />
                
                <input type="password" placeholder="비밀번호" style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '2px solid transparent',
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  fontSize: '14px',
                  marginBottom: '24px',
                  outline: 'none',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563eb';
                  e.target.style.background = '#ffffff';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'transparent';
                  e.target.style.background = '#f8f9fa';
                }} />

                <button style={{
                  width: '100%',
                  padding: '14px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  marginBottom: '24px',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  이메일로 로그인
                </button>

                <div style={{ marginBottom: '24px' }}>
                  <div style={{ position: 'relative', textAlign: 'center', marginBottom: '24px' }}>
                    <div style={{ position: 'absolute', top: '50%', width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, #e0e0e0, transparent)' }}></div>
                    <span style={{ position: 'relative', background: 'white', padding: '0 16px', fontSize: '12px', color: '#9ca3af', fontWeight: '500' }}>간편 로그인</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <button style={{
                      width: '100%',
                      padding: '14px',
                      background: '#ffffff',
                      border: '1px solid #e0e0e0',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.2s',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                    }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      구글로 로그인
                    </button>
                    
                    <button style={{
                      width: '100%',
                      padding: '14px',
                      background: '#FEE500',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.2s',
                      boxShadow: '0 2px 8px rgba(254, 229, 0, 0.3)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                      카카오로 로그인
                    </button>
                    
                    <button style={{
                      width: '100%',
                      padding: '14px',
                      background: '#03C75A',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.2s',
                      boxShadow: '0 2px 8px rgba(3, 199, 90, 0.3)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                      네이버로 로그인
                    </button>
                  </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                  <a style={{
                    fontSize: '13px',
                    color: '#6b7280',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    marginRight: '16px'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#2563eb'}
                  onMouseLeave={(e) => e.target.style.color = '#6b7280'}>
                    비밀번호 찾기
                  </a>
                  <span style={{ fontSize: '13px', color: '#6b7280' }}>
                    아직 계정이 없으신가요?{' '}
                    <a onClick={() => setModalMode('signup')} style={{
                      color: '#2563eb',
                      fontWeight: '500',
                      cursor: 'pointer',
                      textDecoration: 'none'
                    }}>회원가입</a>
                  </span>
                </div>
              </>
            ) : (
              <>
                <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '32px', textAlign: 'center' }}>
                  회원가입
                </h2>

                <input 
                  type="text" 
                  placeholder="이름 (한글만 입력)" 
                  value={formData.name || ''}
                  onChange={(e) => {
                    const koreanOnly = e.target.value.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣ]/g, '');
                    setFormData({ ...formData, name: koreanOnly });
                  }}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: '2px solid transparent',
                    background: '#f8f9fa',
                    borderRadius: '12px',
                    fontSize: '14px',
                    marginBottom: '12px',
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2563eb';
                    e.target.style.background = '#ffffff';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'transparent';
                    e.target.style.background = '#f8f9fa';
                  }}
                />

                <div style={{ position: 'relative', marginBottom: '12px' }}>
                  <span style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '14px',
                    color: '#495057',
                    fontWeight: '500',
                    pointerEvents: 'none'
                  }}>010</span>
                  <input 
                    type="tel" 
                    placeholder="0000-0000" 
                    value={formData.phone || ''}
                    onChange={(e) => {
                      const numbers = e.target.value.replace(/[^\d]/g, '');
                      if (numbers.length <= 4) {
                        setFormData({ ...formData, phone: numbers });
                      } else if (numbers.length <= 8) {
                        setFormData({ ...formData, phone: `${numbers.slice(0, 4)}-${numbers.slice(4)}` });
                      }
                    }}
                    maxLength="9"
                    style={{
                      width: '100%',
                      padding: '14px 16px 14px 48px',
                      border: '2px solid transparent',
                      background: '#f8f9fa',
                      borderRadius: '12px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'all 0.3s'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#2563eb';
                      e.target.style.background = '#ffffff';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'transparent';
                      e.target.style.background = '#f8f9fa';
                    }}
                  />
                </div>
                
                <input 
                  type="email" 
                  placeholder="이메일" 
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: '2px solid transparent',
                    background: '#f8f9fa',
                    borderRadius: '12px',
                    fontSize: '14px',
                    marginBottom: '12px',
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2563eb';
                    e.target.style.background = '#ffffff';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'transparent';
                    e.target.style.background = '#f8f9fa';
                  }}
                />
                
                <input 
                  type="password" 
                  placeholder="비밀번호" 
                  value={formData.password || ''}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: '2px solid transparent',
                    background: '#f8f9fa',
                    borderRadius: '12px',
                    fontSize: '14px',
                    marginBottom: '12px',
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2563eb';
                    e.target.style.background = '#ffffff';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'transparent';
                    e.target.style.background = '#f8f9fa';
                  }}
                />

                <input 
                  type="password" 
                  placeholder="비밀번호 확인" 
                  value={formData.passwordConfirm || ''}
                  onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: '2px solid transparent',
                    background: '#f8f9fa',
                    borderRadius: '12px',
                    fontSize: '14px',
                    marginBottom: '20px',
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2563eb';
                    e.target.style.background = '#ffffff';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'transparent';
                    e.target.style.background = '#f8f9fa';
                  }}
                />

                {/* 판매자로 가입하기 체크박스 */}
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '20px',
                  padding: '16px',
                  background: isSeller ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)' : '#f8f9fa',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  border: isSeller ? '2px solid #667eea' : '2px solid transparent',
                  transition: 'all 0.3s'
                }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    border: isSeller ? 'none' : '2px solid #dee2e6',
                    background: isSeller ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s'
                  }}>
                    {isSeller && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="white"/>
                      </svg>
                    )}
                  </div>
                  <input 
                    type="checkbox" 
                    checked={isSeller}
                    onChange={(e) => setIsSeller(e.target.checked)}
                    style={{ display: 'none' }}
                  />
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: isSeller ? '#667eea' : '#495057'
                  }}>
                    판매자로 가입하기
                  </span>
                </label>

                {/* 판매자 추가 정보 */}
                {isSeller && (
                  <div style={{
                    padding: '20px',
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.03) 0%, rgba(118, 75, 162, 0.03) 100%)',
                    borderRadius: '12px',
                    marginBottom: '20px',
                    border: '1px solid rgba(102, 126, 234, 0.2)'
                  }}>
                    <input 
                      type="text" 
                      placeholder="사업자명" 
                      value={businessData.businessName || ''}
                      onChange={(e) => setBusinessData({ ...businessData, businessName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        border: '2px solid transparent',
                        background: '#ffffff',
                        borderRadius: '12px',
                        fontSize: '14px',
                        marginBottom: '12px',
                        outline: 'none',
                        transition: 'all 0.3s'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#667eea';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'transparent';
                      }}
                    />

                    <div style={{ marginBottom: '12px' }}>
                      <BusinessNumberValidator 
                        value={businessData.businessNumber}
                        onChange={(value) => setBusinessData({ ...businessData, businessNumber: value })}
                        onValidate={(result) => console.log('Validation result:', result)}
                      />
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <AddressSearch 
                        onAddressSelect={(addressData) => 
                          setBusinessData({ ...businessData, address: addressData.fullAddress })
                        }
                      />
                    </div>

                    <input 
                      type="text" 
                      placeholder="대표자" 
                      value={businessData.representative || ''}
                      onChange={(e) => {
                        const koreanOnly = e.target.value.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣ]/g, '');
                        setBusinessData({ ...businessData, representative: koreanOnly });
                      }}
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        border: '2px solid transparent',
                        background: '#ffffff',
                        borderRadius: '12px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'all 0.3s'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#667eea';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'transparent';
                      }}
                    />
                  </div>
                )}

                <button style={{
                  width: '100%',
                  padding: '14px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  marginBottom: '24px',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  회원가입
                </button>

                <div style={{ marginBottom: '24px' }}>
                  <div style={{ position: 'relative', textAlign: 'center', marginBottom: '24px' }}>
                    <div style={{ position: 'absolute', top: '50%', width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, #e0e0e0, transparent)' }}></div>
                    <span style={{ position: 'relative', background: 'white', padding: '0 16px', fontSize: '12px', color: '#9ca3af', fontWeight: '500' }}>간편 가입</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <button style={{
                      width: '100%',
                      padding: '14px',
                      background: '#ffffff',
                      border: '1px solid #e0e0e0',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.2s',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                    }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      구글로 시작하기
                    </button>
                    
                    <button style={{
                      width: '100%',
                      padding: '14px',
                      background: '#FEE500',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.2s',
                      boxShadow: '0 2px 8px rgba(254, 229, 0, 0.3)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                      카카오로 시작하기
                    </button>
                    
                    <button style={{
                      width: '100%',
                      padding: '14px',
                      background: '#03C75A',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.2s',
                      boxShadow: '0 2px 8px rgba(3, 199, 90, 0.3)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                      네이버로 시작하기
                    </button>
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '13px', color: '#6b7280' }}>
                    이미 계정이 있으신가요?{' '}
                    <a onClick={() => setModalMode('login')} style={{
                      color: '#2563eb',
                      fontWeight: '500',
                      cursor: 'pointer',
                      textDecoration: 'none'
                    }}>로그인</a>
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default UserHeader;