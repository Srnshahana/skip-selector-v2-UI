import React, { useEffect, useState } from 'react';

function SkipCard({ size, hirePeriod, price, image, selected, onSelect, notAllowed }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  return (
    <div style={{ position: 'relative' }}>
      {(selected || hovered) && (
        <div
          style={{
            position: 'absolute',
            top: '-10px',
            left: '-10px',
            right: '-10px',
            bottom: '-10px',
            background: 'radial-gradient(circle, rgb(0, 0, 0) 20%, transparent 280%)',
            borderRadius: '24px',
            zIndex: 0,
            filter: 'blur(20px)',
            transition: 'opacity 0.3s ease',
          }}
        />
      )}

      <div
        onClick={onSelect}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative',
          zIndex: 1,
          backgroundColor: '#F8F4E8',
          color: '#4F583B',
          borderRadius: '16px',
          overflow: 'hidden',
          width: '100%',
          maxWidth: '380px',
          minWidth: '260px', 
          cursor: 'pointer',
          transform: visible
            ? hovered || selected
              ? 'scale(1.06)'
              : 'scale(1)'
            : 'scale(0.8)',
          opacity: visible ? 1 : 0,
          transition: 'all 0.35s ease',
          boxShadow:
            selected || hovered
              ? '0 10px 30px rgba(255, 255, 255, 0.2)'
              : '0 4px 16px rgba(255, 255, 255, 0.91)',
        }}
      >
        <div style={{ position: 'relative' }}>
          <img
            src={image}
            alt={`${size} Yard Skip`}
            style={{
              width: '100%',
              height: '220px',
              objectFit: 'cover',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
            }}
          />

          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              backgroundColor: '#4F583B',
              padding: '5px 14px',
              borderRadius: '999px',
              fontSize: '13px',
              fontWeight: 'bold',
              color: '#fff',
              boxShadow: '0 2px 6px rgb(255, 255, 255)',
              whiteSpace: 'nowrap',
            }}
          >
            {size} Yards
          </div>

          {notAllowed && (
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                backgroundColor: '#D9A450',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '12px',
                padding: '5px 10px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 2px 6px rgba(255, 255, 255, 0.2)',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ marginRight: '6px' }}>⚠️</span> Not Allowed On The Road
            </div>
          )}
        </div>

        <div style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
            {size} Yard Skip
          </h3>
          <p style={{ color: '#7C7C6C', fontSize: '14px', marginBottom: '12px' }}>
            {hirePeriod} hire period
          </p>
          <p
            style={{
              fontSize: '22px',
              fontWeight: 'bold',
              color: '#F4B840',
              marginBottom: '20px',
            }}
          >
            £{price}
          </p>

          <button
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              background: selected
                ? 'linear-gradient(90deg, #F4B840 0%, #D9A450 100%)'
                : '#4F583B',
              boxShadow: selected
                ? '0 4px 12px rgba(244, 184, 64, 0.4)'
                : 'none',
              transition: 'all 0.3s ease',
              letterSpacing: '0.3px',
            }}
          >
            {selected ? '✓ Selected' : 'Select This Skip'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SkipCard;