import { useState } from 'react';

function AddressSearch({ onAddressSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // 주소 검색 API 시뮬레이션 (실제로는 다음 주소 API 등 사용)
  const searchAddress = async (keyword) => {
    if (!keyword.trim()) return;
    
    setIsSearching(true);
    
    // 실제 구현시 다음 주소 API 호출
    // new daum.Postcode({...}).open();
    
    // 시뮬레이션 데이터
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockResults = [
      {
        id: 1,
        roadAddress: '서울특별시 강남구 테헤란로 152',
        jibunAddress: '서울특별시 강남구 역삼동 737',
        zipCode: '06236',
        buildingName: '강남파이낸스센터'
      },
      {
        id: 2,
        roadAddress: '서울특별시 강남구 테헤란로 142',
        jibunAddress: '서울특별시 강남구 역삼동 736-1',
        zipCode: '06236',
        buildingName: '아크플레이스'
      },
      {
        id: 3,
        roadAddress: '서울특별시 강남구 테헤란로 134',
        jibunAddress: '서울특별시 강남구 역삼동 735-3',
        zipCode: '06235',
        buildingName: '포스코타워 역삼'
      }
    ].filter(item => 
      item.roadAddress.includes(keyword) || 
      item.jibunAddress.includes(keyword) ||
      item.buildingName.includes(keyword)
    );
    
    setSearchResults(mockResults);
    setIsSearching(false);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      searchAddress(searchKeyword);
    }
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address.roadAddress);
    setSearchResults([]);
    setSearchKeyword('');
    setIsOpen(false);
  };

  const handleComplete = () => {
    if (selectedAddress && detailAddress) {
      const fullAddress = `${selectedAddress} ${detailAddress}`;
      if (onAddressSelect) {
        onAddressSelect({
          basicAddress: selectedAddress,
          detailAddress: detailAddress,
          fullAddress: fullAddress
        });
      }
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {/* 기본 주소 입력 필드 */}
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="주소를 검색하세요"
          value={selectedAddress}
          readOnly
          onClick={() => setIsOpen(true)}
          style={{
            width: '100%',
            padding: '14px 16px',
            border: '2px solid transparent',
            background: '#f8f9fa',
            borderRadius: '12px',
            fontSize: '14px',
            marginBottom: '12px',
            outline: 'none',
            cursor: 'pointer',
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
        
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            padding: '8px 16px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          검색
        </button>
      </div>

      {/* 상세 주소 입력 필드 */}
      {selectedAddress && (
        <input
          type="text"
          placeholder="상세주소를 입력하세요 (동/호수 등)"
          value={detailAddress}
          onChange={(e) => setDetailAddress(e.target.value)}
          onBlur={handleComplete}
          style={{
            width: '100%',
            padding: '14px 16px',
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
            handleComplete();
          }}
        />
      )}

      {/* 주소 검색 모달 */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 10001,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }} onClick={() => setIsOpen(false)}>
          <div style={{
            background: 'white',
            width: '500px',
            maxHeight: '600px',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600' }}>주소 검색</h3>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  color: '#999',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>

            {/* 검색 입력 */}
            <div style={{ position: 'relative', marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="도로명, 건물명, 지번으로 검색"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyPress={handleSearch}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #2563eb',
                  borderRadius: '10px',
                  fontSize: '14px',
                  outline: 'none'
                }}
                autoFocus
              />
              <button
                onClick={() => searchAddress(searchKeyword)}
                disabled={isSearching}
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  padding: '8px 20px',
                  background: isSearching ? '#e0e0e0' : '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: isSearching ? 'not-allowed' : 'pointer'
                }}
              >
                {isSearching ? '검색중...' : '검색'}
              </button>
            </div>

            {/* 검색 결과 */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              border: '1px solid #e0e0e0',
              borderRadius: '10px',
              minHeight: '300px'
            }}>
              {searchResults.length === 0 ? (
                <div style={{
                  padding: '40px',
                  textAlign: 'center',
                  color: '#999',
                  fontSize: '14px'
                }}>
                  {searchKeyword ? '검색 결과가 없습니다.' : '주소를 검색해주세요.'}
                </div>
              ) : (
                searchResults.map((address) => (
                  <div
                    key={address.id}
                    onClick={() => handleSelectAddress(address)}
                    style={{
                      padding: '16px',
                      borderBottom: '1px solid #f1f3f5',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f8f9fa';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '4px'
                    }}>
                      <span style={{
                        padding: '2px 6px',
                        background: '#2563eb',
                        color: 'white',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '500'
                      }}>
                        {address.zipCode}
                      </span>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        {address.roadAddress}
                      </span>
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: '#6c757d'
                    }}>
                      {address.jibunAddress}
                      {address.buildingName && ` (${address.buildingName})`}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddressSearch;