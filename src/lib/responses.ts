export const DEMO_RESPONSES: Record<string, string> = {
  'Write a React component': `Here's a clean, reusable Button component with TypeScript:

\`\`\`tsx
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'ghost' | 'danger';
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({ label, variant = 'primary', onClick, disabled }: ButtonProps) {
  return (
    <button
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
\`\`\`

This component uses:
- **TypeScript** for type safety
- **Prop variants** for flexible styling
- **Optional callbacks** for event handling`,

  'Draft a professional email': `Here's a professional follow-up email template:

---

**Subject:** Follow-up: Project Proposal Discussion

Hi [Name],

I hope this message finds you well. I wanted to follow up on our conversation regarding the project proposal.

I've attached the revised document incorporating your feedback. Key changes include:

- Updated timeline with milestone checkpoints
- Revised budget breakdown  
- Added risk mitigation strategies

Could we schedule a 30-minute call this week? I'm available **Tuesday or Thursday** afternoon.

Best regards,
Bashar Naanah`,

  'Explain quantum computing': `Quantum computing leverages **quantum mechanics** to process information differently than classical computers.

## Key Concepts

1. **Qubits** — Unlike classical bits (0 or 1), qubits exist in superposition of both states simultaneously.

2. **Entanglement** — Qubits can be entangled so the state of one instantly influences another.

3. **Interference** — Algorithms amplify correct answers and cancel wrong ones.

## Why It Matters

Quantum computers excel at:
- **Cryptography** — Breaking RSA encryption (Shor's algorithm)
- **Drug discovery** — Simulating molecular interactions
- **Optimization** — Logistics, finance, and routing`,

  default: `That's a great question! Let me break it down for you.

Based on your request, here's what I recommend:

1. **Start with the fundamentals** — Understanding core concepts makes everything easier
2. **Practice iteratively** — Build small pieces and test as you go
3. **Review and refine** — Good work always involves multiple passes

I'm here to help you dive deeper into any of these points. What would you like to explore first?`,
};
