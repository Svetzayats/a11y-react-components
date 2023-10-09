import { useAccessibleTabsContext } from './context';
import './tabs.scss';

import React, { ReactElement, cloneElement, useEffect, useRef } from 'react';

type IProps = {
    children: ReactElement;
    tabId: string;
    panelId: string;
    className?: string;
}

export default function Tab({
    children,
    tabId,
    panelId,
    className = '',
}: IProps) {
    const { activeTabId, setActiveTabId, tabs } = useAccessibleTabsContext() || {};
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current && tabs?.[tabId]) {
            tabs[tabId] = ref.current;
        }
    }, []);

    const isActive = activeTabId === tabId;

    const elementWithAttributes = cloneElement(children, {
        role: 'tab',
        id: tabId,
        'aria-selected': isActive,
        'aria-controls': panelId,
        tabIndex: isActive ? 0 : -1,
        ref,
    });

    return (
        <li
            className={`a11y-tab ${className}`}
            role='presentation'
            data-tabid={tabId}
            onClick={() => setActiveTabId?.(tabId)}
        >
            {elementWithAttributes}
        </li>
    );
}