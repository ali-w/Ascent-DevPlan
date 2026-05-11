// components.jsx — shared UI atoms

const { useState, useEffect, useRef, useMemo } = React;

// ─── Icons ───────────────────────────────────────────────────────────────
const Icon = ({ name, size }) => {
  const s = size || 16;
  const common = { width: s, height: s, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'upload':
      return <svg {...common}><path d="M12 16V4M12 4l-5 5M12 4l5 5"/><path d="M4 20h16"/></svg>;
    case 'file':
      return <svg {...common}><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/></svg>;
    case 'close':
      return <svg {...common}><path d="M6 6l12 12M18 6L6 18"/></svg>;
    case 'sun':
      return <svg {...common}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>;
    case 'moon':
      return <svg {...common}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
    case 'chevron':
      return <svg {...common}><path d="M9 6l6 6-6 6"/></svg>;
    case 'play':
      return <svg {...common}><polygon points="6 4 20 12 6 20" fill="currentColor" stroke="none"/></svg>;
    case 'book':
      return <svg {...common}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;
    case 'graduation':
      return <svg {...common}><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5"/></svg>;
    case 'mentor':
      return <svg {...common}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>;
    case 'filter':
      return <svg {...common}><path d="M3 6h18M6 12h12M10 18h4"/></svg>;
    case 'arrow':
      return <svg {...common}><path d="M5 12h14M13 5l7 7-7 7"/></svg>;
    case 'target':
      return <svg {...common}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>;
    case 'sparkle':
      return <svg {...common}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></svg>;
    case 'check':
      return <svg {...common}><path d="M5 13l4 4L19 7"/></svg>;
    default: return null;
  }
};

// ─── Status helpers ──────────────────────────────────────────────────────
// returns 'met' | 'over' | 'crit-1..3' | 'amb-1..3'
function statusFor(current, expected, critical) {
  if (current > expected) return 'over';
  if (current >= expected) return 'met';
  const gap = expected - current;
  const tone = critical ? 'crit' : 'amb';
  const depth = Math.min(3, gap);
  return `${tone}-${depth}`;
}

function gapLabel(current, expected) {
  if (current > expected) return `+${current - expected}`;
  if (current === expected) return 'Met';
  return `−${expected - current}`;
}

// ─── Top bar ─────────────────────────────────────────────────────────────
function TopBar({ dark, onToggleDark, rightSlot }) {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark" />
        <div>
          <div className="brand-name">Ascent</div>
        </div>
        <div className="brand-sub">· development plan</div>
      </div>
      <div className="topbar-actions">
        {rightSlot}
        <button className="btn btn-icon btn-ghost" onClick={onToggleDark} aria-label="Toggle theme" title={dark ? 'Switch to light' : 'Switch to dark'}>
          <Icon name={dark ? 'sun' : 'moon'} />
        </button>
      </div>
    </header>
  );
}

// ─── Bar row ─────────────────────────────────────────────────────────────
function BarRow({ skill, current, animated, onClick }) {
  const { name, expected, critical } = skill;
  const status = statusFor(current, expected, critical);
  const max = 5;
  const fillPct = animated ? (current / max) * 100 : 0;
  const targetPct = (expected / max) * 100;

  return (
    <button className="skill-row" onClick={onClick}>
      <div className="skill-name">
        {critical && <span className="crit-dot" title="Critical skill" />}
        <span className="skill-name-text">{name}</span>
      </div>
      <div className="bar-wrap">
        <div className="bar-track">
          <div className="bar-fill" data-status={status} style={{ width: `${fillPct}%` }} />
          <div className="bar-ticks">
            {[1,2,3,4].map(t => (
              <div key={t} className="bar-tick" style={{ left: `${(t/max)*100}%` }} />
            ))}
            <div className="bar-target" style={{ left: `calc(${targetPct}% - 1px)` }} title={`Target: ${expected}`} />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <span className="gap-pill" data-status={status}>
          {gapLabel(current, expected)} · {current}/{expected}
        </span>
      </div>
    </button>
  );
}

// ─── Battery card ────────────────────────────────────────────────────────
function BatteryCard({ skill, current, animated, onClick }) {
  const { name, expected, critical } = skill;
  const status = statusFor(current, expected, critical);
  const cells = [1,2,3,4,5].map(n => {
    const on = animated && n <= current;
    return (
      <div key={n} className="battery-cell"
           data-on={on ? 'true' : 'false'}
           data-status={status}
           data-target={n === expected ? 'true' : 'false'} />
    );
  });
  return (
    <button className="battery-card" onClick={onClick}>
      <div className="bc-hd">
        <div className="bc-name">
          {critical && <span className="crit-dot" style={{ display: 'inline-block', marginRight: 6, transform: 'translateY(-2px)' }} />}
          {name}
        </div>
        <span className="gap-pill" data-status={status}>{gapLabel(current, expected)}</span>
      </div>
      <div className="battery-stack">{cells}</div>
      <div className="bc-foot">
        <span>now · {current}</span>
        <span>target · {expected}</span>
      </div>
    </button>
  );
}

// ─── Dreyfus rail (in drawer) ────────────────────────────────────────────
function DreyfusRail({ current, expected }) {
  return (
    <div className="dreyfus-rail">
      {window.DATA.DREYFUS.map(d => {
        let state = 'idle';
        if (d.level === current && d.level === expected) state = 'both';
        else if (d.level === current) state = 'current';
        else if (d.level === expected) state = 'target';
        return (
          <div key={d.level} className="dreyfus-step" data-state={state}>
            <span className="dn">{d.level}</span>
            <span>{d.short}</span>
            {state !== 'idle' && (
              <span className="badge">
                {state === 'both' ? 'now • target' : state === 'current' ? 'now' : 'target'}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Content card ────────────────────────────────────────────────────────
function ContentCard({ item }) {
  const iconName = item.kind === 'article' ? 'book'
                  : item.kind === 'video'   ? 'play'
                  : item.kind === 'course'  ? 'graduation'
                  : 'mentor';
  return (
    <button className="content-card">
      <div className="cc-icon" data-kind={item.kind}>
        <Icon name={iconName} size={18} />
      </div>
      <div className="cc-body">
        <div className="cc-title">{item.title}</div>
        <div className="cc-meta">
          {item.kind.toUpperCase()} · {item.source}
          {item.minutes ? ` · ${item.minutes >= 60 ? `${Math.round(item.minutes/60)}h` : `${item.minutes}m`}` : ''}
        </div>
      </div>
      <div className="cc-go"><Icon name="chevron" /></div>
    </button>
  );
}

// ─── Drawer ──────────────────────────────────────────────────────────────
function Drawer({ open, skill, current, onClose, family }) {
  // close on Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!skill) return (
    <React.Fragment>
      <div className="drawer-scrim" data-open={open ? 'true' : 'false'} onClick={onClose} />
      <aside className="drawer" data-open={open ? 'true' : 'false'} />
    </React.Fragment>
  );

  const status = statusFor(current, skill.expected, skill.critical);
  const gap = skill.expected - current;
  const items = window.DATA.contentFor(skill.name);

  const articles = items.filter(i => i.kind === 'article' || i.kind === 'video');
  const courses  = items.filter(i => i.kind === 'course');
  const mentors  = items.filter(i => i.kind === 'mentor');

  let summary;
  if (gap <= 0) {
    summary = <>You're <b>at or above</b> the expected level for your role. Keep the muscle warm — consider sharing what you've learned through a write-up or mentoring someone earlier in the journey.</>;
  } else if (skill.critical) {
    summary = <>This is a <b>critical skill</b> for your role and you're <b>{gap} {gap===1?'level':'levels'} below</b> the expected mark. We'd suggest making this your primary focus this quarter.</>;
  } else {
    summary = <>You're <b>{gap} {gap===1?'level':'levels'} below</b> the expected mark. Not urgent, but a great area to invest in once your critical gaps are closing.</>;
  }

  return (
    <React.Fragment>
      <div className="drawer-scrim" data-open={open ? 'true' : 'false'} onClick={onClose} />
      <aside className="drawer" data-open={open ? 'true' : 'false'}>
        <div className="drawer-hd">
          <div className="drawer-hd-l">
            <div className="drawer-tag">
              {skill.critical && <span className="crit-dot" />}
              {skill.critical ? 'Critical skill' : 'Supporting skill'} · {family.title}
            </div>
            <h2 className="drawer-title">{skill.name}</h2>
            <div style={{ marginTop: 6 }}>
              <span className="gap-pill" data-status={status}>
                {gapLabel(current, skill.expected)} · {current}/{skill.expected}
              </span>
            </div>
          </div>
          <button className="btn btn-icon btn-ghost" onClick={onClose} aria-label="Close drawer">
            <Icon name="close" />
          </button>
        </div>
        <div className="drawer-body">
          <div className="gap-card">
            <div className="gap-card-hd">
              <h4>Dreyfus proficiency</h4>
            </div>
            <DreyfusRail current={current} expected={skill.expected} />
          </div>

          <p className="gap-summary">{summary}</p>

          {(articles.length > 0) && (
            <div className="content-section">
              <h4>Read & watch</h4>
              <div className="content-list">
                {articles.map((it, i) => <ContentCard key={i} item={it} />)}
              </div>
            </div>
          )}
          {(courses.length > 0) && (
            <div className="content-section">
              <h4>Go deep · courses</h4>
              <div className="content-list">
                {courses.map((it, i) => <ContentCard key={i} item={it} />)}
              </div>
            </div>
          )}
          {(mentors.length > 0) && (
            <div className="content-section">
              <h4>Learn from people</h4>
              <div className="content-list">
                {mentors.map((it, i) => <ContentCard key={i} item={it} />)}
              </div>
            </div>
          )}
        </div>
      </aside>
    </React.Fragment>
  );
}

// Expose
Object.assign(window, {
  Icon, BarRow, BatteryCard, DreyfusRail, ContentCard, Drawer, TopBar,
  statusFor, gapLabel,
});
