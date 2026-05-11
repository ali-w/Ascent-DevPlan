// app.jsx — root + state machine

const { useState: useS, useEffect: useE, useMemo: useM } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "dark": false,
  "criticalOnly": false
}/*EDITMODE-END*/;

function App() {
  // Tweaks (dark mode + critical-only persisted)
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply theme
  useE(() => {
    document.documentElement.setAttribute('data-theme', t.dark ? 'dark' : 'light');
  }, [t.dark]);

  // App state machine
  const [step, setStep] = useS('welcome');          // welcome | upload | dashboard
  const [familyId, setFamilyId] = useS('swe');
  const [viz, setViz] = useS('bar');                // bar | battery
  const [filter, setFilter] = useS('all');          // all | gaps | critical
  const [openSkillName, setOpenSkillName] = useS(null);
  const [drawerOpen, setDrawerOpen] = useS(false);

  const family = useM(
    () => window.DATA.JOB_FAMILIES.find(f => f.id === familyId),
    [familyId]
  );
  const currentMap = useM(() => {
    const u = window.DATA.SAMPLE_USER;
    if (familyId === 'swe')  return u.currentSwe;
    if (familyId === 'pm')   return u.currentPm;
    return u.currentData;
  }, [familyId]);

  const openSkill = family.skills.find(s => s.name === openSkillName) || null;

  function handleOpenSkill(name) {
    setOpenSkillName(name);
    setDrawerOpen(true);
  }
  function handleCloseDrawer() {
    setDrawerOpen(false);
  }
  function handleContinueFamily(id) {
    setFamilyId(id);
    setStep('upload');
  }
  function handleReset() {
    setStep('welcome');
    setDrawerOpen(false);
  }

  // Filter sync from tweaks
  useE(() => {
    if (t.criticalOnly && filter !== 'critical') setFilter('critical');
    if (!t.criticalOnly && filter === 'critical') setFilter('all');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t.criticalOnly]);

  return (
    <div className="app">
      <TopBar
        dark={t.dark}
        onToggleDark={() => setTweak('dark', !t.dark)}
        rightSlot={
          step === 'dashboard'
            ? <span className="brand-sub" style={{fontSize:12}}>{family.title} · {family.level}</span>
            : null
        }
      />

      {step === 'welcome' && (
        <WelcomeScreen onContinue={handleContinueFamily} />
      )}

      {step === 'upload' && (
        <UploadScreen
          family={family}
          onBack={() => setStep('welcome')}
          onContinue={() => setStep('dashboard')}
        />
      )}

      {step === 'dashboard' && (
        <Dashboard
          family={family}
          currentMap={currentMap}
          viz={viz} setViz={setViz}
          criticalOnly={t.criticalOnly}
          setCriticalOnly={(v) => setTweak('criticalOnly', v)}
          filter={filter} setFilter={setFilter}
          onOpenSkill={handleOpenSkill}
          onReset={handleReset}
        />
      )}

      <Drawer
        open={drawerOpen}
        skill={openSkill}
        current={openSkill ? (currentMap[openSkill.name] ?? 0) : 0}
        onClose={handleCloseDrawer}
        family={family}
      />

      {/* Tweaks panel */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Display" />
        <TweakToggle
          label="Critical skills only"
          value={t.criticalOnly}
          onChange={(v) => setTweak('criticalOnly', v)}
        />
        <TweakToggle
          label="Dark mode"
          value={t.dark}
          onChange={(v) => setTweak('dark', v)}
        />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
