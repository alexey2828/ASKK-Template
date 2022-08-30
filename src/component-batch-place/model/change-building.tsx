import React, { ReactElement, useEffect, useState } from 'react';
import { GoNext } from '../../infrastructure/confirm-modal/go-next';
import { endpointTransition } from '../form-comand/const/endpoint-transition';
import { API_BUILDINGS_SHORT_URL } from '../../infrastructure/const/urls';
import { AsyncAutoComplete } from '../../infrastructure/async-auto-complete/asyncAutoComplete';
import { EntityFromScanner } from '../../infrastructure/entity-from-scanner/entity-from-scanner';
import { BuildingAutocompleteCard } from '../../buildings/building-card/building-card';
import { TGetParameter } from '../../infrastructure/custom-query-string/custom-query-string';
import { TMember } from '../../infrastructure/api-platform';
import { IComponentBatchPlace } from '../entity/component-batch-place';
import { ENavigationName } from '../../infrastructure/const/navigation-name';
import { IBuilding, isBuilding } from '../../buildings/entity/building';
import { EFields } from '../../buildings/const/fields';
import { TITLES_BUILDING } from '../../buildings/const/titles';
import { CNstyles } from '../../component-ui/screen/screens-styles/screenStyle.styles';
import { View } from 'react-native';
import { TITLES_COMPONENT_BATCH } from '../entity/component-batch/const/titles';
import { ETitles } from '../../infrastructure/confirm-modal/const/titles';
import { TITLES_AUTOCOMPLETE } from 'infrastructure/async-auto-complete/const/titles';

type TDtoChangeBuilding = { locatedAt: string };

const searchParameters: TGetParameter = {};

type TPropsChangeBuilding = {
  componentBatchPlace: IComponentBatchPlace;
};

export const ChangeBuilding = ({ componentBatchPlace }: TPropsChangeBuilding): ReactElement => {
  const [locatedAt, setLocatedAt] = useState<IBuilding | null>(null);
  const [isValidBuilding, setIsValidBuilding] = useState(false);
  const [dtoChangeBuilding, setDtoChangeBuilding] = useState<TDtoChangeBuilding | null>(null);

  const onScanEntity = (entityBuilding: TMember): void => {
    if (isBuilding(entityBuilding)) {
      setLocatedAt(entityBuilding);
    }
  };

  const onSelectedBuilding = (locatedAt: IBuilding | null): void => {
    setLocatedAt(locatedAt);
  };

  useEffect(() => {
    setIsValidBuilding(!!locatedAt);
  }, [locatedAt]);

  useEffect(() => {
    if (isValidBuilding) {
      setDtoChangeBuilding({
        locatedAt: String(locatedAt?.id),
      });
    } else {
      setDtoChangeBuilding(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidBuilding]);

  return (
    <>
      <AsyncAutoComplete
        value={locatedAt?.name}
        title={TITLES_BUILDING.title + ' ' + componentBatchPlace?.locatedAt?.name}
        pathname={API_BUILDINGS_SHORT_URL}
        renderCard={BuildingAutocompleteCard}
        searchParameters={searchParameters}
        onSelectedEntities={onSelectedBuilding}
        isNoValid={!locatedAt}
        helperText={TITLES_AUTOCOMPLETE.noDataInput}
        fieldName={EFields.NAME}
      />
      <EntityFromScanner onScanEntity={onScanEntity} />
      <View style={CNstyles.defaultHeight} />
      {dtoChangeBuilding ? (
        <GoNext
          routeName={ENavigationName.CHANGE_BUILDING_BATCH_PLACE_SCREEN}
          dtoTransitions={dtoChangeBuilding}
          endpoint={endpointTransition.CHANGE_BUILDING}
          entity={componentBatchPlace}
          title={TITLES_COMPONENT_BATCH.chageBuilding}
          titleBtn={ETitles.ENTER}
          titleBtnBack={ETitles.TURN_BACK}
        />
      ) : null}
    </>
  );
};
