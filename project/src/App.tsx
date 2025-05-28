import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { MovieProvider } from './contexts/MovieContext';
import Layout from './components/Layout';
import MovieRecommendationSystem from './components/MovieRecommendationSystem';

function App() {
  return (
    <ThemeProvider>
      <MovieProvider>
        <Layout>
          <MovieRecommendationSystem />
        </Layout>
      </MovieProvider>
    </ThemeProvider>
  );
}

export default App;