import React, { useState } from 'react';
import { Modal, Platform, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { colors } from '../../theme/colors'; // ajuste o caminho para o seu arquivo de tema
import { styles } from './style';

export type DateTimeInputMode = 'date' | 'time';

type DateTimeInputProps = {
  mode: DateTimeInputMode;
  value: Date | null | undefined;
  onChange: (date: Date) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  minimumDate?: Date;
  maximumDate?: Date;
};

const ICON_BY_MODE: Record<DateTimeInputMode, keyof typeof Ionicons.glyphMap> = {
  date: 'calendar-outline',
  time: 'time-outline',
};

function formatValue(mode: DateTimeInputMode, value: Date | null | undefined) {
  if (!value) return null;

  if (mode === 'date') {
    return value.toLocaleDateString('pt-BR');
  }

  return value.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

export function DateTimeInput({
  mode,
  value,
  onChange,
  label,
  placeholder,
  error,
  minimumDate,
  maximumDate,
}: DateTimeInputProps) {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [draftValue, setDraftValue] = useState(value ?? new Date());

  const displayValue = formatValue(mode, value);
  const fallbackPlaceholder = mode === 'date' ? 'Selecionar data' : 'Selecionar hora';

  function openPicker() {
    setDraftValue(value ?? new Date());
    setPickerVisible(true);
  }

  function closePicker() {
    setPickerVisible(false);
  }

  // Android: o picker é nativo e fecha sozinho ao escolher.
  function handleAndroidChange(event: DateTimePickerEvent, selectedDate?: Date) {
    closePicker();
    if (event.type === 'set' && selectedDate) {
      onChange(selectedDate);
    }
  }

  // iOS: usamos um spinner dentro de um modal com botão "Confirmar".
  function handleIOSChange(_event: DateTimePickerEvent, selectedDate?: Date) {
    if (selectedDate) {
      setDraftValue(selectedDate);
    }
  }

  function confirmIOSSelection() {
    onChange(draftValue);
    closePicker();
  }

  const isFocused = isPickerVisible;

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <Pressable
        onPress={openPicker}
        style={[
          styles.inputWrapper,
          isFocused && styles.inputWrapperFocused,
          !!error && styles.inputWrapperError,
        ]}
      >
        <Ionicons
          name={ICON_BY_MODE[mode]}
          size={20}
          color={isFocused ? colors.emerald[500] : colors.gray[500]}
          style={styles.icon}
        />
        <Text style={[styles.text, !displayValue && styles.placeholderText]}>
          {displayValue ?? placeholder ?? fallbackPlaceholder}
        </Text>
      </Pressable>

      {!!error && <Text style={styles.errorText}>{error}</Text>}

      {isPickerVisible && Platform.OS === 'android' && (
        <DateTimePicker
          value={value ?? new Date()}
          mode={mode}
          display="default"
          onChange={handleAndroidChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}

      {Platform.OS === 'ios' && (
        <Modal transparent animationType="slide" visible={isPickerVisible}>
          <Pressable style={styles.backdrop} onPress={closePicker}>
            <Pressable style={styles.iosPickerContainer} onPress={() => {}}>
              <View style={styles.iosPickerHeader}>
                <TouchableOpacity onPress={confirmIOSSelection}>
                  <Text style={styles.iosConfirmText}>Confirmar</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={draftValue}
                mode={mode}
                display="spinner"
                onChange={handleIOSChange}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                textColor={colors.white}
              />
            </Pressable>
          </Pressable>
        </Modal>
      )}
    </View>
  );
}