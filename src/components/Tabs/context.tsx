import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Nullish } from 'types/common';

type ITabRefs = {
  [tabId: string]: React.MutableRefObject<any>;
};

type IAccessibleTabsContext = {
  activeTabId: string;
  setActiveTabId: (id: string) => void;
  tabsId: string;
  mode: 'horizontal' | 'vertical';
  setMode: (mode: 'horizontal' | 'vertical') => void;
  tabs: ITabRefs;
}

type IProviderProps = {
  children: React.ReactNode;
  tabsId: string;
  defaultActiveTabId: string;
};

const AccessibleTabsContext = createContext<Nullish<IAccessibleTabsContext>>(null);

function AccessibleTabsProvider({
  children,
  tabsId,
  defaultActiveTabId,
}: IProviderProps) {
  const [activeTabId, setActiveTabId] = useState<string>(defaultActiveTabId);
  const [mode, setMode] = useState<'horizontal' | 'vertical'>('horizontal');
  const [id, setId] = useState<string>(tabsId);
  const tabRefs = useRef({});

  useEffect(() => {
    // @ts-ignore
    tabRefs.current[activeTabId]?.focus();
  }, [activeTabId]);

  const value = {
    activeTabId,
    setActiveTabId,
    mode,
    setMode,
    tabsId: id,
    tabs: tabRefs.current,
  };

  return (
    <AccessibleTabsContext.Provider value={value}>
      {children}
    </AccessibleTabsContext.Provider>
  );


}

function useAccessibleTabsContext() {
  const context = useContext(AccessibleTabsContext);
  if (context === undefined) {
    console.error('AccessibleTabsContext context must be used within a AccessibleTabsProvider');
    return {} as IAccessibleTabsContext;
  }
  return context;
}

export { AccessibleTabsProvider, useAccessibleTabsContext };