import { View, Text } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { colors } from '@/theme/colors';
import { styles } from './style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

import Button from '@/components/Button';
import AbstractGradient from '@/components/AbstractGradient'
import Input from '@/components/Input';
import { DateTimeInput } from '@/components/DateTimeInput';
import { useRegisterFlow } from '@/contexts/RegisterFlowContext';

export default function Index() {

  const router = useRouter();
  const insets = useSafeAreaInsets()
  const { data, updateData } = useRegisterFlow();

  const canSubmit =
    data.firstName.trim().length > 0 &&
    data.lastName.trim().length > 0 &&
    !!data.birthDate;
  
  return (
    <View style={styles.container}>
      <AbstractGradient height={420} />

      <KeyboardAwareScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 24 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bottomOffset={30}
      >
        <View style={styles.textContainer}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.title}>Crie sua</Text>
            <Text style={styles.attention}>conta</Text>
          </View>

          <Text style={styles.subtitle}>
            Preencha seus dados para começar a monitorar sua glicemia
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.nameRow}>
            <View style={styles.nameField}>
              <Input
                label={'Primeiro nome'}
                value={data.firstName}
                onChangeText={(text) => updateData({ firstName: text })}
              />
            </View>
            <View style={styles.nameField}>
              <Input
                label={'Sobrenome'}
                value={data.lastName}
                onChangeText={(text) => updateData({ lastName: text })}
              />
            </View>
          </View>

          <DateTimeInput
            mode="date"
            label="Data de nascimento"
            value={data.birthDate}
            onChange={(date) => updateData({ birthDate: date })}
            maximumDate={new Date()}
          />
        </View>

        <View style={styles.footer}>
          <Button
            title={'Continuar'}
            borderColor={colors.emerald[500]}
            color={colors.emerald[500]}
            style={{ opacity: canSubmit ? 1 : 0.5 }}
            disabled={!canSubmit}
            onPress={() => router.push('/RegisterPerson/credentials')}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}