import React, { useState, useEffect } from 'react';
import SkipCard from './components/SkipCard';
import skipImage1 from './components/images/4-yarder.jpg';
import skipImage2 from './components/images/5-yarder-skip.jpg';
import skipImage3 from './components/images/6-yarder-skip.jpg';
import skipImage4 from './components/images/8-yarder-skip.jpg';
import skipImage5 from './components/images/10-yarder-skip.jpg';
import skipImage6 from './components/images/12-yarder-skip.jpg';
import skipImage7 from './components/images/14-yarder-skip.jpg';
import skipImage8 from './components/images/16-yarder-skip.jpg';
import skipImage9 from './components/images/20-yarder-skip.jpg';
import skipImage10 from './components/images/40-yarder-skip.jpg';
import {
  FiMapPin,
  FiTrash2,
  FiTruck,
  FiShield,
  FiCalendar,
  FiCreditCard,
} from 'react-icons/fi';

function App() {
  const [selectedSize, setSelectedSize] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });

  const skipOptions = [
    { size: 4, hirePeriod: '14 day', price: 211, image: skipImage1, notAllowed: false },
    { size: 5, hirePeriod: '14 day', price: 241, image: skipImage2, notAllowed: false },
    { size: 6, hirePeriod: '14 day', price: 264, image: skipImage3, notAllowed: false },
    { size: 8, hirePeriod: '14 day', price: 295, image: skipImage4, notAllowed: false },
    { size: 10, hirePeriod: '14 day', price: 356, image: skipImage5, notAllowed: true },
    { size: 12, hirePeriod: '14 day', price: 390, image: skipImage6, notAllowed: true },
    { size: 14, hirePeriod: '14 day', price: 434, image: skipImage7, notAllowed: true },
    { size: 16, hirePeriod: '7 day', price: 510, image: skipImage8, notAllowed: true },
    { size: 20, hirePeriod: '14 day', price: 802, image: skipImage9, notAllowed: true },
    { size: 40, hirePeriod: '14 day', price: 877, image: skipImage10, notAllowed: true },
  ];

  const steps = [
    { icon: <FiMapPin />, label: 'Postcode', active: true },
    { icon: <FiTrash2 />, label: 'Waste Type', active: true },
    { icon: <FiTruck />, label: 'Select Skip', active: true },
    { icon: <FiShield />, label: 'Permit Check', active: false },
    { icon: <FiCalendar />, label: 'Choose Date', active: false },
    { icon: <FiCreditCard />, label: 'Payment', active: false },
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    const follow = () => {
      setCursorPos((prev) => {
        const dx = targetPos.x - prev.x;
        const dy = targetPos.y - prev.y;
        return {
          x: prev.x + dx * 0.1,
          y: prev.y + dy * 0.1,
        };
      });

      animationFrameId = requestAnimationFrame(follow);
    };

    follow();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [targetPos]);

  return (
    <div
      style={{
        background: '#F8F4E8',
        minHeight: '100vh',
        width: '100vw',
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      {/* Stepper */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '64px',
        }}
      >
        {steps.map((step, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: step.active ? '#4F583B' : '#B3B3B3',
              fontSize: '14px',
              cursor: step.active ? 'pointer' : 'not-allowed',
              opacity: step.active ? 1 : 0.5,
            }}
            title={step.active ? '' : 'This step is disabled'}
          >
            {step.icon}
            <span>{step.label}</span>
            {idx < steps.length - 1 && (
              <div
                style={{
                  width: '24px',
                  height: '2px',
                  backgroundColor: step.active ? '#4F583B' : '#DDD',
                  margin: '0 8px',
                }}
              />
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '70px' }}>
        <h1
          style={{
            color: '#4F583B',
            textAlign: 'center',
            fontSize: 'clamp(24px, 6vw, 36px)',
            fontWeight: '700',
          }}
        >
          -- SELECT YOUR IDEAL SKIP --
        </h1>
        <p
          style={{
            color: '#D9A450',
            fontSize: 'clamp(14px, 3.5vw, 16px)',
            marginTop: '-10px',
            textAlign: 'center',
          }}
        >
          Choose the perfect skip size for your project. Fast delivery. No hassle.
        </p>
      </div>

      {/* Skip Card Grid */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          overflowX: 'auto',
          overflowY: 'hidden',
          padding: '20px 10px 100px 10px', 
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {skipOptions.map((skip) => (
          <div
            key={skip.size}
            style={{
              flex: '0 0 auto',
              scrollSnapAlign: 'start',
              marginRight: '22px',
              marginLeft:'22px',
              width: 'min(90vw, 360px)', 
            }}
          >
            <SkipCard
              {...skip}
              selected={selectedSize === skip.size}
              onSelect={() => {
                setSelectedSize(skip.size);
                window.scrollBy({
                  top: 190,
                  behavior: 'smooth',
                });
              }}
            />
          </div>
        ))}
      </div>

      {/* Cursor Follower */}
      <div
        style={{
          position: 'fixed',
          top: cursorPos.y,
          left: cursorPos.x,
          width: '16px',
          height: '16px',
          backgroundColor: '#F4B840',
          borderRadius: '50%',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          boxShadow: '0 0 12px rgba(244, 184, 64, 0.6)',
        }}
      />

      {/* Bottom Bar */}
      {selectedSize !== null && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            backgroundColor: '#EAD7B2',
            borderTop: '1px solid #D9A450',
            padding: '10px 20px',
            zIndex: 1000,
          }}
        >
          <p
            style={{
              fontSize: '13px',
              color: '#4F583B',
              textAlign: 'center',
              marginBottom: '5px',
            }}
          >
            Imagery and information shown throughout this website may not reflect the exact shape or size
            specification, colours may vary, options and/or accessories may be featured at additional cost.
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              rowGap: '12px',
              padding: '12px',
              width: '90%',
              margin: '0 auto',
              borderRadius: '10px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '16px',
                color: '#4F583B',
                fontSize: '16px',
              }}
            >
              <span>{selectedSize} Yard Skip</span>
              <span style={{ color: '#D9A450', fontWeight: 'bold', fontSize: '20px' }}>
                £{skipOptions.find((s) => s.size === selectedSize)?.price}
              </span>
              <span style={{ color: '#4F583B', fontSize: '14px' }}>
                {skipOptions.find((s) => s.size === selectedSize)?.hirePeriod} hire
              </span>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#EAD7B2',
                  color: '#4F583B',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Back
              </button>
              <button
                style={{
                  padding: '10px 24px',
                  backgroundColor: '#4F583B',
                  color: '#F8F4E8',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                Continue <span style={{ fontSize: '18px' }}>→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;