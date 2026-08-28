import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { styles } from './style';
import { colors } from '@/theme/colors';

//components
import { MoodSelector } from '@/components/MoodSelector';
import Scroll from '@/components/Scroll';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Dropdown from '@/components/Dropdown';
import { styles as dropdownStyles } from '@/components/Dropdown/style';
import { DateTimeInput } from '@/components/DateTimeInput';
import { NumericInput } from '@/components/NumericInput';
import ReturnPage from '@/components/ReturnPage';

export default function Register() {

  type MeasurementContext =
    | 'fasting'
    | 'before_meal'
    | 'after_meal'
    | 'snack'
    | 'before_bed'
    | 'after_exercise';

  const [measurementContext, setMeasurementContext] = useState<MeasurementContext>('fasting');
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const [preferredTime, setPreferredTime] = useState<Date>(new Date());
  const [glicemia, setGlicemia] = useState('');

  const measurementContexts: { label: string; value: MeasurementContext }[] = [
    {
      label: 'Jejum',
      value: 'fasting',
    },
    {
      label: 'Antes da refeição',
      value: 'before_meal',
    },
    {
      label: 'Depois da refeição',
      value: 'after_meal',
    },
    {
      label: 'Lanche',
      value: 'snack',
    },
    {
      label: 'Antes de dormir',
      value: 'before_bed',
    },
    {
      label: 'Após atividade física',
      value: 'after_exercise',
    },
  ];

  const handlePeriodChange = (value: MeasurementContext | null) => {
    if (value) {
      setMeasurementContext(value);
    }
  };


  return (
    <Scroll style={styles.container}>

      <View>
        <ReturnPage 
        title={'Nova Medição'}
        />
      </View>

      <View style={styles.NumericInput}>
        <NumericInput
          label="Glicemia (mg/dL)"
          value={glicemia}
          onChange={setGlicemia}
          placeholder="0"
        />
      </View>

      <View style={styles.DateTimeInput}>
        <DateTimeInput
          mode="date"
          label="Data de nascimento"
          value={birthDate}
          onChange={setBirthDate}
          maximumDate={new Date()}
        />

        <DateTimeInput
          mode="time"
          label="Horário preferido"
          value={preferredTime}
          onChange={setPreferredTime}
        />
      </View>

      <View style={styles.contextMedication}>
        <Text style={styles.label}>Contexto da medição</Text>
        <Dropdown
          value={measurementContext}
          onChange={handlePeriodChange}
          items={measurementContexts}
          placeholder="Período"
          style={dropdownStyles.dropdown}
          textStyle={dropdownStyles.dropdownText}
          dropDownContainerStyle={dropdownStyles.dropdownContainer}
        />
      </View>

      <View style={styles.moodSelector}>
        <Text style={styles.label}>Como se sente hoje?</Text>
        <MoodSelector />
      </View>

      <View style={styles.observation}>
        <Input
          label={'Observação'}
          isTextarea={true}
          placeholder={'Adicione notas sobre a refeição, atividade física ou medicação...'}
          placeholderTextColor={colors.gray[700]}
        />
      </View>

      <View style={styles.footer}>
        <Button
          title={'Salvar Registro'}
          borderColor={colors.gray[700]}
          colorText={colors.emerald[500]}
          color={colors.onyx}
        />
      </View>

    </Scroll>
  )
}