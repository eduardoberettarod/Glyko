import { View, Text, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { colors } from '@/theme/colors';
import { styles } from './style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Button from '@/components/Button';
import AbstractGradient from '@/components/AbstractGradient'
import Input from '@/components/Input';
import BackButton from '@/components/BackButton';
import { useAuth } from '@/contexts/AuthContext';
import { autenticarUsuario } from '@/database/users';

export default function Login() {

  const router = useRouter();
  const insets = useSafeAreaInsets()
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = email.trim().length > 0 && password.length > 0 && !isSubmitting;

  async function handleLogin() {
    if (!canSubmit) {
      return;
    }

    setIsSubmitting(true);

    try {
      const usuario = await autenticarUsuario(email.trim(), password);

      if (!usuario) {
        Alert.alert('Não foi possível entrar', 'E-mail ou senha incorretos.');
        return;
      }

      login(usuario);
      router.push('/screen/Dashboard');
    } catch (error) {
      Alert.alert('Não foi possível entrar', 'Tente novamente em instantes.');
    } finally {
      setIsSubmitting(false);
    }
  }

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
              title={isSubmitting ? 'Entrando...' : 'Entrar'}
              borderColor={colors.emerald[500]}
              color={colors.emerald[500]}
              disabled={!canSubmit}
              style={{ flex: 1, opacity: canSubmit ? 1 : 0.5 }}
              onPress={handleLogin}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}