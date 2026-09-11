import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { colors } from '@/theme/colors';
import { styles } from './style';

import Button from '@/components/Button';
import AbstractGradient from '@/components/AbstractGradient'
import Input from '@/components/Input';
import BackButton from '@/components/BackButton';
import { useAuth } from '@/contexts/AuthContext';
import { autenticarUsuario } from '@/database/users';

export default function Login() {

  const router = useRouter();
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
    <View style={styles.container}>
      <AbstractGradient height={420} />

      <KeyboardAwareScrollView
        contentContainerStyle={
          styles.content
        }
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bottomOffset={30}
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
      </KeyboardAwareScrollView>
    </View>
  )
}