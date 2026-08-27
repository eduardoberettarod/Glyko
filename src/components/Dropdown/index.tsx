import React, { useState } from 'react';
import DropDownPicker, {
  ItemType,
} from 'react-native-dropdown-picker';
import { MaterialIcons } from '@expo/vector-icons';

import {
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { colors } from '@/theme/colors';
import { styles as defaultStyles } from './style';

type Props<T extends string | number> = {
  value: T | null;
  onChange: (value: T | null) => void;
  items: ItemType<T>[];
  placeholder?: string;

  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  dropDownContainerStyle?: StyleProp<ViewStyle>;
  listItemContainerStyle?: StyleProp<ViewStyle>;
  listItemLabelStyle?: StyleProp<TextStyle>;
  selectedItemContainerStyle?: StyleProp<ViewStyle>;
  selectedItemLabelStyle?: StyleProp<TextStyle>;
  itemSeparatorStyle?: StyleProp<ViewStyle>;
};

export default function Dropdown<T extends string | number>({
  value,
  onChange,
  items,
  placeholder = 'Selecione uma opção',

  style,
  textStyle,
  dropDownContainerStyle,
  listItemContainerStyle,
  listItemLabelStyle,
  selectedItemContainerStyle,
  selectedItemLabelStyle,
  itemSeparatorStyle,
}: Props<T>) {
  const [open, setOpen] = useState(false);

  const resolvedStyle = style ?? defaultStyles.dropdown;
  const resolvedTextStyle = textStyle ?? defaultStyles.dropdownText;
  const resolvedDropDownContainerStyle = dropDownContainerStyle ?? defaultStyles.dropdownContainer;
  const resolvedListItemContainerStyle = listItemContainerStyle ?? defaultStyles.listItemContainer;
  const resolvedListItemLabelStyle = listItemLabelStyle ?? defaultStyles.listItemLabel;
  const resolvedSelectedItemContainerStyle = selectedItemContainerStyle ?? defaultStyles.selectedItemContainer;
  const resolvedSelectedItemLabelStyle = selectedItemLabelStyle ?? defaultStyles.selectedItemLabel;
  const resolvedItemSeparatorStyle = itemSeparatorStyle ?? defaultStyles.itemSeparator;

  const ArrowDownIcon = ({ style }: { style?: StyleProp<ViewStyle> }) => (
    <MaterialIcons name="keyboard-arrow-down" size={20} color={colors.gray[700]} style={style as StyleProp<TextStyle>} />
  );

  const ArrowUpIcon = ({ style }: { style?: StyleProp<ViewStyle> }) => (
    <MaterialIcons name="keyboard-arrow-up" size={20} color={colors.gray[700]} style={style as StyleProp<TextStyle>} />
  );

  return (
    <DropDownPicker<T>
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={(callback) => {
        const newValue = callback(value);
        onChange(newValue);
      }}
      placeholder={placeholder}
      showArrowIcon={true}
      ArrowDownIconComponent={ArrowDownIcon}
      ArrowUpIconComponent={ArrowUpIcon}
      itemSeparator={true}

      style={resolvedStyle}
      textStyle={resolvedTextStyle}
      dropDownContainerStyle={resolvedDropDownContainerStyle}
      listItemContainerStyle={resolvedListItemContainerStyle}
      listItemLabelStyle={resolvedListItemLabelStyle}
      selectedItemContainerStyle={resolvedSelectedItemContainerStyle}
      selectedItemLabelStyle={resolvedSelectedItemLabelStyle}
      itemSeparatorStyle={resolvedItemSeparatorStyle}
    />
  );
}