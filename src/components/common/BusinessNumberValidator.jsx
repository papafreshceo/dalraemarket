import { useState } from 'react';

function BusinessNumberValidator({ value, onChange, onValidate }) {
  const [isChecking, setIsChecking] = useState(false);
  const [validationResult, setValidationResult] = useState(null);

  // 사업자등록번호 형식화 (000-00-00000)
  const formatBusinessNumber = (input) => {
    const numbers = input.replace(/[^\d]/g, '');
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 5) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else if (numbers.length <= 10) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5, 10)}`;
    }
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5, 10)}`;
  };

  // 사업자등록번호 유효성 검사 (체크섬)
  const validateChecksum = (businessNumber) => {
    const numbers = businessNumber.replace(/-/g, '');
    if (numbers.length !== 10) return false;

    const checkArray = [1, 3, 7, 1, 3, 7, 1, 3, 5];
    let sum = 0;

    for (let i = 0; i < 9; i++) {
      sum += parseInt(numbers[i]) * checkArray[i];
    }

    sum += Math.floor((parseInt(numbers[8]) * 5) / 10);
    const checkNum = (10 - (sum % 10)) % 10;

    return checkNum === parseInt(numbers[9]);
  };

  // API 호출 시뮬레이션 (실제로는 서버 API 호출)
  const checkBusinessStatus = async (businessNumber) => {
    setIsChecking(true);
    
    // 실제 구현시 서버 API 호출
    // const response = await fetch(`/api/business/validate?number=${businessNumber}`);
    // const data = await response.json();
    
    // 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const isValid = validateChecksum(businessNumber);
    const isDuplicate = businessNumber === '123-45-67890'; // 시뮬레이션용 중복 번호
    const isActive = isValid && !isDuplicate; // 시뮬레이션용 활성 여부
    
    const result = {
      isValid,
      isDuplicate,
      isActive,
      message: !isValid 
        ? '유효하지 않은 사업자등록번호입니다.' 
        : isDuplicate 
        ? '이미 등록된 사업자등록번호입니다.'
        : !isActive
        ? '휴폐업 상태의 사업자입니다.'
        : '정상적으로 운영중인 사업자입니다.'
    };
    
    setValidationResult(result);
    setIsChecking(false);
    
    if (onValidate) {
      onValidate(result);
    }
    
    return result;
  };

  const handleInputChange = (e) => {
    const formatted = formatBusinessNumber(e.target.value);
    onChange(formatted);
    setValidationResult(null);
  };

  const handleCheck = () => {
    if (value.replace(/-/g, '').length === 10) {
      checkBusinessStatus(value);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          placeholder="000-00-00000"
          value={value}
          onChange={handleInputChange}
          maxLength="12"
          style={{
            flex: 1,
            padding: '14px 16px',
            border: '2px solid transparent',
            background: '#ffffff',
            borderRadius: '12px',
            fontSize: '14px',
            outline: 'none',
            transition: 'all 0.3s',
            borderColor: validationResult 
              ? validationResult.isValid && !validationResult.isDuplicate && validationResult.isActive
                ? '#10b981'
                : '#ef4444'
              : 'transparent'
          }}
          onFocus={(e) => {
            if (!validationResult) {
              e.target.style.borderColor = '#667eea';
            }
            e.target.style.background = '#ffffff';
          }}
          onBlur={(e) => {
            if (!validationResult) {
              e.target.style.borderColor = 'transparent';
            }
            e.target.style.background = '#ffffff';
          }}
        />
        <button
          onClick={handleCheck}
          disabled={isChecking || value.replace(/-/g, '').length !== 10}
          style={{
            padding: '14px 20px',
            background: isChecking || value.replace(/-/g, '').length !== 10
              ? '#e0e0e0'
              : '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: '500',
            cursor: isChecking || value.replace(/-/g, '').length !== 10
              ? 'not-allowed'
              : 'pointer',
            transition: 'all 0.2s',
            minWidth: '60px',
            whiteSpace: 'nowrap'
          }}
        >
          {isChecking ? '확인중...' : '조회'}
        </button>
      </div>
      
      {validationResult && (
        <div style={{
          marginTop: '8px',
          padding: '8px 12px',
          background: validationResult.isValid && !validationResult.isDuplicate && validationResult.isActive
            ? 'rgba(16, 185, 129, 0.1)'
            : 'rgba(239, 68, 68, 0.1)',
          color: validationResult.isValid && !validationResult.isDuplicate && validationResult.isActive
            ? '#10b981'
            : '#ef4444',
          borderRadius: '8px',
          fontSize: '13px'
        }}>
          {validationResult.message}
        </div>
      )}
    </div>
  );
}

export default BusinessNumberValidator;