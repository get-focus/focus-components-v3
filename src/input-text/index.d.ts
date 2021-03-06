export interface InputTextProps {
    autoFocus?: boolean;
    disabled?: boolean;
    error?: string | null;
    formatter?: (text: string | number) => string;
    maxLength?: number;
    name: string;
    onChange: (value: string) => void;
    onClick?: (e: React.SyntheticEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.SyntheticEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.SyntheticEvent<HTMLInputElement>) => void;
    onKeyPress?: (e: React.SyntheticEvent<HTMLInputElement>) => void;
    placeholder?: string;
    rawInputValue?: string | number;
    size?: number;
    type?: string;
    valid?: boolean;
}

export default class InputText extends React.Component<InputTextProps, {}> {
    refs: {
        inputText: HTMLDivElement;
        htmlInput: HTMLInputElement;
    }
    getValue(): string | number;
}
