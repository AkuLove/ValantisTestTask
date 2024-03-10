import md5 from 'md5';

//= ============================================================================

const PASSWORD = 'Valantis';
const TIMESTAMP = `${new Date().toISOString().slice(0, 10).split('-').join('')}`;

export const HASH_PASSWORD = md5(`${PASSWORD}_${TIMESTAMP}`);
export const BASE_URL = 'https://api.valantis.store:41000/';

export const BRANDS = [
  'Alfieri & St.John',
  'Audemars Piguet',
  'Baraka',
  'Bibigi',
  'Bvlgari',
  'Carrera y Carrera',
  'Cartier',
  'Casa Gi',
  'Casato',
  'Chaumet',
  'Chopard',
  'Damiani',
  'De Beers',
  'De Grisogono',
  'Faberge',
  'Franck Muller',
  'Giorgio Visconti',
  'Imma',
  'Jacob & Co',
  'Mauboussin',
  'Mikimoto',
  'Pasquale Bruni',
  'Piaget',
  'Pomellato',
  'Roberto Coin',
  'Stephen Webster',
  'Tiffany & Co',
  'Van Cleef & Arpels',
  'ЭПЛ Якутские бриллианты',
];
