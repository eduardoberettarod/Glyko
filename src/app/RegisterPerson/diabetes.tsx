import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useState, useRef } from 'react'
import { useRouter } from 'expo-router';
import { colors } from '@/theme/colors';
import { styles } from './style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

import { useRegisterFlow } from '@/context/RegisterFlowContext';
import Button from '@/components/Button';
import AbstractGradient from '@/components/AbstractGradient'
import Input from '@/components/Input';
import { DateTimeInput } from '@/components/DateTimeInput';
import PaginationIndicator from '@/components/Paginationindicator';
import BackButton from '@/components/BackButton';

// Total de telas do fluxo de cadastro (ajuste conforme o número real de passos)
const REGISTER_TOTAL_STEPS = 3;
const REGISTER_CURRENT_STEP = 0; // esta é a 1ª tela do fluxo

export default function Diabetes() {

  const router = useRouter();
  const insets = useSafeAreaInsets()
  const [birthDate, setBirthDate] = useState<Date>();
  const { setFooterTop } = useRegisterFlow();
  const spacerRef = useRef<View>(null);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={insets.top}
    >
      <AbstractGradient height={420} />

      <View style={[styles.header, { marginTop: insets.top + 16 }]}>
        <Image
          source={require('@/assets/logoComplete.png')}
          style={styles.image}
          contentFit="contain"
        />
      </View>

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
            <Text style={styles.glyko}>ASDASDASDAS</Text>
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
              <Input label={'Sobrenome'} />
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
          <View
            ref={spacerRef}
            style={styles.pagination}
            onLayout={() => spacerRef.current?.measureInWindow((x, y) => setFooterTop(y))}
          >
            <PaginationIndicator
              total={REGISTER_TOTAL_STEPS}
              activeIndex={REGISTER_CURRENT_STEP}
              style={{ opacity: 0 }}
            />
          </View>

          <View style={{ flexDirection: 'row', gap: 8 }}>
            <BackButton 
            onPress={() => router.back()}
            />
            <Button
              title={'Continuar'}
              borderColor={colors.emerald[500]}
              color={colors.emerald[500]}
              onPress={() => router.push('/RegisterPerson/diabetes')}
              style={{ flex: 1 }}
            />
          </View>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  )
}