import "./src/config/firebase"
import RootNavigation from "./src/routes"
import { Provider as PaperProvider } from "react-native-paper"

import { View } from "react-native"
import { useCallback, useEffect, useState } from "react"
import * as SplashScreen from "expo-splash-screen"
import { useFonts } from "expo-font"

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  useFonts({
    "font-light": require("./src/assets/fonts/Outfit/Outfit-Light.ttf"),
    "font-reg": require("./src/assets/fonts/Outfit/Outfit-Regular.ttf"),
    "font-md": require("./src/assets/fonts/Outfit/Outfit-Medium.ttf"),
    "font-bold": require("./src/assets/fonts/Outfit/Outfit-Bold.ttf"),
    "font-Black": require("./src/assets/fonts/Outfit/Outfit-Black.ttf"),
  })

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
