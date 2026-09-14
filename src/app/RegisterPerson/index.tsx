import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
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
import { useAuth } from '@/contexts/AuthContext';
import { DiabetesType } from '@/components/DiabetesTypeSelector';

export default function Index() {

  const router = useRouter();
  const insets = useSafeAreaInsets()
  const params = useLocalSearchParams<{ edit?: string }>();
  const { user } = useAuth();
  const { data, updateData, isEditing, setIsEditing } = useRegisterFlow();

  // Veio da tela de Perfil ("Editar Perfil"): carrega os dados atuais
  // do usuário logado no formulário em vez de começar em branco.
  useEffect(() => {
    if (params.edit === '1' && user && !isEditing) {
      setIsEditing(true);
      updateData({
        firstName: user.first_name,
        lastName: user.last_name,
        birthDate: new Date(user.birth_date),
        email: user.email,
        diabetesType: user.diabetes_type as DiabetesType,
      });
    }
  }, [params.edit, user, isEditing]);

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
            <Text style={styles.title}>{isEditing ? 'Edite seus' : 'Crie sua'}</Text>
            <Text style={styles.attention}>{isEditing ? 'dados' : 'conta'}</Text>
          </View>

          <Text style={styles.subtitle}>
            {isEditing
              ? 'Atualize suas informações pessoais sempre que precisar'
              : 'Preencha seus dados para começar a monitorar sua glicemia'}
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