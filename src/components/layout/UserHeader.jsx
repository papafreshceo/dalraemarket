// src/components/layout/UserHeader.jsx
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

function UserHeader() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('login');
  const [mobileAuthStep, setMobileAuthStep] = useState('select');
  const [signupMethod, setSignupMethod] = useState('');
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [termsScrolled, setTermsScrolled] = useState(false);
  const [completedFields, setCompletedFields] = useState([]);
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

  const navItems = [
    { path: '/products', text: '공급상품', icon: '📦' },
    { path: '/market', text: '시세정보', icon: '📊' },
    { path: '/delivery', text: '발송캘린더', icon: '📅' },
    { path: '/orders', text: '발주시스템', icon: '🛒' },
    { path: '/tools', text: '업무도구', icon: '🛠' },
    { path: '/winwin', text: 'Win-Win', icon: '🤝', special: true },
    { path: '/notice', text: '공지사항', icon: '📢' },
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

  // 전화번호 포맷팅
  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 4) {
      return numbers;
    } else if (numbers.length <= 8) {
      return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
    }
    return `${numbers.slice(0, 4)}-${numbers.slice(4, 8)}`;
  };

  // 모바일 Bottom Sheet 모달
  const MobileAuthModal = () => {
    if (!showModal || !isMobile) return null;

    const handleTermsScroll = (e) => {
      const element = e.target;
      const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 10;
      setTermsScrolled(isAtBottom);
    };

    const handleNextField = () => {
      if (currentFieldIndex < signupFields.length - 1) {
        setCompletedFields([...completedFields, currentFieldIndex]);
        setCurrentFieldIndex(currentFieldIndex + 1);
        
        // 스크롤 애니메이션
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
      
      if (formatted.length === 9) { // 0000-0000 형식
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
          animation: 'slideUp 0.3s ease-out',
          display: 'flex',
          flexDirection: 'column'
        }} onClick={(e) => e.stopPropagation()}>
          
          <style>{`
            @keyframes slideUp {
              from { transform: translateY(100%); }
              to { transform: translateY(0); }
            }
            @keyframes slideInFromBottom {
              from { 
                opacity: 0;
                transform: translateY(20px);
              }
              to { 
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>

          {/* 상단 핸들 */}
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
            // 로그인 화면
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
                    fontWeight: '500'
                  }}>회원가입</a>
                </span>
              </div>
            </div>
          ) : (
            // 회원가입 플로우
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

                    <button style={{
                      padding: '14px',
                      background: '#FEE500',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '15px',
                      fontWeight: '500'
                    }}>카카오로 3초 가입</button>

                    <button style={{
                      padding: '14px',
                      background: '#03C75A',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '15px',
                      fontWeight: '500'
                    }}>네이버로 시작하기</button>

                    <button style={{
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
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column',
                  padding: '20px'
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                    이용약관
                  </h3>
                  
                  <div 
                    ref={termsRef}
                    onScroll={handleTermsScroll}
                    style={{
                      flex: 1,
                      overflowY: 'auto',
                      padding: '12px',
                      background: '#f8f8f8',
                      borderRadius: '10px',
                      fontSize: '13px',
                      lineHeight: '1.6',
                      marginBottom: '16px'
                    }}>
                    <p>약관 내용...</p>
                    <div style={{ height: '800px' }}>스크롤 테스트용 긴 내용...</div>
                    <p>마지막 내용</p>
                  </div>

                  <button 
                    disabled={!termsScrolled}
                    onClick={() => setMobileAuthStep('form')}
                    style={{
                      padding: '14px',
                      background: termsScrolled ? '#2563eb' : '#e0e0e0',
                      color: termsScrolled ? 'white' : '#999',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '15px',
                      fontWeight: '500'
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
                  {/* 프로그레스 바 */}
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

                  {/* 폼 컨테이너 - 스크롤 가능 */}
                  <div 
                    ref={formContainerRef}
                    style={{ 
                      flex: 1,
                      overflowY: 'auto',
                      paddingBottom: '20px'
                    }}>
                    {/* 완료된 필드들 */}
                    {completedFields.map(index => (
                      <div key={index} style={{
                        marginBottom: '20px',
                        opacity: 0.6,
                        animation: 'slideInFromBottom 0.3s ease-out'
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

                    {/* 현재 입력 필드 */}
                    <div style={{ animation: 'slideInFromBottom 0.3s ease-out' }}>
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

                  {/* 하단 버튼 */}
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
        <div style={{ height: '100px' }} />
        <header style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          background: 'white',
          borderBottom: '1px solid #e0e0e0',
          zIndex: 1000
        }}>
          {/* 상단 헤더 */}
          <div style={{
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px'
          }}>
            <Link to="/">
              <img 
                src="https://res.cloudinary.com/dde1hpbrp/image/upload/v1753148563/05_etc/dalraemarket_papafarmers.com/DalraeMarket_loge_trans.png"
                alt="달래마켓"
                style={{ height: '20px' }}
              />
            </Link>
            
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={() => openModal('login')} style={{
                padding: '6px 14px',
                borderRadius: '16px',
                fontSize: '13px',
                background: 'white',
                border: '1px solid #ddd'
              }}>로그인</button>
              
              <button onClick={() => openModal('signup')} style={{
                padding: '6px 14px',
                borderRadius: '16px',
                fontSize: '13px',
                background: '#2563eb',
                color: 'white',
                border: 'none'
              }}>가입</button>
            </div>
          </div>

          {/* 네비게이션 */}
          <nav style={{
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            overflowX: 'auto',
            padding: '0 16px',
            gap: '20px',
            borderTop: '1px solid #f0f0f0'
          }}>
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  fontSize: '13px',
                  color: isActive(item.path) ? '#2563eb' : '#666',
                  fontWeight: isActive(item.path) ? '600' : '400',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap'
                }}
              >
                {item.text}
              </Link>
            ))}
          </nav>
        </header>
        
        <MobileAuthModal />
      </>
    );
  }

  // PC 헤더
  return (
    <>
      <div style={{ height: '64px' }} />
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '64px',
        background: 'white',
        borderBottom: '1px solid #e0e0e0',
        zIndex: 1000
      }}>
        <div style={{
          maxWidth: '1400px',
          height: '100%',
          margin: '0 auto',
          padding: '0 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Link to="/">
            <img 
              src="https://res.cloudinary.com/dde1hpbrp/image/upload/v1753148563/05_etc/dalraemarket_papafarmers.com/DalraeMarket_loge_trans.png"
              alt="달래마켓"
              style={{ height: '28px' }}
            />
          </Link>

          <nav style={{ display: 'flex', gap: '30px' }}>
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  fontSize: '14px',
                  color: isActive(item.path) ? '#2563eb' : '#333',
                  fontWeight: isActive(item.path) ? '500' : '400',
                  textDecoration: 'none'
                }}
              >
                {item.text}
              </Link>
            ))}
          </nav>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{
              padding: '8px 20px',
              background: 'white',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px'
            }}>로그인</button>
            <button style={{
              padding: '8px 20px',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px'
            }}>회원가입</button>
          </div>
        </div>
      </header>
    </>
  );
}

export default UserHeader;