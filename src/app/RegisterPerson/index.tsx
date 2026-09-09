import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { colors } from '@/theme/colors';
import { styles } from './style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

import Button from '@/components/Button';
import AbstractGradient from '@/components/AbstractGradient'
import Input from '@/components/Input';
import { DateTimeInput } from '@/components/DateTimeInput';

export default function Index() {

  const router = useRouter();
  const insets = useSafeAreaInsets()
  const [birthDate, setBirthDate] = useState<Date>();
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={insets.top}
    >
      <AbstractGradient height={420} />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 24 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
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
              <Input label={'Primeiro nome'} />
            </View>
            <View style={styles.nameField}>
              <Input label={'SobrenomE'} />
            </View>
          </View>

          <DateTimeInput
            mode="date"
            label="Data de nascimento"
            value={birthDate}
            onChange={setBirthDate}
            maximumDate={new Date()}
          />
        </View>

        <View style={styles.footer}>
          <Button
            title={'Continuar'}
            borderColor={colors.emerald[500]}
            color={colors.emerald[500]}
            onPress={() => router.push('/RegisterPerson/diabetes')}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}