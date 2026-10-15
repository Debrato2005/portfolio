import QRCode from 'qrcode';
export const fixtureMarker = 'PORTFOLIO_DEV_FIXTURE_ONLY';
export function createQrFixture() {
  return QRCode.toDataURL('https://example.com', { width: 144, margin: 2 });
}
