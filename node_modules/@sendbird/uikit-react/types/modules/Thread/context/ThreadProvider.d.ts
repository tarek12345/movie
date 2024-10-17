import React from 'react';
import { type EmojiCategory } from '@sendbird/chat';
import { GroupChannel } from '@sendbird/chat/groupChannel';
import type { BaseMessage, FileMessage, FileMessageCreateParams, MultipleFilesMessage, MultipleFilesMessageCreateParams, UserMessageCreateParams } from '@sendbird/chat/message';
import { UserProfileProviderProps } from '../../../lib/UserProfileContext';
import { ThreadContextInitialState } from './dux/initialState';
import type { OnBeforeDownloadFileMessageType } from '../../GroupChannel/context/GroupChannelProvider';
import useUpdateMessageCallback from './hooks/useUpdateMessageCallback';
import useToggleReactionCallback from './hooks/useToggleReactionsCallback';
import { SendMessageParams } from './hooks/useSendUserMessageCallback';
import useSendVoiceMessageCallback from './hooks/useSendVoiceMessageCallback';
import { SendableMessageType } from '../../../utils';
export interface ThreadProviderProps extends Pick<UserProfileProviderProps, 'disableUserProfile' | 'renderUserProfile'> {
    children?: React.ReactElement;
    channelUrl: string;
    message: SendableMessageType | null;
    onHeaderActionClick?: () => void;
    onMoveToParentMessage?: (props: {
        message: SendableMessageType;
        channel: GroupChannel;
    }) => void;
    onBeforeSendUserMessage?: (message: string, quotedMessage?: SendableMessageType) => UserMessageCreateParams;
    onBeforeSendFileMessage?: (file: File, quotedMessage?: SendableMessageType) => FileMessageCreateParams;
    onBeforeSendVoiceMessage?: (file: File, quotedMessage?: SendableMessageType) => FileMessageCreateParams;
    onBeforeSendMultipleFilesMessage?: (files: Array<File>, quotedMessage?: SendableMessageType) => MultipleFilesMessageCreateParams;
    onBeforeDownloadFileMessage?: OnBeforeDownloadFileMessageType;
    isMultipleFilesMessageEnabled?: boolean;
    filterEmojiCategoryIds?: (message: SendableMessageType) => EmojiCategory['id'][];
}
export interface ThreadProviderInterface extends ThreadProviderProps, ThreadContextInitialState {
    fetchPrevThreads: (callback?: (messages?: Array<BaseMessage>) => void) => void;
    fetchNextThreads: (callback?: (messages?: Array<BaseMessage>) => void) => void;
    toggleReaction: ReturnType<typeof useToggleReactionCallback>;
    sendMessage: (props: SendMessageParams) => void;
    sendFileMessage: (file: File, quoteMessage?: SendableMessageType) => Promise<FileMessage>;
    sendVoiceMessage: ReturnType<typeof useSendVoiceMessageCallback>;
    sendMultipleFilesMessage: (files: Array<File>, quoteMessage?: SendableMessageType) => Promise<MultipleFilesMessage>;
    resendMessage: (failedMessage: SendableMessageType) => void;
    updateMessage: ReturnType<typeof useUpdateMessageCallback>;
    deleteMessage: (message: SendableMessageType) => Promise<void>;
    nicknamesMap: Map<string, string>;
}
export declare const ThreadProvider: (props: ThreadProviderProps) => React.JSX.Element;
export declare const useThreadContext: () => ThreadProviderInterface;
