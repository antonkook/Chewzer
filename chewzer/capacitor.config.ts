import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  android: {
    minSdkVersion: 23,
    compileSdkVersion: 34, // or whatever is appropriate
    javaVersion: '17'
  },
  appId: 'com.example.app',
  appName: 'chewzer',
  webDir: 'dist/chewzer/browser'
};

export default config;
