import { CssBaseline, GlobalStyles } from "@mui/material";
import { dataProvider, liveProvider } from "@refinedev/appwrite";
import { Authenticated, Refine } from "@refinedev/core";
import {
    AuthPage,
    ErrorComponent,
    RefineSnackbarProvider,
    ThemedLayoutV2,
    notificationProvider
} from "@refinedev/mui";
import routerProvider, {
    CatchAllNavigate,
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { authProvider } from "authProvider";
import { Header } from "components/header";
import { ColorModeContextProvider } from "contexts/color-mode";
import { SkillCreate } from "pages/skills/create";
import { SkillEdit } from "pages/skills/edit";
import { SkillList } from "pages/skills/list";
import { SkillShow } from "pages/skills/show";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { appwriteClient } from "utility";
import { Server } from "utility/config";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ColorModeContextProvider>
                <CssBaseline />
                <GlobalStyles
                    styles={{ html: { WebkitFontSmoothing: "auto" } }}
                />
                <RefineSnackbarProvider>
                    <Refine
                        routerProvider={routerProvider}
                        dataProvider={dataProvider(appwriteClient, {
                            databaseId: Server.databaseID,
                        })}
                        liveProvider={liveProvider(appwriteClient)}
                        authProvider={authProvider}
                        notificationProvider={notificationProvider}
                        resources={[
                            {
                                name: Server.collectionID,
                                list: "/skills",
                                create: "/skills/create",
                                edit: "/skills/edit/:id",
                                show: "/skills/show/:id",
                                meta: {
                                    label: "skills",
                                },
                            },
                        ]}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                            liveMode: "auto",
                        }}
                    >
                        <Routes>
                            <Route
                                element={
                                    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                                        <ThemedLayoutV2 
                                            Header={Header}
                                        >
                                            <Outlet />
                                        </ThemedLayoutV2>
                                    </Authenticated>
                                }
                            >
                                <Route
                                    index
                                    element={<NavigateToResource resource="skills" />}
                                />
                                    <Route path="/skills">
                                        <Route index element={<SkillList />} />
                                        <Route path="create" element={<SkillCreate />} />
                                        <Route path="edit/:id" element={<SkillEdit />} />
                                        <Route path="show/:id" element={<SkillShow />} />
                                    </Route>
                            </Route>

                            <Route
                                element={
                                    <Authenticated fallback={<Outlet />}>
                                        <NavigateToResource resource="skills" />
                                    </Authenticated>
                                }
                            >
                                <Route path="/login" element={<AuthPage type="login" />} />
                            </Route>

                            <Route
                                element={
                                    <Authenticated>
                                        <ThemedLayoutV2>
                                            <Outlet />
                                        </ThemedLayoutV2>
                                    </Authenticated>
                                }
                            >
                                <Route path="*" element={<ErrorComponent />} />
                            </Route>
                        </Routes>
                        <UnsavedChangesNotifier />
                    </Refine>
                </RefineSnackbarProvider>
            </ColorModeContextProvider>
        </BrowserRouter>
    );
};

export default App;