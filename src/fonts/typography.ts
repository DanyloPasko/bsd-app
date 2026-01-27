import { StyleSheet, Text, TextInput, TextStyle } from 'react-native';

export const FONT_FAMILY_LIGHT = 'Montserrat_300Light';
export const FONT_FAMILY_REGULAR = 'Montserrat_400Regular';
export const FONT_FAMILY_SEMIBOLD = 'Montserrat_600SemiBold';
export const FONT_FAMILY_BOLD = 'Montserrat_700Bold';

export const DEFAULT_FONT_FAMILY = FONT_FAMILY_REGULAR;

type DefaultProps = {
    style?: TextStyle | TextStyle[];
};

let didSetDefaultFont = false;

export const applyGlobalFont = () => {
    if (didSetDefaultFont) {
        return;
    }
    didSetDefaultFont = true;

    const textComponent = Text as unknown as { defaultProps?: DefaultProps };
    const defaultTextProps = textComponent.defaultProps ?? {};
    textComponent.defaultProps = {
        ...defaultTextProps,
        style: {
            ...StyleSheet.flatten(defaultTextProps.style ?? {}),
            fontFamily: DEFAULT_FONT_FAMILY,
        },
    };

    const textInputComponent = TextInput as unknown as { defaultProps?: DefaultProps };
    const defaultTextInputProps = textInputComponent.defaultProps ?? {};
    textInputComponent.defaultProps = {
        ...defaultTextInputProps,
        style: {
            ...StyleSheet.flatten(defaultTextInputProps.style ?? {}),
            fontFamily: DEFAULT_FONT_FAMILY,
        },
    };
};
