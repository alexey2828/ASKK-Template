export function onScanEntityInHeader(routeName: string): boolean {
  if (routeName.includes('TRANSITION')) {
    return false;
  }
  return true;
}
