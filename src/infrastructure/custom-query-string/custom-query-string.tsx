import queryString from 'query-string';

export type TGetParameter = { [key: string]: string | string[] | undefined };

export function getQueryString(pathname: string, getParameters: TGetParameter): string {
  return queryString.stringifyUrl({
    url: pathname,
    query: { ...getParameters },
  });
}

export function parseUrl(url: string): queryString.ParsedUrl {
  return queryString.parseUrl(url);
}
