import "./src/config/firebase"
import RootNavigation from "./src/routes"
import { Provider as PaperProvider } from "react-native-paper"

import { useCallback, useEffect, useState } from "react"
import * as SplashScreen from "expo-splash-screen"
import { View } from "react-native"

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <PaperProvider>
        <RootNavigation />
      </PaperProvider>
    </View>
  )
}
