// src/components/layout/UserHeader.jsx
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

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
    { path: '/products', text: '공급상품' },
    { path: '/market', text: '시세정보' },
    { path: '/delivery', text: '발송캘린더' },
    { path: '/orders', text: '발주시스템' },
    { path: '/tools', text: '업무도구' },
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
                  @keyframes slideToBack {
                    0% {
                      transform: translateX(0) scale(1);
                      z-index: 10;
                    }
                    50% {
                      transform: translateX(-50%) scale(0.95);
                    }
                    100% {
                      transform: translateX(0) scale(0.9);
                      z-index: 1;
                    }
                  }
                  @keyframes slideToFront {
                    0% {
                      transform: translateX(0) scale(0.9);
                      z-index: 1;
                    }
                    100% {
                      transform: translateX(0) scale(1);
                      z-index: 10;
                    }
                  }
                  @keyframes flipToBack {
                    0% {
                      transform: translateY(0) rotateX(0deg) scale(1);
                      z-index: 20;
                    }
                    50% {
                      transform: translateY(-30px) rotateX(-15deg) scale(0.95);
                      z-index: 20;
                    }
                    100% {
                      transform: translateY(0) rotateX(0deg) scale(0.92);
                      z-index: 1;
                    }
                  }
                  @keyframes comeToFront {
                    0% {
                      transform: translateY(0) scale(0.92);
                    }
                    100% {
                      transform: translateY(0) scale(1);
                    }
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
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    fontSize: '14px',
                    color: isActive(item.path) ? '#2563eb' : '#212529',
                    fontWeight: isActive(item.path) ? '600' : '400',
                    textDecoration: 'none'
                  }}
                >
                  {item.text}
                </Link>
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
                  padding: '12px 16px',
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                  fontSize: '14px',
                  marginBottom: '12px'
                }} />
                
                <input type="password" placeholder="비밀번호" style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                  fontSize: '14px',
                  marginBottom: '24px'
                }} />

                <button style={{
                  width: '100%',
                  padding: '12px',
                  background: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  marginBottom: '16px'
                }}>로그인</button>

                <div style={{ marginBottom: '24px' }}>
                  <div style={{ position: 'relative', textAlign: 'center', marginBottom: '20px' }}>
                    <div style={{ position: 'absolute', top: '50%', width: '100%', height: '1px', background: '#e0e0e0' }}></div>
                    <span style={{ position: 'relative', background: 'white', padding: '0 12px', fontSize: '13px', color: '#666' }}>또는</span>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button style={{
                      flex: 1,
                      padding: '10px',
                      background: '#FEE500',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}>카카오</button>
                    <button style={{
                      flex: 1,
                      padding: '10px',
                      background: '#03C75A',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}>네이버</button>
                    <button style={{
                      flex: 1,
                      padding: '10px',
                      background: 'white',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}>구글</button>
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#666' }}>
                    계정이 없으신가요?{' '}
                    <a onClick={() => setModalMode('signup')} style={{
                      color: '#2563eb',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}>회원가입</a>
                  </span>
                </div>
              </>
            ) : (
              <>
                <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '32px', textAlign: 'center' }}>
                  회원가입
                </h2>

                <input type="text" placeholder="이름" style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                  fontSize: '14px',
                  marginBottom: '12px'
                }} />

                <input type="tel" placeholder="전화번호" style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                  fontSize: '14px',
                  marginBottom: '12px'
                }} />
                
                <input type="email" placeholder="이메일" style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                  fontSize: '14px',
                  marginBottom: '12px'
                }} />
                
                <input type="password" placeholder="비밀번호" style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                  fontSize: '14px',
                  marginBottom: '12px'
                }} />

                <input type="password" placeholder="비밀번호 확인" style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                  fontSize: '14px',
                  marginBottom: '24px'
                }} />

                <button style={{
                  width: '100%',
                  padding: '12px',
                  background: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  marginBottom: '16px'
                }}>회원가입</button>

                <div style={{ marginBottom: '24px' }}>
                  <div style={{ position: 'relative', textAlign: 'center', marginBottom: '20px' }}>
                    <div style={{ position: 'absolute', top: '50%', width: '100%', height: '1px', background: '#e0e0e0' }}></div>
                    <span style={{ position: 'relative', background: 'white', padding: '0 12px', fontSize: '13px', color: '#666' }}>또는</span>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button style={{
                      flex: 1,
                      padding: '10px',
                      background: '#FEE500',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}>카카오로 가입</button>
                    <button style={{
                      flex: 1,
                      padding: '10px',
                      background: '#03C75A',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}>네이버로 가입</button>
                    <button style={{
                      flex: 1,
                      padding: '10px',
                      background: 'white',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}>구글로 가입</button>
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#666' }}>
                    이미 계정이 있으신가요?{' '}
                    <a onClick={() => setModalMode('login')} style={{
                      color: '#2563eb',
                      fontWeight: '500',
                      cursor: 'pointer'
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