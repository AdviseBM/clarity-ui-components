export default function getOS() {
  if (typeof window === 'undefined') {
    return 'undetermined';
  }

  const { userAgent } = window.navigator;
  const macosPlatforms = /(Macintosh)|(MacIntel)|(MacPPC)|(Mac68K)/i;
  const windowsPlatforms = /(Win32)|(Win64)|(Windows)|(WinCE)/i;
  const iosPlatforms = /(iPhone)|(iPad)|(iPod)/i;

  if (macosPlatforms.test(userAgent)) {
    return 'macos';
  }
  if (iosPlatforms.test(userAgent)) {
    return 'ios';
  }
  if (windowsPlatforms.test(userAgent)) {
    return 'windows';
  }
  if (/Android/i.test(userAgent)) {
    return 'android';
  }
  if (/Linux/i.test(userAgent)) {
    return 'linux';
  }

  return 'undetermined';
}
