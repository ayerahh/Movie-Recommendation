# MovieMind - Movie Recommendation System

A full-stack movie recommendation system that suggests movies based on user preferences using content-based filtering. The system uses the TMDB (The Movie Database) API for movie data and images.

## Features

- Movie search functionality
- Content-based movie recommendations
- Responsive design with dark/light mode
- Movie details with posters
- Integration with TMDB API

## Tech Stack

### Backend
- Python 3.10
- Flask (REST API)
- Pandas (Data processing)
- Scikit-learn (Content-based filtering)
- TMDb API Integration

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide React (Icons)

## Project Structure

```
Movie Recommendation/
├── backend/
│   ├── app.py                 # Flask backend server
│   ├── movie_data.pkl        # Processed movie data and similarity matrix
│   └── requirements.txt      # Python dependencies
│
├── project/                  # Frontend React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── contexts/        # React context providers
│   │   └── main.tsx        # Entry point
│   └── package.json         # Frontend dependencies
│
└── .env                     # Environment variables
```

## Setup and Installation

- To get the data model train the Movie_Recommendation_System.ipynb accordingly and get the model

### Prerequisites
- Python 3.10 or higher
- Node.js 16 or higher
- TMDb API key

### Backend Setup

1. Create and activate virtual environment:
```bash
python -m venv .venv
# On Windows
.venv\Scripts\activate
# On Unix or MacOS
source .venv/bin/activate
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Create `.env` file in the root directory:
```env
FLASK_ENV=development
FLASK_DEBUG=1
TMDB_API_KEY=your_tmdb_api_key
PORT=5000
```

4. Run the Flask server:
```bash
python app.py
```

### Frontend Setup

1. Navigate to the project directory:
```bash
cd project
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in the project directory:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Data Processing

The system uses the TMDb 5000 Movie Dataset, which is processed using:
- Natural Language Processing techniques
- TF-IDF Vectorization
- Cosine Similarity for recommendations

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/movies/search` - Search movies by title
- `GET /api/movies/recommendations` - Get movie recommendations
- `GET /api/movies/<id>/poster` - Get movie poster
- `GET /api/movies/<id>` - Get movie details

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- TMDb for providing the movie database and API
- Scikit-learn for machine learning tools
- React and Vite communities for frontend tools
