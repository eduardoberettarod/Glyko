import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
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
import PaginationIndicator from '@/components/Paginationindicator';
import BackButton from '@/components/BackButton';
import { DiabetesTypeSelector, DiabetesType } from '@/components/DiabetesTypeSelector';
import { useRegisterFlow } from '@/contexts/RegisterFlowContext';
import { useAuth } from '@/contexts/AuthContext';
import { criarUsuario } from '@/database/users';

// Total de telas do fluxo de cadastro (ajuste conforme o número real de passos)
const REGISTER_TOTAL_STEPS = 3;
const REGISTER_CURRENT_STEP = 0; // esta é a 1ª tela do fluxo

export default function Diabetes() {

  const router = useRouter();
  const insets = useSafeAreaInsets()
  const { data, updateData } = useRegisterFlow();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
            <Text style={styles.title}>Seu perfil metabólico</Text>
          </View>

          <Text style={styles.subtitle}>
            Selecione o seu tipo de diabetes para personalizarmos sua experiência e calibrarmos as métricas do painel.
          </Text>
        </View>

        <View style={styles.form}>
          <DiabetesTypeSelector
            value={data.diabetesType}
            onChange={(type) => updateData({ diabetesType: type })}
          />
        </View>

        <View style={styles.footer}>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <BackButton
              onPress={() => router.back()}
            />
            <Button
              title={isSubmitting ? 'Enviando...' : 'Finalizar Cadastro'}
              borderColor={colors.emerald[500]}
              color={colors.emerald[500]}
              disabled={isSubmitting}
              style={{ flex: 1, opacity: isSubmitting ? 0.6 : 1 }}
              onPress={async () => {
                if (isSubmitting) {
                  return;
                }

                setIsSubmitting(true);

                try {
                  const usuarioCriado = await criarUsuario({
                    first_name: data.firstName,
                    last_name: data.lastName,
                    email: data.email,
                    password: data.password,
                    birth_date: (data.birthDate ?? new Date()).toISOString(),
                    diabetes_type: data.diabetesType,
                  });

                  login(usuarioCriado);
                  router.push('/screen/Dashboard');
                } catch (error) {
                  Alert.alert(
                    'Não foi possível finalizar o cadastro',
                    'Verifique seus dados e tente novamente.'
                  );
                } finally {
                  setIsSubmitting(false);
                }
              }}
            />
          </View>
        </View>

      </KeyboardAwareScrollView>
    </View>
  )
}