import './App.css';

import Routes from './Routes'
import { AuthProvider } from './components/AuthContext'

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <Routes />
            </div>
        </AuthProvider>
    );
}

export default App;