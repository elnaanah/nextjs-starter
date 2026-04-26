export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

export interface Chat {
  id: string;
  title: string;
  preview: string;
  time: string;
  active: boolean;
  group: 'Today' | 'Yesterday';
}
