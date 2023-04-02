import "./src/config/firebase"
import RootNavigation from "./src/routes"
import { Provider as PaperProvider } from "react-native-paper"

export default function App() {
  return (
    <PaperProvider>
      <RootNavigation />
    </PaperProvider>
  )
}
