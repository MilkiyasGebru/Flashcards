import './App.css'
import { createRoutesFromElements, RouterProvider, Route, createHashRouter} from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout.tsx";
import RootLayout from "./layouts/RootLayout.tsx";
import HomeLayout from "./layouts/HomeLayout.tsx";
import FlashCardContainer from "./components/FlashCardContainer.tsx";
import AuthPage from "./components/AuthPage.tsx";
import NotFoundPage from "./components/NotFoundPage.tsx";

const router = createHashRouter(
    createRoutesFromElements(
        <Route >
            <Route element={<RootLayout />}>
                <Route element={<HomeLayout />}>
                    <Route path="/admin" element={<AdminLayout />}/>
                    <Route path="/study" element={<FlashCardContainer />}/>
                </Route>
                <Route path="/" element={<AuthPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
         </Route>
    )
)

function App() {
    return (
        <RouterProvider router={router} />
    )
}

export default App
