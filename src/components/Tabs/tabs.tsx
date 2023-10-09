import { AccessibleTabsProvider } from './context';
import './tabs.scss';

import React, { ReactElement, useEffect, useRef } from 'react';

type ILabelProps =
    | {
        label: string;
        labelId?: never;
    }
    | {
        labelId: string;
        label?: never;
    }
type IProps = {
    id: string;
    children: ReactElement[];
    /**
     * By default it's horizontal
     * In vertical mode handling of up / bottom arrows is added
     */
    mode?: 'horizontal' | 'vertical';
    // TODO: think how make active first tab is active if there is no defaultActiveTabId
    defaultActiveTabId: string;
    className?: string;

} & ILabelProps;

export default function Tabs({
    id,
    children,
    label,
    labelId,
    mode = 'horizontal',
    defaultActiveTabId,
    className = '',
}: IProps) {
    const labelAttribute = labelId ? {
        'aria-labelledby': labelId,
    } : {
        'aria-label': label,
    };
    const ariaLabels = {
        ...labelAttribute,
        'aria-orientation': mode,
    };

    return (
        <AccessibleTabsProvider tabsId={id} defaultActiveTabId={defaultActiveTabId}>
            <div id={id} className={`a11y-tabs ${className}`} {...ariaLabels}>
                {children}
            </div>
        </AccessibleTabsProvider>
    );
}