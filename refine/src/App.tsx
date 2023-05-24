import { Authenticated, Refine } from "@refinedev/core";
import {
    AuthPage,
    ThemedLayoutV2,
    ErrorComponent,
    RefineThemes,
    notificationProvider,
    RefineSnackbarProvider,
} from "@refinedev/mui";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import routerProvider, {
    CatchAllNavigate,
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { appwriteClient } from "utility";
import { authProvider } from "authProvider";
import { dataProvider, liveProvider } from "@refinedev/appwrite";
import { MuiInferencer } from "@refinedev/inferencer/mui";
import { Server } from "utility/config";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={RefineThemes.Blue}>
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
                                        <ThemedLayoutV2 >
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
                                        <Route index element={<MuiInferencer />} />
                                        <Route path="create" element={<MuiInferencer />} />
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
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
