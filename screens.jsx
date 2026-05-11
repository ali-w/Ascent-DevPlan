// screens.jsx — screen-level components: Welcome (job family + upload), Dashboard

const { useState: useStateS, useEffect: useEffectS, useMemo: useMemoS, useRef: useRefS } = React;

// ─── Welcome / job family picker ────────────────────────────────────────
function WelcomeScreen({ onContinue }) {
  const [selected, setSelected] = useStateS('swe');
  const families = window.DATA.JOB_FAMILIES;

  return (
    <div className="screen screen-narrow welcome fade-in">
      <div className="welcome-eyebrow">Step 1 · Pick your role</div>
      <h1 className="welcome-title">Let's look at your <em>skills</em> against what your role needs.</h1>
      <p className="welcome-lede">
        Pick the job family that best matches your role. We'll then load your self-assessed skill levels and show you where you're tracking — and where it might be worth investing time.
      </p>

      <div className="step-label">Job families</div>
      <div className="family-grid">
        {families.map(f => (
          <button key={f.id}
            className="family-card"
            data-selected={selected === f.id ? 'true' : 'false'}
            onClick={() => setSelected(f.id)}>
            <div className="fc-meta">{f.level} · {f.skills.filter(s=>s.critical).length} critical / {f.skills.length} total</div>
            <div className="fc-title">{f.title}</div>
            <div className="fc-blurb">{f.blurb}</div>
            <div className="fc-foot">
              {selected === f.id
                ? <span className="fc-chip"><Icon name="check" size={12} /> Selected</span>
                : <span className="fc-chip">Choose</span>}
            </div>
          </button>
        ))}
      </div>

      <div className="next-row">
        <button className="btn btn-primary" onClick={() => onContinue(selected)}>
          Continue <Icon name="arrow" />
        </button>
      </div>
    </div>
  );
}

// ─── Upload screen (faked CSV) ──────────────────────────────────────────
function UploadScreen({ family, onBack, onContinue }) {
  const [state, setState] = useStateS('idle'); // idle | parsing | parsed
  const [progress, setProgress] = useStateS(0);

  // sample CSV preview rows
  const SAMPLE = window.DATA.SAMPLE_USER;
  const current = family.id === 'swe' ? SAMPLE.currentSwe
                : family.id === 'pm'  ? SAMPLE.currentPm
                : SAMPLE.currentData;
  const previewRows = family.skills.slice(0, 6).map(s => ({
    skill: s.name,
    current: current[s.name] ?? 0,
    expected: s.expected,
  }));

  function fakeUpload() {
    setState('parsing'); setProgress(0);
    const start = Date.now();
    const tick = () => {
      const p = Math.min(100, (Date.now() - start) / 9);
      setProgress(p);
      if (p < 100) requestAnimationFrame(tick);
      else setState('parsed');
    };
    requestAnimationFrame(tick);
  }

  return (
    <div className="screen screen-narrow welcome fade-in">
      <div className="welcome-eyebrow">Step 2 · Upload your assessment</div>
      <h1 className="welcome-title">Bring in your <em>self-assessed</em> levels.</h1>
      <p className="welcome-lede">
        Upload a CSV with your current Dreyfus level (0–5) against each of the {family.skills.length} {family.title} skills. We'll compare against your role expectations and surface where to invest.
      </p>

      <div className="step-label">CSV upload</div>

      {state !== 'parsed' && (
        <div className="dropzone">
          <div className="dropzone-icon"><Icon name="upload" /></div>
          <h3>Drop your skills.csv here</h3>
          <p>One row per skill, with columns <code style={{fontFamily:'var(--font-mono)',background:'var(--bg-2)',padding:'1px 6px',borderRadius:4,fontSize:12}}>skill, level</code>. Levels are 0–5 on the Dreyfus scale.</p>
          <div className="dz-actions">
            <button className="btn btn-primary" onClick={fakeUpload} disabled={state==='parsing'}>
              {state === 'parsing'
                ? <>Parsing… {Math.round(progress)}%</>
                : <><Icon name="file" /> Use sample assessment</>}
            </button>
            <button className="btn" onClick={onBack}>Back</button>
          </div>
          <div style={{fontSize:12, color:'var(--muted)', marginTop:10}}>
            (Sample mode: we'll load <b>{SAMPLE.name}</b>'s assessment so you can explore.)
          </div>
        </div>
      )}

      {state === 'parsed' && (
        <React.Fragment>
          <div className="csv-preview">
            <div className="csv-preview-hd">
              <span>Parsed <b style={{color:'var(--ink)'}}>skills_{family.id}.csv</b> · {family.skills.length} rows · {SAMPLE.uploadedAt}</span>
              <span style={{color:'var(--met-fg)'}}><Icon name="check" size={14} /> Looks good</span>
            </div>
            <table>
              <thead>
                <tr><th>SKILL</th><th>YOUR LEVEL</th><th>EXPECTED</th></tr>
              </thead>
              <tbody>
                {previewRows.map(r => (
                  <tr key={r.skill}>
                    <td style={{color:'var(--ink)'}}>{r.skill}</td>
                    <td>{r.current}</td>
                    <td>{r.expected}</td>
                  </tr>
                ))}
                <tr><td colSpan={3} style={{color:'var(--muted)', textAlign:'center', padding:'10px 16px'}}>
                  …{family.skills.length - previewRows.length} more rows
                </td></tr>
              </tbody>
            </table>
          </div>
          <div className="next-row">
            <button className="btn" onClick={onBack} style={{marginRight:8}}>Back</button>
            <button className="btn btn-primary" onClick={onContinue}>
              See my plan <Icon name="arrow" />
            </button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

// ─── Dashboard ──────────────────────────────────────────────────────────
function Dashboard({ family, currentMap, viz, setViz, criticalOnly, setCriticalOnly, filter, setFilter, onOpenSkill, onReset }) {
  const [animated, setAnimated] = useStateS(false);
  useEffectS(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Compute & sort
  const enriched = useMemoS(() => family.skills.map(s => {
    const current = currentMap[s.name] ?? 0;
    const gap = s.expected - current;
    const status = statusFor(current, s.expected, s.critical);
    // priority score: critical gaps win; then size of gap
    const priority = (s.critical ? 1000 : 0) + Math.max(0, gap) * 10;
    return { ...s, current, gap, status, priority };
  }).sort((a,b) => b.priority - a.priority || a.name.localeCompare(b.name)),
  [family, currentMap]);

  const visible = enriched.filter(s => {
    if (criticalOnly && !s.critical) return false;
    if (filter === 'gaps') return s.gap > 0;
    if (filter === 'critical') return s.critical;
    return true;
  });

  const counts = useMemoS(() => {
    let met = 0, critGap = 0, otherGap = 0;
    enriched.forEach(s => {
      if (s.gap <= 0) met++;
      else if (s.critical) critGap++;
      else otherGap++;
    });
    return { met, critGap, otherGap, total: enriched.length };
  }, [enriched]);

  const SAMPLE = window.DATA.SAMPLE_USER;

  return (
    <div className="screen fade-in">
      <div className="dash-hd">
        <div className="dash-hd-left">
          <div className="welcome-eyebrow">Development plan · {SAMPLE.uploadedAt}</div>
          <h1 className="dash-title">{SAMPLE.name}</h1>
          <div className="dash-sub"><b>{family.title}</b> · {family.level} · {SAMPLE.team}</div>
        </div>
        <div className="tool-group">
          <button className="btn btn-ghost" onClick={onReset}>
            <Icon name="upload" /> Re-upload
          </button>
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="stat-num">{counts.total}<span className="of"> skills</span></div>
          <div className="stat-lbl">in your {family.title} profile</div>
        </div>
        <div className="stat" data-tone="crit">
          <div className="stat-num">{counts.critGap}<span className="of"> / {family.skills.filter(s=>s.critical).length}</span></div>
          <div className="stat-lbl">critical skills below target</div>
        </div>
        <div className="stat" data-tone="amb">
          <div className="stat-num">{counts.otherGap}</div>
          <div className="stat-lbl">other skills below target</div>
        </div>
        <div className="stat" data-tone="met">
          <div className="stat-num">{counts.met}</div>
          <div className="stat-lbl">skills met or exceeded</div>
        </div>
      </div>

      <div className="toolbar">
        <div className="tool-group">
          <span className="tool-label"><Icon name="filter" size={12} style={{marginRight:4, verticalAlign:-2}} /> Show</span>
          <div className="seg">
            <button data-on={filter==='all'} onClick={() => setFilter('all')}>All</button>
            <button data-on={filter==='gaps'} onClick={() => setFilter('gaps')}>Under target</button>
            <button data-on={filter==='critical'} onClick={() => setFilter('critical')}>Critical only</button>
          </div>
        </div>
        <div className="tool-group">
          <span className="tool-label">View</span>
          <div className="seg">
            <button data-on={viz==='bar'} onClick={() => setViz('bar')}>Bar</button>
            <button data-on={viz==='battery'} onClick={() => setViz('battery')}>Battery</button>
          </div>
        </div>
      </div>

      <div className="legend">
        <span className="legend-item"><span className="crit-dot" /> Critical skill</span>
        <span className="legend-item"><span className="legend-swatch" style={{background:'var(--crit-3-bg)'}} /> Critical gap (deeper = bigger gap)</span>
        <span className="legend-item"><span className="legend-swatch" style={{background:'var(--amb-2-bg)'}} /> Other gap</span>
        <span className="legend-item"><span className="legend-swatch" style={{background:'var(--met-bg)'}} /> Met</span>
        <span className="legend-item"><span className="legend-swatch" style={{background:'var(--over-bg)'}} /> Above target</span>
        <span className="legend-item" style={{marginLeft:'auto'}}>
          <span className="bar-target" style={{position:'relative', width:2, height:14, display:'inline-block'}}></span>
          <span style={{marginLeft:8}}>Expected level</span>
        </span>
      </div>

      {viz === 'bar' && (
        <div className="skill-list">
          {visible.map(s => (
            <BarRow key={s.name} skill={s} current={s.current} animated={animated}
                    onClick={() => onOpenSkill(s.name)} />
          ))}
          {visible.length === 0 && (
            <div style={{padding:'40px 20px', textAlign:'center', color:'var(--muted)'}}>
              No skills match this filter.
            </div>
          )}
        </div>
      )}

      {viz === 'battery' && (
        <div className="battery-grid">
          {visible.map(s => (
            <BatteryCard key={s.name} skill={s} current={s.current} animated={animated}
                         onClick={() => onOpenSkill(s.name)} />
          ))}
          {visible.length === 0 && (
            <div style={{padding:'40px 20px', textAlign:'center', color:'var(--muted)', gridColumn:'1 / -1'}}>
              No skills match this filter.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { WelcomeScreen, UploadScreen, Dashboard });
