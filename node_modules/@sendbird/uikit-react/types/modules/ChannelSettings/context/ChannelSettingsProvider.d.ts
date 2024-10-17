import React, { ReactNode } from 'react';
import { GroupChannel, GroupChannelUpdateParams } from '@sendbird/chat/groupChannel';
import type { UserListItemProps } from '../../../ui/UserListItem';
import { UserProfileProviderProps } from '../../../lib/UserProfileContext';
interface ApplicationUserListQuery {
    limit?: number;
    userIdsFilter?: Array<string>;
    metaDataKeyFilter?: string;
    metaDataValuesFilter?: Array<string>;
}
interface ChannelSettingsQueries {
    applicationUserListQuery?: ApplicationUserListQuery;
}
type OverrideInviteUserType = {
    users: Array<string>;
    onClose: () => void;
    channel: GroupChannel;
};
interface CommonChannelSettingsProps {
    channelUrl: string;
    onCloseClick?(): void;
    onLeaveChannel?(): void;
    overrideInviteUser?(params: OverrideInviteUserType): void;
    onChannelModified?(channel: GroupChannel): void;
    onBeforeUpdateChannel?(currentTitle: string, currentImg: File | null, data: string | undefined): GroupChannelUpdateParams;
    queries?: ChannelSettingsQueries;
    renderUserListItem?: (props: UserListItemProps) => ReactNode;
}
export interface ChannelSettingsContextProps extends CommonChannelSettingsProps, Pick<UserProfileProviderProps, 'renderUserProfile' | 'disableUserProfile'> {
    children?: React.ReactElement;
    className?: string;
}
interface ChannelSettingsProviderInterface extends CommonChannelSettingsProps {
    setChannelUpdateId(uniqId: string): void;
    forceUpdateUI(): void;
    channel: GroupChannel | null;
    loading: boolean;
    invalidChannel: boolean;
}
declare const ChannelSettingsProvider: (props: ChannelSettingsContextProps) => React.JSX.Element;
declare const useChannelSettingsContext: () => ChannelSettingsProviderInterface;
export { ChannelSettingsProvider, useChannelSettingsContext };
