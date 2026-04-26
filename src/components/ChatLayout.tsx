'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Messages from './Messages';
import InputArea from './InputArea';
import { Message, Chat } from '@/types/chat';
import { DEMO_RESPONSES } from '@/lib/responses';

const INITIAL_CHATS: Chat[] = [
  { id: '1', title: 'Build a REST API with auth', preview: 'Sure! Let\'s set up Express.js with JWT...', time: '2m', active: true, group: 'Today' },
  { id: '2', title: 'Explain transformer architecture', preview: 'The transformer model consists of...', time: '1h', active: false, group: 'Today' },
  { id: '3', title: 'Marketing copy for SaaS', preview: 'Here are 5 headline variations...', time: '3h', active: false, group: 'Today' },
  { id: '4', title: 'Python async/await patterns', preview: 'asyncio is Python\'s async framework...', time: '1d', active: false, group: 'Yesterday' },
  { id: '5', title: 'CSS Grid deep dive', preview: 'Grid is a powerful 2D layout system...', time: '1d', active: false, group: 'Yesterday' },
];

export default function ChatLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chats, setChats] = useState<Chat[]>(INITIAL_CHATS);
  const [tokenCount, setTokenCount] = useState(1247);
  const [model, setModel] = useState('Aura 3.5 Ultra');

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const toggleSidebar = () => setSidebarOpen(p => !p);

  const handleNewChat = () => {
    setMessages([]);
    setChats(prev => prev.map(c => ({ ...c, active: false })));
  };

  const handleSend = (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, userMsg]);
    setTokenCount(p => p + Math.floor(text.length / 4));
    setIsTyping(true);

    const delay = 900 + Math.random() * 600;
    setTimeout(() => {
      const reply = DEMO_RESPONSES[text] ?? DEMO_RESPONSES['default'];
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: reply,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
      setTokenCount(p => p + Math.floor(reply.length / 4));
    }, delay);
  };

  const handleSelectChat = (id: string) => {
    setChats(prev => prev.map(c => ({ ...c, active: c.id === id })));
    setMessages([]);
  };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100dvh', overflow: 'hidden' }}>
      <Sidebar
        open={sidebarOpen}
        chats={chats}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onClose={toggleSidebar}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden', background: 'var(--bg)' }}>
        <TopBar
          onToggleSidebar={toggleSidebar}
          onToggleTheme={toggleTheme}
          theme={theme}
          model={model}
          onChangeModel={setModel}
          tokenCount={tokenCount}
        />
        <Messages messages={messages} isTyping={isTyping} />
        <InputArea onSend={handleSend} disabled={isTyping} />
      </div>
    </div>
  );
}
