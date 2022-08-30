import React, { ReactElement, useEffect, useState } from 'react';
import { INavigate } from 'hooks/use-navigate';
import { IEngineCase, isEngineCase } from '../entity/engine-case';
import { ScrollView, Text, View } from 'react-native';
import { CNstyles } from 'component-ui/screen/screens-styles/screenStyle.styles';
import { TITLES_ENGINE_CASE } from '../const/title';
import { MainTitles } from 'const/titles-main';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { GoNext } from 'infrastructure/confirm-modal/go-next';
import { GoBack } from 'infrastructure/confirm-modal/go-back';
import { ETitles } from 'infrastructure/confirm-modal/const/titles';
import { Input, Radio, RadioGroup } from '@ui-kitten/components/ui';
import { isPositiveStringNumber } from 'infrastructure/utils/validate/validate-positive-string-number';
import { IParametersStringValidation } from 'infrastructure/utils/validate/interface';
import { TITLES_LEAK_TESTS } from '../assembly/const/title';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { endpointTransition } from './const/endpoint-transition';

const paramValidateNitrogenPressure: IParametersStringValidation = {
  minLength: 1,
};
const paramValidateDewPointNitrogen: IParametersStringValidation = {
  minLength: 1,
};
const paramValidateClearanceBetweenTheNut: IParametersStringValidation = {
  minLength: 1,
};
const paramValidateEstimatedNumberOfRevolutions: IParametersStringValidation = {
  minLength: 1,
};

type TAddCaseLeakTestResultDto = {
  nitrogenPressure: number;
  dewPointNitrogen: number;
  testResults: boolean;
  clearanceBetweenTheNut: number;
  estimatedNumberOfRevolutions: number;
};

export const AddCaseLeakTestResult = ({ route }: INavigate<IEngineCase, TAddCaseLeakTestResultDto>): ReactElement => {
  const { entity } = route.params;
  const [nitrogenPressure, setNitrogenPressure] = useState('');
  const [dewPointNitrogen, setDewPointNitrogen] = useState('');
  const [clearanceBetweenTheNut, setClearanceBetweenTheNut] = useState('');
  const [estimatedNumberOfRevolutions, setEstimatedNumberOfRevolutions] = useState('');
  const [testResults, setTestResults] = useState(0);
  const [validNitrogenPressure, setValidNitrogenPressure] = useState(
    isPositiveStringNumber(nitrogenPressure, paramValidateNitrogenPressure),
  );
  const [validDewPointNitrogen, setValidDewPointNitrogen] = useState(
    isPositiveStringNumber(dewPointNitrogen, paramValidateDewPointNitrogen),
  );
  const [validClearanceBetweenTheNut, setValidClearanceBetweenTheNut] = useState(
    isPositiveStringNumber(clearanceBetweenTheNut, paramValidateClearanceBetweenTheNut),
  );
  const [validEstimatedNumberOfRevolutions, setValidEstimatedNumberOfRevolutions] = useState(
    isPositiveStringNumber(estimatedNumberOfRevolutions, paramValidateEstimatedNumberOfRevolutions),
  );
  const [degreaseSurfaceOfTzpAndApplyKcDto, setDegreaseSurfaceOfTzpAndApplyKcDto] =
    useState<TAddCaseLeakTestResultDto | null>(null);

  const useRadioState = (initialCheck = false) => {
    const [checked, setChecked] = React.useState(initialCheck);
    return { checked, onChange: setChecked };
  };

  const successRadioState = useRadioState();
  const dangerRadioState = useRadioState();

  useEffect(() => {
    setValidNitrogenPressure(isPositiveStringNumber(nitrogenPressure));
  }, [nitrogenPressure]);

  useEffect(() => {
    setValidDewPointNitrogen(isPositiveStringNumber(dewPointNitrogen));
  }, [dewPointNitrogen]);

  useEffect(() => {
    setValidClearanceBetweenTheNut(isPositiveStringNumber(clearanceBetweenTheNut));
  }, [clearanceBetweenTheNut]);

  useEffect(() => {
    setValidEstimatedNumberOfRevolutions(isPositiveStringNumber(estimatedNumberOfRevolutions));
  }, [estimatedNumberOfRevolutions]);

  useEffect(() => {
    if (nitrogenPressure && dewPointNitrogen && clearanceBetweenTheNut && estimatedNumberOfRevolutions) {
      setDegreaseSurfaceOfTzpAndApplyKcDto({
        nitrogenPressure: Number(nitrogenPressure),
        dewPointNitrogen: Number(dewPointNitrogen),
        testResults: Boolean(testResults),
        clearanceBetweenTheNut: Number(clearanceBetweenTheNut),
        estimatedNumberOfRevolutions: Number(estimatedNumberOfRevolutions),
      });
    } else {
      setDegreaseSurfaceOfTzpAndApplyKcDto(null);
    }
  }, [nitrogenPressure, dewPointNitrogen, testResults, clearanceBetweenTheNut, estimatedNumberOfRevolutions]);

  if (!isEngineCase(entity)) {
    return (
      <View style={CNstyles.FormContainer}>
        <Text style={CNstyles.textWhiteDefault}>{MainTitles.NO_DATA}</Text>
      </View>
    );
  }

  return (
    <View style={CNstyles.FormContainer}>
      <View style={{ margin: 20 }}>
        <View style={CNstyles.BtnContainerDetails}>
          <View style={{ margin: 10 }}>
            <Text style={CNstyles.textWhiteDefault}>
              {TITLES_ENGINE_CASE.name}:<Text style={CNstyles.defaultPurple}>{entity?.name}</Text>
            </Text>
          </View>
        </View>
        <View style={CNstyles.defaultHeight} />
        <ScrollView>
          <RadioGroup
            style={{ display: 'flex', flexDirection: 'row' }}
            selectedIndex={testResults}
            onChange={index => setTestResults(index)}
          >
            <Radio status="success" {...successRadioState}>
              {TITLES_LEAK_TESTS.hermetically}
            </Radio>
            <Radio status="danger" {...dangerRadioState}>
              {TITLES_LEAK_TESTS.notHermetically}
            </Radio>
          </RadioGroup>
          <Input
            maxLength={9}
            keyboardType="numeric"
            placeholderTextColor="#a1a1a1"
            onChangeText={(val): void => {
              setNitrogenPressure(val.replace(',', '.'));
            }}
            style={CNstyles.CNtextInputc}
            placeholder={TITLES_LEAK_TESTS.nitrogenPressure}
          />
          {!validNitrogenPressure.valid && <Text style={{ color: 'red' }}>{validNitrogenPressure.message}</Text>}
          <Input
            maxLength={9}
            keyboardType="numeric"
            placeholderTextColor="#a1a1a1"
            onChangeText={(val): void => {
              setDewPointNitrogen(val.replace(',', '.'));
            }}
            style={CNstyles.CNtextInputc}
            placeholder={TITLES_LEAK_TESTS.dewPointNitrogen}
          />
          {!validDewPointNitrogen.valid && <Text style={{ color: 'red' }}>{validDewPointNitrogen.message}</Text>}
          <Input
            maxLength={9}
            keyboardType="numeric"
            placeholderTextColor="#a1a1a1"
            onChangeText={(val): void => {
              setClearanceBetweenTheNut(val.replace(',', '.'));
            }}
            style={CNstyles.CNtextInputc}
            placeholder={TITLES_LEAK_TESTS.clearanceBetweenTheNut}
          />
          {!validClearanceBetweenTheNut.valid && (
            <Text style={{ color: 'red' }}>{validClearanceBetweenTheNut.message}</Text>
          )}
          <Input
            maxLength={9}
            keyboardType="numeric"
            placeholderTextColor="#a1a1a1"
            onChangeText={(val): void => {
              setEstimatedNumberOfRevolutions(val.replace(',', '.'));
            }}
            style={CNstyles.CNtextInputc}
            placeholder={TITLES_LEAK_TESTS.estimatedNumberOfRevolutions}
          />
          {!validEstimatedNumberOfRevolutions.valid && (
            <Text style={{ color: 'red' }}>{validEstimatedNumberOfRevolutions.message}</Text>
          )}
        </ScrollView>
        <View style={CNstyles.defaultHeight} />
        <View style={CNstyles.defaultHeight} />
        {degreaseSurfaceOfTzpAndApplyKcDto ? (
          <GoNext
            routeName={ENavigationName.CHANGE_STATE_ENGINE_CASES}
            dtoTransitions={degreaseSurfaceOfTzpAndApplyKcDto}
            endpoint={endpointTransition.ADD_CASE_LEAK_TEST_RESULT}
            entity={entity}
            title={ETransitionsUK.commandAddCaseLeakTestResult + '?'}
          />
        ) : (
          <TouchableHighlight onPress={(): void => {}}>
            <View
              style={{
                backgroundColor: '#323232',
                width: '100%',
                borderRadius: 10,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: 'white',
                  margin: 15,
                  fontSize: 16,
                }}
              >
                {ETitles.ENTER}
              </Text>
            </View>
          </TouchableHighlight>
        )}
        <View style={CNstyles.defaultHeight} />
        <GoBack />
      </View>
    </View>
  );
};
