import {Toaster} from "@/components/ui/toaster";
import {Toaster as Sonner} from "@/components/ui/sonner";
import {TooltipProvider} from "@/components/ui/tooltip";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import Index from "@/pages/Index";
import Profile from "@/pages/Profile";
import Tasks from "@/pages/Tasks";
import Calendar from "@/pages/Calendar";
import Projects from "@/pages/Projects";
import Kanban from "@/pages/Kanban";
import NotFound from "@/pages/NotFound";
import Analytics from "@/pages/Analytics";
import Settings from "@/pages/Settings";


const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster/>
                <Sonner/>
                <BrowserRouter basename="/prode">
                    <Routes>
                        <Route path="/" element={<Index/>}/>
                        <Route
                            path="/profile"
                            element={
                                <MainLayout>
                                    <Profile/>
                                </MainLayout>
                            }
                        />
                        <Route
                            path="/tasks"
                            element={
                                <MainLayout>
                                    <Tasks/>
                                </MainLayout>
                            }
                        />
                        <Route
                            path="/calendar"
                            element={
                                <MainLayout>
                                    <Calendar/>
                                </MainLayout>
                            }
                        />
                        <Route
                            path="/projects"
                            element={
                                <MainLayout>
                                    <Projects/>
                                </MainLayout>
                            }
                        />
                        <Route
                            path="/kanban"
                            element={
                                <MainLayout>
                                    <Kanban/>
                                </MainLayout>
                            }
                        />
                        <Route
                            path="/analytics"
                            element={
                                <MainLayout>
                                    <Analytics/>
                                </MainLayout>
                            }
                        />
                        <Route
                            path="/settings"
                            element={
                                <MainLayout>
                                    <Settings/>
                                </MainLayout>
                            }
                        />
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </BrowserRouter>
            </TooltipProvider>
        </QueryClientProvider>
    );
};

export default App;
