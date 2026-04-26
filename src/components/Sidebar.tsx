'use client';

import { Chat } from '@/types/chat';
import { MessageSquare, Plus, X } from 'lucide-react';

interface Props {
  open: boolean;
  chats: Chat[];
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  onClose: () => void;
}

const groups = ['Today', 'Yesterday'];

export default function Sidebar({ open, chats, onNewChat, onSelectChat, onClose }: Props) {
  const styles: React.CSSProperties = {
    width: open ? 'var(--sidebar-w)' : '0',
    minWidth: open ? 'var(--sidebar-w)' : '0',
    height: '100%',
    background: 'var(--surface)',
    borderRight: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    transition: 'width var(--t) var(--ease), min-width var(--t) var(--ease)',
    flexShrink: 0,
  };

  return (
    <aside style={styles}>
      {/* Header */}
      <div style={{ height: 'var(--header-h)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#7c6af7,#a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          </div>
          <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: '-0.3px', whiteSpace: 'nowrap' }}>
            Aura<span style={{ color: 'var(--accent)' }}>AI</span>
          </span>
        </div>
        <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', transition: 'background var(--t) var(--ease)' }}>
          <X size={16} />
        </button>
      </div>

      {/* New Chat */}
      <button
        onClick={onNewChat}
        style={{ margin: 12, padding: '9px 14px', background: 'var(--accent-soft)', border: '1px solid var(--user-border)', borderRadius: 'var(--radius-md)', color: 'var(--accent-hover)', fontWeight: 500, fontSize: 13, display: 'flex', alignItems: 'center', gap: 7, transition: 'background var(--t) var(--ease)' }}
      >
        <Plus size={14} />
        New conversation
      </button>

      {/* Chat List */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 8 }}>
        {groups.map(group => (
          <div key={group}>
            <div style={{ padding: '16px 14px 6px', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text-faint)' }}>{group}</div>
            <div style={{ padding: '0 8px' }}>
              {chats.filter(c => c.group === group).map(chat => (
                <div
                  key={chat.id}
                  onClick={() => onSelectChat(chat.id)}
                  style={{
                    padding: '9px 10px', borderRadius: 'var(--radius-md)', cursor: 'pointer',
                    display: 'flex', alignItems: 'flex-start', gap: 8,
                    background: chat.active ? 'var(--surface-2)' : 'transparent',
                    borderLeft: chat.active ? '2.5px solid var(--accent)' : '2.5px solid transparent',
                    transition: 'background var(--t) var(--ease)',
                    marginBottom: 2,
                  }}
                >
                  <MessageSquare size={16} style={{ color: chat.active ? 'var(--accent)' : 'var(--text-muted)', flexShrink: 0, marginTop: 2 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text)' }}>{chat.title}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 1 }}>{chat.preview}</div>
                  </div>
                  <div style={{ fontSize: 10.5, color: 'var(--text-faint)', whiteSpace: 'nowrap', flexShrink: 0 }}>{chat.time}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid var(--border)', padding: '10px 8px', flexShrink: 0 }}>
        <div style={{ padding: '8px 10px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg,#6255e8,#a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: '#fff', flexShrink: 0 }}>B</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Bashar Naanah</div>
            <div style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 500 }}>✦ Pro Plan</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
