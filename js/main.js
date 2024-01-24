const storageKey = 'notes-app';
  const storageData = localStorage.getItem(storageKey);
  const initialData = storageData ? JSON.parse(storageData) : {
    firstColumn: [],
    secondColumn: [],
    thirdColumn: []
  };
  let app = new Vue({
    el: '#app',
    data: {
      firstColumn: initialData.firstColumn,
      secondColumn: initialData.secondColumn,
      thirdColumn: initialData.thirdColumn,
      groupName: null,
      inputOne: null,
      inputTwo: null,
      inputThr: null,
      inputFor: null,
    }
  });