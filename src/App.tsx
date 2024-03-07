import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Layout from './layouts/Layout';
import ErrorPage from './pages/ErrorPage/ErrorPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

// Обертка приложения в ErrorBoundary

const ErrorBoundaryWrappedApp = withErrorBoundary(WrappedApp, {
  FallbackComponent: ErrorPage,
});

export default ErrorBoundaryWrappedApp;
