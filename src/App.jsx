import { useEffect, useState } from 'react'
import './App.css'

const seedTransactions = [
  { id: 'TX-2048', name: 'Olive Market', category: 'Groceries', date: 'Today, 10:42 AM', amount: -64.28, mark: 'OM', color: 'peach' },
  { id: 'TX-2047', name: 'Northstar Studio', category: 'Salary', date: 'Today, 8:15 AM', amount: 3240, mark: 'NS', color: 'green' },
  { id: 'TX-2046', name: 'Metro Transit', category: 'Transport', date: 'Yesterday, 6:30 PM', amount: -12.5, mark: 'MT', color: 'blue' },
  { id: 'TX-2045', name: 'Juniper Coffee', category: 'Dining', date: 'Yesterday, 9:12 AM', amount: -8.75, mark: 'JC', color: 'yellow' },
  { id: 'TX-2044', name: 'Cloudline Mobile', category: 'Utilities', date: 'Oct 06, 2026', amount: -48, mark: 'CM', color: 'lilac' },
]

const navItems = ['Overview', 'Transactions', 'Cards', 'Payments']
const money = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount)

function readSavedState() {
  try {
    return JSON.parse(localStorage.getItem('north-bank-demo') || 'null')
  } catch {
    return null
  }
}

function App() {
  const [savedState] = useState(readSavedState)
  const [balance, setBalance] = useState(savedState?.balance ?? 12840.56)
  const [transactions, setTransactions] = useState(savedState?.transactions ?? seedTransactions)
  const [activePage, setActivePage] = useState('Overview')
  const [transferOpen, setTransferOpen] = useState(false)
  const [showBalance, setShowBalance] = useState(true)
  const [search, setSearch] = useState('')
  const [frozen, setFrozen] = useState(false)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    localStorage.setItem('north-bank-demo', JSON.stringify({ balance, transactions }))
  }, [balance, transactions])

  useEffect(() => {
    if (!notice) return undefined
    const timeout = window.setTimeout(() => setNotice(''), 3200)
    return () => window.clearTimeout(timeout)
  }, [notice])

  const filteredTransactions = transactions.filter((transaction) =>
    `${transaction.name} ${transaction.category}`.toLowerCase().includes(search.toLowerCase()),
  )

  function handleTransfer(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const recipient = String(form.get('recipient')).trim()
    const amount = Number(form.get('amount'))
    if (!recipient || !Number.isFinite(amount) || amount <= 0 || amount > balance) return

    const transfer = {
      id: `TX-${Date.now()}`,
      name: recipient,
      category: 'Transfer',
      date: 'Just now',
      amount: -amount,
      mark: recipient.slice(0, 2).toUpperCase(),
      color: 'blue',
    }
    setBalance((current) => current - amount)
    setTransactions((current) => [transfer, ...current])
    setTransferOpen(false)
    setNotice(`Transfer of ${money(amount)} to ${recipient} is complete.`)
    event.currentTarget.reset()
  }

  const pageTitle = activePage === 'Overview' ? 'Good morning, Maya' : activePage

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#overview" onClick={() => setActivePage('Overview')} aria-label="Indian Bank home">
          <span className="brand-mark">I</span><span>Indian Bank</span>
        </a>
        <div className="profile-block">
          <div className="avatar">MC</div>
          <div><strong>Maya Chen</strong><span>Personal account</span></div>
          <span className="profile-chevron">⌄</span>
        </div>
        <span className="nav-caption">YOUR MONEY</span>
        <nav className="primary-nav" aria-label="Main navigation">
          {navItems.map((item, index) => (
            <button className={activePage === item ? 'nav-item active' : 'nav-item'} key={item} onClick={() => setActivePage(item)}>
              <span className="nav-glyph" aria-hidden="true">{['◫', '↕', '▭', '↗'][index]}</span>{item}
              {item === 'Transactions' && <span className="nav-count">{transactions.length}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-panel"><span className="help-dot">?</span><div><strong>Need a hand?</strong><span>We're here for you</span></div><span className="arrow">↗</span></div>
          <button className="nav-item signout" onClick={() => setNotice('This is a demo account. No sign-out is required.')}>↪ <span>Sign out</span></button>
          <div className="sidebar-footer">Member FDIC <span>·</span> Equal Housing Lender</div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">PERSONAL <span>/</span> {activePage.toUpperCase()}</div>
          <div className="topbar-actions">
            <label className="search-box"><span aria-hidden="true">⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search activity" aria-label="Search activity" /></label>
            <button className="icon-button notification-button" aria-label="Notifications" title="Notifications" onClick={() => setNotice('You are all caught up.')}>♧<i /></button>
            <div className="top-avatar">MC</div>
          </div>
        </header>

        <div className="page-content">
          <section className="page-heading">
            <div><p className="eyebrow">THURSDAY, OCTOBER 8, 2026</p><h1>{pageTitle}<span className="heading-period">.</span></h1><p className="heading-subtitle">Here’s what’s happening with your money today.</p></div>
            <button className="button button-dark" onClick={() => setTransferOpen(true)}><span aria-hidden="true">↗</span> Move money</button>
          </section>

          {activePage === 'Cards' ? (
            <section className="secondary-page">
              <div className="section-heading"><div><p className="eyebrow">YOUR WALLET</p><h2>Cards</h2></div><button className="button button-outline" onClick={() => setNotice('Your new card request has been noted.')}>＋ Add a card</button></div>
              <div className="bank-card">
                <div className="card-topline"><span className="card-logo">Indian Bank</span><span className="card-chip">◈</span></div>
                <div className="card-number">•••• &nbsp;•••• &nbsp;•••• &nbsp;4812</div>
                <div className="card-bottom"><span>MAYA CHEN</span><span>VISA&nbsp; ◉</span></div>
                <div className="card-orbit orbit-one" /><div className="card-orbit orbit-two" />
              </div>
              <div className="settings-list"><div><div><strong>Everyday debit card</strong><span>Virtual and physical · ending in 4812</span></div><span className={frozen ? 'status-tag frozen' : 'status-tag'}>{frozen ? 'Frozen' : 'Active'}</span></div><div className="setting-row"><div><strong>Temporarily freeze card</strong><span>Card payments will be declined while frozen.</span></div><button className={frozen ? 'toggle switched' : 'toggle'} role="switch" aria-checked={frozen} aria-label="Temporarily freeze card" onClick={() => setFrozen(!frozen)}><span /></button></div></div>
            </section>
          ) : activePage === 'Payments' ? (
            <section className="secondary-page">
              <div className="section-heading"><div><p className="eyebrow">SEND WITH CONFIDENCE</p><h2>Payments & transfers</h2></div><button className="button button-dark" onClick={() => setTransferOpen(true)}>＋ New transfer</button></div>
              <div className="payments-banner"><div className="payment-symbol">↗</div><div><span className="eyebrow">QUICK TRANSFER</span><h3>Send money in a few taps.</h3><p>Move money to someone you trust. Transfers in this demo are simulated.</p></div><button className="button button-outline" onClick={() => setTransferOpen(true)}>Send money <span>→</span></button></div>
              <TransactionList transactions={filteredTransactions.filter((transaction) => transaction.category === 'Transfer')} emptyMessage="Your recent transfers will show up here." />
            </section>
          ) : activePage === 'Transactions' ? (
            <section className="secondary-page">
              <div className="section-heading"><div><p className="eyebrow">ACCOUNT ACTIVITY</p><h2>Transactions</h2></div><button className="button button-outline" onClick={() => setNotice('Your activity statement is ready in this demo.')}>↓ Download statement</button></div>
              <div className="activity-summary"><div><span>Money in</span><strong>{money(transactions.filter((item) => item.amount > 0).reduce((sum, item) => sum + item.amount, 0))}</strong></div><div><span>Money out</span><strong>{money(Math.abs(transactions.filter((item) => item.amount < 0).reduce((sum, item) => sum + item.amount, 0)))}</strong></div><div><span>Showing</span><strong>{filteredTransactions.length} transactions</strong></div></div>
              <TransactionList transactions={filteredTransactions} emptyMessage="No transactions match your search." />
            </section>
          ) : (
            <>
              <section className="overview-grid">
                <div className="balance-card">
                  <div className="balance-card-header"><span> TOTAL BALANCE <span className="info-mark" title="Combined checking and savings balances">i</span></span><button className="visibility-button" onClick={() => setShowBalance(!showBalance)} aria-label={showBalance ? 'Hide balance' : 'Show balance'}>{showBalance ? '◉' : '◎'}</button></div>
                  <div className="balance-amount">{showBalance ? money(balance) : '••••••••'}</div>
                  <div className="balance-note"><span className="trend-chip">↗ 2.4%</span><span>vs. last month</span></div>
                  <div className="balance-footer"><span>ACCOUNTS</span><span>2 accounts <b>↓</b></span></div>
                  <div className="balance-decoration"><span /><span /><span /></div>
                </div>
                <div className="account-stack">
                  <div className="account-row"><span className="account-icon checking-icon">◫</span><div className="account-meta"><strong>Everyday Checking</strong><span>•••• 2840 · Checking</span></div><div className="account-value"><strong>{showBalance ? money(balance * 0.68) : '••••••'}</strong><span>Available</span></div><span className="row-arrow">↗</span></div>
                  <div className="account-row"><span className="account-icon savings-icon">◌</span><div className="account-meta"><strong>Rainy Day Savings</strong><span>•••• 0916 · Savings</span></div><div className="account-value"><strong>{showBalance ? money(balance * 0.32) : '••••••'}</strong><span>Available</span></div><span className="row-arrow">↗</span></div>
                  <button className="add-account" onClick={() => setNotice('Account opening is not available in this demo.')}>＋ Open an account</button>
                </div>
              </section>

              <section className="insight-strip"><div className="insight-icon">✳</div><div><span className="eyebrow">A LITTLE MOMENTUM</span><p>You’ve saved <strong>₹240 more</strong> this month than last month. Keep it up.</p></div><span className="insight-sparkline">▂ ▄ ▃ ▆ ▅ ▇</span></section>

              <section className="transactions-section"><div className="section-heading"><div><p className="eyebrow">THE LATEST</p><h2>Recent activity</h2></div><button className="text-link" onClick={() => setActivePage('Transactions')}>View all activity <span>→</span></button></div><TransactionList transactions={filteredTransactions.slice(0, 5)} emptyMessage="No transactions match your search." /></section>
            </>
          )}
          <footer className="page-footer"><span>© 2026 Indian Bank · Prototype</span><span>Independent demo · Not affiliated with Indian Bank</span><span>Privacy &nbsp;·&nbsp; Security</span></footer>
        </div>
      </main>

      {transferOpen && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setTransferOpen(false) }}><section className="transfer-modal" role="dialog" aria-modal="true" aria-labelledby="transfer-title"><button className="modal-close" aria-label="Close transfer dialog" onClick={() => setTransferOpen(false)}>×</button><p className="eyebrow">MOVE MONEY</p><h2 id="transfer-title">Send a transfer</h2><p className="modal-copy">Send money from Everyday Checking. Available balance: <strong>{money(balance)}</strong></p><form onSubmit={handleTransfer}><label>Recipient name<input name="recipient" placeholder="e.g. Alex Morgan" autoComplete="name" required /></label><label>Amount<input name="amount" type="number" min="0.01" max={balance} step="0.01" placeholder="0.00" required /></label><label>From account<select name="from" defaultValue="checking"><option value="checking">Everyday Checking · 2840</option></select></label><button className="button button-dark submit-transfer" type="submit">Review and send <span>→</span></button><p className="demo-disclaimer">Demo only. Transfers do not move real funds.</p></form></section></div>}
      {notice && <div className="toast" role="status"><span>✓</span>{notice}<button onClick={() => setNotice('')} aria-label="Dismiss notification">×</button></div>}
    </div>
  )
}

function TransactionList({ transactions: items, emptyMessage }) {
  return (
    <div className="transaction-list">
      {items.length === 0 ? <p className="empty-state">{emptyMessage}</p> : items.map((transaction) => (
        <div className="transaction-row" key={transaction.id}>
          <div className={`merchant-mark ${transaction.color}`}>{transaction.mark}</div>
          <div className="transaction-name"><strong>{transaction.name}</strong><span>{transaction.category}</span></div>
          <span className="transaction-date">{transaction.date}</span>
          <strong className={transaction.amount > 0 ? 'transaction-amount positive' : 'transaction-amount'}>{transaction.amount > 0 ? '+' : '−'}{money(Math.abs(transaction.amount))}</strong>
          <span className="transaction-more" aria-hidden="true">···</span>
        </div>
      ))}
    </div>
  )
}

export default App
