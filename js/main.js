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
    },
    watch: {
      firstColumn: {
        handler(newFirstColumn) {
          this.checkMoveCard();
        },
        deep: true
      },
      secondColumn: {
        handler(newSecondColumn) {
          this.checkMoveCard();
        },
        deep: true
      },
      thirdColumn: {
        handler(newThirdColumn) {
        },
        deep: true
      }
    },
    methods: {
      toggleItem(card, item) {
        if (this.isThirdColumnItem(card)) {
          alert("Элементы третьего столбца не могут быть изменены.");
          return;
        }
        item.checked = !item.checked;
        this.updateProgress(card);
      },
      isThirdColumnItem(card) {
        return this.thirdColumn.includes(card);
      },
      updateProgress(card) {
        const checkedCount = card.items.filter(item => item.checked).length;
        const progress = (checkedCount / card.items.length) * 100;
        card.isComplete = progress === 100;
        if (card.isComplete) {
          card.lastChecked = new Date().toLocaleString();
        }
        this.checkMoveCard();
      },
      MoveFirstColm() {
        this.firstColumn.forEach(card => {
          const progress = (card.items.filter(item => item.checked).length / card.items.length) * 100;

          const isMaxSecondColumn = this.secondColumn.length >= 5;

          if (progress >= 50 && !isMaxSecondColumn) {
            this.secondColumn.push(card);
            this.firstColumn.splice(this.firstColumn.indexOf(card), 1);
            this.checkMoveCard();
          }
        });
      },
      MoveSecondColm() {
        this.secondColumn.forEach(card => {
          const progress = (card.items.filter(item => item.checked).length / card.items.length) * 100;
          if (progress === 100) {
            card.isComplete = true;
            card.lastChecked = new Date().toLocaleString();
            this.thirdColumn.push(card);
            this.secondColumn.splice(this.secondColumn.indexOf(card), 1);
            this.MoveFirstColm();
          }
        })
      },
    }
  });