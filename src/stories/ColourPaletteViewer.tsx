// src/ColourPaletteViewer.tsx
import { tokens } from 'design-tokens/tokens';
import React from 'react';

const { cc } = tokens;

/**
 * Viewer for cc.ref.palette design tokens.
 *
 * Handles both:
 * - ramp colours like grey / blue / red: { "50": "#...", "100": "#..." }
 * - singletons like white / black: "#FFFFFF"
 */
const ColourPaletteViewer: React.FC = () => {
  const palette = cc.ref.palette as Record<string, string | Record<string, string>>;

  const renderRamp = (colourName: string, scales: Record<string, string>) => {
    // Optional: sort by numeric shade if keys are numbers ("00", "50", "100", ...)
    const sortedEntries = Object.entries(scales).sort(([a], [b]) => {
      const na = Number(a);
      const nb = Number(b);
      if (isNaN(na) || isNaN(nb)) return a.localeCompare(b);
      return na - nb;
    });

    // Optional: dedupe hex values within a ramp
    const seen = new Set<string>();
    const uniqueEntries = sortedEntries.filter(([, value]) => {
      if (seen.has(value)) return false;
      seen.add(value);
      return true;
    });

    return (
      <div key={colourName} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontWeight: 600 }}>{colourName}</div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {uniqueEntries.map(([shade, value]) => (
            <div
              key={shade}
              style={{
                width: 90,
                borderRadius: 6,
                overflow: 'hidden',
                border: '1px solid #ddd',
                fontSize: 11,
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              <div
                style={{
                  height: 40,
                  backgroundColor: value,
                }}
              />
              <div style={{ padding: '4px 6px' }}>
                <div>{shade}</div>
                <div style={{ color: '#888' }}>{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSingleton = (colourName: string, value: string) => (
    <div key={colourName} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontWeight: 600 }}>{colourName}</div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <div
          style={{
            width: 90,
            borderRadius: 6,
            overflow: 'hidden',
            border: '1px solid #ddd',
            fontSize: 11,
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div
            style={{
              height: 40,
              backgroundColor: value,
            }}
          />
          <div style={{ padding: '4px 6px' }}>
            <div>base</div>
            <div style={{ color: '#888' }}>{value}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h3>Design Token Colour Palette</h3>
      <p style={{ margin: 0, color: '#666', fontSize: 14 }}>
        Showing raw colours from <code>cc.ref.palette</code> (not just the MUI theme).
      </p>

      {Object.entries(palette).map(([colourName, value]) => {
        if (typeof value === 'string') {
          // e.g. white, black
          return renderSingleton(colourName, value);
        }

        // e.g. grey, blue, red…
        return renderRamp(colourName, value);
      })}
    </div>
  );
};

export default ColourPaletteViewer;
