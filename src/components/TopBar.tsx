'use client';

import { Menu, Moon, Sun, Share2, Search, ChevronDown } from 'lucide-react';

const MODELS = ['Aura 3.5 Ultra', 'Aura 3 Sonnet', 'Aura Flash', 'Aura Vision'];

interface Props {
  onToggleSidebar: () => void;
  onToggleTheme: () => void;
  theme: 'dark' | 'light';
  model: string;
  onChangeModel: (m: string) => void;
  tokenCount: number;
}

export default function TopBar({ onToggleSidebar, onToggleTheme, theme, model, onChangeModel, tokenCount }: Props) {
  const nextModel = () => {
    const idx = MODELS.indexOf(model);
    onChangeModel(MODELS[(idx + 1) % MODELS.length]);
  };

  const iconBtn: React.CSSProperties = {
    width: 34, height: 34, borderRadius: 'var(--radius-sm)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'var(--text-muted)', transition: 'background var(--t) var(--ease)',
  };

  return (
    <header style={{ height: 'var(--header-h)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', borderBottom: '1px solid var(--border)', background: 'var(--surface)', flexShrink: 0, gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={onToggleSidebar} style={iconBtn}><Menu size={17} /></button>
        <button onClick={nextModel} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', borderRadius: 'var(--radius-md)', background: 'var(--surface-2)', border: '1px solid var(--border)', cursor: 'pointer', color: 'var(--text)', fontSize: 13, fontWeight: 500, transition: 'background var(--t) var(--ease)', fontFamily: 'inherit' }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#3ecf8e', boxShadow: '0 0 6px #3ecf8e' }} />
          {model}
          <ChevronDown size={13} color="var(--text-muted)" />
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ padding: '4px 9px', borderRadius: 'var(--radius-sm)', background: 'var(--surface-2)', border: '1px solid var(--border)', fontSize: 11.5, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 5 }}>
          <span>Tokens</span>
          <span style={{ color: 'var(--text)', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{tokenCount.toLocaleString()}</span>
        </div>
        <button onClick={onToggleTheme} style={iconBtn}>
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <button style={iconBtn}><Share2 size={17} /></button>
        <button style={iconBtn}><Search size={17} /></button>
      </div>
    </header>
  );
}
