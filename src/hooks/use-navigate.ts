import { useNavigation } from '@react-navigation/native';
import { StackHeaderProps } from '@react-navigation/stack';
import { TMember } from '../infrastructure/api-platform';
import { ILaboratoryAnalysis } from '../laboratory/analysis/entity/laboratory-analysis';
import { INormativeDocument } from '../normative-document/entity/normative-document';
import { IShortNormativeDocument } from '../normative-document/entity/short-normative-document';
import { ENavigationName } from '../infrastructure/const/navigation-name';

type TParam<TEntity extends TMember | null, TDto> = {
  entity?: TEntity;
  shortNormativeDocuments?: IShortNormativeDocument[];
  normativeDocuments?: INormativeDocument[];
  laboratoryAnalyzes?: ILaboratoryAnalysis[];
  endpoint?: string;
  entityMaterials?: string;
  analyzesTitle?: string;
  isAnalyzesEmpty?: string;
  dtoTransitions?: TDto;
  error?: string;
  currentUrl?: string;
};

export type TArgsNavigate<TEntity extends TMember | null, TDto = undefined> = {
  route: string;
  params: TParam<TEntity, TDto>;
};

export interface INavigate<TEntity extends TMember | null, TDto = undefined> {
  route: {
    name: string;
    params: TParam<TEntity, TDto>;
  };
}

type TUseNavigation<TEntity extends TMember | null, TDto> = {
  goTo: (args: TArgsNavigate<TEntity, TDto>) => void;
  goBack: (entity?: TEntity) => void;
};

export function useNavigate<TEntity extends TMember | null, TDto = undefined>(): TUseNavigation<TEntity, TDto> {
  const navigation: StackHeaderProps['navigation'] = useNavigation();

  const goTo: TUseNavigation<TEntity, TDto>['goTo'] = ({ route, params }) => {
    navigation?.reset({
      index: 0,
      routes: [{ name: route }],
    });

    navigation?.navigate(route, params);
  };

  const goBack: TUseNavigation<TEntity, TDto>['goBack'] = entity => {
    if (!entity) {
      if (navigation.canGoBack()) {
        return navigation?.goBack();
      } else {
        return;
      }
    }

    return goTo({
      route: ENavigationName.DETAILS_SCREEN,
      params: {
        entity,
      },
    });
  };

  return { goTo, goBack };
}
