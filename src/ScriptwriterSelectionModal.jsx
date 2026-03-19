import { useState } from 'react';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const ORGS = [
  { code: 'ORG001', name: 'JASRAC' },
  { code: 'ORG002', name: 'NexTone' },
  { code: 'ORG003', name: '日本脚本家連盟' },
  { code: 'ORG004', name: '日本音楽著作権協会' },
];

const ALL_WRITERS = [
  { code: 'S00001', name: '山田 太郎',   orgCode: 'ORG001', orgName: 'JASRAC' },
  { code: 'S00002', name: '佐藤 花子',   orgCode: 'ORG002', orgName: 'NexTone' },
  { code: 'S00003', name: '田中 一郎',   orgCode: 'ORG001', orgName: 'JASRAC' },
  { code: 'S00004', name: '鈴木 美咲',   orgCode: 'ORG002', orgName: 'NexTone' },
  { code: 'S00005', name: '伊藤 健太',   orgCode: 'ORG003', orgName: '日本脚本家連盟' },
  { code: 'S00006', name: '渡辺 洋子',   orgCode: 'ORG001', orgName: 'JASRAC' },
  { code: 'S00007', name: '高橋 誠',     orgCode: 'ORG002', orgName: 'NexTone' },
  { code: 'S00008', name: '中村 幸子',   orgCode: 'ORG003', orgName: '日本脚本家連盟' },
  { code: 'S00009', name: '小林 勇',     orgCode: 'ORG001', orgName: 'JASRAC' },
  { code: 'S00010', name: '加藤 りか',   orgCode: 'ORG002', orgName: 'NexTone' },
  { code: 'S00011', name: '木村 英二',   orgCode: 'ORG004', orgName: '日本音楽著作権協会' },
  { code: 'S00012', name: '斎藤 千春',   orgCode: 'ORG003', orgName: '日本脚本家連盟' },
  { code: 'S00013', name: '井上 大輝',   orgCode: 'ORG002', orgName: 'NexTone' },
  { code: 'S00014', name: '林 静香',     orgCode: 'ORG001', orgName: 'JASRAC' },
  { code: 'S00015', name: '清水 亮介',   orgCode: 'ORG003', orgName: '日本脚本家連盟' },
];

// ─── Styles ───────────────────────────────────────────────────────────────────

const S = {
  overlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.45)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    width: '80%', maxWidth: '1000px',
    maxHeight: '90vh',
    background: '#F0F0F0',
    borderRadius: '6px',
    display: 'flex', flexDirection: 'column',
    boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
    fontFamily: '"Meiryo", "Yu Gothic", sans-serif',
    fontSize: '14px',
  },
  modalHeader: {
    background: '#3B5998',
    color: '#fff',
    padding: '10px 16px',
    borderRadius: '6px 6px 0 0',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    fontWeight: 700, fontSize: '15px',
    flexShrink: 0,
  },
  closeX: {
    background: 'none', border: 'none', color: '#fff',
    fontSize: '20px', cursor: 'pointer', lineHeight: 1, padding: '0 4px',
  },
  body: {
    flex: 1, overflowY: 'auto',
    padding: '12px',
    display: 'flex', flexDirection: 'column', gap: '12px',
  },
  card: {
    background: '#FCFCFC',
    borderRadius: '4px',
    padding: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  },
  sectionTitle: {
    fontWeight: 700, fontSize: '13px',
    color: '#333',
    marginBottom: '10px',
    borderBottom: '1px solid #ddd',
    paddingBottom: '6px',
  },
  formRow: {
    display: 'flex', alignItems: 'center', gap: '12px',
    flexWrap: 'wrap', marginBottom: '10px',
  },
  label: { fontWeight: 600, color: '#444', whiteSpace: 'nowrap' },
  input: {
    border: '1px solid #bbb', borderRadius: '3px',
    padding: '4px 8px', fontSize: '14px',
    width: '220px',
    background: '#fff',
  },
  select: {
    border: '1px solid #bbb', borderRadius: '3px',
    padding: '4px 8px', fontSize: '14px',
    width: '200px',
    background: '#fff',
  },
  btnGroup: { display: 'flex', gap: '8px', marginLeft: 'auto' },
  btnPrimary: {
    background: '#3B5998', color: '#fff',
    border: 'none', borderRadius: '3px',
    padding: '5px 18px', fontSize: '14px',
    cursor: 'pointer', fontWeight: 600,
  },
  btnSecondary: {
    background: '#888', color: '#fff',
    border: 'none', borderRadius: '3px',
    padding: '5px 18px', fontSize: '14px',
    cursor: 'pointer',
  },
  btnDanger: {
    background: '#c0392b', color: '#fff',
    border: 'none', borderRadius: '3px',
    padding: '5px 18px', fontSize: '14px',
    cursor: 'pointer',
  },
  btnTransfer: {
    background: '#555', color: '#fff',
    border: 'none', borderRadius: '3px',
    padding: '5px 14px', fontSize: '16px',
    cursor: 'pointer', marginTop: '8px',
  },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '13px' },
  th: {
    background: '#FCFCFC', borderBottom: '2px solid #ccc',
    padding: '6px 8px', textAlign: 'left',
    fontWeight: 700, color: '#333',
    position: 'sticky', top: 0, zIndex: 1,
  },
  thCenter: {
    background: '#FCFCFC', borderBottom: '2px solid #ccc',
    padding: '6px 8px', textAlign: 'center',
    fontWeight: 700, color: '#333',
    position: 'sticky', top: 0, zIndex: 1,
    width: '48px',
  },
  tdOdd:  { padding: '6px 8px', background: '#F3F3F3', borderBottom: '1px solid #e8e8e8' },
  tdEven: { padding: '6px 8px', background: '#FCFCFC', borderBottom: '1px solid #e8e8e8' },
  tdCenterOdd:  { padding: '6px 8px', background: '#F3F3F3', borderBottom: '1px solid #e8e8e8', textAlign: 'center' },
  tdCenterEven: { padding: '6px 8px', background: '#FCFCFC', borderBottom: '1px solid #e8e8e8', textAlign: 'center' },
  tableWrap: { maxHeight: '200px', overflowY: 'auto', border: '1px solid #ddd' },
  emptyRow: { padding: '12px', textAlign: 'center', color: '#999', fontSize: '13px' },
  errorMsg: {
    color: '#c0392b', background: '#fff0f0',
    border: '1px solid #f5c6cb',
    borderRadius: '3px', padding: '6px 10px',
    fontSize: '13px', marginBottom: '8px',
  },
  warnMsg: {
    color: '#856404', background: '#fff3cd',
    border: '1px solid #ffc107',
    borderRadius: '3px', padding: '6px 10px',
    fontSize: '13px', marginBottom: '8px',
  },
  footer: {
    padding: '10px 16px',
    background: '#E8E8E8',
    borderRadius: '0 0 6px 6px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    borderTop: '1px solid #ccc',
    flexShrink: 0,
  },
  // Duplicate confirm dialog
  dialogOverlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 2000,
  },
  dialog: {
    background: '#fff', borderRadius: '6px',
    padding: '24px', maxWidth: '420px', width: '90%',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    fontFamily: '"Meiryo", "Yu Gothic", sans-serif',
  },
  dialogTitle: { fontWeight: 700, fontSize: '15px', marginBottom: '12px', color: '#333' },
  dialogMsg: { fontSize: '14px', color: '#555', marginBottom: '20px', lineHeight: 1.6 },
  dialogBtns: { display: 'flex', gap: '10px', justifyContent: 'flex-end' },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ScriptwriterSelectionModal({ open, onConfirm, onClose }) {
  const [searchName, setSearchName] = useState('');
  const [searchOrg,  setSearchOrg]  = useState('');
  const [results,    setResults]    = useState([]);
  const [resultChecked, setResultChecked] = useState(new Set());
  const [searched,   setSearched]   = useState(false);

  const [selection,        setSelection]        = useState([]);
  const [selectionChecked, setSelectionChecked] = useState(new Set());
  const [selectAll,        setSelectAll]        = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [warnMsg,  setWarnMsg]  = useState('');

  // Duplicate confirm dialog state
  const [dupDialog, setDupDialog] = useState(null); // { toAdd: [], dupNames: [] }

  if (!open) return null;

  // ── Search ──────────────────────────────────────────────────────────────────
  function handleSearch() {
    if (!searchName.trim() && !searchOrg) {
      setErrorMsg('検索条件が設定されていません。1つ以上の条件を指定してください');
      setWarnMsg('');
      return;
    }
    setErrorMsg('');
    const filtered = ALL_WRITERS.filter((w) => {
      const nameMatch = searchName.trim()
        ? w.name.includes(searchName.trim())
        : true;
      const orgMatch = searchOrg
        ? w.orgCode === searchOrg
        : true;
      return nameMatch && orgMatch;
    });
    setResults(filtered);
    setResultChecked(new Set());
    setSearched(true);
    if (filtered.length === 0) {
      setWarnMsg('指定した条件の脚本家が見つかりません');
    } else {
      setWarnMsg('');
    }
  }

  function handleClear() {
    setSearchName('');
    setSearchOrg('');
    setErrorMsg('');
    setWarnMsg('');
  }

  // ── Result checkboxes ───────────────────────────────────────────────────────
  function toggleResultCheck(code) {
    setResultChecked((prev) => {
      const next = new Set(prev);
      next.has(code) ? next.delete(code) : next.add(code);
      return next;
    });
  }

  // ── Transfer (↓) ────────────────────────────────────────────────────────────
  function handleTransfer() {
    const toTransfer = results.filter((w) => resultChecked.has(w.code));
    if (toTransfer.length === 0) return;

    const selectionCodes = new Set(selection.map((w) => w.code));
    const dups    = toTransfer.filter((w) => selectionCodes.has(w.code));
    const nonDups = toTransfer.filter((w) => !selectionCodes.has(w.code));

    if (dups.length > 0) {
      setDupDialog({ toAdd: toTransfer, nonDups, dupNames: dups.map((w) => w.name) });
    } else {
      addToSelection(nonDups);
    }
  }

  function addToSelection(writers) {
    setSelection((prev) => [...prev, ...writers]);
    setResultChecked(new Set());
  }

  function handleDupConfirm() {
    // Add all (including duplicates)
    addToSelection(dupDialog.toAdd);
    setDupDialog(null);
  }

  function handleDupCancel() {
    // Add only non-duplicates
    addToSelection(dupDialog.nonDups);
    setDupDialog(null);
  }

  // ── Selection list checkboxes ───────────────────────────────────────────────
  function toggleSelectionCheck(code) {
    setSelectionChecked((prev) => {
      const next = new Set(prev);
      next.has(code) ? next.delete(code) : next.add(code);
      const allChecked = selection.every((w) => next.has(w.code));
      setSelectAll(allChecked && selection.length > 0);
      return next;
    });
  }

  function handleSelectAll(checked) {
    setSelectAll(checked);
    setSelectionChecked(checked ? new Set(selection.map((w) => w.code)) : new Set());
  }

  function handleDelete() {
    const next = selection.filter((w) => !selectionChecked.has(w.code));
    setSelection(next);
    setSelectionChecked(new Set());
    setSelectAll(false);
  }

  function handleConfirm() {
    onConfirm(selection.map((w) => w.code));
  }

  // ── Row helpers ─────────────────────────────────────────────────────────────
  function tdStyle(i, center = false) {
    const base = i % 2 === 0
      ? (center ? S.tdCenterOdd  : S.tdOdd)
      : (center ? S.tdCenterEven : S.tdEven);
    return base;
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      <div style={S.overlay}>
        <div style={S.modal}>
          {/* Header */}
          <div style={S.modalHeader}>
            <span>脚本家選択</span>
            <button style={S.closeX} onClick={onClose} title="閉じる">×</button>
          </div>

          {/* Body */}
          <div style={S.body}>

            {/* A.1 Search Criteria */}
            <div style={S.card}>
              <div style={S.sectionTitle}>検索条件</div>
              {errorMsg && <div style={S.errorMsg}>{errorMsg}</div>}
              {warnMsg  && <div style={S.warnMsg}>{warnMsg}</div>}
              <div style={S.formRow}>
                <span style={S.label}>脚本家名</span>
                <input
                  style={S.input}
                  type="text"
                  maxLength={40}
                  value={searchName}
                  onChange={(e) => { setSearchName(e.target.value); setErrorMsg(''); }}
                  placeholder="部分一致検索"
                />
                <span style={S.label}>著作権団体</span>
                <select
                  style={S.select}
                  value={searchOrg}
                  onChange={(e) => { setSearchOrg(e.target.value); setErrorMsg(''); }}
                >
                  <option value="">-- 選択してください --</option>
                  {ORGS.map((o) => (
                    <option key={o.code} value={o.code}>{o.name}</option>
                  ))}
                </select>
                <div style={S.btnGroup}>
                  <button style={S.btnPrimary}   onClick={handleSearch}>検索</button>
                  <button style={S.btnSecondary} onClick={handleClear}>クリア</button>
                </div>
              </div>
            </div>

            {/* A.2 Search Results */}
            <div style={S.card}>
              <div style={S.sectionTitle}>
                検索結果一覧
                {searched && <span style={{ fontWeight: 400, color: '#666', marginLeft: '8px' }}>
                  ({results.length} 件)
                </span>}
              </div>
              <div style={S.tableWrap}>
                <table style={S.table}>
                  <thead>
                    <tr>
                      <th style={S.thCenter}>選択</th>
                      <th style={S.th}>脚本家名（漢字）</th>
                      <th style={S.th}>脚本家団体</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.length === 0 ? (
                      <tr>
                        <td colSpan={3} style={S.emptyRow}>
                          {searched ? 'データがありません' : '検索条件を入力して「検索」を押してください'}
                        </td>
                      </tr>
                    ) : results.map((w, i) => (
                      <tr key={w.code}>
                        <td style={tdStyle(i, true)}>
                          <input
                            type="checkbox"
                            checked={resultChecked.has(w.code)}
                            onChange={() => toggleResultCheck(w.code)}
                          />
                        </td>
                        <td style={tdStyle(i)}>{w.name}</td>
                        <td style={tdStyle(i)}>{w.orgName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <button
                  style={S.btnTransfer}
                  onClick={handleTransfer}
                  title="選択した脚本家を選択一覧に追加"
                  disabled={resultChecked.size === 0}
                >
                  ↓
                </button>
              </div>
            </div>

            {/* A.3 Selection List */}
            <div style={S.card}>
              <div style={S.sectionTitle}>
                選択一覧
                <span style={{ fontWeight: 400, color: '#666', marginLeft: '8px' }}>
                  ({selection.length} 件)
                </span>
              </div>
              <div style={S.tableWrap}>
                <table style={S.table}>
                  <thead>
                    <tr>
                      <th style={S.thCenter}>
                        <input
                          type="checkbox"
                          checked={selectAll}
                          disabled={selection.length === 0}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          title="全選択"
                        />
                      </th>
                      <th style={S.th}>脚本家名（漢字）</th>
                      <th style={S.th}>脚本家団体</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selection.length === 0 ? (
                      <tr>
                        <td colSpan={3} style={S.emptyRow}>選択された脚本家はいません</td>
                      </tr>
                    ) : selection.map((w, i) => (
                      <tr key={`${w.code}-${i}`}>
                        <td style={tdStyle(i, true)}>
                          <input
                            type="checkbox"
                            checked={selectionChecked.has(w.code)}
                            onChange={() => toggleSelectionCheck(w.code)}
                          />
                        </td>
                        <td style={tdStyle(i)}>{w.name}</td>
                        <td style={tdStyle(i)}>{w.orgName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>{/* /body */}

          {/* Footer */}
          <div style={S.footer}>
            <button style={S.btnSecondary} onClick={onClose}>閉じる</button>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                style={S.btnDanger}
                onClick={handleDelete}
                disabled={selectionChecked.size === 0}
              >
                削除
              </button>
              <button style={S.btnPrimary} onClick={handleConfirm}>選択</button>
            </div>
          </div>
        </div>
      </div>

      {/* Duplicate Confirmation Dialog */}
      {dupDialog && (
        <div style={S.dialogOverlay}>
          <div style={S.dialog}>
            <div style={S.dialogTitle}>⚠ 確認</div>
            <div style={S.dialogMsg}>
              既に設定済みの脚本家をさらに追加します。よろしいですか？
              <br />
              <small style={{ color: '#888' }}>
                重複: {dupDialog.dupNames.join('、')}
              </small>
            </div>
            <div style={S.dialogBtns}>
              <button style={S.btnSecondary} onClick={handleDupCancel}>キャンセル</button>
              <button style={S.btnPrimary}   onClick={handleDupConfirm}>OK</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
