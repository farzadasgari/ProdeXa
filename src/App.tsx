import {Toaster} from "@/components/ui/toaster";
import {Toaster as Sonner} from "@/components/ui/sonner";
import {TooltipProvider} from "@/components/ui/tooltip";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Tasks from "./pages/Tasks";
import Calendar from "./pages/Calendar";
import Projects from "./pages/Projects";

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster/>
                <Sonner/>
                <BrowserRouter>
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
                    </Routes>
                </BrowserRouter>
            </TooltipProvider>
        </QueryClientProvider>
    );
};

export default App;
