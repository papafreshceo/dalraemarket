// pages/user/Home.jsx
import { useState } from 'react';

function Home() {
  const [hoveredStat, setHoveredStat] = useState(null);
  const [activeTab, setActiveTab] = useState({});
  const [currentView, setCurrentView] = useState('month');

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

  return (
    <div className="container">
      {/* 상단 통계 */}
      <div className="grid-stats mb-xl">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="stat-card"
            onMouseEnter={() => setHoveredStat(index)}
            onMouseLeave={() => setHoveredStat(null)}
            style={{
              transform: hoveredStat === index ? 'translateY(-12px) scale(1.05)' : 'translateY(0)',
              boxShadow: hoveredStat === index 
                ? `0 30px 60px ${stat.color}20, 0 15px 30px ${stat.color}15` 
                : undefined,
              borderColor: hoveredStat === index ? stat.color : undefined
            }}
          >
            <div style={{
              position: 'absolute',
              top: '-50%',
              right: '-50%',
              width: '200%',
              height: '200%',
              background: `radial-gradient(circle, ${stat.color}10 0%, transparent 70%)`,
              opacity: hoveredStat === index ? 1 : 0,
              transition: 'opacity 0.4s',
              animation: hoveredStat === index ? 'pulse 2s infinite' : 'none'
            }} />
            
            <div className="flex gap-lg" style={{ position: 'relative' }}>
              <div style={{
                width: 'var(--stat-icon-size)',
                height: 'var(--stat-icon-size)',
                background: stat.bgGradient,
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: hoveredStat === index ? 'rotate(10deg)' : 'rotate(0)',
                transition: 'transform 0.4s',
                boxShadow: `0 10px 30px ${stat.color}30`
              }}>
                <div style={{
                  width: 'var(--stat-icon-inner)',
                  height: 'var(--stat-icon-inner)',
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '8px'
                }} />
              </div>
              <div>
                <div style={{ 
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-text-muted)',
                  fontWeight: 'var(--font-weight-medium)',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  marginBottom: '4px'
                }}>
                  {stat.label}
                </div>
                <div style={{ 
                  fontSize: 'var(--stat-font-size)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: stat.color,
                  letterSpacing: '-1px',
                  textShadow: hoveredStat === index ? `0 0 20px ${stat.color}40` : 'none',
                  transition: 'text-shadow 0.4s'
                }}>
                  {stat.value}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 1. 공급상품 섹션 */}
      <div className="section">
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #2563eb, transparent)',
          animation: 'shimmer 3s infinite'
        }} />
        
        <h1>공급상품</h1>
        <p className="mb-lg">신선한 농산물을 다양한 방식으로 확인하세요</p>
        
        <div className="flex gap-sm mb-lg" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <button
            className="btn"
            onClick={() => setActiveTab({...activeTab, supply: 'list'})}
            style={{
              background: 'transparent',
              borderBottom: activeTab.supply === 'list' || !activeTab.supply ? '2px solid var(--color-primary)' : '2px solid transparent',
              color: activeTab.supply === 'list' || !activeTab.supply ? 'var(--color-primary)' : 'var(--color-text-muted)',
              borderRadius: 0
            }}
          >
            상품 목록 보기
          </button>
          <button
            className="btn"
            onClick={() => setActiveTab({...activeTab, supply: 'card'})}
            style={{
              background: 'transparent',
              borderBottom: activeTab.supply === 'card' ? '2px solid var(--color-primary)' : '2px solid transparent',
              color: activeTab.supply === 'card' ? 'var(--color-primary)' : 'var(--color-text-muted)',
              borderRadius: 0
            }}
          >
            상태별 카드로 보기
          </button>
          <button
            className="btn"
            onClick={() => setActiveTab({...activeTab, supply: 'calendar'})}
            style={{
              background: 'transparent',
              borderBottom: activeTab.supply === 'calendar' ? '2px solid var(--color-primary)' : '2px solid transparent',
              color: activeTab.supply === 'calendar' ? 'var(--color-primary)' : 'var(--color-text-muted)',
              borderRadius: 0
            }}
          >
            달력으로 보기
          </button>
        </div>
        
        {/* 상품 목록 보기 */}
        {(activeTab.supply === 'list' || !activeTab.supply) && (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>상품명</th>
                  <th className="hide-mobile">품종</th>
                  <th className="hide-mobile">원산지</th>
                  <th>공급가</th>
                  <th>상태</th>
                  <th className="hide-mobile">다음 출하일</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>토마토</td>
                  <td className="hide-mobile">완숙토마토</td>
                  <td className="hide-mobile">청도</td>
                  <td style={{ color: 'var(--color-primary)', fontWeight: 'var(--font-weight-regular)' }}>15,000원</td>
                  <td><span className="badge badge-success">공급중</span></td>
                  <td className="hide-mobile">매일</td>
                </tr>
                <tr>
                  <td>딸기</td>
                  <td className="hide-mobile">설향</td>
                  <td className="hide-mobile">논산</td>
                  <td style={{ color: 'var(--color-primary)', fontWeight: 'var(--font-weight-regular)' }}>25,000원</td>
                  <td><span className="badge badge-success">공급중</span></td>
                  <td className="hide-mobile">월,수,금</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        
        {/* 상태별 카드로 보기 */}
        {activeTab.supply === 'card' && (
          <div className="grid-market">
            {[
              { status: '공급중', count: 15, color: '#10b981', items: ['토마토 (완숙토마토)', '딸기 (설향)', '상추 (청상추)'] },
              { status: '재고부족', count: 8, color: '#f59e0b', items: ['배추 (봄배추)', '무 (알타리무)', '대파 (대파)'] },
              { status: '품절', count: 3, color: '#ef4444', items: ['포도 (샤인머스캣)', '수박 (무등산수박)', '참외 (성주참외)'] }
            ].map((card, idx) => (
              <div key={idx} className="card">
                <div className="flex-between mb-md">
                  <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-medium)', color: card.color }}>{card.status}</h3>
                  <span style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-semibold)', color: card.color }}>{card.count}</span>
                </div>
                <div style={{ fontSize: 'var(--font-size-md)', color: 'var(--color-text-muted)', fontWeight: 'var(--font-weight-light)' }}>
                  {card.items.map((item, i) => (
                    <div key={i} className="mb-sm">• {item}</div>
                  ))}
                </div>
                <button className="btn btn-outline" style={{ width: '100%', marginTop: 'var(--space-lg)' }}>
                  상세보기
                </button>
              </div>
            ))}
          </div>
        )}
        
        {/* 달력으로 보기 */}
        {activeTab.supply === 'calendar' && (
          <div className="calendar-container">
            <div className="grid-calendar mb-sm">
              {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                <div key={day} className="text-center" style={{
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: day === '일' ? 'var(--color-sunday)' : day === '토' ? 'var(--color-saturday)' : 'var(--color-text-muted)',
                  padding: 'var(--space-sm) 0'
                }}>
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid-calendar">
              {[...Array(35)].map((_, idx) => {
                const date = idx - 5;
                const isCurrentMonth = date >= 1 && date <= 31;
                const hasProduct = date === 5 || date === 10 || date === 15 || date === 20 || date === 25;
                const productCount = Math.floor(Math.random() * 5) + 1;
                
                return (
                  <div key={idx} className="calendar-day" style={{
                    background: isCurrentMonth ? 'var(--color-white)' : 'transparent',
                    boxShadow: isCurrentMonth ? undefined : 'none'
                  }}>
                    {isCurrentMonth && (
                      <>
                        <div style={{
                          fontSize: 'var(--font-size-sm)',
                          fontWeight: 'var(--font-weight-regular)',
                          color: date % 7 === 1 ? 'var(--color-sunday)' : date % 7 === 0 ? 'var(--color-saturday)' : 'var(--color-text-primary)',
                          marginBottom: '4px'
                        }}>
                          {date}
                        </div>
                        {hasProduct && (
                          <div style={{
                            fontSize: 'var(--font-size-xs)',
                            color: 'var(--color-success)',
                            fontWeight: 'var(--font-weight-regular)'
                          }}>
                            {`토마토 外 ${productCount}`}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 2. 시세정보 섹션 */}
      <div className="section">
        <h1>시세정보</h1>
        <p className="mb-lg">실시간 농산물 시세를 확인하세요</p>
        
        <div className="grid-market">
          {marketPrices.map((item, idx) => (
            <div key={idx} className="card">
              <span className="badge badge-primary mb-md">
                {item.category}
              </span>
              <h3 className="mb-sm">{item.name}</h3>
              <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-primary)', marginBottom: '4px' }}>
                {item.price}
              </div>
              <div style={{
                color: item.isUp ? 'var(--color-success)' : item.isUp === false ? 'var(--color-danger)' : 'var(--color-text-muted)',
                fontSize: 'var(--font-size-md)',
                fontWeight: 'var(--font-weight-regular)'
              }}>
                {item.isUp && '▲'}{item.isUp === false && '▼'}{item.isUp === null && '-'} {item.change} ({item.changePercent})
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. 발송캘린더 섹션 */}
      <div className="section">
        <h1>발송캘린더</h1>
        <p className="mb-lg">월별 발송 일정을 한눈에 확인하세요</p>
        
        <div className="flex gap-sm mb-lg">
          {['월간 보기', '주간 보기', '목록 보기'].map(view => (
            <button
              key={view}
              onClick={() => setCurrentView(view)}
              className={currentView === view || view === '월간 보기' ? 'btn btn-primary' : 'btn btn-secondary'}
            >
              {view}
            </button>
          ))}
        </div>
        
        {/* 모던 캘린더 */}
        <div className="calendar-container">
          {/* 캘린더 헤더 */}
          <div className="flex-between mb-lg">
            <button className="btn btn-outline" style={{
              width: 'var(--calendar-nav-btn)',
              height: 'var(--calendar-nav-btn)',
              padding: 0,
              borderRadius: '8px'
            }}>‹</button>
            <h3>2024년 1월</h3>
            <button className="btn btn-outline" style={{
              width: 'var(--calendar-nav-btn)',
              height: 'var(--calendar-nav-btn)',
              padding: 0,
              borderRadius: '8px'
            }}>›</button>
          </div>
          
          {/* 요일 헤더 */}
          <div className="grid-calendar mb-sm">
            {['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
              <div key={day} className="text-center" style={{
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: idx === 0 ? 'var(--color-sunday)' : idx === 6 ? 'var(--color-saturday)' : 'var(--color-text-muted)',
                padding: 'var(--space-sm) 0'
              }}>
                {day}
              </div>
            ))}
          </div>
          
          {/* 날짜 그리드 */}
          <div className="grid-calendar">
            {[...Array(35)].map((_, idx) => {
              const date = idx - 5;
              const isCurrentMonth = date >= 1 && date <= 31;
              const hasDelivery = date === 5 || date === 12 || date === 19 || date === 26;
              const isToday = date === 15;
              const isSelected = date === 12;
              
              return (
                <div 
                  key={idx} 
                  className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
                  style={{
                    background: isCurrentMonth ? 'var(--color-white)' : 'transparent'
                  }}
                >
                  {isCurrentMonth && (
                    <>
                      <div style={{
                        fontSize: 'var(--font-size-base)',
                        fontWeight: isToday ? 'var(--font-weight-medium)' : 'var(--font-weight-regular)',
                        color: date % 7 === 1 ? 'var(--color-sunday)' : date % 7 === 0 ? 'var(--color-saturday)' : 'var(--color-text-primary)',
                        marginBottom: '4px'
                      }}>
                        {date}
                      </div>
                      {hasDelivery && (
                        <div style={{
                          position: 'absolute',
                          bottom: '6px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          background: 'var(--color-success)'
                        }} />
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* 범례 */}
          <div className="flex gap-lg" style={{
            marginTop: 'var(--space-lg)',
            paddingTop: 'var(--space-lg)',
            borderTop: '1px solid var(--color-border)',
            justifyContent: 'center'
          }}>
            <div className="flex gap-xs">
              <div style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'var(--color-success)'
              }} />
              <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>발송예정</span>
            </div>
          </div>
          
          {/* 더보기 버튼 */}
          <div className="flex" style={{ justifyContent: 'center', marginTop: 'var(--space-xl)' }}>
            <button className="btn btn-outline">
              캘린더 더보기
              <span style={{ fontSize: 'var(--font-size-lg)' }}>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. 발주시스템 섹션 */}
      <div className="section">
        <h1>발주시스템</h1>
        <p className="mb-lg">간편한 주문 관리 시스템</p>
        
        <div className="grid-order">
          {[
            { title: '빠른 발주', desc: '자주 주문하는 상품을\n빠르게 발주하세요', primary: true },
            { title: '정기 발주 설정', desc: '매주/매월 자동으로\n발주되도록 설정하세요', primary: false },
            { title: '발주 내역 조회', desc: '지난 주문 내역을\n확인하고 재주문하세요', primary: false }
          ].map((item, idx) => (
            <div key={idx} className="card" style={{
              borderColor: item.primary ? 'var(--color-primary)' : undefined,
              borderWidth: '2px',
              textAlign: 'center'
            }}>
              <h3 style={{ 
                fontSize: 'var(--font-size-xl)', 
                fontWeight: 'var(--font-weight-medium)', 
                marginBottom: 'var(--space-md)', 
                color: item.primary ? 'var(--color-primary)' : 'var(--color-text-primary)' 
              }}>
                {item.title}
              </h3>
              <p style={{ 
                fontSize: 'var(--font-size-md)', 
                color: 'var(--color-text-muted)', 
                marginBottom: 'var(--space-xl)', 
                whiteSpace: 'pre-line', 
                fontWeight: 'var(--font-weight-light)' 
              }}>
                {item.desc}
              </p>
              <button className={item.primary ? 'btn btn-primary' : 'btn btn-secondary'} style={{ width: '100%' }}>
                {item.primary ? '바로 주문하기' : item.title.includes('설정') ? '설정하기' : '내역 보기'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 5. 업무도구 섹션 */}
      <div className="section">
        <h1>업무도구</h1>
        <p className="mb-lg">업무에 필요한 다양한 도구들</p>
        
        <div className="grid-tools">
          {['매출 분석', '재고 관리', '세금계산서', '문자 발송', '배송 추적', '정산 관리', '가격 계산기', '견적서'].map((tool, idx) => (
            <div key={idx} className="card" style={{ textAlign: 'center' }}>
              <div style={{
                width: 'var(--tool-icon-size)',
                height: 'var(--tool-icon-size)',
                margin: '0 auto var(--space-md)',
                background: `linear-gradient(135deg, hsl(${idx * 45}, 70%, 50%) 0%, hsl(${idx * 45 + 30}, 70%, 60%) 100%)`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '30px',
                  height: '30px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '6px'
                }} />
              </div>
              <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 'var(--font-weight-medium)' }}>{tool}</h3>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginTop: '4px', fontWeight: 'var(--font-weight-light)' }}>
                {idx % 2 === 0 ? '실시간' : '간편'} {tool.slice(0, 2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Win-Win 섹션 */}
      <div className="section">
        <h1 style={{ color: '#8b5cf6' }}>Win-Win 프로그램</h1>
        <p className="mb-lg">함께 성장하는 파트너십</p>
        
        <div className="grid-market">
          <div className="card" style={{
            boxShadow: '0 10px 30px rgba(139, 92, 246, 0.15)'
          }}>
            <span className="badge badge-special mb-md">
              특별 혜택
            </span>
            <h3 className="mb-md">농가 직거래 지원</h3>
            <p style={{ 
              fontSize: 'var(--font-size-md)', 
              color: 'var(--color-text-muted)', 
              lineHeight: 1.6, 
              marginBottom: 'var(--space-lg)', 
              fontWeight: 'var(--font-weight-light)' 
            }}>
              중간 유통 과정 없이 농가와 소비자를 직접 연결하여 
              농가 수익 증대와 소비자 가격 절감을 동시에 실현합니다.
            </p>
            <ul style={{ 
              fontSize: 'var(--font-size-md)', 
              color: 'var(--color-text-secondary)', 
              paddingLeft: 'var(--space-xl)', 
              fontWeight: 'var(--font-weight-light)' 
            }}>
              <li>판로 개척 지원</li>
              <li>물류 시스템 제공</li>
              <li>마케팅 지원</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;