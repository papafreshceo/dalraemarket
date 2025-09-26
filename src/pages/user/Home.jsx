// src/pages/user/Home.jsx
import { useState, useEffect } from 'react';
import UserHeader from '../../components/layout/UserHeader';

function Home() {
  const [hoveredStat, setHoveredStat] = useState(null);
  const [activeTab, setActiveTab] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 상단 통계
  const stats = [
    { label: '전체 상품', value: '1,284', color: '#2563eb', bgGradient: 'linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)' },
    { label: '판매중', value: '956', color: '#10b981', bgGradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)' },
    { label: '재고 부족', value: '45', color: '#f59e0b', bgGradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)' },
    { label: '품절', value: '23', color: '#ef4444', bgGradient: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)' },
    { label: '카테고리', value: '48', color: '#06b6d4', bgGradient: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)' }
  ];

  // 시세정보 데이터
  const marketPrices = [
    { name: '배추', category: '채소류', price: '8,500원', change: '+500원', changePercent: '+6.3%', isUp: true },
    { name: '사과', category: '과일류', price: '32,000원', change: '-1,000원', changePercent: '-3.0%', isUp: false },
    { name: '무', category: '근채류', price: '3,200원', change: '0원', changePercent: '0%', isUp: null },
    { name: '대파', category: '양념류', price: '4,800원', change: '+300원', changePercent: '+6.7%', isUp: true }
  ];

  // 달력 데이터
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const firstDayOfWeek = 3;
  const emptyDays = Array.from({ length: firstDayOfWeek }, (_, i) => null);

  return (
    <>
      <UserHeader />
      <div style={{
        position: 'relative',
        width: '100%',
        paddingTop: '70px',
        paddingLeft: isMobile ? '20px' : '40px',
        paddingRight: isMobile ? '20px' : '40px',
        paddingBottom: isMobile ? '20px' : '40px',
        minHeight: '100vh',
        overflow: 'hidden'
      }}>
        {/* 메인 파란색 그라데이션 */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, #3b82f6 0%, #60a5fa 300px, #93c5fd 600px, #bfdbfe 900px, #dbeafe 1200px, #f0f9ff 1500px, #ffffff 1800px, #ffffff 100%)',
          zIndex: -3
        }} />
        
        {/* 왼쪽 연두색 */}
        <div style={{
          position: 'absolute',
          top: '400px',
          left: 0,
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse at 0% 50%, rgba(187, 247, 208, 0.4) 0%, transparent 60%)',
          zIndex: -2
        }} />
        
        {/* 우측 상단 보라색 */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '1600px',
          height: '1200px',
          background: 'radial-gradient(ellipse at 100% 0%, rgba(139, 92, 246, 0.5) 0%, transparent 60%)',
          zIndex: -1
        }} />
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {/* 히어로 섹션 - 텍스트와 이미지 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '2fr 3fr',
            gap: '40px',
            marginBottom: '48px',
            alignItems: 'center'
          }}>
            {/* 첫 번째 칼럼 - 텍스트 */}
            <div style={{
              order: isMobile ? 2 : 1,
              paddingLeft: '40px',
              paddingRight: '40px'
            }}>
              <h1 style={{
                fontSize: isMobile ? '32px' : '48px',
                fontWeight: '700',
                color: '#ffffff',
                marginBottom: '20px',
                lineHeight: '1.2'
              }}>
                신선한 농산물을<br/>
                합리적인 가격으로
              </h1>
              <p style={{
                fontSize: isMobile ? '16px' : '18px',
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '32px',
                lineHeight: '1.6'
              }}>
                달래마켓은 농가와 소비자를 직접 연결하여<br/>
                더 신선하고 더 저렴한 농산물을 제공합니다
              </p>
              <button style={{
                padding: '14px 32px',
                background: '#ffffff',
                color: '#3b82f6',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
              }}>
                지금 시작하기
              </button>
            </div>
            
            {/* 두 번째 칼럼 - 이미지 */}
            <div style={{
              order: isMobile ? 1 : 2,
              paddingRight: '40px',
              position: 'relative'
            }}>
              <div style={{
                height: isMobile ? '250px' : '400px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {/* 이미지 placeholder - 실제 이미지로 교체 가능 */}
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontWeight: '500'
                }}>
                  이미지 영역
                  {/* <img src="이미지URL" alt="달래마켓" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
                </div>
              </div>
            </div>
          </div>

          {/* 탭 네비게이션 */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '200px',
            marginBottom: '70px'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '24px',
              padding: '8px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              backdropFilter: 'blur(10px)',
              width: isMobile ? '100%' : '700px'
            }}>
              <div style={{
                display: 'flex',
                gap: '8px',
                overflowX: 'auto',
                WebkitOverflowScrolling: 'touch'
              }}>
                {['한눈에 보는 상품', '공급가 변동이력', '10초 발주시스템', '셀러 업무도구', '다양한 서비스'].map((tab, index) => (
                  <button
                    key={index}
                    style={{
                      flex: isMobile ? '0 0 auto' : '1',
                      minWidth: isMobile ? '120px' : 'auto',
                      padding: '12px 16px',
                      background: index === 0 ? 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)' : 'transparent',
                      color: index === 0 ? '#ffffff' : '#6c757d',
                      border: 'none',
                      borderRadius: '16px',
                      fontSize: '13px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => {
                      if (!e.currentTarget.style.background.includes('linear-gradient')) {
                        e.currentTarget.style.background = '#f3f4f6';
                        e.currentTarget.style.color = '#212529';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!e.currentTarget.style.background.includes('linear-gradient')) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#6c757d';
                      }
                    }}
                    onClick={(e) => {
                      // 모든 버튼 스타일 초기화
                      const buttons = e.currentTarget.parentElement.children;
                      Array.from(buttons).forEach(btn => {
                        btn.style.background = 'transparent';
                        btn.style.color = '#6c757d';
                      });
                      // 클릭된 버튼 활성화
                      e.currentTarget.style.background = 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)';
                      e.currentTarget.style.color = '#ffffff';
                      // 탭 내용 변경
                      setActiveTab({...activeTab, main: index});
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 탭 컨텐츠 - 슬라이딩 카드 섹션 */}
          <div style={{
            overflow: 'hidden',
            marginBottom: '48px'
          }}>
            <div style={{
              display: 'flex',
              transform: `translateX(-${(activeTab.main || 0) * 100}%)`,
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              {/* 탭 1: 한눈에 보는 상품 - 2x2 그리드 */}
              <div style={{
                minWidth: '100%',
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gridTemplateRows: 'repeat(2, 1fr)',
                gap: '16px',
                padding: '0 40px'
              }}>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} style={{
                    aspectRatio: '16/9',
                    background: `linear-gradient(135deg, hsl(${i * 60}, 70%, 95%) 0%, hsl(${i * 60 + 30}, 70%, 98%) 100%)`,
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6c757d',
                    fontSize: '14px'
                  }}>
                    {/* <img src="이미지URL.gif" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
                    상품 홍보 이미지 {i}
                  </div>
                ))}
              </div>

              {/* 탭 2: 공급가 변동이력 - 다양한 크기 */}
              <div style={{
                minWidth: '100%',
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                gridTemplateRows: 'repeat(2, 1fr)',
                gap: '16px',
                padding: '0 40px'
              }}>
                <div style={{
                  gridColumn: isMobile ? 'span 2' : 'span 2',
                  gridRow: 'span 2',
                  aspectRatio: '1/1',
                  background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748b'
                }}>
                  차트 홍보 이미지
                </div>
                {[2, 3].map(i => (
                  <div key={i} style={{
                    gridColumn: 'span 1',
                    aspectRatio: '3/4',
                    background: `linear-gradient(135deg, hsl(${i * 90}, 60%, 95%) 0%, white 100%)`,
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6c757d',
                    fontSize: '14px'
                  }}>
                    가격 정보 {i}
                  </div>
                ))}
                <div style={{
                  gridColumn: 'span 2',
                  aspectRatio: '2/1',
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#92400e'
                }}>
                  변동 추이 홍보
                </div>
              </div>

              {/* 탭 3: 10초 발주시스템 - 2x2 그리드 */}
              <div style={{
                minWidth: '100%',
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gridTemplateRows: 'repeat(2, 1fr)',
                gap: '16px',
                padding: '0 40px'
              }}>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} style={{
                    aspectRatio: '16/9',
                    background: i % 2 === 0 
                      ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)'
                      : 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(52, 211, 153, 0.1) 100%)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#475569',
                    fontSize: '14px'
                  }}>
                    발주 기능 {i}
                  </div>
                ))}
              </div>

              {/* 탭 4: 셀러 업무도구 - 세로형 카드 */}
              <div style={{
                minWidth: '100%',
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                gap: '16px',
                padding: '0 40px'
              }}>
                {['재고관리', '매출분석', '세금계산서', '고객관리'].map((tool, i) => (
                  <div key={i} style={{
                    aspectRatio: '3/4',
                    background: `linear-gradient(135deg, hsl(${i * 90}, 70%, 50%) 0%, hsl(${i * 90 + 30}, 70%, 60%) 100%)`,
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '16px',
                    fontWeight: '600',
                    transition: 'transform 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}>
                    {tool}
                  </div>
                ))}
              </div>

              {/* 탭 5: 다양한 서비스 - 혼합 레이아웃 */}
              <div style={{
                minWidth: '100%',
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                gap: '16px',
                padding: '0 40px'
              }}>
                <div style={{
                  gridRow: 'span 2',
                  aspectRatio: '3/4',
                  background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1e40af'
                }}>
                  프리미엄 서비스
                </div>
                <div style={{
                  aspectRatio: '4/3',
                  background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#475569',
                  fontSize: '14px'
                }}>
                  서비스 1
                </div>
                <div style={{
                  aspectRatio: '4/3',
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#475569',
                  fontSize: '14px'
                }}>
                  서비스 2
                </div>
                <div style={{
                  gridColumn: 'span 2',
                  aspectRatio: '8/3',
                  background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#475569',
                  fontSize: '14px'
                }}>
                  서비스 3
                </div>
              </div>
            </div>
          </div>

          {/* 상단 통계 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '32px'
          }}>
            {stats.map((stat, index) => (
              <div 
                key={index}
                style={{
                  background: '#ffffff',
                  border: '1px solid #dee2e6',
                  borderRadius: '16px',
                  padding: isMobile ? '16px' : '20px',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                  transform: hoveredStat === index ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: hoveredStat === index 
                    ? '0 10px 30px rgba(0,0,0,0.1)' 
                    : '0 2px 8px rgba(0,0,0,0.05)'
                }}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '16px' }}>
                  <div style={{
                    width: isMobile ? '40px' : '48px',
                    height: isMobile ? '40px' : '48px',
                    background: stat.bgGradient,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <div style={{
                      width: isMobile ? '20px' : '24px',
                      height: isMobile ? '20px' : '24px',
                      background: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '6px'
                    }} />
                  </div>
                  <div>
                    <div style={{ 
                      fontSize: isMobile ? '11px' : '12px',
                      color: '#6c757d',
                      marginBottom: '4px'
                    }}>
                      {stat.label}
                    </div>
                    <div style={{ 
                      fontSize: isMobile ? '18px' : '20px',
                      fontWeight: '600',
                      color: stat.color
                    }}>
                      {stat.value}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 1. 공급상품 섹션 */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: isMobile ? '20px' : '40px',
            marginBottom: '24px',
            border: '1px solid #dee2e6'
          }}>
            <h2 style={{ 
              fontSize: isMobile ? '20px' : '24px', 
              fontWeight: '600', 
              marginBottom: '8px' 
            }}>공급상품</h2>
            <p style={{ 
              fontSize: '14px', 
              color: '#6c757d', 
              marginBottom: '24px' 
            }}>신선한 농산물을 다양한 방식으로 확인하세요</p>
            
            <div style={{ 
              display: 'flex', 
              gap: '8px', 
              marginBottom: '24px',
              borderBottom: '1px solid #dee2e6'
            }}>
              <button
                onClick={() => setActiveTab({...activeTab, supply: 'list'})}
                style={{
                  background: 'transparent',
                  borderBottom: activeTab.supply === 'list' || !activeTab.supply ? '2px solid #2563eb' : '2px solid transparent',
                  color: activeTab.supply === 'list' || !activeTab.supply ? '#2563eb' : '#6c757d',
                  border: 'none',
                  padding: '10px 16px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  marginBottom: '-1px'
                }}
              >
                상품 목록 보기
              </button>
            </div>
            
            {/* 상품 목록 테이블 */}
            {(activeTab.supply === 'list' || !activeTab.supply) && (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ 
                  width: '100%', 
                  borderCollapse: 'collapse' 
                }}>
                  <thead>
                    <tr>
                      <th style={{ 
                        padding: '12px', 
                        borderBottom: '2px solid #dee2e6', 
                        textAlign: 'left',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#495057'
                      }}>상품명</th>
                      {!isMobile && <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#495057' }}>품종</th>}
                      {!isMobile && <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#495057' }}>원산지</th>}
                      <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#495057' }}>공급가</th>
                      <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#495057' }}>상태</th>
                      {!isMobile && <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#495057' }}>다음 출하일</th>}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '12px', borderBottom: '1px solid #f1f3f5', fontSize: '14px' }}>토마토</td>
                      {!isMobile && <td style={{ padding: '12px', borderBottom: '1px solid #f1f3f5', fontSize: '14px', color: '#6c757d' }}>완숙토마토</td>}
                      {!isMobile && <td style={{ padding: '12px', borderBottom: '1px solid #f1f3f5', fontSize: '14px', color: '#6c757d' }}>청도</td>}
                      <td style={{ padding: '12px', borderBottom: '1px solid #f1f3f5', fontSize: '14px', color: '#2563eb', fontWeight: '500' }}>15,000원</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #f1f3f5' }}>
                        <span style={{
                          padding: '4px 8px',
                          background: 'rgba(16, 185, 129, 0.1)',
                          color: '#10b981',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>공급중</span>
                      </td>
                      {!isMobile && <td style={{ padding: '12px', borderBottom: '1px solid #f1f3f5', fontSize: '14px', color: '#6c757d' }}>매일</td>}
                    </tr>
                    <tr>
                      <td style={{ padding: '12px', borderBottom: '1px solid #f1f3f5', fontSize: '14px' }}>딸기</td>
                      {!isMobile && <td style={{ padding: '12px', borderBottom: '1px solid #f1f3f5', fontSize: '14px', color: '#6c757d' }}>설향</td>}
                      {!isMobile && <td style={{ padding: '12px', borderBottom: '1px solid #f1f3f5', fontSize: '14px', color: '#6c757d' }}>논산</td>}
                      <td style={{ padding: '12px', borderBottom: '1px solid #f1f3f5', fontSize: '14px', color: '#2563eb', fontWeight: '500' }}>25,000원</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #f1f3f5' }}>
                        <span style={{
                          padding: '4px 8px',
                          background: 'rgba(16, 185, 129, 0.1)',
                          color: '#10b981',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>공급중</span>
                      </td>
                      {!isMobile && <td style={{ padding: '12px', borderBottom: '1px solid #f1f3f5', fontSize: '14px', color: '#6c757d' }}>월,수,금</td>}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* 2. 시세정보 섹션 */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: isMobile ? '20px' : '40px',
            marginBottom: '24px',
            border: '1px solid #dee2e6'
          }}>
            <h2 style={{ 
              fontSize: isMobile ? '20px' : '24px', 
              fontWeight: '600', 
              marginBottom: '8px' 
            }}>시세정보</h2>
            <p style={{ 
              fontSize: '14px', 
              color: '#6c757d', 
              marginBottom: '24px' 
            }}>실시간 농산물 시세를 확인하세요</p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              {marketPrices.map((item, idx) => (
                <div key={idx} style={{
                  background: '#ffffff',
                  border: '1px solid #dee2e6',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 8px',
                    background: '#e7f3ff',
                    color: '#2563eb',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: '500',
                    marginBottom: '12px'
                  }}>
                    {item.category}
                  </span>
                  <h3 style={{ 
                    fontSize: '16px', 
                    fontWeight: '600', 
                    marginBottom: '8px' 
                  }}>{item.name}</h3>
                  <div style={{ 
                    fontSize: '20px', 
                    fontWeight: '600', 
                    color: '#2563eb', 
                    marginBottom: '4px' 
                  }}>
                    {item.price}
                  </div>
                  <div style={{
                    color: item.isUp ? '#10b981' : item.isUp === false ? '#ef4444' : '#6c757d',
                    fontSize: '13px',
                    fontWeight: '500'
                  }}>
                    {item.isUp && '▲'}{item.isUp === false && '▼'}{item.isUp === null && '-'} {item.change} ({item.changePercent})
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. 발송캘린더 섹션 */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: isMobile ? '20px' : '40px',
            marginBottom: '24px',
            border: '1px solid #dee2e6'
          }}>
            <h2 style={{ 
              fontSize: isMobile ? '20px' : '24px', 
              fontWeight: '600', 
              marginBottom: '8px' 
            }}>발송캘린더</h2>
            <p style={{ 
              fontSize: '14px', 
              color: '#6c757d', 
              marginBottom: '24px' 
            }}>월별 발송 일정을 한눈에 확인하세요</p>
            
            {/* 캘린더 헤더 */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <button style={{
                width: '36px',
                height: '36px',
                border: '1px solid #dee2e6',
                background: '#ffffff',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '18px',
                color: '#495057'
              }}>‹</button>
              <h3 style={{ 
                fontSize: '16px', 
                fontWeight: '600',
                color: '#212529'
              }}>2025년 1월</h3>
              <button style={{
                width: '36px',
                height: '36px',
                border: '1px solid #dee2e6',
                background: '#ffffff',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '18px',
                color: '#495057'
              }}>›</button>
            </div>

            {/* 요일 헤더 */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '4px',
              marginBottom: '8px'
            }}>
              {['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
                <div key={idx} style={{
                  textAlign: 'center',
                  fontSize: '12px',
                  fontWeight: '500',
                  color: idx === 0 ? '#dc3545' : idx === 6 ? '#2563eb' : '#6c757d',
                  padding: '8px 0'
                }}>
                  {day}
                </div>
              ))}
            </div>

            {/* 캘린더 그리드 */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '4px'
            }}>
              {[...emptyDays, ...calendarDays].map((day, idx) => (
                <div key={idx} style={{
                  border: '1px solid #f1f3f5',
                  borderRadius: '8px',
                  padding: isMobile ? '8px' : '12px',
                  minHeight: isMobile ? '60px' : '80px',
                  background: day ? '#ffffff' : 'transparent'
                }}>
                  {day && (
                    <>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        marginBottom: '4px',
                        color: (idx % 7 === 0) ? '#dc3545' : (idx % 7 === 6) ? '#2563eb' : '#212529'
                      }}>
                        {day}
                      </div>
                      {[5, 10, 15, 20, 25].includes(day) && (
                        <div style={{
                          fontSize: '10px',
                          padding: '2px 4px',
                          background: '#e7f3ff',
                          color: '#2563eb',
                          borderRadius: '4px',
                          textAlign: 'center'
                        }}>
                          발송일
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 4. 발주시스템 섹션 */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: isMobile ? '20px' : '40px',
            marginBottom: '24px',
            border: '1px solid #dee2e6'
          }}>
            <h2 style={{ 
              fontSize: isMobile ? '20px' : '24px', 
              fontWeight: '600', 
              marginBottom: '8px' 
            }}>발주시스템</h2>
            <p style={{ 
              fontSize: '14px', 
              color: '#6c757d', 
              marginBottom: '24px' 
            }}>간편한 주문 관리 시스템</p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '16px'
            }}>
              {[
                { title: '빠른 발주', desc: '자주 주문하는 상품을\n빠르게 발주하세요', primary: true },
                { title: '정기 발주 설정', desc: '매주/매월 자동으로\n발주되도록 설정하세요', primary: false },
                { title: '발주 내역 조회', desc: '지난 주문 내역을\n확인하고 재주문하세요', primary: false }
              ].map((item, idx) => (
                <div key={idx} style={{
                  border: item.primary ? '2px solid #2563eb' : '1px solid #dee2e6',
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center'
                }}>
                  <h3 style={{ 
                    fontSize: '16px', 
                    fontWeight: '600', 
                    marginBottom: '8px', 
                    color: item.primary ? '#2563eb' : '#212529' 
                  }}>
                    {item.title}
                  </h3>
                  <p style={{ 
                    fontSize: '13px', 
                    color: '#6c757d', 
                    marginBottom: '16px', 
                    whiteSpace: 'pre-line',
                    lineHeight: '1.5'
                  }}>
                    {item.desc}
                  </p>
                  <button style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '6px',
                    background: item.primary ? '#2563eb' : '#ffffff',
                    color: item.primary ? '#ffffff' : '#2563eb',
                    border: item.primary ? 'none' : '1px solid #2563eb',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}>
                    {item.primary ? '바로 주문하기' : item.title.includes('설정') ? '설정하기' : '내역 보기'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 5. 업무도구 섹션 */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: isMobile ? '20px' : '40px',
            marginBottom: '24px',
            border: '1px solid #dee2e6'
          }}>
            <h2 style={{ 
              fontSize: isMobile ? '20px' : '24px', 
              fontWeight: '600', 
              marginBottom: '8px' 
            }}>업무도구</h2>
            <p style={{ 
              fontSize: '14px', 
              color: '#6c757d', 
              marginBottom: '24px' 
            }}>업무에 필요한 다양한 도구들</p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: '16px'
            }}>
              {['매출 분석', '재고 관리', '세금계산서', '문자 발송'].map((tool, idx) => (
                <div key={idx} style={{
                  border: '1px solid #dee2e6',
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    margin: '0 auto 12px',
                    background: `linear-gradient(135deg, hsl(${idx * 90}, 70%, 50%) 0%, hsl(${idx * 90 + 30}, 70%, 60%) 100%)`,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      background: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '6px'
                    }} />
                  </div>
                  <h3 style={{ 
                    fontSize: '14px', 
                    fontWeight: '500' 
                  }}>{tool}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Win-Win 섹션 */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: isMobile ? '20px' : '40px',
            marginBottom: '24px',
            border: '1px solid #dee2e6'
          }}>
            <h2 style={{ 
              fontSize: isMobile ? '20px' : '24px', 
              fontWeight: '600', 
              marginBottom: '8px',
              color: '#8b5cf6'
            }}>Win-Win 프로그램</h2>
            <p style={{ 
              fontSize: '14px', 
              color: '#6c757d', 
              marginBottom: '24px' 
            }}>함께 성장하는 파트너십</p>
            
            <div style={{
              background: '#ffffff',
              border: '2px solid #8b5cf6',
              borderRadius: '12px',
              padding: '24px'
            }}>
              <span style={{
                display: 'inline-block',
                padding: '4px 8px',
                background: 'rgba(139, 92, 246, 0.1)',
                color: '#8b5cf6',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: '600',
                marginBottom: '16px'
              }}>
                특별 혜택
              </span>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                marginBottom: '12px' 
              }}>농가 직거래 지원</h3>
              <p style={{ 
                fontSize: '14px', 
                color: '#6c757d', 
                lineHeight: '1.6', 
                marginBottom: '16px'
              }}>
                중간 유통 과정 없이 농가와 소비자를 직접 연결하여 
                농가 수익 증대와 소비자 가격 절감을 동시에 실현합니다.
              </p>
              <ul style={{ 
                fontSize: '14px', 
                color: '#495057', 
                paddingLeft: '20px',
                margin: 0
              }}>
                <li>판로 개척 지원</li>
                <li>물류 시스템 제공</li>
                <li>마케팅 지원</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
