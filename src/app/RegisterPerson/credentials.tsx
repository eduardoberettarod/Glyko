import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { colors } from '@/theme/colors';
import { styles } from './style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Button from '@/components/Button';
import AbstractGradient from '@/components/AbstractGradient'
import Input from '@/components/Input';
import BackButton from '@/components/BackButton';
import { useRegisterFlow } from '@/contexts/RegisterFlowContext';

export default function Credentials() {

  const router = useRouter();
  const insets = useSafeAreaInsets()
  const { data, updateData } = useRegisterFlow();

  const canSubmit = data.email.trim().includes('@') && data.password.length >= 6;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
            <Text style={styles.title}>Proteja sua</Text>
            <Text style={styles.attention}>conta</Text>
          </View>

          <Text style={styles.subtitle}>
            Crie um e-mail e senha para acessar sua conta sempre que quiser monitorar sua glicemia
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label={'E-mail'}
            placeholder="seu@email.com"
            placeholderTextColor={colors.gray[500]}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={data.email}
            onChangeText={(text) => updateData({ email: text })}
          />

          <Input
            label={'Senha'}
            placeholder="Mínimo de 6 caracteres"
            placeholderTextColor={colors.gray[500]}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            value={data.password}
            onChangeText={(text) => updateData({ password: text })}
          />
        </View>

        <View style={styles.footer}>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <BackButton
              onPress={() => router.back()}
            />
            <Button
              title={'Continuar'}
              borderColor={colors.emerald[500]}
              color={colors.emerald[500]}
              style={{ flex: 1, opacity: canSubmit ? 1 : 0.5 }}
              onPress={() => router.push('/RegisterPerson/diabetes')}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}