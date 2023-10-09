
import { LinkedListFromData } from 'structures/LinkedList';
import { useAccessibleTabsContext } from './context';
import './tabs.scss';

import React, { ReactElement, useEffect, useState } from 'react';

type IProps = {
    children: ReactElement | ReactElement[];
    className?: string;
}

/**
 * Responsible for storing tabs info and refs
 * and handling keyboard arrow events
 */
export default function TabList({
    children,
    className = '',
}: IProps) {
    const { tabsId, mode, activeTabId, setActiveTabId } = useAccessibleTabsContext() || {};
    // TODO: improve type
    const [currentTab, setCurrentTab] = useState<any>();

    useEffect(() => {
        if (!currentTab) {
            const tabsContainer = document.getElementById(tabsId || '');
            if (tabsContainer) {
                const tabsArray = Array.from(tabsContainer.querySelectorAll('li'));
                const tabsIds = tabsArray.map(tab => tab.dataset.tabid);
                const startIndex = tabsIds.findIndex(id => id === activeTabId);
                const sortedTabsIds = [...tabsIds.slice(startIndex), ...tabsIds.slice(0, startIndex)];
                const list = new LinkedListFromData(sortedTabsIds as string[]);
                setCurrentTab(list.list?.head);
            }
        }
    }, []);

    function handleKeyDown(e: React.KeyboardEvent) {
        const isHorizontalArrayDown = ['ArrowRight', 'ArrowLeft'].includes(e.key);
        const isVerticalArrayDown = ['ArrowUp', 'ArrowDown'].includes(e.key);

        if (!isHorizontalArrayDown && !isVerticalArrayDown) return;

        if (isVerticalArrayDown && mode !== 'vertical') return;

        // TODO need to think about rtl for arabian etc - is there difference?
        // define active element
        if (['ArrowRight', 'ArrowDown']) {
            setActive(currentTab.next);
        } else {
            setActive(currentTab.prev);
        }
    }

    // TODO: improve type
    function setActive(tab: any) {
        setCurrentTab(tab);
        setActiveTabId?.(tab.id);
    }

    return (
        <ul role='tablist' className={`a11y-tablist ${className}`} onKeyDown={handleKeyDown}>
            {children}
        </ul>
    );
}