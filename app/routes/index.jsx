import { Link } from '@remix-run/react';

import heimStyles from '~/styles/home.css';

export default function Index() {
  return (
    <main id="content">
    <h1>Ein besserer Weg, um Notizen zu verwalten</h1>
    <p>Probier es aus und du wirst nie mehr eine Notiz verlieren</p>
    <p id="cta">
      <Link to="/notes">Versuch es!</Link>
    </p>
    
    </main>
  );
}

export function links() {
  return [{rel: 'stylesheet', href: heimStyles}]
}
