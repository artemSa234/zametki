const storageKey = 'notes-app';
  const storageData = localStorage.getItem(storageKey);
  const initialData = storageData ? JSON.parse(storageData) : {
    firstColumn: [],
    secondColumn: [],
    thirdColumn: []
  };