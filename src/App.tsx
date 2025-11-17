import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AssetProvider } from "@/contexts/AssetContext";
import { TransactionProvider } from "@/contexts/TransactionContext";
import { GoalsProvider } from "@/contexts/GoalsContext";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Resources from "./pages/Resources";
import News from "./pages/News";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="dark">
    <AssetProvider>
      <TransactionProvider>
        <GoalsProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="/" element={<Layout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="resources" element={<Resources />} />
                    <Route path="news" element={<News />} />
                  </Route>
                  {/* routes */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </QueryClientProvider>
        </GoalsProvider>
      </TransactionProvider>
    </AssetProvider>
  </ThemeProvider>
);

export default App;
