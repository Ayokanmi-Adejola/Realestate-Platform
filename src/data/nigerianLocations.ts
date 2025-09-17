export interface NigerianLocation {
  state: string;
  cities: string[];
}

export const nigerianStates: string[] = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT (Abuja)', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
  'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
  'Taraba', 'Yobe', 'Zamfara'
];

export const nigerianLocations: NigerianLocation[] = [
  {
    state: 'Lagos',
    cities: [
      'Ikeja', 'Lekki', 'Victoria Island', 'Ikoyi', 'Ajah', 'Yaba',
      'Surulere', 'Apapa', 'Gbagada', 'Maryland', 'Magodo', 'Ogudu',
      'Ojodu', 'Ketu', 'Ikorodu', 'Epe', 'Badagry', 'Ojo', 'Alimosho',
      'Agege', 'Ifako-Ijaiye', 'Shomolu', 'Kosofe', 'Oshodi-Isolo',
      'Mushin', 'Amuwo-Odofin', 'Festac', 'Banana Island', 'Ibeju-Lekki',
      'Sangotedo', 'Awoyaya', 'Ogba', 'Ikotun', 'Isolo', 'Okota', 'Ajegunle',
      'Ebute Metta', 'Ilupeju', 'Obalende', 'Oniru', 'Elegushi', 'Chevron',
      'Lakowe', 'Abule Egba', 'Ipaja', 'Egbeda', 'Igando', 'Ejigbo', 'Satellite Town'
    ]
  },
  {
    state: 'FCT (Abuja)',
    cities: [
      'Central Area', 'Garki', 'Wuse', 'Maitama', 'Asokoro', 'Gwarinpa',
      'Jabi', 'Utako', 'Wuye', 'Durumi', 'Katampe', 'Jahi', 'Kado',
      'Life Camp', 'Lugbe', 'Kubwa', 'Nyanya', 'Karu', 'Gwagwalada', 'Bwari',
      'Apo', 'Lokogoma', 'Galadimawa', 'Dakwo', 'Dawaki', 'Dei-Dei', 'Dutse',
      'Gudu', 'Idu', 'Karmo', 'Kaura', 'Kuje', 'Kwali', 'Mabushi', 'Mpape',
      'Orozo', 'Pyakasa', 'Sabo Gari', 'Shishipe', 'Zuba'
    ]
  },
  {
    state: 'Rivers',
    cities: [
      'Port Harcourt', 'Obio-Akpor', 'Eleme', 'Oyigbo', 'Ikwerre', 'Etche',
      'Tai', 'Bonny', 'Okrika', 'Ogu-Bolo', 'Andoni', 'Khana', 'Gokana',
      'Ahoada', 'Abua', 'Degema', 'Emohua', 'Opobo', 'Buguma', 'Bori',
      'Omoku', 'Nchia', 'Rumuokoro', 'Rumuola', 'Rumuokwuta', 'Rumuigbo',
      'Rumuomasi', 'Rumukwurushi', 'Woji', 'Elelenwo', 'Akpajo', 'Ogbogoro'
    ]
  },
  {
    state: 'Oyo',
    cities: [
      'Ibadan', 'Ogbomosho', 'Oyo', 'Iseyin', 'Saki', 'Kishi', 'Igboho',
      'Eruwa', 'Igbo-Ora', 'Lalupon', 'Moniya', 'Ojoo', 'Iwo Road',
      'Egbeda', 'Ido', 'Akinyele', 'Lagelu', 'Ona Ara', 'Oluyole', 'Ibarapa',
      'Oke Ogun', 'Iganna', 'Iwere-Ile', 'Ilora', 'Fiditi', 'Jobele', 'Awe',
      'Ikoyi-Ile', 'Tede', 'Ago-Amodu', 'Sepeteri', 'Igbeti', 'Ogbomoso South'
    ]
  },
  {
    state: 'Kano',
    cities: [
      'Kano', 'Fagge', 'Dala', 'Gwale', 'Kumbotso', 'Nassarawa', 'Tarauni',
      'Ungogo', 'Wudil', 'Gaya', 'Rano', 'Bichi', 'Karaye',
      'Danbatta', 'Gezawa', 'Minjibir', 'Dawakin Kudu', 'Dawakin Tofa',
      'Kura', 'Madobi', 'Rimin Gado', 'Tofa', 'Tsanyawa', 'Garun Mallam',
      'Kibiya', 'Kiru', 'Sumaila', 'Kunchi', 'Makoda', 'Shanono'
    ]
  },
  {
    state: 'Delta',
    cities: [
      'Asaba', 'Warri', 'Sapele', 'Ughelli', 'Agbor', 'Abraka', 'Burutu',
      'Effurun', 'Ibusa', 'Issele-Uku', 'Ogwashi-Uku', 'Oleh', 'Ozoro', 'Patani',
      'Kwale', 'Otu-Jeremi', 'Obiaruku', 'Oghara', 'Koko', 'Bomadi', 'Okpe',
      'Udu', 'Orerokpe', 'Kokori', 'Isiokolo', 'Akwukwu-Igbo', 'Obior',
      'Umunede', 'Ughelli South', 'Otor-Udu', 'Ovwian', 'Aladja'
    ]
  },
  {
    state: 'Kaduna',
    cities: [
      'Kaduna', 'Zaria', 'Kafanchan', 'Kagoro', 'Kachia', 'Zonkwa', 'Jema\'a',
      'Kaura', 'Saminaka', 'Birnin Gwari', 'Giwa', 'Makarfi', 'Sabon Gari',
      'Ikara', 'Kagarko', 'Kauru', 'Kubau', 'Kudan', 'Lere', 'Sanga', 'Soba',
      'Chikun', 'Igabi', 'Jaba', 'Kaduna North', 'Kaduna South', 'Kachia',
      'Kajuru', 'Kaura', 'Kauru', 'Zangon Kataf'
    ]
  },
  {
    state: 'Anambra',
    cities: [
      'Awka', 'Onitsha', 'Nnewi', 'Ekwulobia', 'Aguata', 'Ihiala', 'Ogidi',
      'Abagana', 'Agulu', 'Nkpor', 'Obosi', 'Orumba', 'Umunze', 'Otuocha',
      'Awkuzu', 'Nanka', 'Oko', 'Amawbia', 'Enugwu-Ukwu', 'Abatete', 'Achina',
      'Adazi-Nnukwu', 'Aguleri', 'Ajalli', 'Akwa', 'Alor', 'Amaokpala',
      'Atani', 'Awgbu', 'Enugwu-Agidi', 'Igbariam', 'Neni', 'Nnobi', 'Ojoto',
      'Ukpo', 'Umuleri', 'Umuoji'
    ]
  },
  {
    state: 'Ogun',
    cities: [
      'Abeokuta', 'Ijebu Ode', 'Sagamu', 'Ilaro', 'Ota', 'Ifo', 'Iperu',
      'Ayetoro', 'Ijebu-Igbo', 'Ago-Iwoye', 'Owode', 'Ado-Odo', 'Imeko',
      'Ijebu-Ife', 'Ijebu-Mushin', 'Ijebu-Itele', 'Ipokia', 'Itori', 'Sango',
      'Agbara', 'Aiyetoro', 'Akute', 'Arepo', 'Ewekoro', 'Ibafo', 'Ijoko',
      'Obafemi-Owode', 'Odeda', 'Odogbolu', 'Ogun Waterside', 'Remo North',
      'Yewa North', 'Yewa South'
    ]
  },
  {
    state: 'Enugu',
    cities: [
      'Enugu', 'Nsukka', 'Oji River', 'Awgu', 'Udi', 'Oji-River', 'Agbani',
      'Ngwo', 'Ninth Mile Corner', 'Abor', 'Amagunze', 'Eha-Amufu', 'Ezeagu',
      'Enugu-Ezike', 'Opi', 'Obollo-Afor', 'Ikem', 'Aguobu-Owa', 'Aku',
      'Amuri', 'Aninri', 'Edem', 'Eha-Alumona', 'Ekwegbe', 'Enugu East',
      'Enugu North', 'Enugu South', 'Igbo-Eze North', 'Igbo-Eze South',
      'Isi-Uzo', 'Nkanu East', 'Nkanu West'
    ]
  },
  {
    state: 'Edo',
    cities: [
      'Benin City', 'Auchi', 'Ekpoma', 'Uromi', 'Igarra', 'Ubiaja', 'Irrua',
      'Sabongida-Ora', 'Igueben', 'Abudu', 'Fugar', 'Ewu', 'Agbede',
      'Akoko-Edo', 'Egor', 'Esan Central', 'Esan North-East', 'Esan South-East',
      'Esan West', 'Etsako Central', 'Etsako East', 'Etsako West', 'Iguegben',
      'Ikpoba-Okha', 'Oredo', 'Orhionmwon', 'Ovia North-East', 'Ovia South-West',
      'Owan East', 'Owan West', 'Uhunmwonde'
    ]
  },
  {
    state: 'Imo',
    cities: [
      'Owerri', 'Orlu', 'Okigwe', 'Mbaise', 'Oguta', 'Mbano', 'Obowo', 'Ngor-Okpala',
      'Aboh', 'Ahiazu', 'Ehime', 'Ezinihitte', 'Ideato', 'Ihitte/Uboma', 'Ikeduru',
      'Isiala Mbano', 'Isu', 'Mbaitoli', 'Nkwerre', 'Njaba', 'Nwangele', 'Ohaji/Egbema',
      'Okigwe', 'Onuimo', 'Orlu', 'Orsu', 'Oru East', 'Oru West', 'Owerri Municipal',
      'Owerri North', 'Owerri West'
    ]
  },
  {
    state: 'Akwa Ibom',
    cities: [
      'Uyo', 'Eket', 'Ikot Ekpene', 'Oron', 'Abak', 'Etinan', 'Ikot Abasi', 'Itu',
      'Mkpat-Enin', 'Nsit-Ibom', 'Nsit-Ubium', 'Uruan', 'Ukanafun', 'Essien Udim',
      'Eastern Obolo', 'Esit-Eket', 'Etim-Ekpo', 'Ibeno', 'Ibesikpo-Asutan', 'Ibiono-Ibom',
      'Ika', 'Ikono', 'Ikot Abasi', 'Ikot Ekpene', 'Ini', 'Itu', 'Mbo', 'Mkpat-Enin',
      'Nsit-Atai', 'Nsit-Ibom', 'Nsit-Ubium', 'Obot-Akara', 'Okobo', 'Onna', 'Oron',
      'Oruk Anam', 'Udung-Uko', 'Ukanafun', 'Uruan', 'Urue-Offong/Oruko', 'Uyo'
    ]
  },
  {
    state: 'Abia',
    cities: [
      'Umuahia', 'Aba', 'Arochukwu', 'Bende', 'Ohafia', 'Isuikwuato', 'Umunneochi',
      'Ukwa East', 'Ukwa West', 'Umuahia North', 'Umuahia South', 'Isiala Ngwa North',
      'Isiala Ngwa South', 'Osisioma Ngwa', 'Ugwunagbo', 'Ikwuano', 'Umu Nneochi',
      'Obi Ngwa', 'Aba North', 'Aba South', 'Arochukwu', 'Bende', 'Ikwuano', 'Isiala Ngwa North',
      'Isiala Ngwa South', 'Isuikwuato', 'Obi Ngwa', 'Ohafia', 'Osisioma', 'Ugwunagbo',
      'Ukwa East', 'Ukwa West', 'Umuahia North', 'Umuahia South', 'Umu Nneochi'
    ]
  },
  {
    state: 'Adamawa',
    cities: [
      'Yola', 'Mubi', 'Numan', 'Jimeta', 'Ganye', 'Guyuk', 'Hong', 'Jada', 'Lamurde',
      'Madagali', 'Maiha', 'Mayo-Belwa', 'Michika', 'Shelleng', 'Song', 'Toungo',
      'Demsa', 'Fufure', 'Gombi', 'Girei', 'Yola North', 'Yola South'
    ]
  },
  {
    state: 'Bauchi',
    cities: [
      'Bauchi', 'Azare', 'Misau', 'Jama\'are', 'Katagum', 'Dass', 'Tafawa Balewa',
      'Alkaleri', 'Toro', 'Ningi', 'Warji', 'Darazo', 'Ganjuwa', 'Kirfi', 'Bogoro',
      'Gamawa', 'Giade', 'Itas/Gadau', 'Shira', 'Zaki'
    ]
  },
  {
    state: 'Bayelsa',
    cities: [
      'Yenagoa', 'Brass', 'Nembe', 'Ogbia', 'Sagbama', 'Southern Ijaw', 'Ekeremor',
      'Kolokuma/Opokuma', 'Brass', 'Ekeremor', 'Kolokuma/Opokuma', 'Nembe', 'Ogbia',
      'Sagbama', 'Southern Ijaw', 'Yenagoa'
    ]
  },
  {
    state: 'Benue',
    cities: [
      'Makurdi', 'Gboko', 'Otukpo', 'Katsina-Ala', 'Vandeikya', 'Oju', 'Kwande',
      'Zaki Biam', 'Adikpo', 'Lessel', 'Ushongo', 'Ugbokpo', 'Wannune', 'Buruku',
      'Ado', 'Agatu', 'Apa', 'Buruku', 'Gboko', 'Guma', 'Gwer East', 'Gwer West',
      'Katsina-Ala', 'Konshisha', 'Kwande', 'Logo', 'Makurdi', 'Obi', 'Ogbadibo',
      'Ohimini', 'Oju', 'Okpokwu', 'Otukpo', 'Tarka', 'Ukum', 'Ushongo', 'Vandeikya'
    ]
  },
  {
    state: 'Borno',
    cities: [
      'Maiduguri', 'Biu', 'Gwoza', 'Bama', 'Dikwa', 'Konduga', 'Monguno', 'Damboa',
      'Askira/Uba', 'Chibok', 'Gubio', 'Kaga', 'Kukawa', 'Magumeri', 'Mafa', 'Mobbar',
      'Abadam', 'Askira/Uba', 'Bama', 'Bayo', 'Biu', 'Chibok', 'Damboa', 'Dikwa',
      'Gubio', 'Guzamala', 'Gwoza', 'Hawul', 'Jere', 'Kaga', 'Kala/Balge', 'Konduga',
      'Kukawa', 'Kwaya Kusar', 'Mafa', 'Magumeri', 'Maiduguri', 'Marte', 'Mobbar',
      'Monguno', 'Ngala', 'Nganzai', 'Shani'
    ]
  },
  {
    state: 'Cross River',
    cities: [
      'Calabar', 'Ogoja', 'Ikom', 'Ugep', 'Obudu', 'Obubra', 'Akamkpa', 'Odukpani',
      'Akpabuyo', 'Bakassi', 'Bekwarra', 'Biase', 'Boki', 'Calabar Municipal',
      'Calabar South', 'Etung', 'Ikom', 'Obanliku', 'Obubra', 'Obudu', 'Odukpani',
      'Ogoja', 'Yakuur', 'Yala'
    ]
  },
  {
    state: 'Ebonyi',
    cities: [
      'Abakaliki', 'Afikpo', 'Onueke', 'Ishieke', 'Uburu', 'Ezza', 'Onicha', 'Ohaukwu',
      'Afikpo North', 'Afikpo South', 'Ebonyi', 'Ezza North', 'Ezza South', 'Ikwo',
      'Ishielu', 'Ivo', 'Izzi', 'Ohaozara', 'Ohaukwu', 'Onicha'
    ]
  },
  {
    state: 'Ekiti',
    cities: [
      'Ado-Ekiti', 'Ikere', 'Ikole', 'Ijero', 'Ise/Orun', 'Emure', 'Efon', 'Ekiti West',
      'Ekiti East', 'Ekiti South-West', 'Oye', 'Ilejemeje', 'Irepodun/Ifelodun', 'Ido/Osi',
      'Gbonyin', 'Moba', 'Ado Ekiti', 'Efon', 'Ekiti East', 'Ekiti South-West', 'Ekiti West',
      'Emure', 'Gbonyin', 'Ido Osi', 'Ijero', 'Ikere', 'Ikole', 'Ilejemeje', 'Irepodun/Ifelodun',
      'Ise/Orun', 'Moba', 'Oye'
    ]
  }
];

// Helper function to get cities by state
export const getCitiesByState = (state: string): string[] => {
  const location = nigerianLocations.find(loc => loc.state === state);
  return location ? location.cities : [];
};

// Helper function to get all cities
export const getAllNigerianCities = (): string[] => {
  return nigerianLocations.flatMap(location => location.cities);
};
