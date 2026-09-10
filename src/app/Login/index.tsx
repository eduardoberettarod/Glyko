import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { colors } from '@/theme/colors';
import { styles } from './style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Button from '@/components/Button';
import AbstractGradient from '@/components/AbstractGradient'
import Input from '@/components/Input';
import BackButton from '@/components/BackButton';

export default function Login() {

  const router = useRouter();
  const insets = useSafeAreaInsets()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const canSubmit = email.trim().length > 0 && password.length > 0;

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
            <Text style={styles.title}>Acesse sua</Text>
            <Text style={styles.attention}>conta</Text>
          </View>

          <Text style={styles.subtitle}>
            Entre com seu e-mail e senha para continuar monitorando sua glicemia
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
            value={email}
            onChangeText={setEmail}
          />

          <Input
            label={'Senha'}
            placeholder="••••••••"
            placeholderTextColor={colors.gray[500]}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.footer}>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <BackButton
              onPress={() => router.back()}
            />
            <Button
              title={'Entrar'}
              borderColor={colors.emerald[500]}
              color={colors.emerald[500]}
              disabled={!canSubmit}
              style={{ flex: 1, opacity: canSubmit ? 1 : 0.5 }}
              onPress={() => router.push('/screen/Dashboard')}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}