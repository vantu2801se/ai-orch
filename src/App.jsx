import { useState } from 'react';
import ScriptwriterSelectionModal from './ScriptwriterSelectionModal';

export default function App() {
  const [open, setOpen] = useState(true);
  const [confirmed, setConfirmed] = useState(null);

  function handleConfirm(codes) {
    setConfirmed(codes);
    setOpen(false);
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '24px' }}>
      <h2>ScriptwriterSelectionModal Demo</h2>
      <button
        onClick={() => { setOpen(true); setConfirmed(null); }}
        style={{ padding: '8px 20px', cursor: 'pointer' }}
      >
        Open Modal (脚本家選択)
      </button>

      {confirmed && (
        <div style={{ marginTop: '16px', background: '#f0fff0', padding: '12px', borderRadius: '4px' }}>
          <strong>Selected codes:</strong> {confirmed.join(', ')}
        </div>
      )}

      <ScriptwriterSelectionModal
        open={open}
        onConfirm={handleConfirm}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
